<?php

namespace App;

use App\Member;
use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    protected $primaryKey = 'f_id';

    public function addFavorite($id)
    {
        if (Favorite::where('m_id', Member::user()->m_id)->where('l_id', $id)->count() > 0) { return '該課程已加入至收藏'; }
        else
        {
            $this->m_id = Member::user()->m_id;
            $this->l_id = $id;
            $this->save();
            return 'success';
        }
    }

    public function cancelFavorite($id)
    {
        if (Favorite::where('m_id', Member::user()->m_id)->where('l_id', $id)->count() === 0) { return '該課程尚未加入至收藏'; }
        else
        {
            Favorite::where('m_id', Member::user()->m_id)->where('l_id', $id)->delete();
            return 'success';
        }
    }

    public function isFavorite($id)
    {
        return is_null(Favorite::where('m_id', Member::user()->m_id ?? null)->where('l_id', $id)->first());
    }

    public function isMyFavorite($id, $m_id)
    {
        return !is_null(Favorite::where('m_id', $m_id ?? null)->where('l_id', $id)->first());
    }

    public function switchFavoriteAjax($l_id, $m_id, $favorite)
    {
        if ($favorite == 0) {
            Favorite::where('m_id', $m_id)->where('l_id', $l_id)->delete();
        }
        else
        {
            $this->m_id = $m_id;
            $this->l_id = $l_id;
            $this->save();
        }

        return 0;
    }
}
