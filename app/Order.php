<?php

namespace App;

use \Auth;
use App\Click;
use App\Lesson;
use App\Main;
use App\Member;
use App\Sms;
use App\Teacher;
use App\Unit;
use DB;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    private $main;

    public function __construct()
    {
        $this->main = new Main();
    }

    public static function getCheckoutQueue()
    {
        // Init Checkout Lesson Must Parameter
        return Order::whereNotNull('checkout_time')->whereNull('delete_time')->whereNull('refund_time');
    }

    public static function getBookingQueue()
    {
        // Init Booking Lesson Must Parameter
        return Order::whereNull('checkout_time')->whereNull('delete_time')->whereNull('refund_time');
    }

    public function addCashBuyer($info, $price, $l_id, $receipt_mode, $receipt)
    {
        // Init Checked Parameter
        $has_pay     = false;
        $has_book    = false;
        $no_expired  = false;

        // Get Buyer Member ID And Buyer's Data Of That Want To Buy
        $m_id        = Member::findAccount($info)->m_id ?? Member::findEmail($info)->m_id;
        $lesson_data = Lesson::find($l_id);

        // Check Buyer Isn't The Teacher Of This Lesson
        if ((Teacher::findMemberId($m_id)->t_id ?? null) == $lesson_data->t_id) { return '講師將無法購買自己的課程'; }

        // Check Buyer Has Input Cellphone And It Was Verified
        if (!Member::find($m_id)->cellphone) { return '請會員先在基本資料先輸入手機並進行驗證'; }
        else if (!Member::find($m_id)->cellphone_verify_status) { return '請會員先在基本資料進行手機驗證'; }

        // Get Last Shop Record Of Buyer At This Lesson
        $order_data  = Order::where('m_id', $m_id)->where('l_id', $l_id)->latest()->first();

        if ($order_data)
        {
            $checkout = $order_data->checkout_time;
            $refund   = $order_data->refund_time;
            $delete   = $order_data->delete_time;
            $expire   = $order_data->deadline;

            // Check Buyer Has Pay And He Hasn't Refund This Lesson
            if ($checkout && !$refund) { $has_pay = true; }
            else if (!$checkout && !$delete && !$refund) { $has_book = true; }

            // Check Buyer Once Buy Online Lesson And It Was Expired
            if ($has_pay && ($lesson_data->type == 'online') && $expire)
            {
                if (date('Y-m-d') > $expire) { $has_pay = false; }
                else if ($expire >= date('Y-m-d')) { $no_expired = true; }
            }
        }

        if ($lesson_data->cancel_lesson) { return '該課程已取消開班'; }
        else if ($no_expired) { return '該會員已經購買該課程<br>觀看期限：' . $expire; }
        else if ($has_pay) { return '該會員已經購買該課程'; }
        else if ($has_book) { return '該會員已經訂購該課程'; }
        else
        {
            $member = new Member();

            // Save Buyer Privode Receipt Detail
            $member->updateReceipt($receipt_mode, $receipt, $m_id);

            // Create Order Serial Number And Save Order Data
            $order_id = $this->createOrderId();
            $this->saveCashOrder($order_id, $m_id, $l_id, $price, $price > 0 ? $receipt_mode : 'free', $price > 0 ? 'CASH' : 'FREE');

            // Send Buy Lesson Success Notice For Buyer
            $data =
            [
                'account'     => Member::find($m_id)->nickname,
                'address'     => $lesson_data->location ?? $lesson_data->location . ($lesson_data->location_note ? ' (' . $lesson_data->location_note . ')' : ''),
                'lesson_name' => $lesson_data->l_name,
                'lesson_URL'  => 'https://www.ds-vep.com/lesson/' . $l_id,
                'o_id'        => $order_id,
                'time'        => Unit::getEntityLessonFirstUnitStartTime($l_id) ?? $lesson_data->start_time,
            ];

            $this->main->send_email($data, 'site.approval.pay_notice_mail', Member::find($m_id)->email, '【大俠學習平台】「' . $lesson_data->l_name . '」購買完成通知信',1);
            return 'success';
        }
    }

    public static function lessonBuyerOrderData($id)
    {
        // Get Paid Order Data
        return Order::getCheckoutQueue()->where('l_id', $id)->orderBy('checkout_time', 'DESC')->get();
    }

    public static function checkLessonBuyerBookingData($l_id, $m_id)
    {
        // Get Booking Data, not pay
        return Order::getBookingQueue()->where('l_id', $l_id)->where('m_id', $m_id)->first();
    }

    public static function checkLessonBuyerOrderData($l_id, $m_id)
    {
        // Get Paid Order Data
        return Order::getCheckoutQueue()->where('l_id', $l_id)->where('m_id', $m_id)->first();
        //return Order::getCheckoutQueue()->where('l_id', $l_id)->where('m_id', $m_id)->orderBy('checkout_time','ASC')->latest();
    }

    public function cencelOrder($id)
    {
        // Default Order Must Have Lesson ID
        $basic_order = Order::where('l_id', $id);

        // Get unpaid Order Data
        $non_realtime_cancel = Order::where('l_id', $id)
                                    ->whereNotNull('expire_time')
                                    ->whereNull('checkout_time')
                                    ->whereNull('delete_time')
                                    ->whereNull('refund_time')
                                    ->get();

        // Get Paid Order Data
        $non_realtime_refund = Order::getCheckoutQueue()->where('l_id', $id)->get();

        // If Lesson Was Canceled Will Send Cancel Lesson Notice Mail For Unpaid Buyer
        foreach ($non_realtime_cancel as $order)
        {
            if (!$order->cancel_email) { $this->sendCancelLessonNoticeMail($order, $id, 'delete'); }
        }

        // If Lesson Was Canceled Will Send Cancel Lesson Notice Mail For Paid Buyer
        foreach ($non_realtime_refund as $order)
        {
            if (!$order->cancel_email) { $this->sendCancelLessonNoticeMail($order, $id); }
        }

        // Get Teacher Of Member Data At This Lesson
        $teacher_data = Lesson::getTeacherMemberDataOfLesson($id);
        $email        = Member::find($teacher_data->m_id)->email;

        // Get Lesson Some Data
        $lesson_data  = Lesson::find($id);
        $l_start_time = Unit::getEntityLessonFirstUnitStartTime($id) ?? $lesson_data->start_time;

        // Init Mail Need Data
        $data =
        [
            'account'      => !$teacher_data->m_name ? $teacher_data->nickname : ($teacher_data->nickname . '(' . $teacher_data->m_name . ')'),
            'address'      => !$lesson_data->location ? null : ($lesson_data->location . (!$lesson_data->location_note ? '' : ('(' . $lesson_data->location_note . ')'))),
            'lesson_name'  => $lesson_data->l_name,
            'lesson_URL'   => 'https://www.ds-vep.com/lesson/' . $lesson_data->l_id,
            'l_start_time' => $l_start_time,
        ];
        $this->main->send_email($data, 'site.personal.lesson.classroom.mail.cancel_lesson_for_teacher', $email, '【大俠學習平台】取消開班通知信',1);

        $sms = new Sms();
        $sms->sendSMSLessonTeacherCancelNotify($id, Member::find($teacher_data->m_id)->cellphone);
    }

    public function cancelOwnOrderViaId($id)
    {
        // Get Order Data Via Order ID
        $order_data = Order::where('o_id', $id)->first();

        if ($order_data)
        {
            // Check Order Situation And Return Error Message
            if ((Member::user()->m_id ?? null) != $order_data->m_id) { return '無此訂單編號'; }
            else if ($order_data->checkout_time != '') { return '該筆訂單已繳費，無法取消'; }
            else if ($order_data->delete_time != '') { return '該筆訂單已被取消'; }
            else
            {
                // Update Order Delete Time
                Order::where('o_id', '=', $id)->update(['delete_time' => date('Y-m-d H:i:s')]);
                return 'success';
            }
        }
        else { return '無此訂單編號'; }
    }

    public function createOrderId()
    {
        // Get All Order Total Number
        $order_num          = Order::count();

        // Create Serial Number
        $now                = substr(date('YmdHi'), 2);
        $first_random_code  = str_pad(mt_rand(0, 99), 2, '0', STR_PAD_LEFT);
        $serial_number      = str_pad(501 + $order_num, 4, '0', STR_PAD_LEFT);
        $second_random_code = str_pad(mt_rand(0, 99), 2, '0', STR_PAD_LEFT);
        $order_id           = $now . $first_random_code . $serial_number . $second_random_code;
        return $order_id;
    }

    public function checkOrderCancel()
    {
        $time = date('Y-m-d H:i:s');

        // Get Unpaid Order Data ID
        $order_id = self::whereNull('checkout_time')->whereNull('failure_order')->whereNull('delete_time')->get()->pluck('o_id');

        foreach ($order_id as $id)
        {
            // Only 1 Item Data Can Handle
            if (self::where('o_id', $id)->count() === 1)
            {
                // Get Order Data
                $order            = new Order();
                $order_data       = $order::where('o_id', $id)->first();

                // Get Transaction Data Via Order ID
                $transaction_data = \MPG::search($id, $order_data->price);

                if ($transaction_data->Status == 'SUCCESS')
                {
                    // Get Some Transaction Data
                    $result  = $transaction_data->Result;
                    $amt     = $result->Amt ?? null;
                    $status  = $result->TradeStatus ?? null;
                    $auth    = $result->Auth ?? null;
                    $payment = $result->PaymentType ?? null;
                    $paytime = $result->PayTime ?? null;
                    $message = $result->RespondMsg ?? null;

                    // Check  Paytime Is Time
                    if ($paytime != '0000-00-00 00:00:00')
                    {
                        // Unexpected Data Will Be Delete
                        if (($payment == 'CREDIT' || $payment == 'UNIONPAY') && (!$amt || ($status == '2') || ($auth == '-') || ($message == '授權失敗') || ($message == '帳號不符')))
                        {
                            $order_data->delete_time = $time;
                        }
                        // Expected Data Will Be Checkout And Send New Buyer Mail For Teacher
                        else
                        {
                            $order_data->payment = $payment;
                            $order_data->checkout_time = $paytime;

                            $this->sendShopNoticeMailForTeacher($order_data);
                        }
                    }
                    else
                    {
                        // Check Order Payment
                        if (($payment == 'VACC') || ($payment == 'CVS'))
                        {
                            // Order Paymeny Is ATM Or Convenience Store Will Be Update Expire Time
                            if (!$order_data->expire_time) { $order_data->expire_time = $result->ExpireDate; }
                        }
                    }

                    $order_data->save();
                }
                elseif($transaction_data->Status=="TRA10037"||$transaction_data->Status=="TRA20002"||$transaction_data->Status=="TRA10071")     //||$transaction_data->Status=="TRA10021"
                {
                    $order_data->failure_order = $transaction_data->Status;
                    $order_data->save();
                }
            }
        }
    }

    public function checkOrderCancelAjax()
    {
        $time = date('Y-m-d H:i:s');

        // Get Unpaid Order Data ID
        $order_id = self::whereNull('checkout_time')->whereNull('failure_order')->whereNull('delete_time')->get()->pluck('o_id');

        foreach ($order_id as $id)
        {
            // Only 1 Item Data Can Handle
            if (self::where('o_id', $id)->count() === 1)
            {
                // Get Order Data
                $order            = new Order();
                $order_data       = $order::where('o_id', $id)->first();

                // Get Transaction Data Via Order ID
                $transaction_data = \MPG::search($id, $order_data->price);
echo "\r\n $id : transaction_data->Status=".$transaction_data->Status;
                if ($transaction_data->Status == 'SUCCESS')
                {
                    // Get Some Transaction Data
                    $result  = $transaction_data->Result;
                    $amt     = $result->Amt ?? null;
                    $status  = $result->TradeStatus ?? null;
                    $auth    = $result->Auth ?? null;
                    $payment = $result->PaymentType ?? null;
                    $paytime = $result->PayTime ?? null;
                    $message = $result->RespondMsg ?? null;

                    // Check  Paytime Is Time
                    if ($paytime != '0000-00-00 00:00:00')
                    {
                        // Unexpected Data Will Be Delete
                        if (($payment == 'CREDIT' || $payment == 'UNIONPAY') && (!$amt || ($status == '2') || ($auth == '-') || ($message == '授權失敗') || ($message == '帳號不符')))
                        {
                            $order_data->delete_time = $time;
                        }
                        // Expected Data Will Be Checkout And Send New Buyer Mail For Teacher
                        else
                        {
                            $order_data->payment = $payment;
                            $order_data->checkout_time = $paytime;
                        }
                    }
                    else
                    {
                        // Check Order Payment
                        if (($payment == 'VACC') || ($payment == 'CVS'))
                        {
                            // Order Paymeny Is ATM Or Convenience Store Will Be Update Expire Time
                            if (!$order_data->expire_time) { $order_data->expire_time = $result->ExpireDate; }
                        }
                    }

                    $order_data->save();
                }
                elseif($transaction_data->Status=="TRA10037"||$transaction_data->Status=="TRA20002"||$transaction_data->Status=="TRA10071")     //||$transaction_data->Status=="TRA10021"
                {
                    $order_data->failure_order = $transaction_data->Status;
                    $order_data->save();
                }
            }
        }
    }

    public function spgatewayNotify($transaction_data)
    {
        $time = date('Y-m-d H:i:s');

        if ($transaction_data->Status == 'SUCCESS')
        {
            // Get Some Transaction Data
            $result = json_decode($transaction_data->Result);

            $o_id   = $result->MerchantOrderNo;
            $amt    = $result->Amt;
            $payment = $result->PaymentType;
            $paytime = $result->PayTime;
            $message = $transaction_data->Message;

            // Get Order Data
            $order      = new Order();
            $order_data = $order::where('o_id', $o_id)->first();

            // Check  Paytime Is Time
            if ($paytime != '0000-00-00 00:00:00')
            {
                $order_data->payment = $payment;
                $order_data->checkout_time = $paytime;

                $this->sendShopNoticeMailForTeacher($order_data);
            }

            $order_data->save();
        }
    }

    public function spgatewayCustomer($transaction_data)
    {
        $time = date('Y-m-d H:i:s');

        if ($transaction_data->Status == 'SUCCESS')
        {
            // Get Some Transaction Data
            $result = json_decode($transaction_data->Result);

            $o_id   = $result->MerchantOrderNo;
            $amt    = $result->Amt;
            $payment = $result->PaymentType;
            $message = $transaction_data->Message;

            // Get Order Data
            $order      = new Order();
            $order_data = $order::where('o_id', $o_id)->first();

            // Check Order Payment
            if (($payment == 'VACC') || ($payment == 'CVS'))
            {
                $order_data->payment = $payment;
                
                // Order Paymeny Is ATM Or Convenience Store Will Be Update Expire Time
                if (!$order_data->expire_time) {
                    $order_data->expire_time = $result->ExpireDate." ".$result->ExpireTime;
                }
            }

            $order_data->save();
        }

        return $transaction_data->Status;
    }

    public function checkOrderExpire()
    {
        // Get Paymeny Is ATM Or Convenience Store And Unpaid Order Data
        $expire_data = Order::whereNull('checkout_time')->whereNotNull('delete_time')->whereNotNull('expire_time')->get();

        foreach ($expire_data as $data)
        {
            // Check Order Payment Period Situation, If Order Exceeds Deadline Will Cancel
            if (strtotime(date('Y-m-d')) > strtotime($data->expire_time))
            {
                $order     = new Order();
                $temp_data = $order::find($data->id);
                $temp_data->delete_time = $data->expire_time;
                $temp_data->save();
            }
        }
    }

    public function checkLessonIsFull($l_id)
    {
        // Get Lesson Number Of Members Enrolled, If Unlimit Will Get Null
        $max   = Lesson::find($l_id)->max_people ?? null;

        // Get Buyer Count
        $buyer = self::lessonBuyerOrderData($l_id)->count();
        return !$max ? false : $buyer >= $max;
    }

    public function checkMemberHasPaid($m_id, $l_id)
    {
        // Get Member Latest Order Data At That Lesson
        $pay_data = Order::where('m_id', $m_id)->where('l_id', $l_id)->latest()->first();

        if (!$pay_data) { return false; }
        else
        {
            // Check Member Has Refund Lesson
            if ($pay_data->checkout_time) { return is_null($pay_data->refund_time); }
            else { return false; }
        }
    }

    public function checkMemberHasPaidAjax($m_id, $l_id)
    {
        // Get Member Latest Order Data At That Lesson
        $pay_data = Order::where('m_id', $m_id)->where('l_id', $l_id)->latest()->first();

        if (!$pay_data) { return false; }
        else
        {
            // Check Member Has Refund Lesson
            if ($pay_data->checkout_time) { return is_null($pay_data->refund_time); }
            else { return false; }
        }
    }

    public function checkOrderHasLesson($id)
    {
        // Get Member Latest Order Data At That Lesson
        $order_data = Order::where('m_id', Member::user()->m_id ?? null)->where('l_id', $id)->latest()->first();

        if (!$order_data) { return false; }
        else
        {
            $cancel   = !is_null($order_data->delete_time);
            $refund   = !is_null($order_data->refund_time);
            $checked  = !is_null($order_data->checkout_time);

            if (!$cancel && !$refund && $checked) { return 'checkout'; }

            return !($cancel || $refund);
        }
    }

    public function checkOrderHasRestrict($m_id, $l_id)
    {
        // Get Member Latest Order Data At That Lesson
        $order_data = Order::where('m_id', $m_id)->where('l_id', $l_id)->latest()->first();

        // Get Some Data Of That Lesson
        $start_time = Lesson::find($l_id)->start_time;
        $type       = Lesson::find($l_id)->type;

        if (!$order_data) { return false; }
        else if ($type == 'entity') { return true; }
        else if (strtotime(date('Y-m-d')) < strtotime($start_time)) { return true; }
        else
        {
            $cancel  = !is_null($order_data->delete_time);
            $refund  = !is_null($order_data->refund_time);
            $checked = !is_null($order_data->checkout_time);

            if (!$cancel && !$refund && $checked) { return $order_data->restrict; }
            else { return false; }
        }
    }

    public static function checkOrderIsOverDeadline($m_id, $l_id)
    {
        // Get Member Latest Order Deadline At That Lesson
        if (($m_id > 0) && (Member::authority() != 4))
        {
            $deadline = Order::where('m_id', $m_id)->where('l_id', $l_id)->latest()->first()->deadline ?? null;
            return $deadline ? strtotime(Date('Y-m-d')) > strtotime($deadline) : false;
        }
        else { return false; }
    }

    public static function checkOrderIsOverDeadlineAjax($m_id, $role, $l_id)
    {
        // Get Member Latest Order Deadline At That Lesson
        if (($m_id > 0) && ($role != 4))
        {
            $deadline = Order::where('m_id', $m_id)->where('l_id', $l_id)->latest()->first()->deadline ?? null;
            return $deadline ? strtotime(Date('Y-m-d')) > strtotime($deadline) : false;
        }
        else { return false; }
    }

    public function checkReceipSend()
    {
        // Get Official Lesson ID
        $l_id = Lesson::getOpenLesson()->pluck('l_id');

        foreach ($l_id as $id)
        {
            $t_id = Lesson::find($id)->t_id;
            $give_invoice = Lesson::find($id)->give_invoice;        // The Dasha need to give the invoice or not ( 1: need, 0: Not need )

            if ($t_id != 37)
            {
                // Get Have No Opening Receipt And Order Price Isn't Free Order Serial Number
                $order = Order::getCheckoutQueue()
                              ->where('l_id', $id)
                              ->where('receipt', false)
                              ->where('price', '>', 0)
                              ->get()->pluck('id');

                foreach ($order as $o_id)
                {
                    // Init Order Data, Member Data Of The Buyer, Transaction Data Of That Order
                    $order_data       = Order::find($o_id);

                    if($give_invoice==1)
                    {
                        $member_data      = Member::find($order_data->m_id);
                        $transaction_data = \MPG::search($order_data->o_id, $order_data->price);
                        $receipt_mode     = $order_data->receipt_mode;
                        $is_company       = $receipt_mode === 'company_id';

                        // Check Receipt Mode And Decide Carrier Type
                        if ($receipt_mode == 'mobile_barcode') { $carrier_type = 0; }
                        else if ($receipt_mode == 'moica_barcode') { $carrier_type = 1; }
                        else if ($receipt_mode == 'receipt_elec') { $carrier_type = 2; }
                        else { $carrier_type = null; }

                        // If Carrier Type Is Electronic Receipt, Carrier Number Is Buyer Email
                        if (is_int($carrier_type))
                        {
                            if ($receipt_mode == 'receipt_elec') { $carrier_num = $member_data->email; }
                            else { $carrier_num = $member_data[$receipt_mode]; }
                        }
                        else { $carrier_num = null; }

                        // If Buyer Is Company Or Receipt Mode Is Love Code Will Have Flag
                        if ($is_company) { $print_flag = 'Y'; }
                        else
                        {
                            if (is_null($carrier_type) && ($receipt_mode != 'love_code')) { $print_flag = 'Y'; }
                            else { $print_flag = 'N'; }
                        }

                        // Calculation Item Pirce And Tax
                        $item_price = $receipt_mode == 'company_id' ? round($order_data->price / 1.05) : $order_data->price;

                        // Generate Receipt Need Data
                        $receipt = \Receipt::generate(
                            [
                                'TransNum'        => $transaction_data->Result->TradeNo ?? $order_data->o_id,
                                'MerchantOrderNo' => $order_data->o_id,
                                'Category'        => $is_company ? 'B2B' : 'B2C',
                                'BuyerName'       => $is_company ? $member_data->company_name ?? $member_data->nickname : $member_data->nickname,
                                'BuyerUBN'        => $is_company ? $member_data->company_id : null,
                                'BuyerEmail'      => $member_data->email,
                                'BuyerPhone'      => $member_data->cellphone,
                                'BuyerAddress'    => $is_company ? $member_data->address : '',
                                'CarrierType'     => $carrier_type,
                                'CarrierNum'      => trim($carrier_num),
                                'LoveCode'        => $receipt_mode === 'love_code' ? $member_data->love_code : null,
                                'PrintFlag'       => $print_flag,
                                'Amt'             => $item_price,
                                'TaxAmt'          => $order_data->price - $item_price,
                                'TotalAmt'        => $order_data->price,
                                'ItemName'        => array(Lesson::find($id)->l_name),
                                'ItemCount'       => array('1'),
                                'ItemUnit'        => array('門'),
                                'ItemPrice'       => array($item_price),
                                'ItemAmt'         => array($item_price),
                            ]);

                        // Send Receipt Data
                        $result = $receipt->send();

                        // Get Receipt Callback Data
                        if ($result->Status == 'SUCCESS')
                        {
                            // Save Receipt Number
                            $order_data->receipt = true;
                            $order_data->receipt_number = $result->Result->InvoiceNumber;
                            $order_data->receipt_rand_number = $result->Result->RandomNum;
                            $order_data->save();
                        }
                    }
                    else
                    {
                        // Save Receipt Number
                        $order_data->receipt = true;        // Clear the search next time.
                        $order_data->save();
                    }
                }
            }
        }
    }

    public function checkLessonHasRestrict($l_id)
    {
        // Get Lesson Type And Member ID Of The Buyer
        $lesson_type = Lesson::find($l_id)->type ?? null;
        $m_id        = Member::user()->m_id ?? null;

        // Check Login Situation
        if (!$m_id) { return '請先登入'; }
        else
        {
            // Check Buyer Has To Buy This Lesson
            $has_order = $this->checkOrderHasLesson($l_id);

            // Check Lesson Is Exist
            if (!$lesson_type) { return '無此課程'; }

            // Check Buyer Has To Checkout
            if ($has_order == 'checkout')
            {
                // Check Lesson Type, If Type Is Entity Will Not Restrict
                if ($lesson_type == 'entity') { return 'pass'; }
                else if ($lesson_type == 'online')
                {
                    // Check Lesson Is Open
                    if (strtotime(Lesson::find($l_id)->start_time) > strtotime(Date('Y-m-d'))) { return 'pass'; }

                    // Check Order Has To Restrict Of This Lesson
                    $restrict = $this->checkOrderHasRestrict($m_id, $l_id);

                    if ($restrict)
                    {
                        // Check Watch Lesson Deadline Situation
                        $deadline = Order::where('m_id', $m_id)->where('l_id', $l_id)->latest()->first()->deadline;

                        if (!$deadline) { return 'pass'; }
                        else
                        {
                            return strtotime(Date('Y-m-d')) > strtotime($deadline)
                                   ? array('status' => 'expired', 'deadline' => $deadline)
                                   : 'pass';
                        }
                    }
                    else { return 'request'; }
                }
            }
            else { return '尚未購買該課程'; }
        }
    }

    public function editOrderNote($id, $note)
    {
        // Save Worker's Or Admin's Order Note
        Order::where('id', $id)->update(['note' => $note,
                                         'note_member' => Member::user()->m_name,
                                         'note_time' => Date('Y-m-d H:i:s')]);
    }

    public function editOrderReceiptData($id, $receipt)
    {
        // Check Member authority Is Admin
        if (Member::authority() >= 4)
        {
            // Init Receipt Number Check Data
            $receipt_preg = '/[A-Z]{2}\d{8}/';
            $receipt      = strtoupper($receipt);
            $check        = preg_match($receipt_preg, $receipt);

            if ($check)
            {
                // If Receipt Format Is Right, Will Be Save
                $order_data = Order::find($id);
                $order_data->receipt_number = $receipt;
                $order_data->save();
            }

            return $check;
        }
        else { return 'no right'; }
    }

    public static function getTotal($income)
    {
        // Init Total
        $total = 0;

        // Accumulate Price
        foreach ($income as $value) { $total += $value; }

        return $total;
    }

    public function getLessonClassmate($l_id)
    {
        // Init Classmate Array
        $classmate_data = array();
        $classmate_id   = array();

        // Get Classmate Member ID Of That Lesson, If Member Repeat Purchase Lesson Will Get Only One Member ID
        $order_id = Order::getCheckoutQueue()->where('l_id', $l_id)->get()->pluck('m_id');

        // Get Classmate Member Data
        foreach ($order_id as $m_id)
        {
            if (array_search($m_id, $classmate_id) === false)
            {
                $classmate_id[]   = $m_id;
                $classmate_data[] = Member::find($m_id);
            }
        }

        return $classmate_data;
    }

    public function getMemberAllOrder()
    {
        // Get The Member's Order List, Sort Is New To Old
        $order_data = Order::where('m_id', Member::user()->m_id)->orderBy('created_at', 'DESC')->get();

        // Arrange Order Data And Append Extra Data
        $order_data = $this->getOrderDetail($order_data);
        return $order_data;
    }

    public function getLessonNeedDataFromOrder()
    {
        // Get The Member's Order List Not Refund, Sort Is New To Old
        $order_data = Order::getCheckoutQueue()
                           ->where('m_id', Member::user()->m_id)
                           ->select('o_id', 'orders.l_id', 'orders.m_id', 'orders.deadline as order_deadline', 'checkout_time',
                                    'type', 'end_fund', 'start_time', 'cancel_lesson', 'cover', 't_id', 'l_name', 'l_sub_name', 'lessons.deadline as lesson_deadline')
                           ->leftjoin('lessons', 'lessons.l_id', 'orders.l_id')
                           ->orderby('orders.created_at', 'DESC')
                           ->get();

        // Get Teacher Avatar And Lesson End Time
        foreach ($order_data as $key => $lesson)
        {
            $order_data[$key]->avg_img    = Lesson::getTeacherMemberDataOfLesson($lesson->l_id)->avg_img;
            $order_data[$key]->l_end_time = Unit::getEntityLessonLastUnitEndTime($lesson->l_id);
        }

        return $order_data;
    }

    public function getMemberOrderDataForApproval($order_data, $hash)
    {
        // Put Order Data Array
        $data    = array();

        // Generate Payment Basic Data
        $payment = [
                       'CREDIT'   => '信用卡',
                       'UNIONPAY' => '銀聯卡',
                       'VACC'     => 'ATM',
                       'CVS'      => '超商',
                       'FREE'     => '免費',
                       'CASH'     => '現金',
                   ];

        foreach ($order_data as $key => $value)
        {
            // Get Lesson Data And Buyer Data
            $lesson_data = Lesson::find($value->l_id);
            $buyer_data  = Member::find($value->m_id);
            $member_data = Lesson::getTeacherMemberDataOfLesson($value->l_id);

            // Check Restrict At The Order, If Order Is Unpaid Will Get Empty,
            // If Order Was Paid Will Check About Whether The Classrate Enters The Classroom
            if (!$value->checkout_time) { $restrict = ''; }
            else { $restrict = $value->restrict ? '否' : '是'; }

            // Generate The Required Data For Approval
            $data[$key]['id']            = $value->id;
            $data[$key]['o_id']          = $value->o_id;
            $data[$key]['l_name']        = $lesson_data->l_name;
            $data[$key]['t_name']        = $member_data->m_name ?? $member_data->nickname;
            $data[$key]['area']          = $lesson_data->location ? mb_substr($lesson_data->location, 0, 2) : '';
            $data[$key]['buyer']         = $buyer_data->nickname;
            $data[$key]['phone']         = $buyer_data->cellphone ?? '';
            $data[$key]['email']         = $buyer_data->email;
            $data[$key]['payment']       = $payment[$value->payment] ?? '尚未付款';
            $data[$key]['order']         = $value->order_time ?? '';
            $data[$key]['checkout']      = $value->checkout_time ?? '';
            $data[$key]['cancel']        = $value->delete_time ?? '';
            $data[$key]['refund']        = $value->refund_time ?? '';
            $data[$key]['price']         = $value->checkout_time ? $value->price : '尚未付款';
            $data[$key]['payee']         = $value->payee ?? '自行付款';
            $data[$key]['refund_price']  = $value->refund_price ?? '';
            $data[$key]['refund_payee']  = $value->refund_payee ?? '';
            $data[$key]['refund_reason'] = $value->refund_reason ?? '';
            $data[$key]['restrict']      = $restrict;
            $data[$key]['end_fund']      = $lesson_data->end_fund;
            $data[$key]['start_time']    = $lesson_data->start_time;
            $data[$key]['note']          = $value->note;
            $data[$key]['note_member']   = $value->note_member;
            $data[$key]['note_time']     = $value->note_time ;
            $data[$key]['has_receipt']   = $value->receipt;
            $data[$key]['receipt']       = $value->receipt_number ?? '';
            $data[$key]['receipt_abort'] = $value->receipt_abort;
            $data[$key]['bank_data']     = null;

            // If Enter Approval Is Admin, Will Get Member Bank Data
            if (Member::authority() >= 4)
            {
                $data[$key]['bank_data']['bank'] = $buyer_data->bank_number ?? '尚未填寫';
                $data[$key]['bank_data']['account'] = $buyer_data->account_number ?? '尚未填寫';
                $data[$key]['bank_data']['name'] = $buyer_data->account_name ?? '尚未填寫';
            }
        }

        // Make A String Used MD5, And This For Data ID
        if (count($data) > 0) { $data['hash'] = md5($hash); }

        return $data;
    }

    public function getRollcallMemberPossessLessonList($m_id)
    {
        $lesson_list = DB::table('orders')
                         ->select('orders.l_id', 'l_name', 'start_time', 'location')
                         ->leftjoin('lessons', 'lessons.l_id', 'orders.l_id')
                         ->where('lessons.type', 'entity')
                         ->where('m_id', $m_id)
                         ->whereNotNull('checkout_time')
                         ->whereNull('delete_time')
                         ->whereNull('refund_time')
                         ->get();

        foreach ($lesson_list as $lesson)
        {
            $teacher_data = Lesson::getTeacherMemberDataOfLesson($lesson->l_id);
            $lesson->m_name = $teacher_data->m_name;
            $lesson->nickname = $teacher_data->nickname;
        }

        return $lesson_list;
    }

    public function getOrderDetail($data)
    {
        $order_data = array();
        $order_num  = -1;
        $index_num  = 0;

        foreach ($data as $key => $value)
        {
            // Order Possible Has Two Lesson, So Need Generate Two-dimensional Array
            // Frist Row For Order Number, Second Row For Lesson Number
            if ($value->o_id != ($data[$key - 1]->o_id ?? null))
            {
                // Init Order Index
                $order_num              += 1;
                $index_num              = 0;
                $order_data[$order_num] = array();
            }
            else { $index_num += 1; }

            // Get Lesson Data
            $lesson_data = Lesson::find($value->l_id);

            // Put Order Data To New Array
            $order_data[$order_num][$index_num]           = $value;
            $order_data[$order_num][$index_num]['l_name'] = $lesson_data->l_name;
            $order_data[$order_num][$index_num]['cover']  = $lesson_data->cover;
            $order_data[$order_num][$index_num]['total']  = self::getTotal(Order::where('o_id', $value->o_id)->get()->pluck('price'));
        }

        return $order_data;
    }

    public function getPlatformIncomeData($t_id, $start_time, $end_time)
    {
        $order_data  = array();
        $lesson_data = Lesson::where('delete_lesson', false)->where('pub_situation', true);

        if ($t_id) { $lesson_data = $lesson_data->where('t_id', $t_id); }

        $lesson_data = $lesson_data->select('l_id', 'l_name', 'least_people', 'max_people', 'location',
                                            'origin_fee', 'offer_fee', 'current_fee', 'start_fund', 'end_fund',
                                            'start_time', 'topic', 'category', 'deadline', 'cancel_lesson', 't_id', 'type')
                                   ->get();

        foreach ($lesson_data as $key => $value)
        {
            $order_data[$key] = new \stdClass();
            $order_data[$key]->lesson_data = $value;
            $order_data[$key]->teacher_data = DB::table('teachers')
                                                ->leftjoin('members', 'members.m_id', 'teachers.m_id')
                                                ->where('teachers.t_id', $value->t_id)
                                                ->select('m_name', 'nickname')
                                                ->first();
            $order_data[$key]->click_data = Click::where('item', 'lesson')
                                                 ->where('number', $value->l_id)
                                                 ->where('created_at', '>=', $start_time)
                                                 ->where('created_at', '<=', $end_time)
                                                 ->get();
            $order_data[$key]->order_list = DB::table('orders')
                                              ->where('l_id', $value->l_id)
                                              ->where('orders.created_at', '>=', $start_time)
                                              ->where('orders.created_at', '<=', $end_time)
                                              ->leftjoin('members', 'members.m_id', 'orders.m_id')
                                              ->select('o_id', 'orders.m_id', 'price', 'refund_price', 'payment',
                                                      'order_time', 'delete_time', 'checkout_time', 'receipt', 'receipt_mode',
                                                      'receipt_number', 'receipt_rand_number', 'receipt_abort', 'expire_time', 'refund_time',
                                                      'cancel_email', 'payee', 'refund_payee', 'refund_reason', 'm_name',
                                                      'nickname')
                                              ->get();
            $order_data[$key]->lesson_data->l_start_time = Unit::getEntityLessonFirstUnitStartTime($value->l_id);
            $order_data[$key]->lesson_data->l_end_time = Unit::getEntityLessonLastUnitEndTime($value->l_id);
            $order_data[$key]->order_count = self::lessonBuyerOrderData($value->l_id)->count();
        }

        return($order_data);
    }

    public function searchOrderData($order_id)
    {
        // Use Order ID To Search Order Data
        $order_data = Order::where('o_id', $order_id)->get();

        // Get Approval Needed Order Data
        $data = $this->getMemberOrderDataForApproval($order_data, $order_id);
        return $data;
    }

    public function searchMemberPurchaseHistory($mode, $data)
    {
        // Use Member Provided Data To Search Member ID
        $m_id = Member::where($mode, $data)->first()->m_id ?? null;

        // Check Whether Member Exist
        if (!$m_id) { return 'no data'; }

        // Use Member ID To Search Order Data
        $order_data = Order::where('m_id', $m_id)->get();

        // Get Approval Needed Order Data
        $data = $this->getMemberOrderDataForApproval($order_data, $data);
        return $data;
    }

    public function abortReceipt($id)
    {
        // Check Member authority Is Admin
        if (Member::authority() >= 4)
        {
            $order_data = Order::find($id);

            // If Order Is Exist Will Abort Receipt
            if ($order_data)
            {
                $order_data->receipt_abort = true;
                $order_data->save();
                return true;
            }
            else { return false; }
        }
        else { return 'no right'; }
    }

    public function orderRefund($id, $price, $reason)
    {
        // Use Serial Number To Get Order Data
        $order_data = Order::where('id', $id)->first();

        // Check Order Situation
        if ($order_data->delete_time) { return '該課程已被取消'; }
        else if ($order_data->refund_time) { return '該課程已退費'; }
        else if ($price > $order_data->price) { return '輸入金額應小於付款金額'; }
        else
        {
            // If Have No Refund, Order Will Save Refund Data
            $order_data->refund_time = date('Y-m-d H:i:s');
            $order_data->refund_price = $price;
            $order_data->refund_reason = $reason;
            $order_data->refund_payee = Member::user()->nickname;
            $order_data->save();
            return 'success';
        }
    }

    public function restrictLessonUnableRefund($l_id)
    {
        // Get Lesson Type
        $type = Lesson::find($l_id)->type ?? null;

        // Check Type
        if (!$type) { return '無此課程'; }
        elseif ($type == 'entity') { return '該課程為實體課程'; }
        elseif ($type == 'online')
        {
            // Get Latest Order At This Lesson
            $order_data = Order::where('m_id', '=', Member::user()->m_id)->where('l_id', '=', $l_id)->latest()->first();

            if ($order_data == '') { return '尚未購買該課程'; }
            else
            {
                // If Lesson Is Restrict Will Go To Classroom
                if ($order_data->restrict)
                {
                    if (strtotime(Date('Y-m-d')) > strtotime($order_data->deadline)) { return "觀看期限已到，請重新購買\n觀看期限：" . $order_data->deadline; }
                    else { return 'success'; }
                }
                else
                {
                    // Save Lesson Deadline If Lesson Has A Deadline
                    $order_data->restrict = true;
                    $order_data->deadline = Lesson::find($l_id)->deadline == 999 ? null : Date('Y-m-d', strtotime('+' . Lesson::find($l_id)->deadline . ' months'));
                    $order_data->save();
                    return 'success';
                }
            }
        }
    }

    public function saveOrder($order_id, $l_id, $price, $mode, $coupon)
    {
        // Create A New Order And Save It
        $order = new $this;
        $order->o_id = $order_id;
        $order->m_id = Member::user()->m_id;
        $order->l_id = $l_id;
        $order->price = $price;
        $order->order_time = date('Y-m-d H:i:s');
        $order->receipt_mode = $mode;
        $order->receipt_abort = false;
        $order->cancel_email = false;
        $order->notice_mail = false;
        $order->restrict = false;
        $order->coupon = $coupon;

        $order->save();
    }

    public function saveCashOrder($order_id, $m_id, $l_id, $price = 0, $receipt_mode, $payment = 'FREE')
    {
        // Create A New Order And Save It, This Order Used Cash To Pay, But Default Is Free Lesson
        $order = new $this;
        $order->o_id = $order_id;
        $order->m_id = $m_id;
        $order->l_id = $l_id;
        $order->price = $price;
        $order->payment = $payment;
        $order->receipt = $price === 0;
        $order->order_time = date('Y-m-d H:i:s');
        $order->receipt_mode = $receipt_mode;
        $order->checkout_time = date('Y-m-d H:i:s');
        $order->receipt_abort = false;
        $order->cancel_email = false;
        $order->notice_mail = false;
        $order->payee = Member::user()->nickname;
        $order->restrict = false;
        $order->save();

        $order->sendShopNoticeMailForTeacher($order);
    }

    public function saveFreeOrder($order_id, $l_id, $phone = 'confirm')
    {
        // Check Whether Member Fill In Cellphone
        if ($phone != 'confirm')
        {
            // If Fill In Will Check Cellphone Is Number
            if (is_numeric($phone))
            {
                $member_data = Member::user();
                $member_data->cellphone = $phone;
                $member_data->save();
            }
            else { return '手機格式錯誤'; }
        }

        // Create A New Free Order And Save It
        $order = new $this;
        $order->o_id = $order_id;
        $order->m_id = Member::user()->m_id;
        $order->l_id = $l_id;
        $order->price = 0;
        $order->payment = 'FREE';
        $order->receipt = true;
        $order->order_time = date('Y-m-d H:i:s');
        $order->checkout_time = date('Y-m-d H:i:s');
        $order->receipt_mode = 'free';
        $order->receipt_abort = false;
        $order->cancel_email = false;
        $order->notice_mail = false;
        $order->restrict = false;
        $order->save();

        $order->sendShopNoticeMailForTeacher($order);
        return 'success';
    }

    public function sendCancelLessonNoticeMail($cancel_data, $l_id, $status = null)
    {
        // Get Member Data Of Buyer
        $account      = Member::find($cancel_data->m_id);
        $email        = $account->email;

        // Get Lesson Some Data
        $lesson_data  = Lesson::find($l_id);
        $l_start_time = Unit::getEntityLessonFirstUnitStartTime($l_id) ?? $lesson_data->start_time;

        // Get Teacher Of Member Data At This Lesson
        $teacher_data = Member::find(Teacher::find($lesson_data->t_id)->m_id);

        // Init Mail Need Data
        $data =
        [
            'account'      => $account->nickname,
            'address'      => !$lesson_data->location ? null : ($lesson_data->location . (!$lesson_data->location_note ? '' : ('(' . $lesson_data->location_note . ')'))),
            'lesson_name'  => $lesson_data->l_name,
            'lesson_URL'   => 'https://www.ds-vep.com/lesson/' . $l_id,
            'l_start_time' => $l_start_time,
            'profile_URL'  => 'https://www.ds-vep.com/profile/' . $account->account . '/detail',
            'teacher_name' => !$teacher_data->m_name ? $teacher_data->nickname : ($teacher_data->nickname . '(' . $teacher_data->m_name . ')'),
        ];
        $this->main->send_email($data, 'site.personal.lesson.classroom.mail.cancel_lesson', $email, '【大俠學習平台】取消開班通知信', 1);

        $sms = new Sms();

        // Send Notify Tomorrow Has Lesson SMS
        $sms->sendSMSLessonClassmateCancelNotify($l_id, Member::find($cancel_data->m_id)->cellphone);

        // Update Order Data
        $orders = new $this;
        $order_data = Order::find($cancel_data->id)->first();

        // Only Unpaid Order Need To Add Delete Time
        if ($status == 'delete') { $order_data->delete_time = date('Y-m-d H:i:s'); }

        $order_data->cancel_email = true;
        $order_data->save();
    }

    public function updateData($request)
    {
        // Save New Data For A Column
        self::where('id', '=', $request->id)->update([$request->column => $request->data]);
        return 'ok';
    }

    public function sendShopNoticeMailForTeacher($data)
    {
        // Get Lesson Data And Open Lesson Email
        $lesson_data = Lesson::find($data->l_id);
        $email       = Lesson::getTeacherMemberDataOfLesson($data->l_id)->email;

        // Init Mail Need Data
        $send_data   =
        [
            'address'     => $lesson_data->location ?? $lesson_data->location . (!is_null($lesson_data->location_note) ? ' (' . $lesson_data->location_note . ')' : ''),
            'buy_time'    => $data->checkout_time,
            'lesson_name' => $lesson_data->l_name,
            'lesson_URL'  => 'https://www.ds-vep.com/lesson/' . $data->l_id,
            'time'        => Unit::getEntityLessonFirstUnitStartTime($data->l_id) ?? $lesson_data->start_time,
        ];
        $this->main->send_email($send_data, 'site.email.shop_notice_email_for_teacher', $email, '【大俠學習平台】「' . $lesson_data->l_name . '」學員購買完成通知信', 1);
    }

    public function getLessonClassmateAjax($l_id)
    {
        // Init Classmate Array
        $classmate_data = array();
        $classmate_id   = array();
        $returns        = array();

        // Get Classmate Member ID Of That Lesson, If Member Repeat Purchase Lesson Will Get Only One Member ID
        $order_id = Order::getCheckoutQueue()->where('l_id', $l_id)->get()->pluck('m_id');

        // Get Classmate Member Data
        foreach ($order_id as $m_id)
        {
            if (array_search($m_id, $classmate_id) === false)
            {
                $classmate_id[]   = $m_id;
                $classmate_data[$m_id] = Member::find($m_id);
                $classmate_data[$m_id]['buy_times'] = 1;
            }
            else
            {
                $classmate_data[$m_id]['buy_times'] = $classmate_data[$m_id]['buy_times'] + 1;
            }
        }

        foreach ($classmate_data as $classmate_entry) {
            $returns[] = array(
                "m_id"      => $classmate_entry['m_id'],
                "m_name"    => $classmate_entry['m_name'],
                "nickname"  => $classmate_entry['nickname'],
                "cellphone" => $classmate_entry['cellphone'],
                "email"     => $classmate_entry['email'],
                "buy_times" => $classmate_entry['buy_times'],
            );
        }

        return $returns;
    }

    public function saveDeadlineByStartStudy($l_id, $m_id)
    {
        // Get Lesson Type
        $type = Lesson::find($l_id)->type ?? null;

        // Check Type
        if (!$type) { return 1; }                       // 無此課程
        elseif ($type == 'entity') { return 0; }        // 該課程為實體課程;
        elseif ($type == 'online')
        {            
            // Get Latest Order At This Lesson
            $order_data = Order::where('m_id', '=', $m_id)->where('l_id', '=', $l_id)->latest()->first();

            if ($order_data == '') { return 6; }        //'尚未購買該課程';
            else
            {
                if(Lesson::find($l_id)->start_time <= Date('Y-m-d'))
                {
                    // If Lesson Is Restrict Will Go To Classroom
                    if ($order_data->restrict == 0)
                    {
                        // Save Lesson Deadline If Lesson Has A Deadline
                        $order_data->restrict = 1;
                        $order_data->deadline = Lesson::find($l_id)->deadline == 999 ? null : Date('Y-m-d', strtotime('+' . Lesson::find($l_id)->deadline . ' months'));
                        $order_data->save();
                        return 0;
                    }
                    else                                    // restrict == 1
                    {
                        $deadline = $order_data->deadline;
                        $result = $deadline ? strtotime(Date('Y-m-d')) > strtotime($deadline) : false;

                        if ($result)
                        {
                            return 4;   // 期限已經超過
                        }
                        else
                        {
                            return 0;
                        }
                    }
                }
            }
        }
    }

    public static function getOrdersAjax($m_id)
    {
        $order_datas = Order::where('m_id', $m_id)->orderBy('id','DESC')->get();
        $new_datas = array();

        foreach ($order_datas as $key => $order_data)
        {
            $lesson_data = Lesson::find($order_data->l_id);
            $l_name = $lesson_data->l_name ?? null;
            $cover = $lesson_data->cover ?? null;

            $new_datas[$key]['id'] = $order_data->id;
            $new_datas[$key]['l_id'] = $order_data->l_id;
            $new_datas[$key]['l_name'] = $l_name;
            $new_datas[$key]['cover'] = $cover;
            $new_datas[$key]['o_id'] = $order_data->o_id;
            $new_datas[$key]['price'] = $order_data->price;
            $new_datas[$key]['payment'] = $order_data->payment;
            $new_datas[$key]['order_time'] = $order_data->order_time;
            $new_datas[$key]['checkout_time'] = $order_data->checkout_time;
            $new_datas[$key]['delete_time'] = $order_data->delete_time;
            $new_datas[$key]['expire_time'] = $order_data->expire_time;
        }

        return $new_datas;
    }

    public function cancelOwnOrderViaIdAjax($id, $m_id)
    {
        // Get Order Data Via Order ID
        $order_data = Order::where('id', $id)->first();

        if ($order_data)
        {
            // Check Order Situation And Return Error Message
            if (($m_id ?? null) != $order_data->m_id) { return 4; }      //'無此訂單編號';
            else if ($order_data->checkout_time != '') { return 4; }    //'該筆訂單已繳費，無法取消';
            else if ($order_data->delete_time != '') { return 4; }      //'該筆訂單已被取消';
            else
            {
                // Update Order Delete Time
                Order::where('id', '=', $id)->update(['delete_time' => date('Y-m-d H:i:s')]);
                return 0;   //'success';
            }
        }
        else { return 2; }      //'無此訂單編號';
    }

    public function saveFreeOrderAjax($order_id, $m_id, $l_id, $price = 0, $receipt_mode, $payment = 'FREE')
    {
        // Create A New Order And Save It, This Order Used Cash To Pay, But Default Is Free Lesson
        $order = new $this;
        $order->o_id = $order_id;
        $order->m_id = $m_id;
        $order->l_id = $l_id;
        $order->price = $price;
        $order->payment = $payment;
        $order->receipt = $price === 0;
        $order->order_time = date('Y-m-d H:i:s');
        $order->receipt_mode = $receipt_mode;
        $order->checkout_time = date('Y-m-d H:i:s');
        $order->receipt_abort = false;
        $order->cancel_email = false;
        $order->notice_mail = false;
        $order->payee = Member::find($m_id)->nickname;
        $order->restrict = false;
        $order->save();

        $order->sendShopNoticeMailForTeacher($order);

        return true;
    }

    public function cancelLessonExistedOrderAjax($l_id, $m_id)
    {
        // Get Unpaid Order Data ID
        $order_data = self::where('m_id', $m_id)->where('l_id', $l_id)->whereNull('checkout_time')->whereNull('delete_time')->first();

        if ($order_data)
        {
            // Update Order Delete Time
            Order::where('o_id', '=', $order_data->o_id)->update(['delete_time' => date('Y-m-d H:i:s')]);

            return 0;   //success
        }
        elseif (empty($order_data)) {   return 0; }     //ignore
        else { return 2; }
    }

}
