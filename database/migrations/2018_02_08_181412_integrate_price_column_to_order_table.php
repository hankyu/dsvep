<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class IntegratePriceColumnToOrderTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('orders', function (Blueprint $table)
        {
            $table->dropColumn('price_offer');
            $table->dropColumn('price_pay');
            $table->string('payment')->nullable()->after('price_origin');
            $table->renameColumn('price_origin', 'price');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('orders', function (Blueprint $table)
        {
            $table->dropColumn('payment');
            $table->integer('price_offer')->after('l_id');
            $table->integer('price_pay')->nullable()->after('price');
            $table->renameColumn('price', 'price_origin');
        });
    }
}
