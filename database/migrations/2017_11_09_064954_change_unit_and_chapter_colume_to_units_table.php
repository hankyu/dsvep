<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeUnitAndChapterColumeToUnitsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('units', function (Blueprint $table)
        {
            $table->renameColumn('u_video', 'c_video');
            $table->renameColumn('u_video_situation', 'c_video_situation');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('units', function (Blueprint $table)
        {
            $table->renameColumn('c_video', 'u_video');
            $table->renameColumn('c_video_situation', 'u_video_situation');
        });
    }
}
