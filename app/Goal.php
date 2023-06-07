<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Goal extends Model
{
    public function add_goal_data($id, $item, $item_data, $item_array, $item_id)
    {
        if (count($item_array) == 0) { $this->delete_all_goal_data($id, $item); }
        else
        {
            for ($i = 0; $i < count($item_data); $i++)
            {
                if (array_search($item_data[$i]->id, $item_id) != -1)
                {
                    $old_id = array_search($item_data[$i]->id, $item_id);
                    if ($item_array[$old_id] != '')
                    {
                        $goal = new $this;
                        $goal_update_data = $goal->get_goal_1_data($item_data[$i]->id);
                        $goal_update_data->content = $item_array[$old_id];
                        $goal_update_data->save();
                    }
                    else
                    {
                        $del_id = $item_data[$i]->id;
                        $this->delete_goal_item($del_id);
                    }
                }
                else
                {
                    $del_id = $item_data[$i]->id;
                    $this->delete_goal_item($del_id);
                }
            }
            for ($i = 0; $i < count($item_array); $i++)
            {
                if (($item_id[$i] == 'no') && ($item_array[$i] != ''))
                {
                    $goal = new $this;
                    $goal->l_id = $id;
                    $goal->item = $item;
                    $goal->content = $item_array[$i];
                    $goal->save();
                }
            }
        }
        return;
    }

    public function copy_lesson_goal($old_id, $new_id)
    {
        $goal_data = $this->get_goal_lesson_data($old_id);

        for ($i = 0; $i < count($goal_data); $i++)
        {
            $goal = new $this;
            $goal->l_id = $new_id;
            $goal->item = $goal_data[$i]->item;
            $goal->content = $goal_data[$i]->content;
            $goal->save();
        }

        return;
    }

    public function delete_all_goal_data($l_id, $item)
    {
        Goal::where('l_id', '=', $l_id)->where('item', '=', $item)->delete();
    }

    public function delete_goal_item($id)
    {
        Goal::where('id', '=', $id)->delete();
        return;
    }

    public function getLessonGoalData($l_id, $item)
    {
        return Goal::where('l_id', '=', $l_id)->where('item', '=', $item)->get();
    }

    public function get_goal_lesson_data($l_id)
    {
        return Goal::where('l_id', '=', $l_id)->get();
    }

    public function get_goal_1_data($id)
    {
        return Goal::where('id', '=', $id)->first();
    }
}
