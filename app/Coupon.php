<?php

namespace App;

use app\Lesson;
use App\Main;
use App\Member;
use App\Teacher;
use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    protected $primaryKey = 'cp_id';

    public static function checkCouponExist($string)
    {
        return is_null(Coupon::where('code', $string)->first());
    }

    public function checkCouponValid($coupon, $l_id, $buyer = null)
    {
        if (strtolower(trim($coupon)) === '振興知識')
        {
            if ( time() > strtotime('2020-09-30 23:59:59') ||
                 time() < strtotime('2020-07-15 00:00:00')) {
                return '無此優惠券';
            }
            else
            {
                $thisLesson = Lesson::find($l_id);

                if (($thisLesson->origin_fee ?? 0) >= 3000 ) {
                    return 'valid';
                }
                else {
                    return '本課程原價未超過 3000 元，故無法使用該代碼折價';
                }
            }
        }
        elseif (strtolower(trim($coupon)) === '愛鼠你')
        {
            if ( time() > strtotime('2020-02-05 23:59:59') ||
                 time() < strtotime('2020-01-18 00:00:00')) {
                return '無此優惠券';
            }
            else
            {
                $thisLesson = Lesson::find($l_id);

                if($l_id == 471) {
                    return '不適用 #471 澎湖花火攝影團';
                }

                if (($thisLesson->origin_fee ?? 0) >= 2600 ) {
                    return 'valid';
                }
                else {
                    return '本課程原價未超過 2600 元，故無法使用該代碼折價';
                }
            }
        }
        elseif (strtolower($coupon) === 'dslearn2019')
        {
            if (time() > strtotime('2019-12-31 23:59:59')) { return '無此優惠券'; }
            else
            {
                if ((Lesson::find($l_id)->origin_fee ?? 0) >= 500) { return 'valid'; }
                else { return '本課程原價未超過500元，故無法使用該代碼折價'; }
            }
        }
        elseif (strtolower($coupon) === '大俠學習')
        {
            if ( time() > strtotime('2019-09-30 23:59:59') ||
                 time() < strtotime('2019-09-27 00:00:00')) {
                return '無此優惠券';
            }
            else
            {
                if ((Lesson::find($l_id)->origin_fee ?? 0) >= 2000) { return 'valid'; }
                else { return '本課程原價未超過 2000 元，故無法使用該代碼折價'; }
            }
        }
        elseif (strtolower($coupon) === '一起學習折500')
        {
            if ( time() > strtotime('2019-11-30 23:59:59') ) {
                return '無此優惠券';
            }
            else
            {
                $thisLesson = Lesson::find($l_id);

                if (($thisLesson->origin_fee ?? 0) >= 500 )
                {
                    if ($thisLesson->type == "online") {
                        return 'valid';
                    }
                    else { return '此優惠券只限於線上課程，目前此課程為實體課程，無法使用！'; }

                }
                else { return '本課程原價未超過 500 元，故無法使用該代碼折價'; }
            }
        }
        else
        {
            $coupon_data = self::where('code', $coupon)->first();
            $account     = $buyer ?? Member::user()->account;
            $email       = $buyer ?? Member::user()->email;

            if (!is_null($coupon_data))
            {
                if ((($coupon_data->object == 'all') || ($coupon_data->object == $account) || ($coupon_data->object == $email)) && ($l_id == $coupon_data->l_id))
                {
                    if (strtotime($coupon_data->expire_time) >= strtotime(date('Y-m-d 00:00:00')))
                    {
                        if ($coupon_data->situation) { return 'valid'; }
                        else { return '該優惠券已失效'; }
                    }
                    else { return '該優惠券已超過使用期限：' .  explode(' ', str_replace('-', '/', $coupon_data->expire_time))[0]; }
                }
                else { return '無此優惠券'; }
            }
            else { return '無此優惠券'; }
        }
    }

    public function createNewCoupon()
    {
        do
        {
            $string = substr(md5(uniqid(rand())), 0, 6);
            $string = strtoupper(preg_replace('/\[O|0|I|i|L\]/', rand(1, 9), $string));
            $check  = self::checkCouponExist($string);
        } while (!$check);

        return $string;
    }

    public function deleteCoupon($code)
    {
        $coupon_data = self::getCouponData($code);

        if (!is_null($coupon_data))
        {
            if ((Lesson::find($coupon_data->l_id)->t_id == (Teacher::data()->t_id ?? null)) || (Member::isWorker()))
            {
                $coupon_data->situation = 0;
                $coupon_data->save();
                return 'success';
            }
            else { return '無此優惠券'; }
        }
        else { return '無此優惠券'; }
    }

    public static function getLessonCouponList($id)
    {
        return self::where('l_id', $id)->get();
    }

    public static function getCouponData($code)
    {
        return self::where('code', $code)->first();
    }

    public static function getDiscountPrice($coupon, $price)
    {
        if ($coupon == '振興知識') { return $price - 300; }
        elseif ($coupon == '愛鼠你') { return $price - 500; }
        elseif ($coupon == 'dslearn2019') { return $price - 300; }
        elseif ($coupon == '大俠學習') { return $price - 500; }
        elseif ($coupon == '一起學習折500') { return $price - 500; }
        else { return $price - Coupon::getCouponData($coupon)->price; }
    }

    public function saveNewCoupon($member, $discount, $l_id, $endtime)
    {
        if (strtolower($member) != 'all')
        {
            $m_id = strlen($member) < 6 ? Member::find($member)->account : $member;
        }
        else { $m_id = 'all'; }

        $code = $this->createNewCoupon();
        $this->code = $code;
        $this->creator = Member::user()->nickname;
        $this->l_id = $l_id;
        $this->expire_time = $endtime;
        $this->object = $m_id;
        $this->price = $discount;
        $this->situation = true;
        $this->save();
    }
}
