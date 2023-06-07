<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTidAndSituationColumeToLessonsTable extends Migration
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
            $table->integer('t_id')->after('l_id');
            $table->string('apply_situation')->after('pub_situation');

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
            $table->dropColumn('t_id');
            $table->dropColumn('apply_situation');
        });
    }
}
