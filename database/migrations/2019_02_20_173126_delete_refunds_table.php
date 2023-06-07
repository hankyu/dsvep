<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DeleteRefundsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('refunds');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::create('refunds', function (Blueprint $table)
        {
            $table->increments('id');
            $table->string('r_id');
            $table->integer('m_id');
            $table->integer('item_id');
            $table->integer('price');
            $table->longText('reason');
            $table->DateTime('audit_time')->nullable();
            $table->string('audit_member')->nullable();
            $table->string('situation');
            $table->timestamps();
        });
    }
}
