<?php

namespace App;

use App\Main;
use Illuminate\Database\Eloquent\Model;

class Unit extends Model
{
    private $main;
    private $imgur_client_id;

    public function __construct()
    {
        $this->main = new Main();
    }

    public function add_unit_data_about_online($id, $lesson_unit_data, $unit_id, $unit_new_id, $unit_pos)
    {
        $unit = new Unit;

        for ($i = 0; $i < count($unit_id); $i++)
        {
            if ($unit_id[$i] == null)
            {
                $unit_position = explode(',', $unit_new_id[$i]);
                $position      = explode(',', $unit_pos[$i]);
                $u_id          = $position[0];
                $c_id          = $position[1];
                $time          = explode(' ~ ', $lesson_unit_data[$u_id][$c_id][2]);
                $unit          = new Unit;
                $unit->l_id = $id;
                $unit->u_id = $unit_position[0];
                $unit->c_id = $unit_position[1];
                $unit->u_name = $lesson_unit_data[$u_id][$c_id][0];
                $unit->c_name = $lesson_unit_data[$u_id][$c_id][1];
                $unit->remark = nl2br($lesson_unit_data[$u_id][$c_id][2]);
                $unit->c_video_situation = $lesson_unit_data[$u_id][$c_id][3] == 'true' ? 'free' : 'fee';
                $unit->save();
            }
        }
    }

    public function check_chapter_data($id, $type)
    {
        $unit_data = self::getUnitData($id);
        $unit_num  = self::getUnitSortData($unit_data, 'u_id');
        $unit_name = self::getUnitSortData($unit_data, 'u_name');

        if (count($unit_data) == 0) { return "請至少輸入一堂課程"; }

        if (count($unit_num) != count($unit_name)) { return '章節資料有一些問題，請至章節專區重新儲存一次'; }

        for ($i = 0; $i < count($unit_num); $i++)
        {
            if ($type == 'online')
            {
                $chapter_data = $this->get_chapter_data($id, $unit_num[$i]);

                for ($j = 0; $j < count($chapter_data); $j++)
                {
                    $u_id = $chapter_data[$j]->u_id;
                    $c_id = $chapter_data[$j]->c_id;

                    //Check Chapter Name Isn't Empty
                    if ($chapter_data[$j]->c_name == null) { return $u_id . '-' . $c_id . '：請輸入小節名稱'; }
                }
            }
        }

        return true;
    }

    public function check_chapter_time_is_vaild($id, $time, $type)
    {
        if ($type == 'entity')
        {
            $unit_data = self::getUnitData($id);
            $time      = strtotime($time);

            for ($i = 0; $i < count($unit_data); $i++)
            {
                if ($time > strtotime($unit_data[$i]->l_start_time)) { return false; }
                if ($time > strtotime($unit_data[$i]->l_end_time)) { return false; }
            }

            return true;
        }
        else { return true; }
    }

    public function check_first_chapter_time($id, $time, $type)
    {
        if ($type == 'entity')
        {
            if (count(self::getUnitData($id)) > 0)
            {
                $first_chapter_time = self::getEntityLessonFirstUnitStartTime($id);
                return strtotime($first_chapter_time) >= strtotime($time) ? true : false;
            }
        }
        else { return true; }
    }

    public function copy_lesson_unit($old_id, $new_id)
    {
        $unit_data = self::getUnitData($old_id);

        for ($i = 0; $i < count($unit_data); $i++)
        {
            $unit = new $this;
            $unit->l_id = $new_id;
            $unit->u_id = $unit_data[$i]->u_id;
            $unit->u_name = $unit_data[$i]->u_name;
            $unit->description = $unit_data[$i]->description;
            $unit->image_url = $unit_data[$i]->image_url;
            $unit->l_start_time = $unit_data[$i]->l_start_time;
            $unit->l_end_time = $unit_data[$i]->l_end_time;
            $unit->remark = $unit_data[$i]->remark;
            $unit->save();
        }

        return;
    }

    public function deleteAllUnit($id)
    {
        Unit::where('l_id', '=', $id)->delete();
        return;
    }

    public function delete_unit($del_id)
    {
        Unit::where('id', '=', $del_id)->delete();
        return;
    }

    public function encrypt_video_name($filename)
    {
        $media_filename_split = explode('.', $filename);
        $extension            = array_pop($media_filename_split);
        return md5(join('.', $media_filename_split) . 'fuck') . '.' . $extension;
    }

    public static function filter_first_time($id = [], $order = 'DESC')
    {
        return Unit::selectRaw(' l_id, MIN(l_start_time) AS l_start_time')
                   ->whereIn('l_id', $id)
                   ->groupBy('l_id')
                   ->orderby('l_id', $order)
                   ->get();
    }

    public static function filter_last_time($id = [], $order = 'DESC')
    {
        return Unit::selectRaw(' l_id, MAX(l_end_time) AS l_end_time')
                   ->whereIn('l_id', $id)
                   ->groupBy('l_id')
                   ->orderby('l_id', $order)
                   ->get();
    }

    public static function filter_time()
    {
        return Unit::selectRaw(' l_id, MIN(l_start_time) AS l_start_time, MAX(l_end_time) AS l_end_time')
                   ->groupBy('l_id')
                   ->get();
    }

    public function get_chapter_data($l_id, $u_id)
    {
        return Unit::where('l_id', '=', $l_id)->where('u_id', '=', $u_id)->orderBy('c_id', 'ASC')->get();
    }

    public static function getEntityLessonFirstUnitStartTime($id)
    {
        return Unit::where('l_id', $id)->orderby('u_id', 'ASC')->first()->l_start_time ?? null;
    }

    public static function getEntityLessonFirstUnitEndTime($id)
    {
        return Unit::where('l_id', $id)->orderby('u_id', 'ASC')->first()->l_end_time ?? null;
    }

    public static function getEntityLessonLastUnitEndTime($id)
    {
        return Unit::where('l_id', $id)->orderby('u_id', 'DESC')->orderby('c_id', 'DESC')->first()->l_end_time ?? null;
    }

    public static function getUnitSortData($unit_data, $data)
    {
        $unit_num = array();

        foreach ($unit_data as $value) { $unit_num[] = $value[$data]; }

        return array_values($unit_num);
    }

    public static function getLessonUnitStartTime($l_id, $type = null)
    {
        $type      = $type ? $type : 'date';
        $time      = self::where('l_id', $l_id)->orderby('l_start_time', 'ASC')->get()->pluck('l_start_time');

        if ($type == 'time') { return $time; }
        else
        {
            $unit_time = array();

            foreach ($time as $value) { $unit_time[] = explode(' ', $value)[0]; }

            $unit_time = array_unique($unit_time);
            return $unit_time;
        }
    }

    public function get_unit_1_data($id)
    {
        return Unit::where('id', '=', $id)->first();
    }

    public function get_unit_1_data_via_c_id($id, $unit_id, $chapter_id)
    {
        return Unit::where('l_id', '=', $id)->where('u_id', '=', $unit_id)->where('c_id', '=', $chapter_id)->first();
    }

    public function get_unit_by_keyword($keyword)
    {
        $unit_data = Unit::where(function ($query) use ($keyword)
                         {
                              $query->where('c_name', 'Like', '%' . $keyword . '%')
                                    ->orWhere('u_name', 'Like', '%' . $keyword . '%')
                                    ->orWhere('description', 'Like', '%' . $keyword . '%')
                                    ->orWhere('remark', 'Like', '%' . $keyword . '%');
                         })
                         ->get();
        $unit_data_temp   = array();
        $unit_data_public = array();
        $num              = 0;


        for ($i = 0; $i < count($unit_data); $i++) { $unit_data_temp[$i] = $unit_data[$i]; }

        $unit_data_temp = array_values(array_unique($unit_data_temp));

        if (count($unit_data_temp) != 0)
        {
            for ($i = 0; $i < count($unit_data_temp); $i++)
            {
                $lesson_data = Lesson::find($unit_data_temp[$i]->l_id);

                if ($lesson_data->pub_situation == true)
                {
                    if ($lesson_data->type == 'entity')
                    {
                        if ($lesson_data->start_time > date('Y-m-d'))
                        {
                            $unit_data_public[$num] = $unit_data_temp[$i]->l_id;
                            $num++;
                        }
                    }
                    else if ($lesson_data->type == 'online')
                    {
                        if ($lesson_data->cancel_lesson == false)
                        {
                            $unit_data_public[$num] = $unit_data_temp[$i]->l_id;
                            $num++;
                        }
                    }
                }
            }
        }

        return $unit_data_public;
    }

    public static function getUnitData($l_id)
    {
        return self::where('l_id', $l_id)->orderBy('u_id', 'ASC')->orderBy('c_id', 'ASC')->get();
    }

    public function getMediaExtension($media_name)
    {
        $media     = explode('.', $media_name);
        $extension = strtolower(end($media));
        return $extension == 'mp4' ? 'video' : 'image';
    }

    public function get_video_length($file)
    {
        $getID3       = new \getID3;
        $file_data    = $getID3->analyze($file);
        $video_length = floor($file_data['playtime_seconds']);
        return $video_length;
    }

    public function no_br_lesson_data($unit_data, $lesson_type)
    {
        for ($i = 1; $i <= count($unit_data); $i++)
        {
            if ($lesson_type == 'online')
            {
                for ($j = 1; $j <= count($unit_data[$i]); $j++) { $unit_data[$i][$j]->remark = $this->main->delete_last_br_char($unit_data[$i][$j]->remark); }
            }
            else if ($lesson_type == 'entity') { $unit_data[$i]->remark = $this->main->delete_last_br_char($unit_data[$i]->remark); }
        }

        return $unit_data;
    }

    public function addEntityUnitData($l_id, $unit)
    {
        if (count($unit) > 2)
        {
            for ($i = 1; $i < count($unit) - 1; $i++)
            {
                for ($j = $i + 1; $j < count($unit); $j++)
                {
                    $time1       = explode(' ~ ', $unit[$i][1]);
                    $time2       = explode(' ~ ', $unit[$j][1]);
                    $time1_start = strtotime($time1[0]);
                    $time1_end   = strtotime($time1[1]);
                    $time2_start = strtotime($time2[0]);
                    $time2_end   = strtotime($time2[1]);

                    if ((($time1_end > $time2_start) && ($time2_start > $time1_start)) || ($time2_end > $time1_start) && ($time1_start > $time2_start)) { return '章節排序時間有問題'; }
                    else if ($time1_start == $time2_start) { return '章節排序不能重複時間'; }
                    else
                    {
                        if ($time1_start > $time2_start)
                        {
                            $temp     = $unit[$i];
                            $unit[$i] = $unit[$j];
                            $unit[$j] = $temp;
                        }
                    }
                }
            }
        }

        $this->deleteAllUnit($l_id);

        for ($i = 1; $i < count($unit); $i++)
        {
            $units = new $this;
            $time = explode(' ~ ', $unit[$i][1]);
            $units->l_id = $l_id;
            $units->u_id = $i;
            $units->u_name = $unit[$i][0];
            $units->l_start_time = $time[0];
            $units->l_end_time = $time[1];
            $units->description = $unit[$i][3];
            $units->remark = $unit[$i][2];
            $units->save();
        }

        return 'ok';
    }

    public function update_unit_data_about_online($lesson_unit_data, $unit_id, $unit_new_id, $unit_pos, $l_id)
    {
        $unit_data = self::getUnitData($l_id);

        for ($i = 0; $i < count($unit_data); $i++)
        {
            if (array_search($unit_data[$i]->id, $unit_id) > -1)
            {
                //Edit Chapter
                $old_id           = array_search($unit_data[$i]->id, $unit_id);
                $unit_position    = explode(',', $unit_new_id[$old_id]);
                $position         = explode(',', $unit_pos[$old_id]);
                $u_id             = $position[0];
                $c_id             = $position[1];
                $time             = explode(' ~ ', $lesson_unit_data[$u_id][$c_id][2]);
                $unit             = new $this;
                $unit_update_data = $unit->get_unit_1_data($unit_data[$i]->id);
                $unit_update_data->u_id = $unit_position[0];
                $unit_update_data->c_id = $unit_position[1];
                $unit_update_data->u_name = $lesson_unit_data[$u_id][$c_id][0];
                $unit_update_data->c_name = $lesson_unit_data[$u_id][$c_id][1];
                $unit_update_data->remark = nl2br($lesson_unit_data[$u_id][$c_id][2]);
                $unit_update_data->c_video_situation = $lesson_unit_data[$u_id][$c_id][3] == 'true' ? 'free' : 'fee';
                $unit_update_data->save();
            }
            else
            {
                $del_id = $unit_data[$i]->id;
                $this->delete_unit($del_id);
            }
        }

        return;
    }

    public function save_chapter_video($id, $media_filename_crypto, $origin_name)
    {
        $destination_path = public_path('/media/' . $id . '/lesson/');

        if (!file_exists($destination_path)) { mkdir($destination_path, 0777, true); }

        move_uploaded_file($origin_name, $destination_path . $media_filename_crypto);
        return;
    }

    public function sort_chapter($unit_data, $type)
    {
        if ($unit_data != '')
        {
            $unit_array = array();

            if ($type == 'entity')
            {
                for ($i = 0; $i < count($unit_data); $i++)
                {
                    $u_id = $unit_data[$i]->u_id;
                    $unit_array[$u_id] = $unit_data[$i];
                }
            }
            else
            {
                for ($i = 0; $i < count($unit_data); $i++)
                {
                    $u_id = $unit_data[$i]->u_id;
                    $c_id = $unit_data[$i]->c_id;

                    if (!isset($unit_array[$u_id])) { $unit_array[$u_id] = Array(); }

                    $unit_array[$u_id][$c_id] = $unit_data[$i];
                }
            }
        }

        return $unit_array;
    }

    public function upload_video_thumbnail_to_imgur($image_base64)
    {
        $imgur_client_id = '8390218445c1276';
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://api.imgur.com/3/image",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_POSTFIELDS => $image_base64,
            CURLOPT_HTTPHEADER => array(
                "Authorization: Client-ID " . $imgur_client_id,
            ),
        ));
        $response = curl_exec($curl);
        $response = json_decode($response);
        curl_close($curl);
        return $response->data->link;
    }
}
