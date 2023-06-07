<?php

namespace App;

use \Auth;
use App\Member;
use Illuminate\Database\Eloquent\Model;

class Click extends Model
{
    public function add_click_button_record($item, $l_id = null)
    {
        $number = 9999;

        if ($item == 'login') { $number = 1; }
        else if ($item == 'register') { $number = 2; }
        else if ($item == 'buy') { $number = 4; }
        else if ($item == 'direct') { $number = 5; }

        $this->m_id = Member::user()->m_id ?? 0;
        $this->item = 'button';
        $this->number = $number;
        $this->lesson = $l_id;
        $this->save();
        return;
    }

    public function addClickRecord($item, $item_id)
    {
        $this->m_id = Member::user()->m_id ?? 0;
        $this->item = $item;
        $this->number = $item_id;
        $this->save();
    }

    public function get_all_click_analyze_data()
    {
        $click_data        = Click::orderBy('p_id', 'DESC')->get();
        $member_click_data = array();
        $num               = 0;

        for ($i = 0; $i < count($click_data); $i++)
        {
            $item   = $this->get_item_chinese($click_data[$i]->item);
            $number = $this->get_item_number_chinese($click_data[$i]->item, $click_data[$i]->number);

            if ($num == 0)
            {
                $member_click_data[0]              = array();
                $member_click_data[0]['serial']    = $num;
                $member_click_data[0]['item']      = $item;
                $member_click_data[0]['number']    = $number;
                $member_click_data[0]['from']      = $click_data[$i]->m_id == 0 ? '訪客' : $click_data[$i]->m_id;
                $member_click_data[0]['last']      = $click_data[$i]->created_at->format('Y-m-d H:i:s');
                $member_click_data[0]['count']     = 1;
                $member_click_data[0]['record']    = array();
                $member_click_data[0]['record'][0] = $click_data[$i];
                $num++;
            }
            else
            {
                for ($j = 0; $j < count($member_click_data); $j++)
                {
                    if (($member_click_data[$j]['item'] == $item) && ($member_click_data[$j]['number'] == $number))
                    {
                        $record_num                                   = count($member_click_data[$j]['record']);
                        $member_click_data[$j]['record'][$record_num] = $click_data[$i];
                        $member_click_data[$j]['count']++;
                        break;
                    }

                    if (($j + 1) == count($member_click_data))
                    {
                        $member_click_data[$num]              = array();
                        $member_click_data[$num]['serial']    = $num;
                        $member_click_data[$num]['item']      = $item;
                        $member_click_data[$num]['number']    = $number;
                        $member_click_data[$num]['from']      = $click_data[$i]->m_id == 0 ? '訪客' : $click_data[$i]->m_id;
                        $member_click_data[$num]['last']      = $click_data[$i]->created_at->format('Y-m-d H:i:s');
                        $member_click_data[$num]['count']     = 1;
                        $member_click_data[$num]['record']    = array();
                        $member_click_data[$num]['record'][0] = $click_data[$i];
                        $num++;
                        break;
                    }
                }
            }
        }

        return $this->sort_array($member_click_data);
    }

    public function get_all_click_data()
    {
        $click_data        = Click::orderBy('p_id', 'DESC')->get();
        $member_click_data = array();
        $num               = 0;

        for ($i = 0; $i < count($click_data); $i++)
        {
            if ($num == 0)
            {
                $member_click_data[0]              = array();
                $member_click_data[0]['from']      = $click_data[$i]->m_id == 0 ? '訪客' : $click_data[$i]->m_id;
                $member_click_data[0]['item']      = $this->get_item_chinese($click_data[$i]->item);
                $member_click_data[0]['number']    = $this->get_item_number_chinese($click_data[$i]->item, $click_data[$i]->number);
                $member_click_data[0]['last']      = $click_data[$i]->created_at->format('Y-m-d H:i:s');
                $member_click_data[0]['count']     = 1;
                $member_click_data[0]['record']    = array();
                $member_click_data[0]['record'][0] = $click_data[$i];
                $num++;
            }
            else
            {
                $m_id = $click_data[$i]->m_id == 0 ? '訪客' : $click_data[$i]->m_id;

                for ($j = 0; $j < count($member_click_data); $j++)
                {
                    if ($member_click_data[$j]['from'] == $m_id)
                    {
                        $record_num                                   = count($member_click_data[$j]['record']);
                        $member_click_data[$j]['record'][$record_num] = $click_data[$i];
                        $member_click_data[$j]['count']++;
                        break;
                    }

                    if (($j + 1) == count($member_click_data))
                    {
                        $member_click_data[$num]              = array();
                        $member_click_data[$num]['from']      = $click_data[$i]->m_id == 0 ? '訪客' : $click_data[$i]->m_id;
                        $member_click_data[$num]['item']      = $this->get_item_chinese($click_data[$i]->item);
                        $member_click_data[$num]['number']    = $this->get_item_number_chinese($click_data[$i]->item, $click_data[$i]->number);
                        $member_click_data[$num]['last']      = $click_data[$i]->created_at->format('Y-m-d H:i:s');
                        $member_click_data[$num]['count']     = 1;
                        $member_click_data[$num]['record']    = array();
                        $member_click_data[$num]['record'][0] = $click_data[$i];
                        $num++;
                        break;
                    }
                }
            }
        }

        return $this->sort_array($member_click_data);
    }

    public static function getClickData($id, $item)
    {
        return Click::where('item', '=', 'lesson')->where('number', '=', $id)->get();
    }

    public function get_item_chinese($item)
    {
        switch ($item)
        {
            case 'teacher':
                return '講師';
                break;
            case 'lesson':
                return '課程';
                break;
            case 'button':
                return '按鈕';
                break;
            default:
                return 'BUG';
                break;
        }
    }

    public function get_item_number_chinese($item, $number)
    {
        if ($item == 'button')
        {
            switch ($number)
            {
                case 1:
                    return '登入';
                    break;
                case 2:
                    return '註冊';
                    break;
                case 3:
                    return '加入購物車';
                    break;
                case 4:
                    return '立即購買';
                    break;
                case 5:
                    return '立即上課';
                    break;
                default:
                    return 'BUG';
                    break;
            }
        }

        return $number;
    }

    public function sort_array($click_data)
    {
        for ($i = 0; $i < count($click_data) - 1; $i++)
        {
            for ($j = ($i + 1); $j < count($click_data); $j++)
            {
                if ($click_data[$i]['count'] < $click_data[$j]['count'])
                {
                    $temp           = $click_data[$i];
                    $click_data[$i] = $click_data[$j];
                    $click_data[$j] = $temp;
                }
            }
        }

        return $click_data;
    }
}
