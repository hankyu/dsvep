<?php

namespace App\Http\Controllers;

use App\Lesson;
use App\Member;
use App\Order;
use App\Qa;
use App\Teacher;
use \Auth;
use Crypt;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Str;
use Input;
use View;

class AjaxController extends Controller
{
    public function add_event(Request $request)
    {
        $message = $this->event->add_event($request);
        return response()->json([
            'status' => $message
        ]);
    }

    public function addFavorite(Request $request)
    {
        $message = $this->favorite->addFavorite($request->l_id);
        return response()->json($message);
    }

    public function add_topic(Request $request)
    {
        $message = $this->topic->add_topic($request);
        return response()->json([
            'status' => $message
        ]);
    }

    public function addCashBuyer(Request $request)
    {
        $this->order->checkOrderCancel();
        $this->order->checkOrderExpire();
        $message = $this->order->addCashBuyer($request->info, $request->price, $request->l_id, $request->receipt_mode, $request->receipt);
        return response()->json($message, $message == 'success' ? 200 : 202);
    }

    public function add_click_data(Request $request)
    {
        $status = $this->click->add_click_button_record($request->item, $request->l_id);
        return response()->json([
            'status' => $status
        ]);
    }

    public function add_coupon(Request $request)
    {
        $member   = $request->member;
        $discount = $request->discount;
        $l_id     = $request->l_id;
        $endtime  = $request->end_time;

        if (($this->member->checkMemberIsExist($member)) || (strtolower($member) == 'all'))
        {
            if ($this->lesson->check_price_is_correct($discount, $l_id) == true)
            {
                if ($endtime > date('Y-m-d'))
                {
                    $this->coupon->saveNewCoupon($member, $discount, $l_id, $endtime);
                    $message = 'ok';
                }
                else { $message = 'expire error'; }
            }
            else { $message = 'price error'; }
        }
        else { $message = 'member error'; }

        return response()->json([
            'status' => $message
        ]);
    }

    public function addWishesData(Request $request)
    {
        $message = $this->wish->addWishesData($request);
        return response()->json($message, $message == 'success' ? 200 : 202);
    }

    public function audit_lesson(Request $request)
    {
        $member_account = $this->member->user()->account;
        $member_password = $this->member->user()->password;
        $l_id = $request->l_id;
        $audit_reason = $request->reason;
        $audit_result = $request->result;
        $password_check = $this->member->verifyAccount($member_account, $member_password, $request->password);
        if ($password_check == true) { $message = $this->lesson->update_lesson_data_after_audit($l_id, $audit_result, $audit_reason, $member_account); }
        else { $message = 'fail'; }
        return response()->json([
            'status' => $message
        ]);
    }

    public function audit_teacher(Request $request)
    {
        $member_account = $this->member->user()->account;
        $member_password = $this->member->user()->password;
        $m_id = $request->m_id;
        $audit_reason = $request->reason;
        $audit_result = $request->result;
        $password_check = $this->member->verifyAccount($member_account, $member_password, $request->password);
        if ($password_check == true) { $message = $this->teacher->update_teacher_data_after_audit($m_id, $audit_result, $audit_reason, $member_account); }
        else { $message = 'fail'; }
        return response()->json([
            'status' => $message
        ]);
    }

    public function become_teacher_check_rule()
    {
        $this->teacher->check_rule();
        return response()->json([
            'status' => 'success'
        ]);
    }

    public function become_teacher_refuel()
    {
        $this->teacher->refuel_become_teacher();
        return response()->json([
            'status' => 'success'
        ]);
    }

    public function cancelFavorite(Request $request)
    {
        $message = $this->favorite->cancelFavorite($request->l_id);
        return response()->json($message);
    }

    public function cancel_audit($id)
    {
        $message = $this->lesson->cancel_audit($id);
        return response()->json([
            'message' => $message
        ]);
    }

    public function cancelOwnOrderViaId(Request $request)
    {
        $status = $this->order->cancelOwnOrderViaId($request->id);
        return response()->json($status);
    }

    public function changeAuthority(Request $request)
    {
        $message = $this->member->changeAuthority($request->account, $request->authority);
        return response()->json($message[0], $message[1]);
    }

    public function changePassword(Request $request)
    {
        if (Auth::check())
        {
            if ($request->password == '') { $message = '請輸入原始密碼'; }
            else
            {
                if ($request->new_password == '') { $message = '請輸入新密碼'; }
                else
                {
                    $member_data = $this->member->user();
                    $check       = $this->member->verifyAccount($member_data->account, $member_data->password, $request->password);

                    if ($check)
                    {
                        if ((strlen($request->new_password) >= 8) && (strlen($request->new_password) <= 30))
                        {
                            $this->member->changePassword($request->new_password);
                            $message = '密碼更改成功';
                        }
                        else { $message = '密碼長度須介於 <span class="color-emphasized2">8 ~ 30</span> 字之間'; }
                    }
                    else { $message = '輸入的原始密碼錯誤'; }
                }
            }
        }
        else { $message = '請先登入'; }

        return response()->json($message);
    }

    public function changeTeacherPortfolios(Request $request)
    {
        $status_code = $this->teacher->changeTeacherPortfolios($request->portfolios);
        return response()->json($status_code);
    }

    public function checkCellphoneVerificationCode(Request $request)
    {
        $code    = $request->code;
        $message = $this->member->checkCellphoneVerificationCode($code);
        return response()->json($message);
    }

    public function accountExist(Request $request)
    {
        $account_repeat = $this->member->accountExist($request->checked_account);
        return response()->json([
            'status' => $account_repeat
        ]);
    }

    public function getOfferPrice(Request $request)
    {
        if (!$this->member->accountExist($request->buyer) && !$this->member->emailExist($request->buyer)) { $message = '無此使用者'; }
        else
        {
            $verify = $this->member->findAccount($request->buyer)->email_verify ?? $this->member->findEmail($request->buyer)->email_verify;

            if ($verify)
            {
                if (!is_null($request->coupon)) { $message = $this->coupon->checkCouponValid($request->coupon, $request->id, $request->buyer); }
                else { $message = 'valid'; }
            }
            else { $message = '會員信箱尚未驗證成功，請會員先驗證後繼續付款'; }

            if ($message == 'valid')
            {
                $message = $this->lesson->getRealPrice($request->id, $request->coupon);

                if (($message === 0) && ($request->receipt_mode != 'free')) { $message = '發票載具應選擇免費購買課程，請重新選擇'; }
                else if (($message !== 0) && ($request->receipt_mode == 'free')) { $message = '發票載具不應選擇免費購買課程，請重新選擇'; }
            }
        }

        return response()->json($message, is_int($message) ? 200 : 202);
    }

    public function loginAdmin(Request $request)
    {
        $member_data = $this->member->user();

        if (($member_data->authority == 'yoshocon') || ($member_data->authority == 'saigo'))
        {
            $message = $this->member->verifyAccount($member_data->account, $member_data->password, $request->password);

            if ($message) { session()->put('admin_auth', $member_data->account); }
        }
        else { $message = '權限不足'; }

        return response()->json($message);
    }

    public function checkLessonHasRestrict(Request $request)
    {
        $status = $this->order->checkLessonHasRestrict($request->id);
        return response()->json([
            'status'   => $status['status'] ?? $status,
            'name'     => $status == 'request' ? $this->lesson->find($request->id)->l_name ?? null : null,
            'deadline' => $status['deadline'] ?? null
        ]);
    }

    public function checkShopData(Request $request)
    {
        // Check Email Is Verify
        if (!$this->member->checkEmailVerify()) { $message = 'email'; }
        else
        {
            // Get Lesson ID Via Current URL
            $url = explode('/', url()->previous());
            $id  = end($url);

            // Check Cellphone Status
            if ($request->phone)
            {
                if (Str::is($request->phone, Auth::user()->cellphone))
                {
                    if (!$this->member->checkCellphoneVerify()) { $message = '請先驗證手機號碼'; }
                    else
                    {
                        $m_id  = Auth::user()->m_id;
                        $key   = ['address', 'company_name'];
                        $value = [$request->address, $request->company];
                        $this->member->updateProfileData($key, $value, $m_id);
                        $message = 'valid';
                    }
                }
            }
            else { $message = '請輸入手機號碼'; }

            if ($message == 'valid')
            {
                // Check Coupon Is Valid
                if ($request->coupon) { $message = $this->coupon->checkCouponValid($request->coupon, $id); }

                if ($message == 'valid') { $message = $this->lesson->getRealPrice($id, $request->coupon); }
            }
        }

        return response()->json($message, $message == 'email' ? 202 : 200);
    }

    public function copy_lesson(Request $request)
    {
        $data = $this->lesson->copy_lesson($request->l_id, $request->t_id);
        return response()->json([
            'status'  => 'ok',
            'new_id'  => $data['l_id'],
            'account' => $data['account']
        ]);
    }

    public function create_lesson(Request $request)
    {
        $teacher_data = $this->teacher->data() ?? $this->teacher->find($request->lesson_teacher);
        $l_id = $this->lesson->create_lesson($teacher_data->t_id, $request->lesson_name, $request->lesson_type, $request->lesson_teacher ?? null);
        return response()->json([
            'id' => $l_id
        ]);
    }

    public function delete_category(Request $request)
    {
        $this->topic->delete_category($request->topic, $request->category);
        return response()->json([
            'status' => 'ok'
        ]);
    }

    public function deleteCoupon(Request $request)
    {
        $status = $this->coupon->deleteCoupon($request->code);
        return response()->json([
            'status' => $status
        ]);
    }

    public function delete_event(Request $request)
    {
        $status = $this->event->delete_event($request);
        return response()->json([
            'status' => $status
        ]);
    }

    public function delete_lesson($id)
    {
        $message = $this->lesson->delete_lesson($id);
        return response()->json([
            'message' => $message
        ]);
    }

    public function delete_topic(Request $request)
    {
        $this->topic->delete_topic($request->topic);
        return response()->json([
            'status' => 'ok'
        ]);
    }

    public function directBuyFreeLesson(Request $request)
    {
        $this->click->add_click_button_record('direct', $request->l_id);
        $order_id    = $this->order->createOrderId();
        $status_code = 202;

        if (!$this->member->checkCellphoneVerify()) { $message = '手機尚未驗證，請先行驗證後再行購買'; }
        else if ($this->order->checkOrderHasLesson($request->l_id) == 'checkout') { $message = '該課程已購買'; }
        else if ($this->order->checkLessonIsFull($request->l_id) == true) { $message = '該課程已額滿'; }
        else { $message = $this->order->saveFreeOrder($order_id, $request->l_id, $request->phone); }

        if ($message == 'success') { $status_code = 200; }

        return response()->json($message, $message == 'fail' ? 400 : $status_code);
    }

    public function edit_category(Request $request)
    {
        $message = $this->topic->edit_category($request->topic, $request->old_category, $request->new_category);
        return response()->json([
            'status' => $message
        ]);
    }

    public function editOrderNote(Request $request)
    {
        $this->order->editOrderNote($request->id, $request->note);
        return response()->json('success');
    }

    public function editOrderReceiptData(Request $request)
    {
        $status = $this->order->editOrderReceiptData($request->id, $request->receipt);
        return response()->json($status);
    }

    public function edit_profile_bank(Request $request)
    {
        $status = $this->member->saveBankData($request);
        return response()->json([
            'status' => $status
        ]);
    }

    public function edit_topic(Request $request)
    {
        $message = $this->topic->edit_topic($request->old_topic, $request->new_topic);
        return response()->json([
            'status' => $message
        ]);
    }

    public function expire_search()
    {
        $approval_list = $this->lesson->get_expire_lesson();
        return $this->main->return_data(['approval_list' => $approval_list]);
    }

    public function get_all_lesson_data()
    {
        if ($this->member->isMasterAdmin()) { $lesson_list = $this->lesson->all(); }

        return response()->json([
            'lesson_list' => $lesson_list ?? null
        ]);
    }

    public function getAllOrderData()
    {
        if ($this->member->isMasterAdmin() || $this->member->isBasicAdmin()) { $order_list = $this->order->all(); }

        return response()->json($order_list ?? null);
    }

    public function get_all_pub_teacher_data()
    {
        $teacher_data = $this->teacher->getPublicTeacherData();
        $member_data  = $this->member->all();
        $teacher_data = $this->teacher->mix_teacher_and_member_data($teacher_data, $member_data);
        return response()->json([
            'status'       => 'ok',
            'teacher_data' => $teacher_data
        ]);
    }

    public function get_approval_list()
    {
        if ($this->member->isMasterAdmin() || $this->member->isBasicAdmin() || $this->member->isWorker())
        {
            $approval_data = $this->lesson->get_approval_list();
            return response()->json([
                'approval_list' => $approval_data
            ]);
        }
        else { \App::abort(404); }
    }

    public function get_audit_teacher_list()
    {
        if ($this->member->isMasterAdmin() || $this->member->isBasicAdmin())
        {
            $audit_teacher_data = $this->teacher->get_review_teacher_data();
            $audit_member_data = $this->member->all();
            return response()->json([
                'teacher_list' => $audit_teacher_data,
                'member_list'  => $audit_member_data
            ]);
        }
        else { \App::abort(404); }
    }

    public function get_audit_lesson_list()
    {
        if ($this->member->isMasterAdmin() || $this->member->isBasicAdmin())
        {
            $audit_lesson_data          = $this->lesson->get_audit_lesson_data();
            $audit_teacher_t_id_data    = $this->teacher->get_all_teacher_singal_data('t_id');
            $audit_teacher_m_id_data    = $this->teacher->get_all_teacher_singal_data('m_id');
            $audit_member_m_id_data     = $this->member->all()->pluck('m_id');
            $audit_member_nickname_data = $this->member->all()->pluck('nickname');
            return response()->json([
                'lesson_list'           => $audit_lesson_data,
                'member_m_id_list'      => $audit_member_m_id_data,
                'member_nickname_list'  => $audit_member_nickname_data,
                'teacher_m_id_list'     => $audit_teacher_m_id_data,
                'teacher_t_id_list'     => $audit_teacher_t_id_data
            ]);
        }
        else { \App::abort(404); }
    }

    public function get_browse_analyze()
    {
        if ($this->member->isMasterAdmin() || $this->member->isBasicAdmin())
        {
            $browse_data = $this->browse->get_all_browse_analyze_data();
            return response()->json([
                'browse_list' => $browse_data
            ]);
        }
        else { \App::abort(404); }
    }

    public function get_browse_list()
    {
        if ($this->member->isMasterAdmin() || $this->member->isBasicAdmin())
        {
            $browse_data = $this->browse->get_all_browse_data();
            return response()->json([
                'browse_list' => $browse_data
            ]);
        }
        else { \App::abort(404); }
    }

    public function get_click_list()
    {
        if ($this->member->isMasterAdmin() || $this->member->isBasicAdmin())
        {
            $click_data = $this->click->get_all_click_data();
            return response()->json([
                'click_list' => $click_data
            ]);
        }
        else { \App::abort(404); }
    }

    public function get_click_analyze()
    {
        if ($this->member->isMasterAdmin() || $this->member->isBasicAdmin())
        {
            $click_data = $this->click->get_all_click_analyze_data();
            return response()->json([
                'click_list' => $click_data
            ]);
        }
        else { \App::abort(404); }
    }

    public function get_event_list()
    {
        $event_data = $this->event->get_event_data();
        return response()->json([
            'event_list' => $event_data
        ]);
    }

    public function getFavoriteLessonData()
    {
        $data = $this->lesson->getFavoriteLessonData();
        return response()->json($data);
    }

    public function getTeacherLesson(Request $request)
    {
        $data = $this->lesson->getTeacherLesson($request->type, $request->sort, $request->params);
        return response()->json([
            'data' => $data
        ]);
    }

    public function getTeacherPortfolios(Request $request)
    {
        $data = $this->teacher->getTeacherPortfolios($request->t_id);
        return response()->json([
            'data' => $data
        ]);
    }

    public function get_topic_data()
    {
        $topic_data = $this->topic->get_topic_data();
        return response()->json([
            'topic_data' => $topic_data
        ]);
    }

    public function get_topic_list()
    {
        $topic_list = $this->topic->get_topic_list();
        return response()->json([
            'topic_list' => $topic_list
        ]);
    }

    public function get_member_list()
    {
        if ($this->member->isMasterAdmin() || $this->member->isBasicAdmin())
        {
            $member_data = $this->member->all();
            return response()->json([
                'member_list' => $member_data
            ]);
        }
        else { \App::abort(404); }
    }

    public function get_member_data_session()
    {
        return response()->json([
            'member_data_session' => $this->member->user()
        ]);
    }

    public function get_lesson_filter_data(Request $request)
    {
        $data = $this->lesson->get_lesson_filter_data($request->data, $request->time_range, $request->params, $request->all_area);
        return response()->json([
            'data' => $data
        ]);
    }

    public function get_lesson_list()
    {
        if ($this->member->isMasterAdmin() || $this->member->isBasicAdmin())
        {
            $member_data = $this->member->all();
            return response()->json([
                'member_list' => $member_data
            ]);
        }
        else { \App::abort(404); }
    }

    public function getPlatformIncomeData(Request $request)
    {
        $t_id        = $request->t_id ?? null;
        $start_time  = $request->start_time ?? null;
        $end_time    = $request->end_time ?? null;

        if ($start_time && $end_time)
        {
            $income_data = $this->order->getPlatformIncomeData($t_id, $start_time, $end_time);
            return $income_data;
        }
        else { return '[]'; }
    }

    public function initIndexData()
    {
       return $this->lesson->getIndexLessonData();
    }

    public function searchMemberPurchaseHistory(Request $request)
    {
        $order_data = $this->order->searchMemberPurchaseHistory($request->search_mode, $request->search_data);
        return response()->json([
            'order_data' => $order_data
        ]);
    }

    public function modify_teacher_detail($t_id, $item, Request $request)
    {
        $this->teacher->modify_teacher_detail($t_id, $item, nl2br($request->intro), $request->link);
        return response()->json([
            'status' => 'success'
        ]);
    }

    public function searchOrderData(Request $request)
    {
        $order_data = $this->order->searchOrderData($request->order_id);
        $data       = ['order_data' => $order_data];
        return $this->main->return_data($data);
    }

    public function abortReceipt(Request $request)
    {
        $status = $this->order->abortReceipt($request->id);
        return response()->json($status);
    }

    public function get_all_teacher_name(Request $request)
    {
        $data = $this->teacher->get_all_teacher_name(
                $request->start_num,
                $request->max_num,
                $request->init,
                $request->exclude
        );
        return response()->json([
            'data' => $data
        ]);
    }

    public function get_all_teacher_popular(Request $request)
    {
        $data = $this->teacher->get_all_teacher_popular(
                $request->start_num,
                $request->max_num,
                $request->init
        );
        return response()->json([
            'data' => $data
        ]);
    }

    public function getAllWishData()
    {
        return $this->member->authority(Auth::user()->authority) >= 4 ? response()->json($this->wish->getWishData()) : null;
    }

    public function getOwnWishData()
    {
        return response()->json($this->wish->getWishData($this->member->user()->m_id));
    }

    public function getLessonShopResponse()
    {
        $url     = explode('/', url()->previous());
        $l_id    = array_pop($url);
        $area    = array_pop($url);
        $area    = $area == 'lesson' ? 'shop' : 'classroom';
        $qa_data = $this->qa->getLessonResponse($l_id, $area);
        return response()->json($qa_data);
    }

    public function getWishImage(Request $request)
    {
        return response()->json($this->wish->getWishImage($request->album));
    }

    public function getRollcallNeedTeacherList()
    {
        $teacher_list = $this->teacher->getRollcallNeedTeacherList();
        return response()->json($teacher_list);
    }

    public function getRollcallTeacherLessonList(Request $request)
    {
        $teacher_list = $this->lesson->getRollcallTeacherLessonList($request->t_id);
        return response()->json($teacher_list);
    }

    public function getRollcallMemberPossessLessonList(Request $request)
    {
        $lesson_list = $this->order->getRollcallMemberPossessLessonList($request->m_id);
        return response()->json($lesson_list);
    }

    public function getRollcallList(Request $request)
    {
        $l_id = $request->l_id;
        $m_id = $request->m_id ?? null;
        $rollcall_data = $this->rollcall->getRollcallList($l_id, $m_id);
        return $rollcall_data;
    }

    public function getRollcallQRCode(Request $request)
    {
        $l_id = $request->l_id ?? null;
        $u_id = $request->u_id ?? null;

        if (!($l_id && $u_id)) { return 'error'; }
        else
        {
            return response()->json($this->rollcall->getRollcallQRCode($l_id, $u_id));
        }
    }

    public function sendRollcallData(Request $request)
    {
        $rollcall_data = $request->rollcall_data;

        if (empty($rollcall_data)) { return '無傳入任何點名資料'; }

        $status = $this->rollcall->sendRollcallData($rollcall_data);
        return response()->json($status);
    }

    public function getLessonClassmate(Request $request)
    {
        $l_id      = $request->l_id ?? null;

        if (!$l_id) { return \App::abort(404); }

        $classmate = $this->order->getLessonClassmate($l_id);
        return response()->json($classmate);
    }

    public function orderRefund(Request $request)
    {
        $status = $this->order->orderRefund($request->id, $request->price, $request->reason);
        return response()->json($status);
    }

    public function resendEmail(Request $request)
    {
        $repeat = $this->member->verifyRepeat('email', $request->new_email);

        if (!is_bool($repeat)) { $message = 'email repeat'; }
        else
        {
            $this->member->updateEmail($request->new_email);
            $this->member->sendVerifyEmail($this->member->user()->m_id, $this->member->user()->nickname, $request->new_email);
            $message = 'ok';
        }

        return response()->json($message);
    }

    public function restrictLessonUnableRefund(Request $request)
    {
        $status = $this->order->restrictLessonUnableRefund($request->l_id);
        return response()->json($status);
    }

    public function searchPassword(Request $request)
    {
        $member_data = $this->member->findAccount($request->account);
        $status_code = 202;

        if (is_null($member_data)) { $message = '帳號或信箱錯誤'; }
        else if ($member_data->reg_method != 'web') { $message = '忘記密碼僅供平台註冊所使用'; }
        else if (!$this->member->checkEmailOwner($request->account, $request->email)) { $message = '帳號或信箱錯誤'; }
        else
        {
            $password = substr(md5(uniqid(date('Y-m-d'))), 0, 8);
            $this->member->changePassword($password, $request->account);
            $data =
            [
                'password' => $password,
                'account'  => $request->account,
                'domain'   => $_SERVER['HTTP_HOST']
            ];

            $this->main->send_email($data, 'site.layout.forgot_password', $request->email, '【大俠學習平台】新密碼通知信', 1);
            $message = '新密碼已寄至 <span class="color-emphasized2">' . $request->email . '</span> 信箱';
            $status_code = 200;
        }

        return response()->json($message, $status_code);
    }

    public function search(Request $request)
    {
        $this->search->create_search_data($request->search_keyword);
        $lesson_data         = $this->lesson->get_lesson_by_keyword($request->search_keyword);
        $lesson_teacher_data = $this->teacher->getPublicTeacherData();

        return response()->json([
            'lesson_data'         => $lesson_data,
            'lesson_teacher_data' => $lesson_teacher_data,
        ]);
    }

    public function send_contact_mail(Request $request)
    {

        $to = ['hankyu1012@gmail.com', 'momo.dinlin0000@gmail.com', 'textds01@gmail.com', 'eason.yea@gmail.com'];
        $path = 'site.layout.contact';

        $data =
        [
            'content'           => $request->contact_content,
            'contact_name'      => $request->contact_name,
            'contact_email'     => $request->contact_email,
            'contact_cellphone' => $request->contact_cellphone
        ];

        for ($i = 0; $i < count($to); $i++)
        {
            $this->main->send_email($data, $path, $to[$i], '平台使用問題 - ' . $request->subject);
        }

        return response()->json([
            'success' => 'ok'
        ]);
    }

    public function sendEditResponse(Request $request)
    {
        $status = $this->qa->sendEditResponse($request->token, $request->t_token, $request->area, $request->text);
        return response()->json($status);
    }

    public function sendNewResponse(Request $request)
    {
        // Get QA Data
        $token = $request->token;
        $m_id  = $this->member->user()->m_id;
        $url   = explode('/', url()->previous());
        $l_id  = end($url);

        // Generate Token
        if (!$token) { $token = strtoupper(substr(md5(microtime()), 0, 8)); }

        $md5     = strtoupper(substr(md5(microtime()), 0, 8));
        $t_token = substr($md5, 0, 4) . $m_id . $l_id . substr($md5, 4, 8);

        // Save New Response
        $this->qa->saveNewResponse($m_id, $l_id, $request->area, $token, $t_token, $request->text);

        return response()->json('success');
    }

    public function sendCellphoneVerificationCode(Request $request)
    {
        // Get Current Member Data
        $m_id          = Auth::user()->m_id;
        $old_cellphone = Auth::user()->cellphone;

        // Get Member Want To Verify Cellphone
        $new_cellphone = $request->cellphone;

        // Check Cellphone Is Same SQL, If Not Will Be Save
        if ($old_cellphone != $new_cellphone)
        {
            $message = $this->member->updateProfileData(['cellphone'], [$new_cellphone], $m_id);

            if ($message) { return $message; }
        }

        // Send Cellphone Code
        $message = $this->member->sendCellphoneVerificationCode($new_cellphone);
        return response()->json($message);
    }

    public function update_sql_lesson(Request $request)
    {
        $status = $this->lesson->updateData($request);
        return response()->json($status);
    }

    public function update_sql_member(Request $request)
    {
        $status = $this->member->updateData($request);
        return response()->json($status);
    }

    public function update_sql_order(Request $request)
    {
        $status = $this->order->updateData($request);
        return response()->json($status);
    }

    public function getMemberData(Request $request)
    {
        if (Auth::check())
        {
            $m_id = $request->m_id;
            $key  = $request->key;

            if (!$m_id || !$key) { return 'error'; }
            else { return $this->member->getMemberData($m_id, $key); }
        }
        else { return []; }
    }

    public function memberCheckloginAjax(Request $request)
    {
        $m_id = $request->m_id;
        $remember_token = $request->remember_token;

        $result = $this->member->checkloginAjax($m_id, $remember_token);

        $return = array();
        $return['status'] = $result['status'];

        if(empty($result['data'])) {
            $return['data'] = array();
        }
        else {
            $return['data'] = array(
                'm_id' => $result['data']['m_id'],
                'account' => $result['data']['account'],
                'm_name' => $result['data']['m_name'],
                'nickname' => $result['data']['nickname'],
                'sex' => $result['data']['sex'],
                'avg_img' => $result['data']['avg_img'],
                'email' => $result['data']['email'],
                'reg_method'=> $result['data']['reg_method'],
                't_id' => $result['data']['t_id'],
                'role' => $result['data']['role'],
                'remember_token' => $result['data']['remember_token'],
                'cellphone' => $result['data']['cellphone'],
                'cellphone_verify_status' => $result['data']['cellphone_verify_status'],
                'email_verify' => $result['data']['email_verify']
            );
        }

        if ($return) { return response()->json($return); }
        else
        {
            $previous_url = explode('/', url()->previous());
            $route        = end($previous_url);
            $path         = (count($previous_url) == 4) && ($route == 'login') ? '/login' : '';

            if ($path == '/login')
            {
                $url = session()->get('previous_url', '/');
                session()->pull('previous_url');
                return response()->json(['url' => $url]);
            }
            else { return response()->json($result); }
        }
    }

    public function memberLoginAjax(Request $request)
    {
        $mode       = $request->mode;
        $account    = $request->account;
        $password   = $request->password;

        $result = $this->member->loginAjax($account, $password, $mode);

        $return = array();
        $return['status'] = $result['status'];

        if(empty($result['data'])) {
            $return['data'] = array();
        }
        else {
            $return['data'] = array(
                'm_id'      => $result['data']['m_id'],
                'account'   => $result['data']['account'],
                'm_name'    => $result['data']['m_name'],
                'nickname'  => $result['data']['nickname'],
                'avg_img'   => $result['data']['avg_img'],
                'email'     => $result['data']['email'],
                'reg_method'=> $result['data']['reg_method'],
                't_id'      => $result['data']['t_id'],
                'role'      => $result['data']['role'],
                'remember_token' => $result['data']['remember_token'],
                'cellphone' => $result['data']['cellphone'],
                'cellphone_verify_status' => $result['data']['cellphone_verify_status'],
                'email_verify'  => $result['data']['email_verify']
            );
        }

        if ($return) { return response()->json($return); }
        else
        {
            $previous_url = explode('/', url()->previous());
            $route        = end($previous_url);
            $path         = (count($previous_url) == 4) && ($route == 'login') ? '/login' : '';

            if ($path == '/login')
            {
                $url = session()->get('previous_url', '/');
                session()->pull('previous_url');
                return response()->json(['url' => $url]);
            }
            else { return response()->json($result); }
        }
    }

    public function memberSignupAjax(Request $request)
    {
        // Get Parameter
        $account   = $request->account;
        $password  = $request->password;
        $nickname  = $request->name;
        $email     = $request->email;
        $cellphone = $request->phone;

        // Register A Platform Account
        $status = $this->member->signupAjax($account, $password, $nickname, $email, $cellphone);

        $return['status'] = $status;
        $return['data'] = null;

        return response()->json($return);
    }

    public function memberGetPlainPasswordAjax(Request $request)
    {
        // Get Parameter
        $account   = $request->account;
        $email     = $request->email;
        $cellphone = $request->cellphone;

        if($account!='' && $email!='')
        {
            $member_data = $this->member->findAccountAndEmail($account, $email);

            if($member_data->reg_method == 'google')
            {
                $return['status'] = 4;
                $return['data'] = null;

                return response()->json($return);       /* 4: 此會員為 google 登入，無法取得密碼 */
            }

            if(!$member_data) {
                $return['status'] = 1;
                $return['data'] = null;

                return response()->json($return);   /* 無此帳號 */
            }
            elseif($member_data->email_verify!=1) {
                $return['status'] = 3;
                $return['data'] = null;

                return response()->json($return);   /* email未驗證 */
            }
        }
        elseif($cellphone!='' && $email!='')
        {
            $member_data = $this->member->findMobileAndEmail($cellphone, $email);

            if($member_data->reg_method == 'google')
            {
                $return['status'] = 4;
                $return['data'] = null;

                return response()->json($return);       /* 4: 此會員為 google 登入，無法取得密碼 */
            }

            if(!$member_data) {
                $return['status'] = 1;
                $return['data'] = null;

                return response()->json($return);   /* 無此帳號 */
            }
            elseif($member_data->email_verify!=1) {
                $return['status'] = 3;
                $return['data'] = null;

                return response()->json($return);   /* email未驗證 */
            }
            elseif($member_data->cellphone_verify_status!=1) {
                $return['status'] = 2;
                $return['data'] = null;

                return response()->json($return);   /* 手機未驗證 */
            }
        }

        $password = substr(md5(uniqid(date('Y-m-d'))), 0, 8);
        $this->member->changePassword($password, $member_data->account);
        $data =
            [
                'password' => $password,
                'account'  => $member_data->account,
                'domain'   => $_SERVER['HTTP_HOST']
            ];

        $this->main->send_email($data, 'site.layout.forgot_password', $request->email, '【大俠學習平台】新密碼通知信', 1);
        $return['status'] = 0;
        $return['data'] = null;

        return response()->json($return);   /* 成功 */
    }

    public function memberLogoutAjax(Request $request)
    {
        if (Auth::check()) {
            if($request->m_id == Auth::user()->m_id) {
                $this->member->logout();
                $return['status'] = 0;
                $return['data'] = null;

                return response()->json($return);   /* 成功 */
            }
        }

        $return['status'] = 1;
        $return['data'] = null;

        return response()->json($return);   /* 會員身份有異 */
    }

    public function memberUploadAvatar(Request $request)
    {
        // Get Request Parameter
        $m_id           = $request->m_id ?? false;
        $remember_token = $request->remember_token ?? false;
        $file           = $request->file ?? false;

        if($m_id && $remember_token)
        {
            $member_data = $this->member->checkMemberExsit($m_id, $remember_token);

            if(empty($member_data))
            {
                $status = 1;
                $return['status'] = $status;
                $return['data'] = false;

                return response()->json($return);   /* 會員身份有異 */
            }
        }
        else
        {
            $status = 1;
            $return['status'] = $status;
            $return['data'] = false;

            return response()->json($return);   /* 會員身份有異 */
        }

        if ($file)
        {
            $avatar = file_get_contents($file);
            $result = $this->member->saveAvatarFileAjax($request, $member_data->account . '_ava.jpeg', $avatar, $m_id);

            $return['status'] = $result['status'];
            $return['data'] = $result['data'];

            return response()->json($return);   /* 成功 */
        }
    }

    public function memberUpdateDataForTeacher(Request $request)
    {
        // Get Request Parameter
        $m_id           = $request->m_id ?? false;
        $remember_token = $request->remember_token ?? false;
        $m_name         = $request->m_name ?? false;
        $sex           = $request->sex ?? false;

        if($m_id && $remember_token)
        {
            $member_data = $this->member->checkMemberExsit($m_id, $remember_token);

            if(empty($member_data))
            {
                $status = 1;
                $return['status'] = $status;
                $return['data'] = false;

                return response()->json($return);   /* 會員身份有異 */
            }
        }
        else
        {
            $status = 1;
            $return['status'] = $status;
            $return['data'] = false;

            return response()->json($return);   /* 會員身份有異 */
        }

        if(!$m_name || !$sex)
        {
            $status = 2;
            $return['status'] = $status;
            $return['data'] = false;

            return response()->json($return);   /* 缺少必填資料 m_name, sex */
        }
        else
        {
            $status = $this->member->updateDataForTeacher($m_id, $m_name, $sex);
            $return['status'] = $status;
            $return['data'] = false;

            return response()->json($return);   /* 成功 */
        }
    }

    public function memberGetMemberDetail(Request $request)
    {
        // Get Request Parameter
        $m_id = $request->m_id ?? false;
        $remember_token = $request->remember_token ?? false;

        if($m_id && $remember_token)
        {
            $member_data = $this->member->checkMemberExsit($m_id, $remember_token);

            if(empty($member_data))
            {
                $status = 1;
                $return['status'] = $status;
                $return['data'] = false;

                return response()->json($return);   /* 會員身份有異 */
            }
            else
            {
                if($member_data['id_code']!='') {
                    $member_data['id_code'] = $this->main->decrypt($member_data['id_code']);
                }

                unset($member_data['mobile_barcode']);
                unset($member_data['moica_barcode']);
                unset($member_data['love_code']);
                unset($member_data['cellphone_verify_code']);
                unset($member_data['cellphone_verify_expire']);
                unset($member_data['cellphone_verify_count']);
                unset($member_data['remember_token']);
                unset($member_data['updated_at']);
                unset($member_data['created_at']);

                $return['status'] = 0;
                $return['data'] = $member_data;

                return response()->json($return);   /* 會員身份有異 */
            }
        }
        else
        {
            $status = 1;
            $return['status'] = $status;
            $return['data'] = false;

            return response()->json($return);   /* 會員身份有異 */
        }
    }

    public function memberSendEmailVerification(Request $request)
    {
        // Get Request Parameter
        $m_id = $request->m_id ?? false;
        $remember_token = $request->remember_token ?? false;
        $email = $request->email ?? false;

        if($m_id && $remember_token)
        {
            $member_data = $this->member->checkMemberExsit($m_id, $remember_token);

            if(empty($member_data))
            {
                $status = 1;
                $return['status'] = $status;
                $return['data'] = false;

                return response()->json($return);   /* 會員身份有異 */
            }
        }
        else
        {
            $status = 1;
            $return['status'] = $status;
            $return['data'] = false;

            return response()->json($return);   /* 會員身份有異 */
        }


        if($member_data)
        {
            $status = $this->member->verifyEmailOthers($m_id, $email);

            if (!is_bool($status))
            {
                $return['status'] = $status;
                $return['data'] = false;

                return response()->json($return);   /* 2: email 格式錯誤 */
            }

            $status = $this->member->sendEmailValidationAjax($m_id, $member_data->nickname, $email);

            $return['status'] = $status;
            $return['data'] = false;

            return response()->json($return);   /* 0: 成功 */
        }
    }

    public function memberUpdateMemberData(Request $request)
    {
        // Get Request Parameter
        $mode       = $request->mode ?? false;
        $m_id       = $request->m_id ?? false;
        $remember_token = $request->remember_token ?? false;
        $nickname   = $request->nickname ?? false;
        $m_name     = $request->m_name;
        $id_code    = $request->id_code ?? false;
        $sex        = $request->sex ?? false;
        $birthday   = $request->birthday ?? false;
        $address    = $request->address ?? false;
        $facebook_link = $request->facebook_link ?? false;
        $line_id    = $request->line_id ?? false;
        $company_id = $request->company_id ?? false;
        $company_name = $request->company_name ?? false;

        if($m_id && $remember_token)
        {
            $member_data = $this->member->checkMemberExsit($m_id, $remember_token);

            if(empty($member_data))
            {
                $status = 1;
                $return['status'] = $status;
                $return['data'] = false;

                return response()->json($return);   /* 會員身份有異 */
            }
        }
        else
        {
            $status = 1;
            $return['status'] = $status;
            $return['data'] = false;

            return response()->json($return);   /* 會員身份有異 */
        }

        if($mode==0)
        {
            if(!$nickname || !$sex)
            {
                $return['status'] = 2;
                $return['data'] = false;

                return response()->json($return);   /* 會員身份有異 */
            }
        }
        else if($mode==1)
        {
            if(!$nickname || !$m_name || !$sex)
            {
                $return['status'] = 3;
                $return['data'] = false;

                return response()->json($return);   /* 會員身份有異 */
            }
        }

        if($nickname && $sex)
        {
            $member_data->m_name = $m_name;
            $member_data->nickname = $nickname;
            $member_data->sex = $sex;

            $id_code ? $member_data->id_code = Crypt::encrypt($id_code) : '';
            $birthday ? $member_data->birthday = $birthday : '';
            $address ? $member_data->address = $address : '';
            $facebook_link ? $member_data->facebook_link = $facebook_link : '';
            $line_id ? $member_data->line_id = $line_id : '';
            $company_id ? $member_data->company_id = $company_id : '';
            $company_name ? $member_data->company_name = $company_name : '';

            $member_data->save();

            $return['status'] = 0;
            $return['data'] = false;

            return response()->json($return);   /* 會員身份有異 */
        }
    }

    public function memberUpdatePassword(Request $request)
    {
        // Get Request Parameter
        $m_id       = $request->m_id ?? false;
        $remember_token = $request->remember_token ?? false;
        $old_password = $request->old_password ?? false;
        $new_password = $request->new_password ?? false;

        if($m_id && $remember_token)
        {
            $member_data = $this->member->checkMemberExsit($m_id, $remember_token);

            if(empty($member_data))
            {
                $status = 1;
                $return['status'] = $status;
                $return['data'] = false;

                return response()->json($return);   /* 會員身份有異 */
            }
        }
        else
        {
            $status = 1;
            $return['status'] = $status;
            $return['data'] = false;

            return response()->json($return);   /* 會員身份有異 */
        }

        if($member_data && $old_password && $new_password)
        {
            $status = $this->member->updatePasswordAjax($m_id, $old_password, $new_password);

            $return['status'] = $status;
            $return['data'] = false;

            return response()->json($return);
        }
        else
        {
            $status = 4;
            $return['status'] = $status;
            $return['data'] = false;

            return response()->json($return);   /* 輸入有異 */
        }
    }

    public function memberUpdateBankInfo(Request $request)
    {
        // Get Request Parameter
        $m_id       = $request->m_id ?? false;
        $remember_token = $request->remember_token ?? false;
        $bank_number = $request->bank_number ?? false;
        $account_name = $request->account_name ?? false;
        $account_number = $request->account_number ?? false;

        if($m_id && $remember_token)
        {
            $member_data = $this->member->checkMemberExsit($m_id, $remember_token);

            if(empty($member_data))
            {
                $status = 1;
                $return['status'] = $status;
                $return['data'] = false;

                return response()->json($return);   /* 會員身份有異 */
            }
        }
        else
        {
            $status = 1;
            $return['status'] = $status;
            $return['data'] = false;

            return response()->json($return);   /* 會員身份有異 */
        }

        if($bank_number && $account_name && $account_number)
        {
            $status = $this->member->updateBankInfoAjax($m_id, $bank_number, $account_name, $account_number);

            $return['status'] = $status;
            $return['data'] = false;

            return response()->json($return);
        }
        else
        {
            $return['status'] = 2;
            $return['data'] = false;

            return response()->json($return);   /* 缺必填資料 bank_number, account_name, account_number */
        }
    }

    public function memberGetLessonPermissionAjax(Request $request)
    {
        // Get Request Parameter
        $m_id           = $request->m_id;
        $remember_token = $request->remember_token;
        $l_id           = $request->l_id;
        $mode           = $request->mode;
        $status         = -1;

        if($l_id!='')
        {
            $lesson_data = Lesson::find($l_id);

            if(empty($lesson_data))
            {
                $status = 3;
                $return['status'] = $status;
                $return['data'] = false;

                return response()->json($return);   /* 無此課程 */
            }
            elseif($lesson_data->apply_situation!='success') {
                $status = 5;
                $return['status'] = $status;
                $return['data'] = false;

                return response()->json($return);   /* 5: 此課程尚未通過審核 */
            }
        }

        if($mode==1)
        {
            $memberIsExist = $this->member->checkMemberIsExistById($m_id);

            if(!$memberIsExist)
            {
                $status = 1;
                $return['status'] = $status;
                $return['data'] = false;

                return response()->json($return);   /* 無此會員 */
            }
            else
            {
                $member_data = $this->member->checkMemberExsit($m_id, $remember_token);

                if(empty($member_data))
                {
                    $status = 2;
                    $return['status'] = $status;
                    $return['data'] = false;

                    return response()->json($return);   /* 會員身份有異 */
                }
            }

            if($member_data)
            {
                $role = $this->member->getRole($member_data['authority']);
                $teacher_data = $this->teacher->findMemberId($member_data->m_id);

                if($teacher_data && $teacher_data->auth_situation=="success")
                {
                    $t_id = $teacher_data->t_id;
                    $role += 16;
                }

                if((2 & $role)==2)                       // 行政人員
                {
                    $return['status'] = 0;
                    $return['data'] = true;

                    return response()->json($return);   // 行政：可以進入所有課程教室。
                }
                elseif((16 & $role)==16)                // 老師
                {
                    if($t_id == $lesson_data->t_id)
                    {
                        $return['status'] = 0;              /* 成功 */
                        $return['data'] = true;
                    }

                    return response()->json($return);
                }

                if((1 & $role)==1)                      // 一般會員
                {
                    $memberHasPaid = $this->order->checkMemberHasPaidAjax($m_id, $l_id);

                    if($memberHasPaid)
                    {
                        $status = $this->order->saveDeadlineByStartStudy($l_id, $m_id);

                        if ($status==0) {
                            $return['status'] = 0;          /* 成功 */
                            $return['data'] = true;
                        }
                        else {
                            $return['status'] = $status;    /* 無權進入此課程教室 */
                            $return['data'] = false;
                        }

                        return response()->json($return);
                    }
                    else
                    {
                        $return['status'] = 4;              /* 無權進入此課程教室 */
                        $return['data'] = false;

                        return response()->json($return);
                    }
                }
                else {

                    $return['status'] = 4;          /* 無權進入此課程教室 */
                    $return['data'] = false;

                    return response()->json($return);
                }
            }
        }
        elseif($mode==0)
        {
            $status = 0;
            $return['status'] = $status;
            $return['data'] = true;

            return response()->json($return);   /* 0: 成功 */
        }

    }

    public function memberGetPhoneVerificationCodeAjax(Request $request)
    {
        // Get Register Request Parameter
        $m_id   = $request->m_id;
        $remember_token  = $request->remember_token;
        $cellphone  = $request->cellphone;

        $status = -1;
        $memberIsExist = $this->member->checkMemberIsExistById($m_id);

        if(!$memberIsExist) {
            $status = 1;
            $return['status'] = $status;
            $return['data'] = false;

            return response()->json($return);   /* 無此會員 */
        }
        else
        {
            $member_data = $this->member->checkMemberExsit($m_id, $remember_token);

            if(empty($member_data))
            {
                $status = 2;
                $return['status'] = $status;
                $return['data'] = false;

                return response()->json($return);   /* 會員身份有異 */
            }
        }

        // Check other person has the same phone
        $otherMemberSamePhoned = $this->member->findOtherMemberPhoneVeritied($cellphone, $m_id);
        if($otherMemberSamePhoned)
        {
            $status = 5;
            $return['status'] = $status;
            $return['data'] = false;

            return response()->json($return);   /* 手機號碼已有人使用 */
        }
        else
        {
            if($member_data['cellphone_verify_status']==1)
            {
                $status = 4;
                $return['status'] = $status;
                $return['data'] = false;

                return response()->json($return);   /* 手機號碼已驗證 */
            }
            elseif ($member_data['cellphone']!=$cellphone)
            {
                $member_data->cellphone = $cellphone;
                $member_data->save();
            }
        }

        $seconds = $this->member->getMemberPhoneCodeDuration($m_id, $remember_token, $cellphone);

        if($seconds == -1 || $seconds < 550)        // 610 - 550 = 60sec
        {
            if($member_data->cellphone_verify_count > 20)
            {
                $status = 3;
                $return['status'] = $status;
                $return['data'] = null;

                return response()->json($return);
            }

            // Send Cellphone Code
            $message = $this->member->sendCellphoneVerificationCodeAjax($cellphone, $m_id);
            $data = 0;

            if($message==101) {
                $status = 0;
                $return['status'] = $status;
                $return['data'] = $data;

                return response()->json($return);
            }
            else {
                $status = 6;
                $return['status'] = $status;
                $return['data'] = $data;

                return response()->json($return);
            }
        }

    }

    public function memberGetPhoneVerificationCodeTimeAjax(Request $request)
    {
        // Get Register Request Parameter
        $m_id   = $request->m_id;
        $remember_token  = $request->remember_token;

        $status = -1;
        $member_data = $this->member->checkMemberExsit($m_id, $remember_token);

        if(empty($member_data))
        {
            $status = 1;
            $return['status'] = $status;
            $return['data'] = false;

            return response()->json($return);   /* 會員身份有異 */
        }

        $seconds = $this->member->getMemberPhoneCodeDuration($m_id, $remember_token);
        $data = $seconds == -1 ? 99999 : (610-$seconds);

        $status = 0;
        $return['status'] = $status;
        $return['data'] = $data;

        return response()->json($return);

    }

    public function memberCheckPhoneVerificationCodeAjax(Request $request)
    {
        // Get Request Parameter
        $m_id   = $request->m_id;
        $remember_token  = $request->remember_token;
        $code  = $request->code;

        $member_data = $this->member->checkMemberExsit($m_id, $remember_token);

        if(empty($member_data))
        {
            $return['status'] = 1;
            $return['data'] = null;

            return response()->json($return);   /* 會員身份有異 */
        }

        $result = $this->member->checkPhoneVerificationCode($m_id, $remember_token, $code);
        $return['status'] = $result ? 0 : 2;
        $return['data'] = null;

        return response()->json($return);

    }

    public function memberGetMemberNamesAjax(Request $request)
    {
        // Get Request Parameter
        $m_ids = $request->m_id;

        $result = $this->member->getMemberNamesAjax($m_ids);

        $return['status'] = $result['status'];
        $return['data'] = $result['data'];

        return response()->json($return);
    }

    public function lessonGetLessonsAjax(Request $request)
    {
        $keyword        = $request->keyword;
        $rangeStartTime = $request->rangeStartTime;
        $rangeEndTime   = $request->rangeEndTime;
        $type           = $request->type;
        $pay_type       = $request->pay_type;
        $cancel_lesson  = $request->cancel_lesson ?? 3;
        $teachers       = $request->teachers;
        $areas          = $request->areas;
        $topicLabels    = $request->topicLabels;
        $m_id           = $request->m_id ?? false;
        $remember_token = $request->remember_token;
        $startIndex     = $request->startIndex;
        $limitNum       = $request->limitNum ?? false;

        if($m_id)
        {
            $member_data = $this->member->checkMemberExsit($m_id, $remember_token);

            if(empty($member_data))
            {
                $return['status'] = 1;
                $return['data'] = null;

                return response()->json($return);   /* 失敗 */
            }
        }

        $data = $this->lesson->getLessonsAjax($keyword, $rangeStartTime, $rangeEndTime, $type, $pay_type, $cancel_lesson, $teachers, $areas, $topicLabels, $m_id, $startIndex, $limitNum);
        $status = 0;

        return response()->json([
            'status'=> $status,
            'data'  => $data
        ]);
    }

    public function lessonGetPromotingLessonsAjax(Request $request)
    {
        // Get Register Request Parameter
        $mode           = $request->mode;
        $m_id           = $request->m_id;
        $remember_token = $request->remember_token;

        if($m_id!='' && $remember_token!='') {

            $member_data = $this->member->checkMemberExsit($m_id, $remember_token);

            if(empty($member_data))
            {
                $return['status'] = 1;
                $return['data'] = null;

                return response()->json($return);   /* 失敗 */
            }

        }

        switch ($mode) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
                $status = 0;
                $data = $this->lesson->getPromotingLessonsAjax2($mode, $m_id);
                break;
            default:
                $status = 1;
                $data = array();
                break;
        }

        $return['status'] = $status;
        $return['count'] = count($data);
        $return['data'] = $data;

        return response()->json($return);
    }

    public function lessonGetMyLessonsAjax(Request $request)
    {
        // Get Register Request Parameter
        $m_id           = $request->m_id;
        $remember_token = $request->remember_token;

        $member_data = $this->member->checkMemberExsit($m_id, $remember_token);

        if(empty($member_data))
        {
            $return['status'] = 1;
            $return['data'] = null;

            return response()->json($return);   /* 會員身份有異 */
        }
        else {
            $data = $this->lesson->getMyLessonsAjax($m_id);

            $return['status'] = 0;
            $return['count'] = count($data);
            $return['data'] = $data;

            return response()->json($return);
        }

    }

    public function lessonGetLessonDetailAjax(Request $request)
    {
        // Get Register Request Parameter
        $l_id           = $request->l_id;
        $m_id           = $request->m_id;
        $remember_token = $request->remember_token;

        if($m_id!='' && $remember_token!='')
        {
            $member_data = $this->member->checkMemberExsit($m_id, $remember_token);

            if(empty($member_data))
            {
                $return['status'] = 2;
                $return['data'] = null;

                return response()->json($return);   /* 會員身份有異 */
            }
        }

        if($l_id!='')
        {
            $lesson_data = Lesson::find($l_id);

            if(empty($lesson_data))
            {
                $status = 1;
                $return['status'] = $status;
                $return['data'] = false;

                return response()->json($return);   /* 無此課程 */
            }
        }

        $data = $this->lesson->getLessonDetailAjax($lesson_data, $m_id);

        $return['status'] = 0;
        $return['data'] = $data;

        return response()->json($return);

    }

    public function lessonGetLessonUnitDetailAjax(Request $request)
    {
        // Get Register Request Parameter
        $l_id           = $request->l_id;
        $mode           = $request->mode;
        $m_id           = $request->m_id;
        $remember_token = $request->remember_token;

        if($l_id!='')
        {
            $lesson_data = Lesson::find($l_id);

            if(empty($lesson_data))
            {
                $status = 1;
                $return['status'] = $status;
                $return['data'] = false;

                return response()->json($return);   /* 無此課程 */
            }
        }

        if($mode == 0)
        {
            $data = $this->lesson->getLessonUnitDetailAjax($l_id, $m_id, $mode);

            $return['status'] = 0;
            $return['count'] = count($data);
            $return['data'] = $data;

            return response()->json($return);
        }
        elseif($mode == 1)
        {
            if(empty($m_id)||empty($remember_token))
            {
                $return['status'] = 2;
                $return['data'] = null;

                return response()->json($return);   /* 會員身份有異 */
            }

            $member_data = $this->member->checkMemberExsit($m_id, $remember_token);

            if(empty($member_data))
            {
                $return['status'] = 2;
                $return['data'] = null;

                return response()->json($return);   /* 會員身份有異 */
            }

            $role = $this->member->getRole($member_data->authority);
            $teacher_data = $this->teacher->findMemberId($m_id);
            if ($teacher_data) {
                $t_id = $teacher_data->t_id;
                if($lesson_data->t_id == $t_id)  $role += 16;
            }

            if (!((2 & $role) == 2 || (16 & $role) == 16))  // 行政人員 or 老師
            {
                $order_data = $this->order->checkLessonBuyerOrderData($l_id, $m_id);

                if (empty($order_data)) {
                    $return['status'] = 3;
                    $return['data'] = null;

                    return response()->json($return);   /* 無權查詢此課程章節 */
                }
            }

            $data = $this->lesson->getLessonUnitDetailAjax($l_id, $m_id, $mode, $lesson_data->t_id, $member_data->authority);

            $return['status'] = 0;
            $return['count'] = count($data);
            $return['data'] = $data;

            return response()->json($return);
        }

    }

    public function lessonGetLessonShopQaAjax(Request $request)
    {
        // Get Register Request Parameter
        $l_id           = $request->l_id;
        $area           = $request->area;
        $m_id           = $request->m_id;
        $remember_token = $request->remember_token;

        if($l_id!='')
        {
            $lesson_data = Lesson::find($l_id);

            if(empty($lesson_data))
            {
                $status = 1;
                $return['status'] = $status;
                $return['data'] = false;

                return response()->json($return);   /* 無此課程 */
            }
        }

        if($area == 'classroom')
        {
            if(empty($m_id)||empty($remember_token))
            {
                $return['status'] = 2;
                $return['data'] = null;

                return response()->json($return);   /* 會員身份有異 */
            }

            $member_data = $this->member->checkMemberExsit($m_id, $remember_token);

            if(empty($member_data))
            {
                $return['status'] = 2;
                $return['data'] = null;

                return response()->json($return);   /* 會員身份有異 */
            }

            $role = $this->member->getRole($member_data->authority);
            $teacher_data = $this->teacher->findMemberId($m_id);
            if ($teacher_data) {
                $t_id = $teacher_data->t_id;
                if($lesson_data->t_id == $t_id)  $role += 16;
            }

            if (!((2 & $role) == 2 || (16 & $role) == 16))  // 行政人員 or 老師
            {
                $order_data = $this->order->checkLessonBuyerOrderData($l_id, $m_id);

                if (empty($order_data)) {
                    $return['status'] = 2;
                    $return['data'] = null;

                    return response()->json($return);   /* 無權查詢此課程章節 */
                }
            }
        }

        $qa_data = $this->qa->getLessonResponseAjax($l_id, $m_id, $area);

        $return['status'] = 0;
        $return['data'] = $qa_data;

        return response()->json($return);
    }

    public function lessonSendLessonShopQaAjax(Request $request)
    {
        // Get Request Parameter
        $l_id           = $request->l_id;
        $area           = $request->area;
        $m_id           = $request->m_id;
        $remember_token = $request->remember_token;
        $text           = $request->text;
        $token          = $request->token;
        $t_token        = $request->t_token;
        $notify         = $request->notify ?? false;
        $notify_mid     = $request->notify_mid ?? false;

        if($l_id!='')
        {
            $lesson_data = Lesson::find($l_id);

            if(empty($lesson_data))
            {
                $status = 1;
                $return['status'] = $status;
                $return['data'] = false;

                return response()->json($return);   /* 無此課程 */
            }
        }

        if($area == 'classroom')
        {
            if(empty($m_id)||empty($remember_token))
            {
                $return['status'] = 2;
                $return['data'] = null;

                return response()->json($return);   /* 會員身份有異 */
            }

            $member_data = $this->member->checkMemberExsit($m_id, $remember_token);

            if(empty($member_data))
            {
                $return['status'] = 2;
                $return['data'] = null;

                return response()->json($return);   /* 會員身份有異 */
            }

            $role = $this->member->getRole($member_data->authority);
            $teacher_data = $this->teacher->findMemberId($m_id);
            if ($teacher_data) {
                $t_id = $teacher_data->t_id;
                if($lesson_data->t_id == $t_id)  $role += 16;
            }

            if (!((2 & $role) == 2 || (16 & $role) == 16))  // 行政人員 or 老師
            {
                $order_data = $this->order->checkLessonBuyerOrderData($l_id, $m_id);

                if (empty($order_data)) {
                    $return['status'] = 2;
                    $return['data'] = null;

                    return response()->json($return);   /* 無權查詢此課程章節 */
                }
            }
        }
        else if($area == 'shop')
        {
            if(empty($m_id)||empty($remember_token))
            {
                $return['status'] = 2;
                $return['data'] = null;

                return response()->json($return);   /* 會員身份有異 */
            }

            $member_data = $this->member->checkMemberExsit($m_id, $remember_token);

            if(empty($member_data))
            {
                $return['status'] = 2;
                $return['data'] = null;

                return response()->json($return);   /* 會員身份有異 */
            }
        }

        // Generate Token
        if (!$token) {
            $token = strtoupper(substr(md5(microtime()), 0, 8));
        }
        else {
            $qa_data = Qa::where('token', $token)->where('area', $area)->first();

            if (empty($qa_data)) {

                $status = 3;
                $return['status'] = $status;
                $return['data'] = null;

                return response()->json($return);   /* 新增問答時，無此討論串 */
            }
        }

        if(trim($text)=='') {
            $status = 5;
            $return['status'] = $status;
            $return['data'] = null;

            return response()->json($return);   /* 無內容時 */
        }

        $md5     = strtoupper(substr(md5(microtime()), 0, 8));
        $t_token = substr($md5, 0, 4) . $m_id . $l_id . substr($md5, 4, 8);

        // Save New Response
        $status = $this->qa->saveNewResponseAjax($member_data, $lesson_data, $area, $token, $t_token, $text, $notify, $notify_mid);

        $return['status'] = $status;
        $return['data'] = null;

        return response()->json($return);
    }

    public function lessonSwitchFavoriteAjax(Request $request)
    {
        // Get Register Request Parameter
        $l_id = $request->l_id;
        $m_id = $request->m_id;
        $remember_token = $request->remember_token;
        $favorite = $request->favorite;

        $status = $this->favorite->switchFavoriteAjax($l_id, $m_id, $favorite);
        $return['status'] = $status;

        return response()->json($return);

    }

    public function lessonGetLessonClassmatesAjax(Request $request)
    {
        // Get Register Request Parameter
        $l_id = $request->l_id ?? null;
        $m_id = $request->m_id;
        $remember_token = $request->remember_token;

        if($l_id!='')
        {
            $lesson_data = Lesson::find($l_id);

            if(empty($lesson_data))
            {
                $status = 1;
                $return['status'] = $status;
                $return['data'] = false;

                return response()->json($return);   /* 無此課程 */
            }
        }

        if(empty($m_id)||empty($remember_token))
        {
            $return['status'] = 2;
            $return['data'] = null;

            return response()->json($return);   /* 會員身份有異 */
        }

        $member_data = $this->member->checkMemberExsit($m_id, $remember_token);

        if(empty($member_data))
        {
            $return['status'] = 2;
            $return['data'] = null;

            return response()->json($return);   /* 會員身份有異 */
        }

        $memberRole = Member::getRole($member_data->authority);
        $result = $this->lesson->check_teacher_is_this_lesson($m_id, $l_id);

        if ((2 & $memberRole)==2)               // 行政人員
        {
            $classmate = $this->order->getLessonClassmateAjax($l_id);

            $return['status'] = 0;
            $return['data'] = $classmate;

            return response()->json($return);
        }
        elseif ($result)                        // 老師 且 是當科老師
        {
            $classmate = $this->order->getLessonClassmateAjax($l_id);

            $return['status'] = 0;
            $return['data'] = $classmate;

            return response()->json($return);
        }
        else
        {
            $return['status'] = 3;
            $return['data'] = null;

            return response()->json($return);   /* 無權查詢此課程學生資料 */
        }
    }

    public function lessonGetLessonUnitTimesAjax(Request $request)
    {
        // Get Register Request Parameter
        $l_id = $request->l_id;

        if($l_id!='')
        {
            $lesson_data = Lesson::find($l_id);

            if(empty($lesson_data))
            {
                $status = 1;
                $return['status'] = $status;
                $return['data'] = false;

                return response()->json($return);   /* 無此課程 */
            }
        }

        $data = $this->lesson->getLessonUnitTimesAjax($l_id);

        $return['status'] = 0;
        $return['data'] = $data;

        return response()->json($return);
    }

    public function lessonStartStudyAjax(Request $request)
    {
        // Get Register Request Parameter
        $l_id = $request->l_id;
        $m_id = $request->m_id;
        $remember_token = $request->remember_token;

        if($l_id!='')
        {
            $lesson_data = Lesson::find($l_id);

            if(empty($lesson_data))
            {
                $status = 1;
                $return['status'] = $status;
                $return['data'] = false;

                return response()->json($return);   /* 無此課程 */
            }
        }

        if(empty($m_id)||empty($remember_token))
        {
            $return['status'] = 2;
            $return['data'] = null;

            return response()->json($return);   /* 會員身份有異 */
        }

        $member_data = $this->member->checkMemberExsit($m_id, $remember_token);

        if(empty($member_data))
        {
            $return['status'] = 2;
            $return['data'] = null;

            return response()->json($return);   /* 會員身份有異 */
        }

        $status = $this->lesson->startStudyAjax($l_id, $m_id);

        $return['status'] = $status;
        $return['data'] = null;

        return response()->json($return);
    }

    public function lessonCheckAllLessonsSaveAjax(Request $request)
    {
        $data = $this->lesson->checkAllLessonsSave();

        $return['status'] = 1;
        $return['data'] = $data;

        return response()->json($return);
    }

    public function lessonCheckAllTeachersSaveAjax(Request $request)
    {
        $data = $this->teacher->checkPopTeachersSave();

        $return['status'] = 0;
        $return['data'] = $data;

        return response()->json($return);
    }

    public function lessonGetAreasAjax(Request $request)
    {
        $data = $this->lesson->getAreasAjax();

        $return['status'] = 0;
        $return['data'] = $data;

        return response()->json($return);
    }

    public function lessonGetTopicLabels(Request $request)
    {
        $data = $this->topic->getTopicLabels();

        $return['status'] = 0;
        $return['data'] = $data;

        return response()->json($return);
    }

    public function lessonGetTeacherLessons(Request $request)
    {
        // Get Register Request Parameter
        $t_id = $request->t_id ?? false;
        $m_id = $request->m_id ?? false;
        $remember_token = $request->remember_token ?? false;
        $public_only = $request->public_only ?? false;

        if ($m_id && $remember_token)
        {
            $member_data = $this->member->checkMemberExsit($m_id, $remember_token);

            if (empty($member_data))
            {
                $return['status'] = 1;
                $return['data'] = null;

                return response()->json($return);   /* 會員身份有異 */
            }
        }
        elseif(!($m_id=="" && $remember_token==""))
        {
            $return['status'] = 1;
            $return['data'] = null;

            return response()->json($return);   /* 會員身份有異 */
        }

        if (!$t_id)
        {
            $return['status'] = 2;
            $return['data'] = null;

            return response()->json($return);   /* 無權設定(沒傳 t_id) */
        }
        else
        {
            $teacher_data = $this->teacher->find($t_id);

            if(!$teacher_data)
            {
                $return['status'] = 3;
                $return['data'] = null;

                return response()->json($return);   /* 3: 無此講師 */
            }
        }

        $role = 0;
        if(isset($member_data)) { $role = $this->member->getRole($member_data->authority); }

        if($teacher_data->m_id != $m_id && (2 & $role)!=2)
        {
            $public_only = 1;
        }

        $data = $this->lesson->getTeacherLessons($m_id, $t_id, $public_only);

        $return['status'] = 0;
        $return['data'] = $data;

        return response()->json($return);   /* 成功 */
    }

    public function lessonDeleteLesson(Request $request)
    {
        // Get Register Request Parameter
        $l_id = $request->l_id ?? false;
        $m_id = $request->m_id;
        $remember_token = $request->remember_token;

        if($l_id)
        {
            $lesson_data = Lesson::find($l_id);

            if(empty($lesson_data))
            {
                $return['status'] = 1;
                $return['data'] = false;

                return response()->json($return);   /* 無此課程 */
            }
        }
        else
        {
            $return['status'] = 1;
            $return['data'] = false;

            return response()->json($return);   /* 無此課程 */
        }

        if(isset($m_id) && isset($remember_token))
        {
            $member_data = $this->member->checkMemberExsit($m_id, $remember_token);

            if(empty($member_data))
            {
                $return['status'] = 2;
                $return['data'] = null;

                return response()->json($return);   /* 會員身份有異 */
            }
        }
        elseif(!($m_id=="" && $remember_token==""))
        {
            $return['status'] = 2;
            $return['data'] = null;

            return response()->json($return);   /* 會員身份有異 */
        }


        $teacher_data = $this->teacher->find($lesson_data->t_id);
        $role = 0;

        if(isset($member_data)) { $role = $this->member->getRole($member_data->authority); }

        if($teacher_data->m_id != $m_id && (2 & $role)!=2)
        {
            $status = 3;
        }
        else
        {
            if ($lesson_data->apply_situation == 'no apply')
            {
                $lesson_data->delete_lesson = 1;
                $lesson_data->save();
                $status = 0;
            }
            else {
                $status = 4;
            }
        }

        $return['status'] = $status;
        $return['data'] = null;

        return response()->json($return);   /* 成功 */
    }

    public function rollcallGetLessonRollcallsAjax(Request $request)
    {
        // Get Register Request Parameter
        $l_id = $request->l_id;
        $m_id = $request->m_id;
        $remember_token = $request->remember_token;

        if($l_id!='')
        {
            $lesson_data = Lesson::find($l_id);

            if(empty($lesson_data))
            {
                $status = 2;
                $return['status'] = $status;
                $return['data'] = false;

                return response()->json($return);   /* 無此課程 */
            }
        }

        if(isset($m_id) && isset($remember_token))
        {
            $member_data = $this->member->checkMemberExsit($m_id, $remember_token);

            if(empty($member_data))
            {
                $return['status'] = 1;
                $return['data'] = null;

                return response()->json($return);   /* 會員身份有異 */
            }
        }
        elseif(!($m_id=="" && $remember_token==""))
        {
            $return['status'] = 1;
            $return['data'] = null;

            return response()->json($return);   /* 會員身份有異 */
        }

        if(isset($m_id)) {
            $data = $this->rollcall->getRollcallListAjax($l_id, $m_id);
        }
        else {
            $data = $this->rollcall->getRollcallListAjax($l_id);
        }

        $return['status'] = 0;
        $return['data'] = $data;

        return response()->json($return);
    }

    public function rollcallGetRollcallQRCodeAjax(Request $request)
    {
        // Get Parameter
        $l_id = $request->l_id;
        $u_id = $request->u_id;

        if($l_id!='')
        {
            $lesson_data = Lesson::find($l_id);

            if(empty($lesson_data))
            {
                $status = 1;
                $return['status'] = $status;
                $return['data'] = false;

                return response()->json($return);   /* 無此課程 */
            }

            if($u_id!='')
            {
                $chapter_data = $this->unit->get_chapter_data($l_id, $u_id);

                if(empty($chapter_data))
                {
                    $status = 2;
                    $return['status'] = $status;
                    $return['data'] = false;

                    return response()->json($return);   /* 無此章節 */
                }
            }
        }

        $data = $this->rollcall->getRollcallQRCodeAjax($l_id, $u_id);

        $return['status'] = 0;
        $return['data'] = $data;

        return response()->json($return);
    }

    public function rollcallUpdateRollcallAjax(Request $request)
    {
        // Get Parameter
        $l_id = $request->l_id;
        $u_id = $request->u_id;
        $m_id = $request->m_id;
        $req_status = $request->status;
        $rollcall_member = $request->rollcall_member;

        if($l_id!='')
        {
            $lesson_data = Lesson::find($l_id);

            if(empty($lesson_data))
            {
                $status = 2;
                $return['status'] = $status;
                $return['data'] = false;

                return response()->json($return);   /* 無此課程 */
            }

            if($u_id!='')
            {
                $chapter_data = $this->unit->get_chapter_data($l_id, $u_id);

                if(empty($chapter_data))
                {
                    $status = 3;
                    $return['status'] = $status;
                    $return['data'] = false;

                    return response()->json($return);   /* 無此章節 */
                }
            }
        }

        if($req_status==1) {
            $data = $this->rollcall->saveRollcallAjax($m_id, $l_id, $u_id, $rollcall_member);
            $status = 0;
        }
        else {
            $data = $this->rollcall->removeRollcallAjax($m_id, $l_id, $u_id);
            $status = 1;
        }

        $return['status'] = $status;
        $return['data'] = $data;

        return response()->json($return);
    }

    public function teacherGetTeachersAjax(Request $request)
    {
        // Get Parameter
        $mode       = $request->mode;
        $startIndex = $request->start_index;
        $limitNum   = $request->limit_num ?? false;

        $data = $this->teacher->getTeachersAjax($mode, $startIndex, $limitNum);

        $return['status'] = 0;
        $return['count'] = count($data);
        $return['data'] = $data;

        return response()->json($return);
    }

    public function teacherGetTeacherAjax(Request $request)
    {
        // Get Parameter
        $l_id = $request->l_id;

        if($l_id)
        {
            $lesson_data = Lesson::find($l_id);

            if(empty($lesson_data))
            {
                $status = 2;
                $return['status'] = $status;
                $return['data'] = false;

                return response()->json($return);   /* 無此課程 */
            }

            $t_id = $lesson_data->t_id;
            $teacher_data = $this->teacher->find($t_id);
            $member_data = $this->member->find($teacher_data->m_id);

            if($teacher_data && $member_data)
            {
                $data = array(
                    "t_id"      => $t_id,
                    "m_id"      => $member_data->m_id,
                    "m_name"    => $member_data->m_name,
                    "nickname"  => $member_data->nickname,
                    "avg_img"   => $member_data->avg_img
                );

                $status = 0;                        /* 成功 */
                $return['status'] = $status;
                $return['data'] = $data;

                return response()->json($return);
            }
            else
            {
                $status = 1;                        /* 無此講師 */
                $return['status'] = $status;
                $return['data'] = false;

                return response()->json($return);
            }
        }
    }

    public function teacherGetTeacherDetailAjax(Request $request)
    {
        // Get Parameter
        $t_id = $request->t_id ?? false;
        $m_id = $request->m_id;
        $remember_token = $request->remember_token;

        if(isset($m_id) && isset($remember_token))
        {
            $member_data = $this->member->checkMemberExsit($m_id, $remember_token);

            if(empty($member_data))
            {
                $return['status'] = 1;
                $return['data'] = null;

                return response()->json($return);   /* 會員身份有異 */
            }
        }
        elseif(!($m_id=="" && $remember_token==""))
        {
            $return['status'] = 1;
            $return['data'] = null;

            return response()->json($return);   /* 會員身份有異 */
        }

        if(!$t_id)
        {
            $return['status'] = 2;
            $return['data'] = null;

            return response()->json($return);   /* 沒傳 t_id */
        }
        else
        {
            $teacher_data = $this->teacher->find($t_id);
            $member_data = $this->member->find($teacher_data->m_id);
            $role = $this->member->getRole($member_data->authority);

            if ($teacher_data->m_id == $m_id || (4 & $role)==4 || (8 & $role)==8)
            {
                $data = array(
                    "t_id"          => $t_id,
                    "m_id"          => $member_data->m_id,
                    "nickname"      => $member_data->nickname,
                    "m_name"        => $member_data->m_name,
                    "avg_img"       => $member_data->avg_img,
                    "intro_exp"     => $teacher_data->intro_exp,
                    "book_exp"      => $teacher_data->book_exp,
                    "certificate_exp"   => $teacher_data->certificate_exp,
                    "awards_exp"    => $teacher_data->awards_exp,
                    "repo_exp"      => $teacher_data->repo_exp,
                    "pub_exp"       => $teacher_data->pub_exp,
                    "teach_type"    => $teacher_data->teach_type,
                    "teach_exp"     => $teacher_data->teach_exp,
                    "portfolios"    => $teacher_data->portfolios,
                    "work_exp"      => $teacher_data->work_exp,
                    "auth_situation"=> $teacher_data->auth_situation,
                    "audit_reason"  => $teacher_data->audit_reason,
                    "audit_time"    => $teacher_data->audit_time,
                    "works_exp"     => $teacher_data->works_exp,
                    "edu_school"    => $teacher_data->edu_school,
                    "edu_dapartment"=> $teacher_data->edu_dapartment,
                    "edu_degree"    => $teacher_data->edu_degree
                );
                
                $return['status'] = 0;              //成功
                $return['data'] = $data;

                return response()->json($return);
            }
            else if($teacher_data && $teacher_data->auth_situation=='success')
            {
                $data = array(
                    "t_id"          => $t_id,
                    "m_id"          => $member_data->m_id,
                    "nickname"      => $member_data->nickname,
                    "m_name"        => $member_data->m_name,
                    "avg_img"       => $member_data->avg_img,
                    "intro_exp"     => $teacher_data->intro_exp,
                    "book_exp"      => $teacher_data->book_exp,
                    "certificate_exp"   => $teacher_data->certificate_exp,
                    "awards_exp"    => $teacher_data->awards_exp,
                    "repo_exp"      => $teacher_data->repo_exp,
                    "pub_exp"       => $teacher_data->pub_exp,
                    "teach_type"    => $teacher_data->teach_type,
                    "teach_exp"     => $teacher_data->teach_exp,
                    "portfolios"    => $teacher_data->portfolios,
                    "work_exp"      => $teacher_data->work_exp
                );

                $return['status'] = 0;              //成功
                $return['data'] = $data;

                return response()->json($return);

            }
            else
            {
                $return['status'] = 3;
                $return['data'] = null;

                return response()->json($return);   /* 無此講師 */
            }
        }
    }

    public function teacherUpdateTeacherDetailAjax(Request $request)
    {
        // Get Parameter
        $mode = $request->mode;
        $t_id = $request->t_id ?? false;
        $m_id = $request->m_id;

        $remember_token = $request->remember_token ?? false;
        $edu_school     = $request->edu_school ?? false;
        $edu_dapartment = $request->edu_dapartment ?? false;
        $edu_degree     = $request->edu_degree ?? false;
        $intro_exp      = $request->intro_exp ?? false;
        $teach_type     = $request->teach_type ?? false;
        $teach_exp      = $request->teach_exp ?? false;

        $book_exp           = $request->book_exp ?? false;
        $certificate_exp    = $request->certificate_exp ?? false;
        $awards_exp         = $request->awards_exp ?? false;
        $repo_exp           = $request->repo_exp ?? false;
        $pub_exp            = $request->pub_exp ?? false;
        $work_exp           = $request->work_exp ?? false;
        $works_exp          = $request->works_exp ?? false;

        if (isset($m_id) && isset($remember_token))
        {
            $member_data = $this->member->checkMemberExsit($m_id, $remember_token);

            if (empty($member_data)) {
                $return['status'] = 1;
                $return['data'] = null;

                return response()->json($return);   /* 會員身份有異 */
            }
        } elseif (!($m_id == "" && $remember_token == "")) {
            $return['status'] = 1;
            $return['data'] = null;

            return response()->json($return);   /* 會員身份有異 */
        }

        if ($mode==0)
        {
            if (!$t_id)
            {
                $return['status'] = 2;
                $return['data'] = null;

                return response()->json($return);   /* 無權設定(沒傳 t_id) */
            }
            else
            {
                $teacher_data = $this->teacher->find($t_id);

                if ($teacher_data->m_id != $m_id) {
                    $return['status'] = 2;
                    $return['data'] = null;

                    return response()->json($return);   /* 無權設定（m_id 不是 t_id 本人) */
                }
            }

            if(!($edu_school && $edu_dapartment && $edu_degree && $intro_exp && $teach_type && $teach_exp))
            {
                $return['status'] = 3;
                $return['data'] = null;

                return response()->json($return);   /* 缺少必填資料 */
            }
            else
            {
                $book_exp           ? $teacher_data->book_exp = $book_exp : '';
                $certificate_exp    ? $teacher_data->certificate_exp = $certificate_exp : '';
                $awards_exp         ? $teacher_data->awards_exp = $awards_exp : '';
                $repo_exp           ? $teacher_data->repo_exp = $repo_exp : '';
                $pub_exp            ? $teacher_data->pub_exp = $pub_exp : '';
                $work_exp           ? $teacher_data->work_exp = $work_exp : '';

                $status = $this->teacher->updateTeacherDetailAjax($request, $teacher_data);

                $return['status'] = $status;
                $return['data'] = null;

                return response()->json($return);   /* 成功 */
            }
        }
        else
        {
            if(!$works_exp)
            {
                $return['status'] = 4;
                $return['data'] = null;

                return response()->json($return);   /* mode=1 時，works_exp 沒填 */
            }

            if(!($edu_school && $edu_dapartment && $edu_degree && $intro_exp && $teach_type && $teach_exp))
            {
                $return['status'] = 3;
                $return['data'] = null;

                return response()->json($return);   /* 缺少必填資料 */
            }
            else
            {
                $teacher_data = $this->teacher->findMemberId($m_id);

                if($teacher_data) {
                    $status = $this->teacher->updateTeacherDetailAjax($request, $teacher_data);
                }
                else {
                    $status = $this->teacher->updateTeacherDetailAjax($request, $this->teacher);
                }

                $return['status'] = $status;
                $return['data'] = null;

                return response()->json($return);   /* 成功 */
            }
        }
    }

    public function teacherUpdatePortfoliosAjax(Request $request)
    {
        // Get Parameter
        $t_id           = $request->t_id ?? false;
        $m_id           = $request->m_id;
        $remember_token = $request->remember_token ?? false;
        $portfolios     = $request->portfolios;

        if (isset($m_id) && isset($remember_token))
        {
            $member_data = $this->member->checkMemberExsit($m_id, $remember_token);

            if (empty($member_data)) {
                $return['status'] = 1;
                $return['data'] = null;

                return response()->json($return);   /* 會員身份有異 */
            }
        }
        elseif (!($m_id == "" && $remember_token == ""))
        {
            $return['status'] = 1;
            $return['data'] = null;

            return response()->json($return);   /* 會員身份有異 */
        }

        if (!$t_id)
        {
            $return['status'] = 2;
            $return['data'] = null;

            return response()->json($return);   /* 無權設定(沒傳 t_id) */
        }
        else
        {
            $teacher_data = $this->teacher->find($t_id);

            if($teacher_data->m_id != $m_id)
            {
                $return['status'] = 2;
                $return['data'] = null;

                return response()->json($return);   /* 無權設定（m_id 不是 t_id 本人) */
            }
            else
            {
                $status = $this->teacher->updatePortfoliosAjax($portfolios, $teacher_data);

                $return['status'] = $status;
                $return['data'] = null;

                return response()->json($return);   /* 成功 */
            }
        }
    }

    public function orderGetOrdersAjax(Request $request)
    {
        // Get Parameter
        $m_id = $request->m_id;
        $remember_token = $request->remember_token;

        $member_data = $this->member->checkMemberExsit($m_id, $remember_token);

        if(empty($member_data))
        {
            $status = 1;
            $return['status'] = $status;
            $return['data'] = false;

            return response()->json($return);   /* 會員身份有異 */
        }

        $data = $this->order->getOrdersAjax($m_id);

        $return['status'] = 0;
        $return['count'] = count($data);
        $return['data'] = $data;

        return response()->json($return);

    }

    public function orderCancelOrderAjax(Request $request)
    {
        // Get Parameter
        $order_id = $request->id;
        $m_id = $request->m_id;
        $remember_token = $request->remember_token;

        if(isset($m_id) && isset($remember_token))
        {
            $member_data = $this->member->checkMemberExsit($m_id, $remember_token);

            if(empty($member_data))
            {
                $return['status'] = 1;
                $return['data'] = null;

                return response()->json($return);   /* 會員身份有異 */
            }
        }
        elseif(!($m_id=="" && $remember_token==""))
        {
            $return['status'] = 1;
            $return['data'] = null;

            return response()->json($return);   /* 會員身份有異 */
        }

        $order_data = Order::find($order_id);

        if(empty($order_data)) {
            $return['status'] = 2;
            $return['data'] = null;

            return response()->json($return);   /* 無此 o_id */
        }
        else {
            if(!is_null($order_data->delete_time)) {
                $return['status'] = 3;
                $return['data'] = null;

                return response()->json($return);   /* 此 order 本來就已經取消了 */
            }
            else {
                $status = $this->order->cancelOwnOrderViaIdAjax($order_id, $m_id);

                $return['status'] = $status;
                $return['data'] = null;

                return response()->json($return);
            }
        }
    }

    public function orderBuyFreeLessonAjax(Request $request)
    {
        // Get Parameter
        $l_id = $request->l_id;
        $m_id = $request->m_id;
        $remember_token = $request->remember_token;

        if(isset($m_id) && isset($remember_token))
        {
            $member_data = $this->member->checkMemberExsit($m_id, $remember_token);

            if(empty($member_data))
            {
                $return['status'] = 2;
                $return['data'] = null;

                return response()->json($return);   /* 會員身份有異 */
            }
        }
        elseif(!($m_id=="" && $remember_token==""))
        {
            $return['status'] = 2;
            $return['data'] = null;

            return response()->json($return);   /* 會員身份有異 */
        }

        if($l_id!='')
        {
            $lesson_data = Lesson::find($l_id);

            if(empty($lesson_data))
            {
                $status = 1;
                $return['status'] = $status;
                $return['data'] = null;

                return response()->json($return);   /* 無此課程 */
            }

            if($lesson_data->offer_fee!=0) {
                $status = 3;
                $return['status'] = $status;
                $return['data'] = null;

                return response()->json($return);   /* 課程非免費 */
            }
        }

        $order_id = $this->order->createOrderId();
        $result = $this->order->saveFreeOrderAjax($order_id, $m_id, $l_id, 0, 'free', 'FREE');

        if($result) {
            $status = 0;
            $return['status'] = $status;
            $return['data'] = null;
        }
        else {
            $status = 0;
            $return['status'] = $status;
            $return['data'] = null;
        }

        return response()->json($return);
    }

    public function orderCancelLessonExistedOrderAjax(Request $request)
    {
        // Get Parameter
        $l_id = $request->l_id;
        $m_id = $request->m_id;
        $remember_token = $request->remember_token;

        if(isset($m_id) && isset($remember_token))
        {
            $member_data = $this->member->checkMemberExsit($m_id, $remember_token);

            if(empty($member_data))
            {
                $return['status'] = 1;
                $return['data'] = null;

                return response()->json($return);   /* 會員身份有異 */
            }
        }
        elseif(!($m_id=="" && $remember_token==""))
        {
            $return['status'] = 1;
            $return['data'] = null;

            return response()->json($return);   /* 會員身份有異 */
        }

        $status = $this->order->cancelLessonExistedOrderAjax($l_id, $m_id);

        $return['status'] = $status;
        $return['data'] = null;

        return response()->json($return);
    }

    public function orderCheckOrderCancel(Request $request)
    {
        $status = $this->order->checkOrderCancelAjax();

        $return['status'] = $status;
        $return['data'] = null;

        return response()->json($return);
    }

    public function orderSpgatewayClientBACK()
    {
        return redirect('/#/profile/order');
    }

    public function orderSpgatewayNotify(Request $request)
    {
        $input = $request->all();
        $retData = json_decode($input['JSONData']);

        $this->order->spgatewayNotify($retData);
    }

    public function orderSpgatewayCustomer(Request $request)
    {
        $input = $request->all();

        $retData = json_decode($input['JSONData']);
        $status = $this->order->spgatewayCustomer($retData);

        return redirect('/#/profile/order');
    }

    public function wishPpostMyWishAjax(Request $request)
    {
        // Get Parameter
        $m_id           = $request->m_id;
        $remember_token = $request->remember_token;
        $title          = $request->title;
        $goal           = $request->goal;
        $content        = $request->content;
        $categorys      = $request->categorys;
        $image_files    = $request->image_files;

        if(isset($m_id) && isset($remember_token))
        {
            $member_data = $this->member->checkMemberExsit($m_id, $remember_token);

            if(empty($member_data))
            {
                $return['status'] = 1;
                $return['data'] = null;

                return response()->json($return);   /* 會員身份有異 */
            }
        }
        elseif(!($m_id=="" && $remember_token==""))
        {
            $return['status'] = 1;
            $return['data'] = null;

            return response()->json($return);   /* 會員身份有異 */
        }

        if(!($title && $goal))
        {
            $return['status'] = 2;
            $return['data'] = null;

            return response()->json($return);   /* 必填資料不足 */
        }

        if(!$categorys && count($categorys)==0)
        {
            $return['status'] = 2;
            $return['data'] = null;

            return response()->json($return);   /* 必填資料不足 */
        }

        $message = $this->wish->addWishesDataAjax($m_id, $title, $goal, $content, $categorys, $image_files);
        $status = $message == 'success' ? 0 : 3;

        $return['status'] = $status;
        $return['data'] = null;

        return response()->json($return);
    }

    public function wishGetMyWishesAjax(Request $request)
    {
        // Get Parameter
        $m_id           = $request->m_id;
        $remember_token = $request->remember_token;

        if(isset($m_id) && isset($remember_token))
        {
            $member_data = $this->member->checkMemberExsit($m_id, $remember_token);

            if(empty($member_data))
            {
                $return['status'] = 1;
                $return['data'] = null;

                return response()->json($return);   /* 會員身份有異 */
            }
        }
        elseif(!($m_id=="" && $remember_token==""))
        {
            $return['status'] = 1;
            $return['data'] = null;

            return response()->json($return);   /* 會員身份有異 */
        }

        $datas = $this->wish->getMyWishes($m_id);
        $status = 0;

        $return['status'] = $status;
        $return['cnt'] = count($datas);
        $return['data'] = $datas;

        return response()->json($return);
    }

    public function wishGetWishImageAjax(Request $request)
    {
        $album = $request->album ?? false;

        if(!$album)
        {
            $return['status'] = 1;
            $return['data'] = null;

            return response()->json($return);   /* 1: 缺少album 參數 */
        }

        $result = $this->wish->getWishImageAjax($request->album);

        $return['status'] = $result['status'];
        $return['data'] = $result['data'];

        return response()->json($return);
    }

}
