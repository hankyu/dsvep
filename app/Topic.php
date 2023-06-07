<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    public function add_topic($request)
    {
        if ($this->check_topic_repeat($request) == true)
        {
            $this->topic = $request->topic;
            $this->label = $request->category;
            $this->save();
            return true;
        }
        else { return false; }
    }

    public function check_topic_repeat($request)
    {
        return Topic::where('topic', '=', $request->topic)->where('label', '=', $request->category)->first() == null ? true : false;
    }

    public function delete_category($topic, $category)
    {
        Topic::where('topic', '=', $topic)->where('label', '=', $category)->delete();
    }

    public function delete_topic($topic)
    {
        Topic::where('topic', '=', $topic)->delete();
    }

    public function edit_category($topic, $old_category, $new_category)
    {
        $repeat = count(Topic::where('topic', '=', $topic)->where('label', '=', $new_category)->get()) > 0 ? true : false;

        if ($repeat == true) { return '分類重複'; }
        else
        {
            Topic::where('topic', '=', $topic)->where('label', '=', $old_category)->update(['label' => $new_category]);
            return 'ok';
        }
    }

    public function edit_topic($old_topic, $new_topic)
    {
        $repeat = count(Topic::where('topic', '=', $new_topic)->get()) > 0 ? true : false;

        if ($repeat == true) { return '主題重複'; }
        else
        {
            Topic::where('topic', '=', $old_topic)->update(['topic' => $new_topic]);
            return 'ok';
        }
    }

    public function get_topic_data()
    {
        $topic = array();
        $topic_data = Topic::all()->pluck('topic');

        for ($i = 0; $i < count($topic_data); $i++) { array_push($topic, $topic_data[$i]); }

        return array_values(array_unique($topic));
    }

    public function get_topic_list()
    {
        $topic_data = $this->get_topic_data();
        $topic_list = array();

        for ($i = 0; $i < count($topic_data); $i++)
        {
            $topic                   = new $this;
            $label_data              = $topic::where('topic', '=', $topic_data[$i])->get()->pluck('label');
            $topic_list[$i]          = array();
            $topic_list[$i]['topic'] = $topic_data[$i];
            $topic_list[$i]['num']   = count($label_data);

            for ($j = 0; $j < count($label_data); $j++) { $topic_list[$i][$j] = $label_data[$j]; }
        }

        return $topic_list;
    }

    public function getTopicLabels()
    {
        $topic_data = $this->get_topic_data();
        $topic_list = array();

        for ($i = 0; $i < count($topic_data); $i++)
        {
            $topic                   = new $this;
            $label_data              = $topic::where('topic', '=', $topic_data[$i])->get()->pluck('label');
            $topic_list[$i]          = array();
            $topic_lables            = array();
            $topic_list[$i]['topic'] = $topic_data[$i];
            $topic_list[$i]['num']   = count($label_data);

            for ($j = 0; $j < count($label_data); $j++) {
                $topic_lables[] = $label_data[$j];
            }

            $topic_list[$i]['labels'] = $topic_lables;
        }

        return $topic_list;
    }
}
