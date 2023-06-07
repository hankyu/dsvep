<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table)
        {
            $table->increments('id');
            $table->string('o_id');
            $table->integer('m_id');
            $table->integer('l_id');
            $table->integer('price_offer');
            $table->integer('price_origin');
            $table->integer('price_pay')->nullable();
            $table->DateTime('order_time');
            $table->DateTime('delete_time')->nullable();
            $table->DateTime('checkout_time')->nullable();
            $table->DateTime('refund_time')->nullable();
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
        Schema::dropIfExists('orders');
    }
}
