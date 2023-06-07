<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Input;
use View;

class CartController extends Controller
{
    public function lessonConfirmPage($id)
    {
        // Get Lesson Data
        $lesson_data = $this->lesson->find($id);

        // Check Lesson EXist
        if (!empty($lesson_data))
        {
            // Check Lesson Was Publiced
            if ($lesson_data->pub_situation && !$lesson_data->cancel_lesson && !$lesson_data->delete_lesson)
            {
                // Check Lesson Is Fundraising Situation Or Leson Type Is Online
                if ((strtotime(date('Y-m-d')) < strtotime($lesson_data->start_time)) || ($lesson_data->type == 'online'))
                {
                    // Check Member Possess Lesson Situation
                    $has_lesson  = $this->order->checkOrderHasLesson($id);
                    $is_worker   = $this->member->isWorker();
                    $is_teacher  = $lesson_data->t_id == ($this->teacher->data()->t_id ?? null);
                    $deadline    = $this->order->checkOrderIsOverDeadline($this->member->user()->m_id, $id);
                    $free_lesson = $lesson_data->current_fee === 0;

                    if ($has_lesson)
                    {
                        if ($free_lesson || !$deadline || $is_worker || $is_teacher) { return redirect('/lesson/' . $id); }
                        else
                        {
                            return View::make('site.cart.layout')->with('title', $lesson_data->l_name)->with('lesson_data', $lesson_data);
                        }
                    }
                    else
                    {
                        return View::make('site.cart.layout')->with('title', $lesson_data->l_name)->with('lesson_data', $lesson_data);
                    }
                }
                else { \App::abort(404); }
            }
            else { \App::abort(404); }
        }
        else { \App::abort(404); }
    }

    public function spgateway(Request $request)
    {
        //Check Receipt Situation
        $this->member->updateReceipt($request->receipt, $request[$request->receipt]);

        //Create A Order
        $order_id = $this->order->createOrderId();

        //Create Order List
        $url   = explode('/', url()->previous());
        $id    = end($url);
        $price = $this->lesson->getRealPrice($id, $request->coupon);

        if ($price > 0)
        {
            //Init Order Data
            $this->order->saveOrder($order_id, $id, $price, $request->receipt, $request->coupon);

            //Get Order Information
            $email       = $request->buyer_mail ?? $this->member->user()->email;
            $lesson_name = $this->lesson->find($id)->l_name;

            if (strlen($lesson_name) > 50) { $lesson_name = mb_substr($lesson_name, 0, 15); }

            $spgateway   = \MPG::generate($price, $email, $lesson_name,
            [
                'MerchantOrderNo' => $order_id,
                'ExpireDate'      => date('Ymd', strtotime('+3 day')),
                'TradeLimit'      => 600,
                'TokenTerm'       => $email
            ]);
            return $spgateway->send();
        }
        else
        {
            $this->order->saveFreeOrder($order_id, $id);
            return redirect('/profile/order');
        }
    }
}
