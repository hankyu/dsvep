<?php

namespace App;

use App\Lesson;
use App\Main;
use App\Member;
use App\Shorturl;
use App\Unit;
use Illuminate\Database\Eloquent\Model;

class Sms extends Model
{
    public static function send($cellphone, $text)
    {
        // Send SMS Status Code:
        // 101: 簡訊已送達
        // 201: 系統發⽣錯誤，請聯絡大俠學習平台平台⼈員
        // 202: 簡訊發送功能暫時停⽌服務，請稍候再試
        // 203: 簡訊內容不得空白
        // 204: 無效的手機號碼
        // 205: 門號有錯誤
        // 206: 逾時未送達

        $sms = new Sms();

        // Set Send SMS Data
        $api     = 'SmSend';
        $keys    = ['dstaddr', 'smbody', 'CharsetURL'];
        $values  = [$cellphone, $text, 'UTF-8'];
        $data    = self::initSMSUrl($api, $keys, $values);
        $url     = $data['url'];
        $guid    = $data['guid'];
        $message = self::curlExecute($url);

        // Save SMS To SQL
        $message = explode("\n", $message);

        foreach ($message as $value)
        {
            if (strpos($value, '='))
            {
                $data = explode('=', $value);
                switch ($data[0])
                {
                    case 'msgid':
                        $sms->msgid = $data[1];
                        break;
                    case 'statuscode':
                        $status = self::getSMSStatus(trim($data[1]));
                        $sms->status = "$data[1]-$status";
                        break;
                    case 'AccountPoint':
                        $sms->point = $data[1];
                }
            }
        }

        $sms->guid = $guid;
        $sms->message = $text;
        $sms->cellphone = $cellphone;
        $sms->m_id = Member::where('cellphone', $cellphone)->first()->m_id ?? 0;
        $sms->save();
        return $status ?? 201;
    }

    public static function initSMSUrl($api, $keys, $values)
    {
        // Get SMS Basic Data
        $account  = env('SMS_NAME');
        $password = env('SMS_PWD');
        $guid     = Main::createGUID();

        // Create A URL To Connect Request
        $url = "http://smsapi.mitake.com.tw/api/mtk/$api?username=$account&password=$password&clientid=$guid";

        foreach ($keys as $key => $value)
        {
            // If Key Is SMS Text Will Add Title And Transfer URL Encode
            if ($value == 'smbody')
            {
                $text = urlencode("【大俠學習通知】$values[$key]");
                $url .= "&$value=$text";
            }
            else { $url .= "&$value=$values[$key]"; }
        }

        return ['url' => $url, 'guid' => $guid];
    }

    public static function curlExecute($url)
    {
        // Execute Curl To Connect Api
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        $message = curl_exec($curl);
        curl_close($curl);
        return $message;
    }

    public static function getSMSStatus($code)
    {
        switch ($code)
        {
            case 'a':
            case 'b':
                return 202;
            case 'u':
                return 203;
            case 'v':
                return 204;
            case 1:
            case 2:
            case 4:
                return 101;
            case 6:
                return 205;
            case 8:
                return 206;
            default:
                return 201;
        }
    }

    public function sendSMSLessonClassmateNotify($l_id, $cellphone)
    {
        // Get Lesson Some Data In Order To Embed To SMS Text
        $sms_data = self::getSMSLessonData($l_id, 'notify');
        $link     = Shorturl::create('profile/lesson/overview');
        $text     = '提醒您，' . $sms_data['time'] . $sms_data['teacher'] . $sms_data['l_name'] . '開課，詳細資訊請見' . $link;
        self::send($cellphone, $text);
    }

    public function sendSMSLessonTeacherNotify($l_id, $cellphone, $t_id)
    {
        // Get Lesson Some Data In Order To Embed To SMS Text
        $sms_data = self::getSMSLessonData($l_id, 'notify');
        $link     = Shorturl::create("teacher/$t_id#lesson");
        $text     = '老師提醒您，' . $sms_data['time'] . $sms_data['l_name'] . '開課，詳細資訊請見' . $link;
        self::send($cellphone, $text);
    }

    public function sendSMSLessonClassmateCancelNotify($l_id, $cellphone)
    {
        // Get Lesson Some Data In Order To Embed To SMS Text
        $sms_data = self::getSMSLessonData($l_id, 'cancel');
        $link     = Shorturl::create('profile/detail#bank');
        $text     = '提醒您，' . $sms_data['time'] . ' ' . $sms_data['teacher'] . ' ' . $sms_data['l_name'] . ' 取消開班，信用卡繳費將會進行刷退，如其他方式繳費，請登入網站填寫匯退帳戶' . $link . ' ，如有疑問電洽02-29554564，造成不便敬請見諒，謝謝';
        self::send($cellphone, $text);
    }

    public function sendSMSLessonTeacherCancelNotify($l_id, $cellphone)
    {
        // Get Lesson Some Data In Order To Embed To SMS Text
        $sms_data = self::getSMSLessonData($l_id, 'cancel');
        $link     = Shorturl::create('profile/detail#credit');
        $text     = '您好' . $sms_data['teacher'] . '老師，感謝您開辦了' . $sms_data['time'] . $sms_data['l_name'] . '，由於人數不足，因此課程取消，敬請見諒';
        self::send($cellphone, $text);
    }

    public static function getSMSLessonData($l_id, $type)
    {
        $lesson_data = Lesson::find($l_id);
        $start_time  = Unit::getEntityLessonFirstUnitStartTime($l_id);
        $data = array();
        $data['l_name'] = $lesson_data->l_name;
        $data['time'] = str_replace('-', '/', substr($start_time, 5, $type == 'notify' ? 11 : 5));
        $data['teacher'] = Lesson::getTeacherMemberDataOfLesson($l_id)->nickname;
        return $data;
    }
}
