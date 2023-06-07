<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Rank extends Model
{
    public function get_rank_data($id)
    {
        return Rank::where('item', '=', 'lesson')->where('item_id', '=', $id)->get();
    }
}
