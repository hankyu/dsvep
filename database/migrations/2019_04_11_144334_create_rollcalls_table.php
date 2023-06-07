<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRollcallsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rollcalls', function (Blueprint $table)
        {
            $table->increments('id');
            $table->integer('m_id');
            $table->integer('l_id');
            $table->DateTime('rollcall_time');
            $table->integer('rollcall_member');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('rollcalls');
    }
}
