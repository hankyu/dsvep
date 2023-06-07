<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddUidToRollcallTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('rollcalls', function (Blueprint $table)
        {
            $table->integer('u_id')->after('l_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('rollcalls', function (Blueprint $table)
        {
            $table->dropColumn('u_id');
        });
    }
}
