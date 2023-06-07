<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSortToTeachersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('teachers', function (Blueprint $table)
        {
            $table->integer('sort')->after('audit_time')->nullable();
            $table->DateTime('sort_updatetime')->after('sort')->nullable();
            $table->integer('sort2')->after('sort_updatetime')->nullable();
            $table->DateTime('sort2_updatetime')->after('sort2')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('teachers', function (Blueprint $table)
        {
            $table->dropColumn('sort');
        });
    }
}
