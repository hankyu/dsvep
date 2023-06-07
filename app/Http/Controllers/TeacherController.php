<?php

namespace App\Http\Controllers;

use \Auth;
use App\Teacher;
use Carbon\Carbon;
use Crypt;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Input;
use View;

class TeacherController extends Controller
{
    public function teacherAccountingPage()
    {
        // If Teacher Audit Pass Will Can Watch Lesson Income
        $authority = $this->teacher->data()->auth_situation;
        $nickname  = $this->member->user()->nickname;

        if ($authority === 'success')
        {
            return View::make('site.teacher.accounting.layout')->with('title', "$nickname 的課程收益");
        }
        else { \App::abort(404); }
    }

    public function rollcall_report()
    {
        if (!empty($this->teacher->data()))
        {
            if ($this->teacher->data()->auth_situation == 'success')
            {
                return View::make('site.teacher.rollcall-report')
                           ->with('title', '課程學員出席');
            }
            else { \App::abort(404); }
        }
        else { \App::abort(404); }
    }

    public function create_lesson()
    {
        if (isset($this->teacher->data()->auth_situation))
        {
            $auth = $this->teacher->data()->auth_situation == 'success' ? 'ok' : '9487';

            if ($auth == '9487') { \App::abort(404); }
            else
            {
                return View::make('site.teacher.create-lesson.create')
                  ->with('title', '新增課程說明');
            }
        }
        else { \App::abort(404); }
    }

    public function create_lesson_manage_audit($id)
    {
        $lesson_situation = $this->lesson->find($id)->apply_situation ?? null;

        if ($lesson_situation != null)
        {
            if ($this->lesson->find($id)->delete_lesson == false)
            {
                if ($lesson_situation == 'audit')
                {
                    return View::make('site.teacher.create-lesson.create-audit')
                      ->with('title', '課程審核中');
                }
                else { return redirect('teacher/lesson/manage/' . $id . '/info'); }
            }
            else { \App::abort(404); }
        }
        else { \App::abort(404); }
    }

    public function create_lesson_manage_chapter($id)
    {
        $lesson_data = $this->lesson->find($id);
        $worker_t_id = $this->teacher->data()->t_id ?? null;

        if ($lesson_data != '')
        {
            if ($lesson_data->apply_situation == 'audit') { return redirect('teacher/lesson/manage/' . $id . '/audit'); }
            else if (($lesson_data->t_id != $worker_t_id) && (!$this->member->isWorker())) { \App::abort(404); }
            else if ($lesson_data->delete_lesson == true) { \App::abort(404); }
            else
            {
                $unit_data  = $this->unit->getUnitData($id);
                $unit_array = $this->unit->no_br_lesson_data($this->unit->sort_chapter($unit_data, $lesson_data->type), $lesson_data->type);
                return View::make('site.teacher.create-lesson.create-lesson-chapter')
                  ->with('title', '創建課程 / 章節編排')
                  ->with('lesson_data', $lesson_data)
                  ->with('unit_data', $unit_array)
                  ->with('account', $this->member->find($this->teacher->find($lesson_data->t_id)->m_id)->account)
                  ->with('step', '章節編排')
                  ->with('step_num', 'step_4');
            }
        }
        else { \App::abort(404); }
    }

    public function createLessonManageChapterSave($id, Request $request)
    {
        if (isset($request->del_all))
        {
            if ($this->lesson->find($id)->pub_situation) { $message = 'fail'; }
            else
            {
                $this->unit->deleteAllUnit($id);
                $message = 'ok';
            }
        }
        else
        {
            $lesson_type = $this->lesson->find($id)->type ?? null;

            if ($lesson_type == 'entity')
            {
                $message = $this->unit->addEntityUnitData($id, $request->unit);
            }
            else if ($lesson_type == 'online')
            {
                $this->unit->update_unit_data_about_online($request->unit, $request->unit_id, $request->unit_new_id, $request->unit_pos, $id);
                $this->unit->add_unit_data_about_online($id, $request->unit, $request->unit_id, $request->unit_new_id, $request->unit_pos);
                $message = 'ok';
            }
        }

        $this->lesson->check_worker_edit($id);
        return response()->json([
            'success' => $message ?? 'false'
        ]);
    }

    public function create_lesson_manage_chapter_upload_video($id, Request $request)
    {
        $unit_id          = $request->unit_id;
        $chapter_id       = $request->chapter_id;
        $pos_unit_id      = $request->pos_unit_id;
        $pos_chapter_id   = $request->pos_chapter_id;
        $destination_path = public_path('/media/' . $id . '/lesson/');
        $file = $_FILES['media_' . $pos_unit_id . '_' . $pos_chapter_id];

        if ((isset($file)) && (($file['error'] == 0) || (($file['error'] == 4))))
        {
            $media_filename = $file['name'];

            if ($media_filename != '')
            {
                //Crtpto Video Name
                $media_filename_crypto = $this->unit->encrypt_video_name($media_filename);
                $this->unit->save_chapter_video($id, $media_filename_crypto, $file['tmp_name']);

                //Get Video Length
                $video_length = $this->unit->get_video_length($destination_path . $media_filename_crypto);

                //Upload Video Preview Image
                $image_url = $this->unit->upload_video_thumbnail_to_imgur($request->image_base64);

                //Video Detail Save
                $unit_data = $this->unit->get_unit_1_data_via_c_id($id, $unit_id, $chapter_id);
                $unit_data->c_video = $media_filename_crypto;
                $unit_data->c_video_length = $video_length;
                $unit_data->image_url = $image_url;
                $unit_data->save();
                $message = 'ok';
            }
            else { $message = 'ok'; }
        }
        else if ($file['error'] != 0)
        {
            $message    = 'fail';
            $error_code = $file['error'];
        }

        return response()->json([
            'success'    => $message,
            'error_code' => $error_code ?? ''
        ]);
    }

    public function create_lesson_manage_detail($id)
    {
        $lesson_data = $this->lesson->find($id);
        $worker_t_id = $this->teacher->data()->t_id ?? null;

        if ($lesson_data != '')
        {
            if ($lesson_data->apply_situation == 'audit') { return redirect('teacher/lesson/manage/' . $id . '/audit'); }
            else if (($lesson_data->t_id != $worker_t_id) && (!$this->member->isWorker())) { \App::abort(404); }
            else if ($lesson_data->delete_lesson == true) { \App::abort(404); }
            else
            {
                return View::make('site.teacher.create-lesson.create-lesson-detail')
                  ->with('title', '創建課程 / 上課資訊')
                  ->with('lesson_data', $lesson_data)
                  ->with('account', $this->member->find($this->teacher->find($lesson_data->t_id)->m_id)->account)
                  ->with('step', '上課資訊')
                  ->with('step_num', 'step_3');
            }
        }
        else { \App::abort(404); }
    }

    public function create_lesson_manage_detail_save($id, Request $request)
    {
        $this->lesson->update_lesson_data($id, $request);
        $this->lesson->check_worker_edit($id);
        return response()->json([
            'success' => 'ok'
        ]);
    }

    public function create_lesson_manage_goal($id)
    {
        $lesson_data = $this->lesson->find($id);
        $worker_t_id = $this->teacher->data()->t_id ?? null;

        if ($lesson_data != '')
        {
            if ($lesson_data->apply_situation == 'audit') { return redirect('teacher/lesson/manage/' . $id . '/audit'); }
            else if (($lesson_data->t_id != $worker_t_id) && (!$this->member->isWorker())) { \App::abort(404); }
            else if ($lesson_data->delete_lesson == true) { \App::abort(404); }
            else
            {
                $goal_condition_data = $this->goal->getLessonGoalData($id, 'condition');
                $goal_suit_data      = $this->goal->getLessonGoalData($id, 'suit');
                $goal_learn_data     = $this->goal->getLessonGoalData($id, 'learn');
                return View::make('site.teacher.create-lesson.create-lesson-goal')
                  ->with('title', '創建課程 / 課程目標')
                  ->with('lesson_data', $lesson_data)
                  ->with('account', $this->member->find($this->teacher->find($lesson_data->t_id)->m_id)->account)
                  ->with('goal_condition_data', $goal_condition_data)
                  ->with('goal_suit_data', $goal_suit_data)
                  ->with('goal_learn_data', $goal_learn_data)
                  ->with('step', '課程目標')
                  ->with('step_num', 'step_2');
            }
        }
        else { \App::abort(404); }
    }

    public function create_lesson_manage_goal_save($id, Request $request)
    {
        $goal_condition_data = $this->goal->getLessonGoalData($id, 'condition');
        $goal_suit_data      = $this->goal->getLessonGoalData($id, 'suit');
        $goal_learn_data     = $this->goal->getLessonGoalData($id, 'learn');
        $this->goal->add_goal_data($id, 'condition', $goal_condition_data, $request->condition, $request->condition_id);
        $this->goal->add_goal_data($id, 'suit', $goal_suit_data, $request->suit, $request->suit_id);
        $this->goal->add_goal_data($id, 'learn', $goal_learn_data, $request->learn, $request->learn_id);
        $this->lesson->check_worker_edit($id);
        return response()->json([
            'success' => 'ok'
        ]);
    }

    public function create_lesson_manage_index($id)
    {
        return redirect('teacher/lesson/manage/' . $id . '/info');
    }

    public function create_lesson_manage_info($id)
    {
        $lesson_data = $this->lesson->find($id);
        $worker_t_id = $this->teacher->data()->t_id ?? null;

        if ($lesson_data != '')
        {
            if ($lesson_data->apply_situation == 'audit') { return redirect('teacher/lesson/manage/' . $id . '/audit'); }
            else if (($lesson_data->t_id != $worker_t_id) && (!$this->member->isWorker())) { \App::abort(404); }
            else if ($lesson_data->delete_lesson == true) { \App::abort(404); }
            else
            {
                return View::make('site.teacher.create-lesson.create-lesson-info')
                  ->with('title', '創建課程 / 課程資訊')
                  ->with('lesson_data', $lesson_data)
                  ->with('account', $this->member->find($this->teacher->find($lesson_data->t_id)->m_id)->account)
                  ->with('step', '課程資訊')
                  ->with('step_num', 'step_1');
            }
        }
        else { \App::abort(404); }
    }

    public function create_lesson_manage_info_save($id, Request $request)
    {
        $this->lesson->update_info_data($id, $request->lesson_name, $request->lesson_sub_name, $request->lesson_description);
        $this->lesson->check_worker_edit($id);
        return response()->json([
            'success' => 'ok'
        ]);
    }

    public function create_lesson_manage_media($id)
    {
        $lesson_data = $this->lesson->find($id);
        $worker_t_id = $this->teacher->data()->t_id ?? null;

        if ($lesson_data != '')
        {
            if ($lesson_data->apply_situation == 'audit') { return redirect('teacher/lesson/manage/' . $id . '/audit'); }
            else if (($lesson_data->t_id != $worker_t_id) && (!$this->member->isWorker())) { \App::abort(404); }
            else if ($lesson_data->delete_lesson == true) { \App::abort(404); }
            else
            {
                if ($lesson_data->media != null) { $type = $this->unit->getMediaExtension($lesson_data->media); }
                else { $type = ''; }

                return View::make('site.teacher.create-lesson.create-lesson-media')
                  ->with('title', '創建課程 / 封面圖影')
                  ->with('lesson_data', $lesson_data)
                  ->with('account', $this->member->find($this->teacher->find($lesson_data->t_id)->m_id)->account)
                  ->with('media_type', $type)
                  ->with('step', '封面圖影')
                  ->with('step_num', 'step_5');
            }
        }
        else { \App::abort(404); }
    }

    public function create_lesson_manage_media_save($id)
    {
        if (isset($_FILES['media']) || isset($_FILES['cover']))
        {
            $media = $_FILES['media'];
            $cover = $_FILES['cover'];
            $destination_path = public_path('/media/' . $id . '/cover/');
            $media_situation = $this->lesson->update_lesson_media($id, $media, $destination_path);
            $cover_situation = $this->lesson->update_lesson_cover($id, $cover, $destination_path);

            $message = ($media_situation == 'no') || ($cover_situation == 'no') ? 'no' : ($media_situation == true) && ($$cover_situation == true) ? 'ok' : 'GG';
        }
        else { $message = 'no'; }

        $this->lesson->check_worker_edit($id);
        return response()->json([
            'success' => $message
        ]);
    }

    public function create_lesson_manage_preview($id)
    {
        $lesson_data = $this->lesson->find($id);
        $worker_t_id = $this->teacher->data()->t_id ?? null;

        if ($lesson_data != '')
        {
            if ($lesson_data->delete_lesson == true) { \App::abort(404); }
            else if (($lesson_data->t_id == $worker_t_id) || ($this->member->isWorker()))
            {
                $lesson_data    = $this->lesson->find($id);
                $unit_data      = $this->unit->getUnitData($id);
                $media_type     = $this->unit->getMediaExtension($lesson_data->media);
                $unit_num       = array_unique($this->unit->getUnitSortData($unit_data, 'u_id'));
                $unit_name      = $this->unit->getUnitSortData($unit_data, 'u_name');
                $condition_data = $this->goal->getLessonGoalData($id, 'condition');
                $suit_data      = $this->goal->getLessonGoalData($id, 'suit');
                $learn_data     = $this->goal->getLessonGoalData($id, 'learn');
                $title          = $lesson_data->l_name . ' 的預覽畫面';
                $l_teacher_data = $this->teacher->find($lesson_data->t_id);
                $l_member_data  = $this->member->find($l_teacher_data->m_id);
                return View::make('site.teacher.create-lesson.preview.layout')
                  ->with('title', $title)
                  ->with('lesson_data', $lesson_data)
                  ->with('unit_data', $unit_data)
                  ->with('unit_num', $unit_num)
                  ->with('unit_name', $unit_name)
                  ->with('condition_data', $condition_data)
                  ->with('suit_data', $suit_data)
                  ->with('learn_data', $learn_data)
                  ->with('media_type', $media_type)
                  ->with('l_teacher_data', $l_teacher_data)
                  ->with('l_member_data', $l_member_data);
            }
            else { \App::abort(404); }
        }
        else { \App::abort(404); }
    }

    public function create_lesson_manage_submit($id, Request $request)
    {
        $check_reg_code = $this->lesson->check_reg_code($id, $request->reg_code);

        if ($check_reg_code == true)
        {
            $lesson_data = $this->lesson->find($id);
            $member_data = $this->member->user();
            $unit_data   = $this->unit->getUnitData($id);
            $goal_data   = $this->goal->get_goal_lesson_data($id);
            $check_lesson_data =
            [
                /*** Check Lesson Chapter ***/
                strlen($this->unit->check_chapter_data($id, $lesson_data->type)) > 4 ? $this->redirect_web($this->unit->check_chapter_data($id, $lesson_data->type), $id, '/chapter') : '',

                /*** Check Lesson Information ***/
                $this->main->check_column_fill_in($lesson_data->l_name) == false ? $this->redirect_web('請輸入課程標題', $id, '/info') : '',
                $this->lesson->check_content_file($lesson_data->t_id, $lesson_data->l_id) == false ? $this->redirect_web('請輸入課程介紹', $id, '/info') : '',

                /*** Check Lesson Detail ***/
                $this->main->check_column_fill_in($lesson_data->topic) == false ? $this->redirect_web('請輸入課程主題', $id, '/detail') : '',
                $this->main->check_column_fill_in($lesson_data->category) == false ? $this->redirect_web('請輸入課程類別', $id, '/detail') : '',
                $this->main->check_column_fill_in($lesson_data->end_fund) == false ? $this->redirect_web($lesson_data->type == 'entity' ? '請輸入確定開班日期' : '請輸入募資截止日期', $id, '/detail') : '',
                $this->main->check_column_fill_in($lesson_data->start_time) == false ? $this->redirect_web('請輸入開始上課日期', $id, '/detail') : '',
                $this->lesson->check_date_is_vaild($lesson_data->start_time, $lesson_data->end_fund) == false ? $this->redirect_web('募資結束時間應比開課時間早', $id, '/detail') : '',
                $this->lesson->check_date_is_vaild($lesson_data->end_fund, date('Y-m-d')) == false ? $this->redirect_web('募資結束時間應大於今天', $id, '/detail') : '',
                $this->lesson->check_date_is_vaild($lesson_data->start_time, date('Y-m-d')) == false ? $this->redirect_web('募資結束時間應大於今天', $id, '/detail') : '',
                $this->lesson->check_column_value_correct($lesson_data->offer_fee, 0, 1000000) == false ? $this->redirect_web('請輸入募資期間費用<br>範圍：1 ~ 1,000,000', $id, '/detail') : '',
                $this->lesson->check_column_value_correct($lesson_data->origin_fee, 0, 1000000) == false ? $this->redirect_web('請輸入開課期間費用<br>範圍：1 ~ 1,000,000', $id, '/detail') : '',
                $this->lesson->check_column_value_correct($lesson_data->least_people, 0, 1000) == false ? $this->redirect_web('請輸入開課最低人數<br>範圍：1 ~ 100', $id, '/detail') : '',
                $this->lesson->check_column_value_correct_for_entity($lesson_data->max_people, $lesson_data->least_people, 1000, $lesson_data->type) == false ? $this->redirect_web('請輸入開課上限人數<br>範圍：' . $lesson_data->least_people . ' ~ 100', $id, '/detail') : '',
                $this->lesson->check_location_fill_in($lesson_data->location, $lesson_data->type) == false ? $this->redirect_web('請輸入上課地點', $id, '/detail') : '',

                /*** Check Chapter Entity Time ***/
                $this->unit->check_first_chapter_time($id, $lesson_data->start_time, $lesson_data->type) == false ? $this->redirect_web('第一天開課日期需跟開課時間一致', $id, '/chapter') : '',
                $this->unit->check_chapter_time_is_vaild($id, $lesson_data->start_time, $lesson_data->type) == false ? $this->redirect_web('每個章節時間均須大於開課時間', $id, '/chapter') : '',

                /*** Check Lesson Cover Image ***/
                $this->lesson->check_media($id, $lesson_data->cover) == false ? $this->redirect_web('請選擇封面', $id, '/media') : '',
                $this->lesson->check_media($id, $lesson_data->media) == false ? $this->redirect_web('請選擇課程圖影介紹', $id, '/media') : '',
            ];

            for ($i = 0; $i < count($check_lesson_data); $i++)
            {
                $message = $check_lesson_data[$i];

                if ($message != '') { return $message; }

            }

            $this->lesson->send_audit($lesson_data);
            $message = 'finish';
        }
        else
        {
            $message = 'register code error';
        }

        return response()->json([
            'message' => $message
        ]);
    }

    public function lesson_overview()
    {
        $teacher_data = Teacher::data();

        if (!is_null($teacher_data) && (Teacher::isTeacher()))
        {
            return View::make('site.teacher.lesson-overview.index')
            ->with('title', '我的課程');
        }
        else { \App::abort(404); }
    }

    public function redirect_web($message, $id, $step)
    {
        return response()->json([
            'message' => $message,
            'url'     => '/teacher/lesson/manage/' . $id . $step
        ]);
    }

    public function teacher_detail($t_id)
    {
        $teacher_search_data = $this->teacher->find($t_id);
        $worker_t_id         = $this->teacher->data()->t_id ?? null;
        $authority           = $worker_t_id == $t_id ? true : false;

        if (($teacher_search_data != '') && is_numeric($t_id))
        {
            //Record Enter Teacher
            $member_data = $this->member->user();

            $this->click->addClickRecord('teacher', $t_id);

            if ($teacher_search_data->check_rule == true)
            {
                $teacher_member_data = $this->member->find($teacher_search_data->m_id);

                if (($worker_t_id != $t_id) && ($this->member->isWorker())) { $lesson_data = $this->lesson->getLessonDataViaTeacher($t_id); }
                else { $lesson_data = $this->lesson->getLessonDataViaTeacher($t_id, true); }

                return View::make('site.teacher.detail.index')
                  ->with('title', $teacher_member_data->m_name . ' 的導師室')
                  ->with('teacher_search_data', $teacher_search_data)
                  ->with('teacher_member_data', $teacher_member_data)
                  ->with('authority', $authority)
                  ->with('lesson_data', $lesson_data );
            }
            else
            {
                return View::make('site.teacher.detail.index')
                  ->with('title', '無此講師')
                  ->with('teacher_member_data', 'not found');
            }
        }
        else { \App::abort(404); }
    }

    public function teacher_overview()
    {
        $all_member_data  = $this->member->all();
        $all_teacher_data = $this->teacher->get_correct_teacher();
        return View::make('site.teacher.teacher-overview.index')
          ->with('title', '王牌講師')
          ->with('all_member_data', $all_member_data)
          ->with('all_teacher_data', $all_teacher_data);
    }

    public function upload_become_teacher(Request $request)
    {
        $member_data  = $this->member->user();
        $teacher_data = $this->teacher->findMemberId($member_data->m_id);
        $teacher_data == '' ? $this->teacher->update_become_teacher_data($request, $this->teacher, $member_data->m_id) : $this->teacher->update_become_teacher_data($request, $teacher_data, $member_data->m_id);
        $teacher_data = $this->teacher->findMemberId($member_data->m_id);
        return redirect('/becometeacher');
    }
}
