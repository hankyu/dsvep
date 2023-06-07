<?php

namespace App;

use App\Lesson;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    public function add_event($request)
    {
        if (Lesson::find($request->event_lesson) == '') { return '該課程不存在'; }
        else
        {
            if ($this->check_event_repeat($request) == false) { return '該課程已被列為不參與名單'; }
            else
            {
                $this->code = $request->event_code;
                $this->except = $request->event_lesson;
                $this->save();
                return true;
            }
        }
    }

    public function check_event_repeat($request)
    {
        return Event::where('code', '=', $request->event_code)->where('except', '=', $request->event_lesson)->first() == null ? true : false;
    }

    public function delete_event($request)
    {
        try
        {
            Event::where('code', '=', $request->event_code)->where('except', '=', $request->event_lesson)->delete();
            return 'success';
        }
        catch (Exception $e)
        {
            return 'Caught exception: ' . $e->getMessage() . '\n';
        }
    }

    public function get_event_data()
    {
        $event      = array();
        $event_data = event::all();

        for ($i = 0; $i < count($event_data); $i++)
        {
            $event[$i]           = $event_data[$i];
            $event[$i]['l_name'] = Lesson::find($event_data[$i]->except)->l_name;
        }

        return array_values(array_unique($event));
    }
}
