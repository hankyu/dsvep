<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DeleteLessonDayColumnToLessonTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('lessons', function (Blueprint $table)
        {
            $table->dropColumn('fundraising_day');
            $table->dropColumn('lesson_start_day');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('lessons', function (Blueprint $table)
        {
            $table->integer('fundraising_day')->after('end_fund')->nullable();
            $table->integer('lesson_start_day')->after('start_time')->nullable();
        });
    }
}
