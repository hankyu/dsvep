<?php

namespace App;

use App\Member;
use Illuminate\Database\Eloquent\Model;

class Browse extends Model
{
    public function get_all_browse_analyze_data()
    {
        $browse_data      = Browse::orderBy('id', 'DESC')->get();
        $browse_statistic = array();
        $num              = 0;

        for ($i = 0; $i < count($browse_data); $i++)
        {
            $jump = $this->search_except_string($browse_data[$i]->route);

            if ($jump === false)
            {
                if ($num == 0)
                {
                    $browse_statistic[0]              = array();
                    $browse_statistic[0]['num']       = $num;
                    $browse_statistic[0]['id']        = $browse_data[$i]->m_id == 0 ? '訪客' : $browse_data[$i]->m_id;
                    $browse_statistic[0]['ip']        = $browse_data[$i]->ip;
                    $browse_statistic[0]['route']     = $browse_data[$i]->route;
                    $browse_statistic[0]['times']     = 1;
                    $browse_statistic[0]['last']      = $browse_data[$i]->created_at->format('Y-m-d H:i:s');
                    $browse_statistic[0]['record']    = array();
                    $browse_statistic[0]['record'][0] = $browse_data[$i];
                    $num++;
                }
                else
                {
                    for ($j = 0; $j < count($browse_statistic); $j++)
                    {
                        if ($browse_data[$i]->id == 0)
                        {
                            if (($browse_statistic[$j]['ip'] == $browse_data[$i]->ip) && ($browse_statistic[$j]['route'] == $browse_data[$i]->route))
                            {
                                $record_num                                  = count($browse_statistic[$j]['record']);
                                $browse_statistic[$j]['times']++;
                                $browse_statistic[$j]['record'][$record_num] = $browse_data[$i];
                                break;
                            }
                        }
                        else if ($browse_data[$i]->id != 0)
                        {
                            if (($browse_statistic[$j]['id'] == $browse_data[$i]->m_id) && ($browse_statistic[$j]['route'] == $browse_data[$i]->route))
                            {
                                $record_num                                  = count($browse_statistic[$j]['record']);
                                $browse_statistic[$j]['times']++;
                                $browse_statistic[$j]['record'][$record_num] = $browse_data[$i];
                                break;
                            }
                        }

                        if (($j + 1) == count($browse_statistic))
                        {
                            $browse_statistic[$num]              = array();
                            $browse_statistic[$num]['num']       = $num;
                            $browse_statistic[$num]['id']        = $browse_data[$i]->m_id == 0 ? '訪客' : $browse_data[$i]->m_id;
                            $browse_statistic[$num]['ip']        = $browse_data[$i]->ip;
                            $browse_statistic[$num]['route']     = $browse_data[$i]->route;
                            $browse_statistic[$num]['times']     = 1;
                            $browse_statistic[$num]['last']      = $browse_data[$i]->created_at->format('Y-m-d H:i:s');
                            $browse_statistic[$num]['record']    = array();
                            $browse_statistic[$num]['record'][0] = $browse_data[$i];
                            $num++;
                            break;
                        }
                    }
                }
            }

        }

        $temp = array();

        for ($i = 0; $i < count($browse_statistic) - 1; $i++)
        {
            for ($j = ($i + 1); $j < count($browse_statistic); $j++)
            {
                if ($browse_statistic[$i]['times'] < $browse_statistic[$j]['times'])
                {
                    $temp                 = $browse_statistic[$i];
                    $browse_statistic[$i] = $browse_statistic[$j];
                    $browse_statistic[$j] = $temp;
                }
            }
        }

        return $browse_statistic;
    }

    public function get_all_browse_data()
    {
        $browse_data = Browse::orderBy('id', 'DESC')->get();
        $from_data   = array();
        $num         = 0;

        for ($i = 0; $i < count($browse_data); $i++)
        {
            if ($num == 0)
            {
                $from_data[0]              = array();
                $from_data[0]['from']      = $browse_data[$i]->m_id == 0 ? $browse_data[$i]->ip : $browse_data[$i]->m_id;
                $from_data[0]['count']     = 0;
                $from_data[0]['last']      = $browse_data[$i]->created_at->format('Y-m-d H:i:s');
                $from_data[0]['record']    = array();
                $from_data[0]['record'][0] = $browse_data[$i];
                $num++;
            }
            else
            {
                $m_id = $browse_data[$i]->m_id == 0 ? $browse_data[$i]->ip : $browse_data[$i]->m_id;

                for ($j = 0; $j < count($from_data); $j++)
                {
                    if ($from_data[$j]['from'] == $m_id)
                    {
                        $record_num                           = count($from_data[$j]['record']);
                        $from_data[$j]['record'][$record_num] = $browse_data[$i];
                        $from_data[$j]['count']++;
                        break;
                    }

                    if (($j + 1) == count($from_data))
                    {
                        $from_data[$num]              = array();
                        $from_data[$num]['from']      = $m_id;
                        $from_data[$num]['count']     = 0;
                        $from_data[$num]['last']      = $browse_data[$i]->created_at->format('Y-m-d H:i:s');
                        $from_data[$num]['record']    = array();
                        $from_data[$num]['record'][0] = $browse_data[$i];
                        $num++;
                        break;
                    }
                }
            }
        }

        for ($i = 0; $i < count($from_data) - 1; $i++)
        {
            for ($j = ($i + 1); $j < count($from_data); $j++)
            {
                if ($from_data[$i]['count'] < $from_data[$j]['count'])
                {
                    $temp          = $from_data[$i];
                    $from_data[$i] = $from_data[$j];
                    $from_data[$j] = $temp;
                }
            }
        }

        return $from_data;
    }

    public function search_except_string($route, $jump = false)
    {
        $except =
        [
            'logout', 'oauth/google', 'approval', 'admin', '/manage/',
            '/create', 'teacher/lesson/overview', 'becometeacher'
        ];

        for ($s = 0; $s < count($except); $s++)
        {
            $status = strpos($route, $except[$s]) === false ? false : true;

            if ($status === true)
            {
                $jump = true;
                break;
            }
        }

        return $jump;
    }

    public static function save_browse($request)
    {
        if ($request->isMethod('get'))
        {
            if (!$request->is('admin/*'))
            {
                $browse = new Browse();
                $browse->route = $request->path();
                $browse->m_id = Member::user()->m_id ?? 0;
                $browse->ip = \Request::getClientIp();
                $browse->save();
            }
        }

        return;
    }
}
