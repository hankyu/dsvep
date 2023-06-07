<?php

namespace App;

use App\Member;
use App\Main;
use Illuminate\Database\Eloquent\Model;

class Qa extends Model
{
    private $main;

    public function __construct()
    {
        $this->main   = new Main();
    }

    public function sendEditResponse($token, $t_token, $area, $text)
    {
        $qa_data = Qa::where('token', $token)->where('t_token', $t_token)->where('area', $area)->first();

        if (!Member::user()) { return '請先登入在進行編輯問題或回應'; }
        else if ($qa_data->m_id != Member::user()->m_id) { return '無法編輯其他會員的問題或回應'; }
        else
        {
            $qa_data->message = $text;
            $qa_data->save();
            return 'success';
        }
    }

    public function saveNewResponse($m_id, $l_id, $area, $token, $t_token, $message)
    {
        $this->m_id = $m_id;
        $this->l_id = $l_id;
        $this->area = $area;
        $this->token = $token;
        $this->t_token = $t_token;
        $this->message = $message;
        $this->save();
    }

    public static function getLessonResponse($l_id, $area)
    {
        $index    = 0;
        $question = [];
        $response = [];
        $qa_data  = self::where('l_id', $l_id)->where('area', $area)->get();
        $m_id     = Member::user()->m_id ?? 0;

        foreach ($qa_data as $key => $qa)
        {
            $qa->self = $qa->m_id === $m_id;
            $qa->avg_img = Member::find($qa->m_id)->avg_img;
            $qa->m_name = Member::find($qa->m_id)->nickname;
            unset($qa_data[$key]['area'], $qa_data[$key]['created_at'], $qa_data[$key]['id']);
        }

        foreach ($qa_data as $qa)
        {
            $pos = array_search($qa->token, $question);

            if ($pos === false)
            {
                $question[$index] = $qa->token;
                $response[$index] = array();
            }

            $response[is_bool($pos) ? $index : $pos][] = $qa;

            if ($pos === false) { $index++; }
        }

        return $response;
    }

    public static function getLessonResponseAjax($l_id, $m_id, $area)
    {
        $index    = 0;
        $question = [];
        $response = [];
        $qa_data  = self::where('l_id', $l_id)->where('area', $area)->get();

        foreach ($qa_data as $key => $qa)
        {
            $qa->self = $qa->m_id === $m_id;
            $qa->avg_img = Member::find($qa->m_id)->avg_img;
            $qa->nickname = Member::find($qa->m_id)->nickname;
            $qa->m_name = Member::find($qa->m_id)->m_name;

            unset($qa_data[$key]['area'], $qa_data[$key]['created_at'], $qa_data[$key]['id']);
        }

        foreach ($qa_data as $qa)
        {
            $pos = array_search($qa->token, $question);

            if ($pos === false)
            {
                $question[$index] = $qa->token;
                $response[$index] = array();
            }

            $response[is_bool($pos) ? $index : $pos][] = $qa;

            if ($pos === false) { $index++; }
        }

        return array_reverse($response);
    }

    public function saveNewResponseAjax($member_data, $lesson_data, $area, $token, $t_token, $message, $notify, $notify_mid)
    {
        $this->m_id = $member_data->m_id;
        $this->l_id = $lesson_data->l_id;
        $this->area = $area;
        $this->token = $token;
        $this->t_token = $t_token;
        $this->message = $message;
        $this->save();

        if($notify==1 && $area=="shop" )
        {
            $notify_data = Member::find($notify_mid);
            $account = $notify_data->nickname . ( $notify_data->m_name != '' ? "(".$notify_data->m_name.")" : '' );
            $sentence = "有學員在「". $lesson_data->l_name ."」課程商店頁的課程問答內留言，請前往查看。";

            $data =
                [
                    'account'   => $account,
                    'sentence'  => $sentence,
                    'website'   => '<a href="https://www.ds-vep.com/#/lesson/'. $lesson_data->l_id .'">網址</a>',
                    'domain'    => $_SERVER['HTTP_HOST']
                ];
            $this->main->send_email($data, 'site.layout.send_lesson_shop_qa_notify', $notify_data->email, '【大俠學習平台】您有留言通知', 0);
        }
        else if($notify==2 && $area=="shop" )
        {
            $notify_data = Member::find($notify_mid);
            $account = $notify_data->nickname . ( $notify_data->m_name != '' ? " ( ".$notify_data->m_name." )" : '' );
            $sentence = "老師已在「". $lesson_data->l_name ."」課程商店頁的課程問答內回覆您的留言，請前往查看。";

            $data =
                [
                    'account'   => $account,
                    'sentence'  => $sentence,
                    'website'   => '<a href="https://www.ds-vep.com/#/lesson/'. $lesson_data->l_id .'">網址</a>',
                    'domain'    => $_SERVER['HTTP_HOST']
                ];
            $this->main->send_email($data, 'site.layout.send_lesson_shop_qa_notify', $notify_data->email, '【大俠學習平台】您有留言通知', 0);
        }
        else if($notify==1 && $area=="classroom" )
        {
            $notify_data = Member::find($notify_mid);
            $account = $notify_data->nickname . ( $notify_data->m_name != '' ? " ( ".$notify_data->m_name." )" : '' );
            $sentence = "有學員在「". $lesson_data->l_name ."」課程教室頁的課堂討論內留言，請前往查看。";

            $data =
                [
                    'account'   => $account,
                    'sentence'  => $sentence,
                    'website'   => '<a href="https://www.ds-vep.com/#/profile/lesson/classroom/'. $lesson_data->l_id .'">網址</a>',
                    'domain'    => $_SERVER['HTTP_HOST']
                ];
            $this->main->send_email($data, 'site.layout.send_lesson_shop_qa_notify', $notify_data->email, '【大俠學習平台】您有留言通知', 0);
        }
        else if($notify==2 && $area=="classroom" )
        {
            $notify_data = Member::find($notify_mid);
            $account = $notify_data->nickname . ( $notify_data->m_name != '' ? " ( ".$notify_data->m_name." )" : '' );
            $sentence = "老師已在「". $lesson_data->l_name ."」課程教室頁的課堂討論內回覆您的留言，請前往查看。";

            $data =
                [
                    'account'   => $account,
                    'sentence'  => $sentence,
                    'website'   => '<a href="https://www.ds-vep.com/#/profile/lesson/classroom/'. $lesson_data->l_id .'">網址</a>',
                    'domain'    => $_SERVER['HTTP_HOST']
                ];
            $this->main->send_email($data, 'site.layout.send_lesson_shop_qa_notify', $notify_data->email, '【大俠學習平台】您有留言通知', 0);
        }

        return 0;
    }
}
