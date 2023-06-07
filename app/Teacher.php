<?php

namespace App;

use \Auth;
use App\Click;
use App\Lesson;
use App\Main;
use App\Member;
use App\Order;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    protected $primaryKey = 't_id';

    private $click;
    private $lesson;
    private $main;
    private $order;

    public function __construct()
    {
        $this->click     = new Click();
        $this->lesson    = new Lesson();
        $this->main      = new Main();
        $this->order     = new Order();
    }

    public static function isTeacher()
    {
        return (self::data()->auth_situation ?? null) == 'success' ? true : false;
    }

    public function changeTeacherPortfolios($portfolios)
    {
        $teacher_data = self::data();

        if ($teacher_data)
        {
            $teacher_data->portfolios = $portfolios;
            $teacher_data->save();
            return true;
        }
        else { return false; }

    }

    public function check_rule()
    {
        $t_id         = $this->teacher->data()->t_id;
        $teacher_data = self::find($t_id);

        if ($teacher_data->check_rule == false)
        {
            $teacher_data->check_rule = true;
            $teacher_data->save();
        }

        return;
    }

    public static function data()
    {
        return Auth::check() ? self::findMemberId(Member::user()->m_id) ?? null : null;
    }

    /**
     * [get_all_teacher_name]
     * @param  integer         $start_num [start getting datas from $start_num]
     * @param  integer.boolean $max_num   [getting $max_num datas]
     * @param  boolean         $init      [getting datas first]
     * @param  array           $except    [except $except]
     * @return [array]                    [teachers' name of array]
     */
    public function get_all_teacher_name($start_num = 0, $max_num = false, $init = false, $except = [])
    {
        $data       = [];
        $member     = new Member();
        $query;
        $teacher_id = self::where('auth_situation', 'success')->pluck('m_id');

        if ($init) { $data['max'] = self::where('auth_situation', 'success')->count(); }

        $query = $member::orderby('nickname', 'ASC')
                        ->whereIn('m_id', $teacher_id);

        if (count($except) !== 0) { $query = $query->WhereNotIn('nickname', $except); }

        $teacher_name = $query->offset(is_bool($start_num) ? 0 : $start_num)
                              ->limit(is_bool($max_num) ? $data['max'] : $max_num)
                              ->get();

        foreach ($teacher_name as $key => $value) {
            $data['teacher_name'][$key]['nickname'] = $value->nickname;
            $data['teacher_name'][$key]['m_name']   = $value->m_name;
        };

        return $data;
    }

    public function get_all_teacher_popular($start_num = 0, $max_num = false)
    {
        $data    = [];
        $t_id    = [];
        $m_id    = [];
        $t_rank  = [];
        $popular = [];
        $click   = new Click();
        $member  = new Member();

        if (is_bool($max_num) || $max_num === 0) { $click_count = $click::where('item', '=', 'teacher')->count(); }

        $popular = $click::selectRaw('number AS t_id, count(*) AS click_count')
                         ->where('item', '=', 'teacher')
                         ->groupBy('number')
                         ->orderby('click_count', 'DESC')
                         ->orderby('number', 'ASC')
                         ->offset(is_bool($start_num) ? 0 : $start_num)
                         ->limit(is_bool($max_num) ? $click_count : $max_num)
                         ->get()->pluck('t_id');

        $teachers_data = DB::table('teachers')
                           ->join('members', 'teachers.m_id', '=', 'members.m_id')
                           ->select('teachers.t_id', 'teachers.m_id', 'members.nickname', 'members.m_name')
                           ->whereIn('teachers.t_id', $popular)
                           ->get();

        foreach ($teachers_data as $key => $value) {
            $data[$key]['nickname'] = $value->nickname;
            $data[$key]['m_name']   = $value->m_name;
        }

        return $data;
    }

    public function checkPopTeachersSave()
    {
        $popular = [];
        $sort2_num = 0;
        $click   = new Click();
        $member  = new Member();

        $popular = $click::selectRaw('number AS t_id, count(*) AS click_count')
                         ->where('item', '=', 'teacher')
                         ->groupBy('number')
                         ->orderby('click_count', 'DESC')
                         ->orderby('number', 'ASC')
                         ->get()->pluck('t_id');

        DB::table('teachers')->update(['sort2' => NULL, 'sort2_updatetime' => NULL]);

        foreach ($popular as $t_id)
        {
            $sort2_num++;

            DB::table('teachers')->where('t_id', $t_id)
                ->update(['sort2' => $sort2_num, 'sort2_updatetime' => date("Y-m-d H:i:s")]);
        }

        $sort2_num++;
        DB::table('teachers')->whereNull('sort2')
            ->update(['sort2' => $sort2_num, 'sort2_updatetime' => date("Y-m-d H:i:s")]);

        return $popular;
    }

    public function get_all_teacher_singal_data($parameter)
    {
        return self::all()->pluck($parameter);
    }

    public function get_correct_teacher()
    {
        return self::where('check_rule', true)->get();
    }

    public function get_review_teacher_data()
    {
        return self::where('auth_situation', 'review')->get();
    }

    public function getRollcallNeedTeacherList()
    {
        return  DB::table('teachers')
                  ->select('t_id', 'members.m_name', 'members.nickname')
                  ->leftjoin('members', 'members.m_id', 'teachers.m_id')
                  ->where('auth_situation', 'success')
                  ->get();
    }

    public static function findMemberId($m_id)
    {
        return self::where('m_id', $m_id)->first();
    }

    public function getPublicTeacherData()
    {
        $teacher_data      = array();
        $teacher_temp_data = self::where('auth_situation', 'success')
                                 ->where('check_rule', true)
                                 ->join('members', 'members.m_id', 'teachers.m_id')
                                 ->get();

        foreach ($teacher_temp_data as $teacher)
        {
            $teacher_data[$teacher->t_id] = $teacher;
            $teacher_data[$teacher->t_id]->member_data = Member::find($teacher->m_id);
        }

        return $teacher_data;
    }

    public function getTeacherPortfolios($t_id)
    {
        return self::find($t_id)->portfolios;
    }

    public function mix_teacher_and_member_data($teacher_data, $member_data)
    {
        foreach ($teacher_data as $key => $value)
        {
            for ($j = 0; $j < count($member_data); $j++)
            {
                if ($teacher_data[$key]['m_id'] == $member_data[$j]['m_id'])
                {
                    $teacher_data[$key]['member_data'] = $member_data[$j];
                    break;
                }
            }
        }
        return $teacher_data;
    }

    public function modify_teacher_detail($t_id, $item, $intro, $link)
    {
        $teacher_data = self::find($t_id);

        switch ($item)
        {
            case 'intro':
                $teacher_data->intro_exp = $intro;
                $teacher_data->intro_link = $link;
                break;
            case 'works':
                $teacher_data->works_exp = $intro;
                $teacher_data->works_link = $link;
                break;
            case 'book':
                $teacher_data->book_exp = $intro;
                $teacher_data->book_link = $link;
                break;
            case 'certificate':
                $teacher_data->certificate_exp = $intro;
                $teacher_data->certificate_link = $link;
                break;
            case 'awards':
                $teacher_data->awards_exp = $intro;
                $teacher_data->awards_link = $link;
                break;
            case 'repo':
                $teacher_data->repo_exp = $intro;
                $teacher_data->repo_link = $link;
                break;
            case 'pub':
                $teacher_data->pub_exp = $intro;
                $teacher_data->pub_link = $link;
                break;
            case 'teach':
                $teacher_data->teach_exp = $intro;
                break;
            case 'type':
                $teacher_data->teach_type = $intro;
                break;
        }

        $teacher_data->save();
    }

    public function refuel_become_teacher()
    {
        $t_id         = self::data()->t_id;
        $teacher_data = self::find($t_id);

        if ($teacher_data->auth_situation == 'fail')
        {
            $teacher_data->auth_situation = 'refuel';
            $teacher_data->save();
        }
    }

    //public function becometeacher($request, $teacher_data, $m_id)
    public function update_become_teacher_data($request, $teacher_data, $m_id)
    {
        $teacher_data->m_id = $m_id;
        $teacher_data->edu_school = $request->edu_school;
        $teacher_data->edu_dapartment = $request->edu_dapartment;
        $teacher_data->edu_degree = $request->edu_degree;
        $teacher_data->intro_exp = nl2br($request->intro_exp);
        $teacher_data->intro_link = $request->intro_link;
        $teacher_data->works_exp = nl2br($request->works_exp);
        $teacher_data->works_link = $request->works_link;
        $teacher_data->book_exp = nl2br($request->book_exp);
        $teacher_data->book_link = $request->book_link;
        $teacher_data->certificate_exp = nl2br($request->certificate_exp);
        $teacher_data->certificate_link = $request->certificate_link;
        $teacher_data->awards_exp = nl2br($request->awards_exp);
        $teacher_data->awards_link = $request->awards_link;
        $teacher_data->repo_exp = nl2br($request->repo_exp);
        $teacher_data->repo_link = $request->repo_link;
        $teacher_data->pub_exp = nl2br($request->pub_exp);
        $teacher_data->pub_link = $request->pub_link;
        $teacher_data->teach_type = nl2br($request->teach_type);
        $teacher_data->teach_exp = nl2br($request->teach_exp);
        $teacher_data->auth_situation = 'review';
        $teacher_data->save();
        return;
    }

    public function update_teacher_data_after_audit($m_id, $audit_result, $audit_reason, $member_account)
    {
        $teacher_data = $this->findMemberId($m_id);
        $teacher_data->auth_situation = $audit_result;
        $teacher_data->audit_reason = $audit_reason;
        $teacher_data->audit_member = $member_account;
        $teacher_data->audit_time = date('Y-m-d H:i:s');
        $teacher_data->check_rule = $audit_result == 'fail' ? false : true;
        $teacher_data->save();
        return 'success';
    }

    public function getTeacherLesson($t_id, $l_id)
    {
        return  DB::table('lessons')
            ->select('t_id', 'l_name', 'l_sub_name')
            ->where('t_id', $t_id)
            ->where('l_id', $l_id)
            ->get();
    }

    public function getTeachersAjax($mode, $startIndex, $limitNum)
    {
        // Get Teacher Data
        $teacher_data = array();

        $teachers_data = DB::table('teachers')
            ->join('members', 'teachers.m_id', '=', 'members.m_id')
            ->select('teachers.t_id', 'teachers.intro_exp', 'teachers.teach_type', 'members.nickname', 'members.avg_img', 'members.m_name', 'members.last_online_time');

        if($mode == 1)
        {
            $teachers_data = $teachers_data
                ->where('auth_situation', 'success')
                ->whereNotNull('sort')
                ->orderBy('sort', 'ASC');
        }
        elseif($mode == 0)
        {
            $teachers_data = $teachers_data
                ->where('auth_situation', 'success')
                ->whereNotNull('sort2')
                ->orderBy('sort2', 'ASC')
                ->orderBy('last_online_time', 'ASC');
        }

        // if limit = 0 default to get all the data
        if ($limitNum == false) {
            $max_num = $teachers_data->count();
        }

        $teachers_data = $teachers_data->offset(is_bool($startIndex) ? 0 : $startIndex)
            ->limit((is_bool($limitNum) || ($limitNum == 0)) ? $max_num : $limitNum)
            ->get();

        foreach ($teachers_data as $key => $value)
        {
            $data[$key]['t_id']     = $value->t_id;
            $data[$key]['m_name']   = $value->m_name;
            $data[$key]['nickname'] = $value->nickname;
            $data[$key]['avg_img']  = $value->avg_img;
            $data[$key]['intro_exp'] = $value->intro_exp;
            $data[$key]['teach_type'] = $value->teach_type;
        }

        return $teachers_data;
    }

    public function updateTeacherDetailAjax($request, $teacher_data)
    {
        $teacher_data->m_id             = $request->m_id;
        $teacher_data->edu_school       = $request->edu_school;
        $teacher_data->edu_dapartment   = $request->edu_dapartment;
        $teacher_data->edu_degree       = $request->edu_degree;
        $teacher_data->intro_exp        = $request->intro_exp;
        $teacher_data->teach_type       = $request->teach_type;
        $teacher_data->teach_exp        = $request->teach_exp;

        $request->book_exp          ? $teacher_data->book_exp = $request->book_exp : '';
        $request->certificate_exp   ? $teacher_data->certificate_exp = $request->certificate_exp : '';
        $request->awards_exp        ? $teacher_data->awards_exp = $request->awards_exp : '';
        $request->repo_exp          ? $teacher_data->repo_exp = $request->repo_exp : '';
        $request->pub_exp           ? $teacher_data->pub_exp = $request->pub_exp : '';
        $request->work_exp          ? $teacher_data->work_exp = $request->work_exp : '';

        $request->mode == 1         ? $teacher_data->works_exp = $request->works_exp: '';
        $request->mode == 1         ? $teacher_data->auth_situation = 'review': '';

        $teacher_data->save();

        return 0;
    }

    public function updatePortfoliosAjax($portfolios, $teacher_data)
    {
        $teacher_data->portfolios = $portfolios;
        $teacher_data->save();

        return 0;
    }
}