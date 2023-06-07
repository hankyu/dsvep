<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMembersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('members', function (Blueprint $table)
        {
            $table->increments('m_id');
            $table->string('t_id')->nullable();
            $table->string('account');
            $table->string('password');
            $table->string('nickname');
            $table->string('m_name')->nullable();
            $table->string('id_code')->nullable();
            $table->string('sex')->nullable();
            $table->Date('birthday')->nullable();
            $table->string('telphone')->nullable();
            $table->string('cellphone')->nullable();
            $table->text('address')->nullable();
            $table->string('email')->nullable();
            $table->string('reg_method');
            $table->string('avg_img')->nullable();
            $table->string('facebook_link')->nullable();
            $table->string('line_id')->nullable();
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
        Schema::dropIfExists('members');
    }
}
