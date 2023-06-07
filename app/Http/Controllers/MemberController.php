<?php

namespace App\Http\Controllers;

use \Auth;
use Cache;
use Carbon\Carbon;
use Crypt;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Input;
use Socialite;
use View;

class MemberController extends Controller
{
    public function register(Request $request)
    {
        // Get Register Request Parameter
        $account   = $request->account;
        $password  = $request->password;
        $nickname  = $request->nickname;
        $email     = $request->email;
        $cellphone = $request->cellphone;

        // Register A Platform Account
        $message = $this->member->registerPlatformAccount($account, $password, $nickname, $email, $cellphone);
        return response()->json($message, $message ? 202 : 200);
    }

    public function loginViaGoogle()
    {
        // Remember Previous Page In Order To Back Original Page
//        session()->put('url', url()->previous());
        session()->put('google_back_url', url()->previous());
        return Socialite::driver('google')
            ->with([
                'access_type'   => 'offline',
                'prompt'        => 'consent select_account'
            ])
            ->redirect();
    }

    public function loginViaGoogle_1080928()
    {
        // Check Google Account Has Been Login
        if (Auth::check())
        {
            // Back Previous Page If Was Login
            return redirect()->back();
        }
        else
        {
            // Remember Previous Page In Order To Back Original Page
            session()->put('url', url()->previous());
            return Socialite::driver('google')
                            ->with([
                                'access_type' => 'offline',
                                'prompt'      => 'consent select_account'
                            ])->redirect();
        }
    }

    public function google_login_callback()
    {
        // Check User Is Not Login
        if (!Auth::check())
        {
            $provider_user = Socialite::driver('google')->stateless()->user();

            if (is_bool($this->member->verifyRepeat('email', $provider_user->getEmail())))
            {
                // Check Google Account Has Been Registered And Login
                $this->member->registerOauthAccount($provider_user, 'google');
                $this->member->loginOauthAccount($provider_user->getEmail());
                session()->flash('oauth_register', 'ok');
            }
            else
            {
                // Login Google Account
                $this->member->loginOauthAccount($provider_user->getEmail());
                $member_data = $this->member->findEmail($provider_user->getEmail());

                if($member_data) {
                    setcookie("m_id", $member_data['m_id'], time()+3600*24*365 , "/");
                    setcookie("r_token", $member_data['remember_token'], time()+3600*24*365, "/");
                }
            }

            // Get Session Previous Data
            $google_back_url = session()->get('google_back_url', '/');
        }
        else
        {
            $provider_user = Socialite::driver('google')->stateless()->user();
            $member_data = $this->member->findEmail($provider_user->getEmail());

            if($member_data) {
                setcookie("m_id", $member_data['m_id'], time()+3600*24*365 , "/");
                setcookie("r_token", $member_data['remember_token'], time()+3600*24*365, "/");
            }

            // Get Session Previous Data
            $google_back_url = session()->get('google_back_url', '/');
        }

        // Back Previous Page
        return redirect($redirect ?? session()->get('url', '/'));
        //return redirect($google_back_url ?? '/' );
    }

    public function google_login_callback_1080928()
    {
        // Check User Is Not Login
        if (!Auth::check())
        {
            $provider_user = Socialite::driver('google')->stateless()->user();

            if (is_bool($this->member->verifyRepeat('email', $provider_user->getEmail())))
            {
                // Check Google Account Has Been Registered And Login
                $this->member->registerOauthAccount($provider_user, 'google');
                $this->member->loginOauthAccount($provider_user->getEmail());
                session()->flash('oauth_register', 'ok');
            }
            else
            {
                // Login Google Account
                $this->member->loginOauthAccount($provider_user->getEmail());
                $member_data = $this->member->findEmail($provider_user->getEmail());

                if($member_data) {
                    setcookie("m_id", $member_data['m_id'], time()+3600*24*365 , "/");
                    setcookie("r_token", $member_data['remember_token'], time()+3600*24*365, "/");
                }
            }

            // Get Session Previous Data
            $previous_url = "/";    //session()->get('previous_url', '');

            if ($previous_url) { $redirect = $previous_url; }
            else { $redirect = session()->get('url', '/'); }

            session()->forget('url', 'previous_url');
        }

        // Back Previous Page
        return redirect($redirect ?? session()->get('url', '/'));
    }

    public function login(Request $request)
    {
        // Login Platform Account
        $result = $this->member->login($request->account, $request->password);

        if ($result) { return response()->json($result); }
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

    public function logout()
    {
        // Logout Account And Back Homepage
        $this->member->logout();
        return redirect('/');
    }
}
