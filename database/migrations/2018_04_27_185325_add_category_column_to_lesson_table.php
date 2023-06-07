<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCategoryColumnToLessonTable extends Migration
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
            $table->string('topic')->after('start_time')->nullable()->defalut('其他');
            $table->string('category')->after('topic')->nullable()->defalut('其他');
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
            $table->dropColumn('topic');
            $table->dropColumn('category');
        });
    }
}
