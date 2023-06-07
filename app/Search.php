<?php

namespace App;

use App\Member;
use Illuminate\Database\Eloquent\Model;

class Search extends Model
{
    public function create_search_data($keyword)
    {
        if ($keyword != '')
        {
            $this->m_id = Member::user()->m_id ?? 0;
            $this->keyword = $keyword;
            $this->save();
        }

        return;
    }
}
