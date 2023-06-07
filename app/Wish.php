<?php

namespace App;

use App\Member;
use App\Imgur;
use App\WishCategory;
use Illuminate\Database\Eloquent\Model;
use DB;

class Wish extends Model
{
    protected $primaryKey = 'w_id';

    public function addWishesData($request)
    {
        if (!isset($request->want) || ($request->want == '')) { return '請輸入<span class="color-emphasized2">我想學</span>'; }
        elseif (!isset($request->goal) || ($request->goal == '')) { return '請輸入<span class="color-emphasized2">目標</span>'; }
        elseif (empty($request->category)) { return '請至少選擇一個<span class="color-emphasized2">類別</span>'; }
        else
        {
            if (!empty($request->image))
            {
                $imgur = new Imgur();
                $album = $imgur->createAlbum();
                foreach ($request->image as $key => $image) { $imgur->addImage($image, $album->deletehash); }
            }

            $this->m_id = Member::user()->m_id;
            $this->title = $request->want;
            $this->goal = $request->goal;
            $this->content = $request->like ?? null;
            $this->album = $album->id ?? null;
            $this->save();
            WishCategory::addWishCategoryData($this->w_id, $request->category);
            return 'success';
        }
    }

    public function getWishData($id = null)
    {
        if (is_null($id))
        {
            $wish_data = DB::table('wishes')
                           ->join('members', 'members.m_id', 'wishes.m_id')
                           ->select('wishes.*', 'members.nickname', 'members.avg_img')
                           ->orderby('created_at', 'DESC')
                           ->get();

            foreach ($wish_data as $key => $value) { $wish_data[$key]->category = WishCategory::getCategory($value->w_id); }

            return $wish_data;
        }
        else
        {
            $wish_data = Wish::where('m_id', $id)->orderby('created_at', 'DESC')->get();

            foreach ($wish_data as $key => $value) { $wish_data[$key]->category = WishCategory::getCategory($value->w_id); }

            return $wish_data;
        }
    }

    public static function getWishImage($album)
    {
        return Imgur::getAlbumImages($album);
    }

    public function addWishesDataAjax($m_id, $title, $goal, $content, $categorys, $images)
    {
        if (!empty($images))
        {
            $imgur = new Imgur();
            $album = $imgur->createAlbum();
            foreach ($images as $key => $image) {
                $imgur->addImage($image, $album->deletehash);
            }
        }

        $this->m_id = $m_id;
        $this->title = $title;
        $this->goal = $goal;
        $this->content = $content ?? null;
        $this->album = $album->id ?? null;
        $this->save();

        WishCategory::addWishCategoryDataAjax($this->w_id, $categorys);
        return 'success';
    }

    public function getMyWishes($m_id)
    {
        $wish_data = Wish::where('m_id', $m_id)->orderby('created_at', 'DESC')->get();

        foreach ($wish_data as $key => $value) {
            $wish_data[$key]->category = WishCategory::getCategoryAjax($value->w_id);
        }

        return $wish_data;
    }

    public static function getWishImageAjax($album)
    {
        $images = Imgur::getAlbumImages($album);

        if($album!='')
        {
            if(is_null($images)) {
                $retData['status'] = 2;
                $retData['data'] = null;
            }
            else {
                $retData['status'] = 0;
                $retData['data'] = $images;
            }
        }
        else
        {
            $retData['status'] = 1;
            $retData['data'] = null;
        }

        return $retData;
    }
}
