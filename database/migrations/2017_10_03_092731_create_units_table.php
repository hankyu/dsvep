<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUnitsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('units', function (Blueprint $table)
        {
            $table->increments('id');
            $table->integer('l_id');
            $table->integer('c_id');
            $table->integer('u_id');
            $table->string('c_name');
            $table->string('u_name');
            $table->longText('u_content')->nullable();
            $table->string('u_video')->nullable();
            $table->string('u_video_situation')->nullable();
            $table->string('now_count')->nullable();
            $table->DateTime('l_start_time')->nullable();
            $table->DateTime('l_end_time')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('units');
    }
}
