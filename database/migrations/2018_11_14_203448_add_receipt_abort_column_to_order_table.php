<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddReceiptAbortColumnToOrderTable extends Migration
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
            $table->string('receipt_number')->after('receipt_mode')->nullable();
            $table->string('receipt_rand_number')->after('receipt_number')->nullable();
            $table->string('receipt_abort')->after('receipt_rand_number')->default(false);
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
            $table->dropColumn('receipt_number');
            $table->dropColumn('receipt_rand_number');
            $table->dropColumn('receipt_abort');
        });
    }
}
