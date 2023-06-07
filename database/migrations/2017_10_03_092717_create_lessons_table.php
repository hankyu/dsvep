<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLessonsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lessons', function (Blueprint $table)
        {
            $table->increments('l_id');
            $table->string('l_name');
            $table->string('l_sub_name')->nullable();
            $table->longText('description')->nullable();
            $table->string('type');
            $table->string('media');
            $table->integer('least_people')->nullable();
            $table->integer('origin_fee')->nullable();
            $table->integer('offer_fee')->nullable();
            $table->Date('start_time')->nullable();
            $table->integer('l_count')->nullable();
            $table->longText('content')->nullable();
            $table->boolean('pub_situation');
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
        Schema::dropIfExists('lessons');
    }
}
