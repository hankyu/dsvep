<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Shorturl extends Model
{
    protected $code = 'DJRIGPFHZLUMSXQWAVOKETBYNC';

    public static function create($url)
    {
        $shorturl = new Shorturl();

        // Get Current Server
        $domain   = $_SERVER['HTTP_HOST'] ?? 'www.ds-vep.com';
        $domain   = Str::startsWith($domain, 'www') ? "https://$domain/" : "http://$domain/";
        $url      = $domain . $url;

        // Encode Origin URL, 531441 is First Number
        $garbled = $shorturl->to26(self::count() + 531441);

        // Save Short URL
        $shorturl->garbled = $garbled;
        $shorturl->url = $url;
        $shorturl->save();

        return $domain . $garbled;
    }

    public function to26($num)
    {
        $str = '';

        while ($num > 0)
        {
            $str = $this->code[($num % 26)] . $str;
            $num = floor($num / 26);
        }

        return $str;
    }

    public static function search($text)
    {
        return self::where('garbled', $text)->first()->url ?? null;
    }
}
