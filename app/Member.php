<?php

namespace App;

use \Auth;
use Crypt;
use Mail;
use App\Main;
use App\Sms;
use App\Teacher;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Member extends Authenticatable
{
    protected $guarded = array('t_id');
    protected $primaryKey = 'm_id';
    protected $table = 'members';

    private $main;
    private $teacher;

    public function __construct()
    {
        $this->main    = new Main();
        $this->teacher = new Teacher();
    }

    public static function accountExist($account)
    {
        // If Account Already Exist Will Return True
        return !is_null(self::findAccount($account));
    }

    public function emailExist($email)
    {
        // Check Email Was been Used, If Not Will Return False
        return !is_null(Member::findEmail($email));
    }

    public static function checkEmailVerify()
    {
        // Check Email Verify Status
        return self::user()->email_verify ?? false;
    }

    public static function checkCellphoneVerify()
    {
        // Check Cellphone Verify Status
        return self::user()->cellphone_verify_status ?? false;
    }

    public static function authority($authority = null)
    {
        $authority = is_null($authority) ? Member::user()->authority ?? 'visitor' : $authority;

        switch ($authority)
        {
            case 'passers-by':
                return 1;
                break;
            case 'worker':
                return 2;
                break;
            case 'saigo':
                return 4;
                break;
            case 'yoshocon':
                return 8;
                break;
            default:
                return 0;
        }
    }

    public static function getRole($authority = null)
    {
        $authority = is_null($authority) ? Member::user()->authority ?? 'visitor' : $authority;

        switch ($authority)
        {
            case 'passers-by':
                return 1;
                break;
            case 'worker':
                return 3;   /* 1+2 */
                break;
            case 'saigo':
                return 5;   /* 1+4 */
                break;
            case 'yoshocon':
                return 9;   /* 1+8 */
                break;
            default:
                return 0;
        }
    }

    public function changeAuthority($account, $authority)
    {
        $message = array('', 202);

        if ($account == Member::user()->account ?? null) { $message[1] = '無法修改自己的權限'; }
        else if (Member::authority() === Member::authority($authority)) { $message[1] = '無法將使用者修改成與自己相同等級的權限'; }
        else if (Member::authority() > Member::authority(Member::findAccount($account)->authority ?? 'visitor'))
        {
            $member_data = Member::findAccount($account);

            if (!empty($member_data))
            {
                $member_data->authority = $authority;
                $member_data->save();
                $message[0] = '更改 <span class="color-emphasized2">' . $member_data->account . '</span> 的權限成功';
                $message[1] = 200;
            }
            else { $message[0] = '無此帳號'; }
        }
        else { $message[0] = '無法更改與自己一樣或比自己高的使用者權限'; }

        return $message;
    }

    public function changePassword($password, $account = null)
    {
        $member_data = is_null($account) ? Member::user() : Member::findAccount($account);
        $member_data->password = $this->main->encrypt($member_data->account . $password);
        $member_data->save();
    }

    public function checkEmailOwner($account, $email)
    {
        return Member::where('account', '=', $account)->where('email', '=', $email)->first() == null ? false : true;
    }

    public function checkTeacherDemand()
    {
        $member_data = Member::user();
        $check       = array();

        if (is_null($member_data->m_name)) { array_push($check, '暱稱'); }
        if (is_null($member_data->cellphone)) { array_push($check, '手機'); }
        if (is_null($member_data->sex)) { array_push($check, '性別'); }
        if (is_null($member_data->avg_img)) { array_push($check, '大頭照'); }

        $check_data = join(',', $check);

        if (!is_null($check_data)) { session()->put('auth', $check_data); }
        else { session()->forget('auth'); }

        return empty($check_data);
    }

    public function checkMemberIsExist($m_id)
    {
        return empty(Member::find($m_id)) || empty(Member::findAccount($m_id)) || empty(self::findEmail($m_id));
    }

    public function checkCellphoneVerificationCode($code)
    {
        // Check Cellphone verify Code Status Code:
        //  101: 手機驗證完成
        //  201: 該手機號碼已經驗證完成
        //  202: 驗證期限已超過，請重新驗證
        //  203: 手機驗證碼錯誤，請重新輸入

        // Check Cellphone Verify Status
        $verify_status = Auth::user()->cellphone_verify_status;

        if ($verify_status) { return 201; }
        else
        {
            // Get SMS Code And Expire
            $now           = Date('Y-m-d H:i:s');
            $verify_code   = Auth::user()->cellphone_verify_code;
            $verify_expire = Auth::user()->cellphone_verify_expire;

            // Check SMS Is Valid
            if ($now > $verify_expire) { return 202; }
            else
            {
                // Check Code Is Correct
                if ($code == $verify_code)
                {
                    $m_id = Auth::user()->m_id;
                    $this->updateProfileData(['cellphone_verify_status'], [true], $m_id);
                    return 101;
                }
                else { return 203; }
            }
        }
    }

    public function verifyEmailSuccess($code)
    {
        $member_data = Member::where('email_verify_code', $code)->first();
        $member_data->email_verify = true;
        $member_data->save();
    }

    public static function findAccount($account)
    {
        return Member::where('account', $account)->first();
    }

    public static function findEmail($email)
    {
        // Return Account Data Via Email To Search
        return Member::where('email', $email)->first();
    }

    public static function findPhone($phone)
    {
        // Return Account Data Via Email To Search
        return Member::where('cellphone', $phone)->first();
    }

    public static function findAccountAndEmail($account, $email)
    {
        return Member::where('account', $account)->where('email', $email)->first();
    }

    public static function findMobileAndEmail($cellphone, $email)
    {
       return Member::where('cellphone', $cellphone)->where('email', $email)->first();
    }

    public static function findOtherMemberPhoneVeritied($phone, $m_id)
    {
        // Return Account Data Via Email To Search
        return Member::where('cellphone', $phone)->where('cellphone_verify_status', 1)->where('m_id', '!=' , $m_id)->orWhereNull('m_id')->first();
    }

    public function get_teacher_by_keyword($keyword)
    {
        $lesson_data = array();
        $member_data = Member::where(function ($query) use ($keyword)
                               {
                                    $query->where('nickname', 'Like', '%' . $keyword . '%')
                                          ->orWhere('m_name', 'Like', '%' . $keyword . '%');
                               })
                               ->join('teachers', 'teachers.m_id', 'members.m_id')
                               ->where('auth_situation', 'success')
                               ->get();

        foreach ($member_data as $member)
        {
            $t_id    = Teacher::findMemberId($member->m_id)->t_id;
            $lessons = Lesson::getLessonDataViaTeacher($t_id, true);

            foreach ($lessons as $lesson)
            {
                if ((($lesson->type == 'entity') && (strtotime($lesson->start_time) > strtotime(date('Y-m-d')))) || ($lesson->type == 'online'))
                {
                    $lesson_data[] = $lesson->l_id;
                }
            }
        }

        return $lesson_data;
    }

    public function initLoginData($member_data)
    {
        Auth::login($member_data, true);
        $teacher_data = $this->teacher->findMemberId($member_data->m_id);
        $this->updateLatestLoginTime($member_data);

        if($member_data) {
            setcookie("m_id", $member_data['m_id'], time()+3600*24*365 , "/");
            setcookie("r_token", $member_data['remember_token'], time()+3600*24*365, "/");
        }
    }

    public static function isAdmin($authority)
    {
        if (Auth::check()) { return Member::user()->authority === $authority; }
        else { return false; }
    }

    public static function isBasicAdmin()
    {
        return Member::isAdmin('saigo');
    }

    public static function isMasterAdmin()
    {
        return Member::isAdmin('yoshocon');
    }

    public static function isWorker()
    {
        return Member::isAdmin('worker');
    }

    public function login($account, $password)
    {
        // Find Accuont Data
        $member_data = Member::findAccount($account);

        if (empty($member_data)) { return '帳號或密碼錯誤！'; }
        else
        {
            // Check Account And Password Is Match And Init Login Data For Auth And Session
            $password_check = $this->verifyAccount($account, $member_data->password, $password);
            return $password_check ? $this->initLoginData($member_data) : '帳號或密碼錯誤！';
        }
    }

    public function checkloginAjax($m_id, $remember_token)
    {
        $member_data = Member::checkMemberExsit($m_id, $remember_token);

        if (empty($member_data)) {

            $rtnData = array(
                'status' => 2,
                'data' => $member_data
            );

            return $rtnData;    // 會員身份有異;
        }
        else
        {
            $member_data['t_id'] = null;
            $member_data['role'] = Member::getRole($member_data['authority']);

            $teacher_data = $this->teacher->findMemberId($member_data->m_id);

            if(isset($teacher_data))
            {
                $member_data['t_id'] = $teacher_data->t_id;
                if($teacher_data->auth_situation=="success")    $member_data['role'] += 16;
            }

            $rtnData = array(
                'status' => 0,
                'data' => $member_data
            );

            return $rtnData;
        }
    }

    public function loginAjax($account, $password, $method = 'acc')
    {
        // Find Accuont Data
        switch($method) {
            case "acc":
                $member_data = Member::findAccount($account);
                break;
            case "email":
                $member_data = Member::findEmail($account);
                break;
            case "phone":
                $member_data = Member::findPhone($account);
                break;
            default:
                $member_data = Member::findAccount($account);
                break;
        }

        if (empty($member_data)) {

            $rtnData = array(
                'status' => 1,
                'data' => $member_data
            );

            return $rtnData; //'無此帳號！';
        }

        if($method=="email")
        {
            if($member_data['email_verify']!=1)     // Email 驗證過後才能使用手機登入
            {
                $rtnData = array(
                    'status' => 3,
                    'data' => null
                );

                return $rtnData;
            }
        }
        else if($method=="phone")       // 手機驗證過後才能使用手機登入
        {
            if($member_data['cellphone_verify_status']!=1)
            {
                $rtnData = array(
                    'status' => 2,
                    'data' => null
                );

                return $rtnData;
            }
        }

        // Check Account And Password Is Match And Init Login Data For Auth And Session
        $password_check = $this->verifyAccount($member_data->account, $member_data->password, $password);

        if($password_check)
        {
            $this->initLoginData($member_data);

            $member_data['t_id'] = null;
            $member_data['role'] = Member::getRole();

            $teacher_data = $this->teacher->findMemberId($member_data->m_id);

            if(isset($teacher_data))
            {
                $member_data['t_id'] = $teacher_data->t_id;
                if($teacher_data->auth_situation=="success")    $member_data['role'] += 16;
            }

            $rtnData = array(
                'status' => 0,
                'data' => $member_data
            );

            return $rtnData;
        }
        else
        {
            $rtnData = array(
                'status' => 4,
                'data' => null
            );

            return $rtnData;    //'密碼錯誤！';
        }
    }

    public function signupAjax($account, $password, $nickname, $email, $cellphone)
    {
        $checkInput = Main::checkInputValid($account, $password, $nickname, $email);

        if($checkInput!="OK") { return $checkInput; }

        // Check Account Has Not Been Registered
        if (self::accountExist($account)) { return 2;   /* 帳號已有人使用 */ }

        // Check Email And Cellphone Is Not Uesd
        if (self::verifyRepeat('email', $email)) { return 5;    /* 信箱已有人使用 */ }

        // Save Register Data
        $this->account = $account;
        $this->password = Main::encrypt($account . $password);
        $this->nickname = $nickname;
        $this->email = $email;
        $this->cellphone = $cellphone;
        $this->reg_method = 'web';
        $this->authority = $account == 'yoshocon' ? 'yoshocon' : 'passers-by';
        $this->email_verify = false;
        $this->cellphone_verify_status = false;
        $this->save();

        // Send Account Verify Email To User
        $this->sendVerifyEmail($this->m_id, $account, $email);

        return 0;
    }

    public function logout()
    {
        Auth::logout();
        setcookie("m_id", '', time()-3600 , "/");
        setcookie("r_token", '', time()-3600, "/");
        $this->main->delete_all_session_and_cache();
    }

    public function loginOauthAccount($email)
    {
        // Login Oauth Account
        // EX: Google
        $member_data = Member::findEmail($email);

        // Init Login Data For Auth And Session
        $this->initLoginData($member_data);
    }

    public function registerPlatformAccount($account, $password, $nickname, $email, $cellphone)
    {
        // Check Register Request Parameter Is Fill In
        $check = Main::checkRequestParameterIsFillIn($account, $password, $nickname, $email, $cellphone);

        if ($check) { return '請將所有欄位填寫'; }

        // Check Account Has Not Been Registered
        if (self::accountExist($account)) { return '帳號已有人使用！'; }

        // Check Email And Cellphone Is Not Uesd
        if (self::verifyRepeat('email', $email)) { return '信箱已有人使用！'; }

        if (self::verifyRepeat('cellphone', $cellphone)) { return '手機號碼已有人使用！'; }

        // Save Register Data
        $this->account = $account;
        $this->password = Main::encrypt($account . $password);
        $this->nickname = $nickname;
        $this->email = $email;
        $this->cellphone = $cellphone;
        $this->reg_method = 'web';
        $this->authority = $account == 'yoshocon' ? 'yoshocon' : 'passers-by';
        $this->email_verify = false;
        $this->cellphone_verify_status = false;
        $this->save();

        // Send Account Verify Email To User
        $this->sendVerifyEmail($this->m_id, $account, $email);

        // Login Web Via Platform
        $this->login($account, $password);
    }

    public function registerOauthAccount($provider_user, $method)
    {
        // Register Google Account For Platform
        $this->account = $provider_user->getId();
        $this->password = $this->main->encrypt($provider_user->getId() . 'dsphoto');
        $this->nickname = $provider_user->getNickname() == null ? $provider_user->getName() : $provider_user->getNickname();
        $this->email = $provider_user->getEmail();
        $this->reg_method = $method;
        $this->authority = 'passers-by';
        $this->email_verify = true;
        $this->cellphone_verify_status = false;
        $this->save();

        // Send Register Successful Email For User
        $this->sendRegisterSuccessMail($this->m_id, $provider_user->getName(), $provider_user->getEmail());
    }

    public function saveAvatarFile($ava_filename, $avatar)
    {
        $destination_path = public_path('/img/personal/avatar/');
        $explode_ava_file = explode(',', $avatar);
        $base64_ava_file  = array_pop($explode_ava_file);
        $ava_file         = base64_decode($base64_ava_file);

        if (file_exists($destination_path . $ava_filename)) { unlink($destination_path . $ava_filename); }

        file_put_contents($destination_path . $ava_filename, $ava_file);
        $member_data = Member::user();
        $member_data->avg_img = $ava_filename;
        $member_data->save();
    }

    public function sendCellphoneVerificationCode($cellphone)
    {
        // Create A Rand Code To Send
        $rand_code = rand(100000, 999999);
        $text      = "您的驗證碼為：$rand_code";

        // Send Cellphone SMS
        $message = SMS::send($cellphone, $text);

        // Save SMS Code To Member Data And Return Send Status
        if ($message == 101)
        {
            $this->saveSMSCodeData($rand_code, $cellphone);
            return '驗證碼已發送';
        }
        else { return $message; }
    }

    public function sendCellphoneVerificationCodeAjax($cellphone, $m_id)
    {
        // Create A Rand Code To Send
        $rand_code = rand(100000, 999999);
        $text      = "您的驗證碼為：$rand_code";

        // Send Cellphone SMS
        $message = SMS::send($cellphone, $text);

        // Save SMS Code To Member Data And Return Send Status
        if ($message == 101)
        {
            $this->saveSMSCodeDataAjax($rand_code, $m_id);
        }

        return $message;
    }

    public function saveBankData($request)
    {
        if (Auth::check())
        {
            $member_data = Member::user();
            $member_data->bank_number = $request->bank_id;
            $member_data->account_number = $request->bank_accounting;
            $member_data->account_name = $request->bank_accounting_name;
            $member_data->save();
            return 'ok';
        }
    }

    public function saveSMSCodeData($code, $cellphone)
    {
        $m_id   = Member::where('cellphone', $cellphone)->first()->m_id;
        $expire = date('Y-m-d H:i:s', strtotime('+610 seconds'));
        $keys   = ['cellphone_verify_code', 'cellphone_verify_expire', 'cellphone_verify_status'];
        $values = [$code, $expire, false];
        $this->updateProfileData($keys, $values, $m_id);
    }

    public function sendRegisterSuccessMail($m_id, $account, $email)
    {
        $data =
        [
            'account' => $account,
            'domain'  => $_SERVER['HTTP_HOST']
        ];
        $this->main->send_email($data, 'site.layout.congrat_mail', $email, '【大俠學習平台】歡迎加入大俠學習平台！', 1);
    }

    public function sendVerifyEmail($m_id, $account, $email)
    {
        // Generate Verify Code
        $code = md5(uniqid($m_id . time() . $m_id));

        // Save Verify Code
        $member_data  = Member::find($m_id);
        $member_data->email_verify_code = $code;
        $member_data->save();

        // Make Email Data And Send
        $data =
        [
            'code'    => $code,
            'account' => $account,
            'domain'  => $_SERVER['HTTP_HOST']
        ];
        $this->main->send_email($data, 'site.layout.mail', $email, '【大俠學習平台】註冊驗證信', 1);
    }

    public function updateLatestLoginTime($member_data)
    {
        $member_data->last_online_time = date('Y-m-d H:i:s');
        $member_data->save();
    }

    public function updateProfileData($keys, $values, $m_id)
    {
        // Get Member Data
        $member_data = Member::find($m_id);

        if (!$member_data) { return '請先登入'; }

        // Get Request Key
        $must = ['nickname', 'cellphone', 'email'];

        foreach ($keys as $key => $value)
        {
            if (!is_bool(array_search($value, $must)))
            {
                // Check Register Request Parameter Is Fill
                $check = Main::checkRequestParameterIsFillIn($values[$key]);

                if ($check)
                {
                    switch ($value)
                    {
                        case 'nickname': return '暱稱為必填';
                        case 'cellphone': return '手機為必填';
                        case 'email': return '信箱為必填';
                    }
                }
            }

            if ($value == 'cellphone')
            {
                // Check Cellphone Is Repeat
                $check = Member::verifyRepeat('cellphone', $values[$key]);

                if ($check) { return '手機號碼已有人使用！'; }
                else
                {
                    // If Save New Cellphone Will Cancel Cellphone Verify Status
                    if ($values[$key] != $member_data->cellphone) { self::updateProfileData(['cellphone_verify_status'], [false], $member_data->m_id); }
                }
            }

            // Let ID Code Encrypt
            if ($value == 'id_code') { $values[$key] = Crypt::encrypt($values[$key]); }

            // If Data Is Valid Will Be Save
            $member_data[$value] = $values[$key] ?? null;
        }

        $member_data->save();
    }

    public function updateEmail($email)
    {
        $member_data = Member::user();
        $member_data->email = $email;
        $member_data->save();
    }

    public function updateReceipt($mode, $receipt, $m_id = null)
    {
        if (($mode != 'receipt_elec') && ($mode != 'free'))
        {
            $member_data        = is_null($m_id) ? Member::user() : Member::find($m_id);
            $member_data[$mode] = $receipt;
            $member_data->save();
        }
    }

    public function updateData($request)
    {
        self::where('m_id', '=', $request->id)->update([$request->column => $request->data]);
        return 'ok';
    }

    public function updateDataForTeacher($m_id, $m_name, $sex)
    {
        self::where('m_id', '=', $m_id)->update(["m_name" => $m_name ,"sex" => $sex]);
        return 0;
    }

    public static function user()
    {
        return Auth::user() ?? null;
    }

    public static function verifyRepeat($item, $data)
    {
        // Check Profile Data Is Not Use
        // EX: email, cellphone
        $account     = self::user()->account ?? false;
        $member_data = self::where($item, $data)->first();

        if (!empty($member_data))
        {
            // Check Input Data Is Not Own
            if ($member_data->account != $account) { return $item . ' error'; }
        }

        return false;
    }

    public function verifyAccount($account, $decript_password, $password)
    {
        $decrypt = Main::decrypt($decript_password);
        return $decrypt === $account . $password;
    }

    public static function getMemberData($m_id, $key)
    {
        return Member::whereIn('m_id', $m_id)->select($key)->get();
    }

    public static function getMemberPhoneCodeDuration($m_id, $remember_token)
    {
        $memberdata = Member::where('m_id', $m_id)->where('remember_token', $remember_token)->first();

        $totalSeconds = -1;
        $nowTime = date("Y-m-d H:i:s");

        if($memberdata['cellphone_verify_expire']!='')
        {
            if($memberdata['cellphone_verify_expire'] >= $nowTime)
            {
                $datetime1 = date_create($memberdata['cellphone_verify_expire']);
                $datetime2 = date_create($nowTime);
                $date_diff = date_diff($datetime1, $datetime2);
                $totalSeconds = $date_diff->format("%S")
                    + $date_diff->format("%I") * 60
                    + $date_diff->format("%H") * 60 * 60
                    + $date_diff->format("%D") * 60 * 60 * 24;
            }
            else
            {
                $totalSeconds = 0;
            }
        }

        return $totalSeconds;
    }

    public static function checkPhoneVerificationCode($m_id, $remember_token, $code)
    {
        $memberdata = Member::where('m_id', $m_id)->where('remember_token', $remember_token)->first();

        if($memberdata->cellphone_verify_code==$code) {
            $memberdata->cellphone_verify_status = 1;
            $memberdata->save();
            return true;
        }
        else {
            return false;
        }

    }

    public static function checkMemberExsit($m_id, $remember_token)
    {
        return Member::where('m_id', $m_id)->where('remember_token', $remember_token)->first();
    }

    public function checkMemberIsExistById($m_id)
    {
        return empty(Member::find($m_id)) ? false : true;
    }

    public function saveSMSCodeDataAjax($code, $m_id)
    {
        $member_data = Member::find($m_id);
        $expire = date('Y-m-d H:i:s', strtotime('+610 seconds'));
        $keys   = ['cellphone_verify_code', 'cellphone_verify_expire', 'cellphone_verify_status', 'cellphone_verify_count'];
        $values = [$code, $expire, false, $member_data->cellphone_verify_count+1];
        $this->updateProfileData($keys, $values, $m_id);
    }

    public static function verifyEmailOthers($m_id, $data)
    {
        if ($data!='')
        {
            // Remove all illegal characters from email
            $email = filter_var($data, FILTER_SANITIZE_EMAIL);

            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                return 2;
            }

            $new_member_data = self::where("email", $data)->where('m_id','!=',$m_id)->where('email_verify', 1)->first();

            if (!empty($new_member_data))
            {
                // Check Input Data Is Not Own
                return 3;
            }

            return false;
        }
        else
        {
            return 2;
        }
    }

    public function sendEmailValidationAjax($m_id, $account, $email)
    {
        // Generate Verify Code
        $code = md5(uniqid($m_id . time() . $m_id));

        // Save Verify Code
        $member_data  = Member::find($m_id);
        $member_data->email_verify_code = $code;
        $member_data->email = $email;

        $member_data->save();

        // Make Email Data And Send
        $data =
            [
                'code'    => $code,
                'account' => $account,
                'domain'  => $_SERVER['HTTP_HOST']
            ];

        $this->main->send_email($data, 'site.layout.mail', $email, '【大俠學習平台】註冊驗證信', 1);

        return 0;
    }

    public function saveAvatarFileAjax($request, $ava_filename, $avatar, $m_id)
    {
        $destination_path = public_path('/img/personal/avatar/');

        $src_img = $destination_path . "tmp.jpeg";
        $dest_img = $destination_path . $ava_filename;

        $rotate = $request->rotate;
        $flip = $request->flip ?? false;
        $dst_w = $request->width;
        $dst_h = $request->height;
        $src_x = $request->left;
        $src_y = $request->top;

        if (file_exists($destination_path . $ava_filename)) { unlink($destination_path . $ava_filename); }
        file_put_contents($src_img, $avatar);

        list($src_w, $src_h, $type, $attr) = getimagesize($src_img);

        $dst_scale = $dst_h/$dst_w; //目标图像长宽比
        $src_scale = $src_h/$src_w; //原图长宽比

        if ($src_scale>=$dst_scale)
        {
            // 过高
            $w = intval($src_w);
            $h = intval($dst_scale*$w);

            $x = 0;
            $y = ($src_h - $h)/3;
        }
        else
        {
            // 过宽
            $h = intval($src_h);
            $w = intval($h/$dst_scale);

            $x = ($src_w - $w)/2;
            $y = 0;
        }

        // 剪裁
        switch ($type) {
            // 1 = GIF，2 = JPG，3 = PNG
            case 1:
                $source = imagecreatefromjpeg($src_img);
                break;
            case 2:
                $source = imagecreatefromjpeg($src_img);
                break;
            case 3:
                $source = imagecreatefrompng($src_img);
                break;
            default:
                $result['status'] = 2;
                $result['data'] = null;
                return $result;
                break;
        }
        // Flip it horizontally
        if($flip)   imageflip($source, IMG_FLIP_HORIZONTAL);

        // Rotate
        $source = imagerotate($source, $rotate, 0);

        $croped = imagecreatetruecolor($dst_w, $dst_h);
        imagecopy($croped, $source, 0, 0, $src_x, $src_y, $dst_w, $dst_h);

        // 保存
        imagejpeg($croped, $dest_img);
        imagedestroy($croped);
        unlink($src_img);

        $member_data = Member::find($m_id);
        $member_data->avg_img = $ava_filename;
        $member_data->save();

        $result['status'] = 0;
        $result['data'] = $ava_filename;
        return $result;
    }

    public function updatePasswordAjax($m_id, $old_password, $new_password)
    {
        $member_data = Member::find($m_id);
        $password_check = $this->verifyAccount($member_data->account, $member_data->password, $old_password);

        if ($password_check)
        {
            $member_data->password = $this->main->encrypt($member_data->account . $new_password);
            $member_data->save();

            return 0;
        }
        else
        {
            return 2;
        }
    }

    public function updateBankInfoAjax($m_id, $bank_number, $account_name, $account_number)
    {
        $member_data = Member::find($m_id);

        if ($member_data)
        {
            $member_data->bank_number = $bank_number;
            $member_data->account_number = $account_number;
            $member_data->account_name = $account_name;
            $member_data->save();

            return 0;
        }
        else
        {
            return 1;
        }
    }
}
