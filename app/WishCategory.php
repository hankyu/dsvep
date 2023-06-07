<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class WishCategory extends Model
{
    public static function addWishCategoryData($id, $categories)
    {
        foreach ($categories as $category)
        {
            $wishcategory = new WishCategory();
            $wishcategory->w_id = $id;
            $wishcategory->category = $category;
            $wishcategory->save();
        }
    }

    public static function getCategory($id)
    {
        return WishCategory::where('w_id', $id)->get()->pluck('category');
    }

    public static function addWishCategoryDataAjax($id, $categories)
    {
        foreach ($categories as $category)
        {
            $wishcategory = new WishCategory();
            $wishcategory->w_id = $id;
            $wishcategory->topic = $category['topic'];
            $wishcategory->category = $category['label'];

            $wishcategory->save();
        }
    }

    public static function getCategoryAjax($id)
    {
        $wishCategories = WishCategory::where('w_id', $id)->select('topic','category')->get();

        foreach ($wishCategories as $wishCategory)
        {
            $retData[] = array($wishCategory['topic'], $wishCategory['category']);
        }

        return $retData;
    }

}
