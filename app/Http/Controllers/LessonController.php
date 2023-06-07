<?php

namespace App\Http\Controllers;

use View;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    public function checkPromotingLessonsSave()
    {
        $data = $this->lesson->checkPromotingLessonsSave();

        $return['status'] = 1;
        $return['count'] = count($data);
        $return['data'] = $data;

        return response()->json($return);
    }

    public function lessonShopPage($id)
    {
        // Back Page
        $redirect = "/#/lesson/".$id;
        return redirect($redirect ?? '/' );

        $lesson_data = $this->lesson->find($id);

        if (!empty($lesson_data) && (is_numeric($id)))
        {
            if ($lesson_data->pub_situation == true)
            {
                $this->order->checkOrderCancel();
                $teacher_data   = $this->teacher->find($lesson_data->t_id);
                $member_data    = $this->member->find($teacher_data->m_id);
                $unit_data      = $this->unit->getUnitData($id);
                $media_type     = $this->unit->getMediaExtension($lesson_data->media);
                $unit_num       = array_unique($this->unit->getUnitSortData($unit_data, 'u_id'));
                $unit_name      = $this->unit->getUnitSortData($unit_data, 'u_name');
                $condition_data = $this->goal->getLessonGoalData($id, 'condition');
                $suit_data      = $this->goal->getLessonGoalData($id, 'suit');
                $learn_data     = $this->goal->getLessonGoalData($id, 'learn');
                $title          = $lesson_data->l_name;
                $content        = $this->lesson->getLessonDescriptionFile('json/' . $member_data->m_id . '_' . $member_data->account . '/' . $teacher_data->t_id . '_' . $lesson_data->l_id . '.json');

                //Check Fundraising Fail
                $fail = $this->lesson->checkLessonFundraisingIsFail($id);

                //Check Order Has Lesson
                $viewer_id     = $this->member->user()->m_id ?? 0;
                $has_order     = $this->order->checkOrderHasLesson($id);
                $over_deadline = $this->order->checkOrderIsOverDeadline($viewer_id, $id);
                $restrict      = (($has_order == 'checkout') && !$over_deadline) ? $this->order->checkOrderHasRestrict($viewer_id, $id) : false;

                //Buy People Count
                $buy_people = $this->order->lessonBuyerOrderData($id)->count();

                //Record Enter Lesson
                $this->click->addClickRecord('lesson', $id);

                //Get Favorite Situation
                $is_favorite = $this->favorite->isFavorite($id);

                return View::make('site.lesson.layout')
                           ->with('title', $title)
                           ->with('content', $content)
                           ->with('l_member_data', $member_data)
                           ->with('l_teacher_data', $teacher_data)
                           ->with('lesson_data', $lesson_data)
                           ->with('unit_data', $unit_data)
                           ->with('unit_num', $unit_num)
                           ->with('unit_name', $unit_name)
                           ->with('condition_data', $condition_data)
                           ->with('suit_data', $suit_data)
                           ->with('learn_data', $learn_data)
                           ->with('media_type', $media_type)
                           ->with('has_order', $has_order)
                           ->with('buy_people', $buy_people)
                           ->with('fail', $fail)
                           ->with('restrict', $restrict)
                           ->with('over_deadline', $over_deadline)
                           ->with('last_lesson_time', $this->unit->getEntityLessonLastUnitEndTime($id))
                           ->with('favorite', $is_favorite);
            }
            else { \App::abort(404); }
        }
        else { \App::abort(404); }
    }
}
