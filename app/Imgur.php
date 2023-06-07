<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Imgur extends Model
{
    public function __construct()
    {
        $this->image_key = '8390218445c1276';
    }

    public function createAlbum()
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://api.imgur.com/3/album',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => false,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_HTTPHEADER => array('Authorization: Client-ID ' . $this->image_key),
        ));
        $response = curl_exec($curl);
        $response = json_decode($response);
        curl_close($curl);
        return $response->data;
    }

    public function addImage($image, $album = null)
    {
        if (is_null($album)) { $postfields = array('image' => $image); }
        else { $postfields = array('image' => $image, 'album' => $album); }

        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://api.imgur.com/3/image',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => $postfields,
            CURLOPT_HTTPHEADER => array('Authorization: Client-ID ' . $this->image_key),
        ));
        $response = curl_exec($curl);
        $response = json_decode($response);
        curl_close($curl);
        return $response->data->id;
    }

    public static function getAlbumImages($album)
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://api.imgur.com/3/album/' . $album . '/images',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => false,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
            CURLOPT_HTTPHEADER => array('Authorization: Client-ID 8390218445c1276'),
        ));
        $response = curl_exec($curl);
        $response = json_decode($response);
        curl_close($curl);
        $image = [];

        foreach ($response->data as $data) { $image[] = $data->link; }

        return $image;
    }
}
