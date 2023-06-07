<?php

namespace App;

use Mail;
use App\Member;
use App\Teacher;
use Cache;
use Crypt;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Response;

class Main extends Model
{
    public function check_column_fill_in($column)
    {
        return $column == null ? false : true;
    }

    public function check_data_not_empty($data)
    {
        return count($data) == 0 ? false : true;
    }

    public static function checkInputValid()
    {
        $params = func_get_args();
        $result = "OK";

        $account = $params[0];
        $password = $params[1];
        $nickname = $params[2];
        $email = $params[3];

        if($account=='') {
            $result = 1;        // 帳號應為 6~20 英數字
        }
        elseif (!preg_match("/^[A-Za-z0-9]{6,20}+$/u", $account)) {
            $result = 1;        // 帳號應為 6~20 英數字
        }
        elseif($password=='') {
            $result = 3;        // 密碼應為 8~30 英數字
        }
        elseif (!preg_match("/^[A-Za-z0-9 \W]{8,30}+$/u", $password)) {
            $result = 3;        // 密碼應為 8~30 英數字
        }
        elseif($email=='') {
            $result = 4;        //  Email 格式不對
        }
        elseif($nickname=='') {
            $result = 7;        // 名字必填
        }
        elseif (!preg_match("/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/u", $email)) {
            $result = 4;        //  Email 格式不對
        }

        return $result;
    }

    public static function checkRequestParameterIsFillIn()
    {
        $params = func_get_args();

        foreach ($params as $value)
        {
            // If Has Parameter Is Empty Will Exit Loop And Return True
            if (!$value) { return true; }
        }

        return false;
    }

    public function create_file($file_folder)
    {
        if (!file_exists($file_folder)) { mkdir($file_folder, 0777, true); }

        return;
    }

    public static function createQRCode($data, $save_file = false)
    {
        if ($save_file) { \QrCode::generate($data, $save_file); }
    }

    public static function decrypt($string)
    {
        return Crypt::decrypt($string);
    }

    public static function createGUID()
    {
        mt_srand((double)microtime() * 10000);
        $charid = strtoupper(md5(uniqid(rand(), true)));
        $guid = substr($charid, 0, 8) . '-'
               .substr($charid, 8, 4) . '-'
               .substr($charid,12, 4) . '-'
               .substr($charid,16, 4) . '-'
               .substr($charid,20,12);
        return $guid;
    }

    public function delete_all_session_and_cache()
    {
        session()->flush();
        Cache::flush();
    }

    public function delete_last_br_char($data)
    {
        $data_split = explode("\n", $data);

        for ($k = 0; $k < count($data_split) - 1; $k++)
        {
            $temp = $data_split[$k];
            $data_split[$k] = substr($temp, 0, strlen($temp) - 6);
        }

        $data = join("\n", $data_split);
        return $data;
    }

    public static function encrypt($string)
    {
        return Crypt::encrypt($string);
    }

    public function removeBrString($data)
    {
        if (strstr($data, "\n"))
        {
            $data_split   = explode("\n", $data);
            $last_string  = array_pop($data_split);
            $no_br_string = join("\n", array_map('self::removeLast5Char', $data_split)) . "\n" . $last_string;
        }

        return $no_br_string ?? $data;
    }

    public static function removeLast5Char($str)
    {
        return substr($str, 0, strlen($str) - 7);
    }

    public function return_data($data)
    {
        return response()->json($data);
    }

    public function send_email($data, $path, $to, $subject, $isReplyToDasha = 0)
    {
        $this->to = $to;
        $this->subject = $subject;
        $this->domain = isset($_SERVER['HTTP_HOST']) ? explode(':', $_SERVER['HTTP_HOST'])[0] : 'https://www.ds-vep.com';
        $this->isReplyToDasha = $isReplyToDasha;

        Mail::send($path, $data, function ($message)
        {
            if($this->isReplyToDasha != 0)  $message->setReplyTo('eason.yea@gmail.com', '大俠');

            $message->to($this->domain === 'localhost' ? 'momo.dinlin0000@gmail.com' : $this->to)->subject($this->subject);
        });
    }
}
