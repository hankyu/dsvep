<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSomeAduitItemToLessonsTable extends Migration
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
            $table->string('audit_reason')->after('apply_situation')->nullable();
            $table->string('audit_member')->after('audit_reason')->nullable();
            $table->DateTime('audit_time')->after('audit_member')->nullable();
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
            $table->dropColumn('audit_reason');
            $table->dropColumn('audit_member');
            $table->dropColumn('audit_time');
        });
    }
}
