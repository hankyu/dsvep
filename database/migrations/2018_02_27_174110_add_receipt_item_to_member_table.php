<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddReceiptItemToMemberTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('members', function (Blueprint $table)
        {
            $table->string('mobile_barcode')->after('line_id')->nullable();
            $table->string('moica_barcode')->after('mobile_barcode')->nullable();
            $table->string('love_code')->after('moica_barcode')->nullable();
            $table->string('company_id')->after('love_code')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('members', function (Blueprint $table)
        {
            $table->dropColumn('mobile_barcode');
            $table->dropColumn('moica_barcode');
            $table->dropColumn('love_code');
            $table->dropColumn('company_id');
        });
    }
}
