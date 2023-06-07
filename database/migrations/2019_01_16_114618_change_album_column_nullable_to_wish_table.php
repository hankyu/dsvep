<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeAlbumColumnNullableToWishTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('wishes', function (Blueprint $table)
        {
            $table->string('content')->nullable()->change();
            $table->string('album')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('wishes', function (Blueprint $table)
        {
            $table->string('content')->nullable(false)->change();
            $table->string('album')->nullable(false)->change();
        });
    }
}
