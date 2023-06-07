<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddMemberBankAccountTable extends Migration
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
            //
            $table->string('bank_number')->after('company_id')->nullable();
            $table->string('sub_bank_number')->after('bank_number')->nullable();
            $table->string('account_number')->after('sub_bank_number')->nullable();
            $table->string('account_name')->after('account_number')->nullable();
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
            //
            $table->dropColumn('bank_number');
            $table->dropColumn('sub_bank_number');
            $table->dropColumn('account_number');
            $table->dropColumn('account_name');
        });
    }
}
