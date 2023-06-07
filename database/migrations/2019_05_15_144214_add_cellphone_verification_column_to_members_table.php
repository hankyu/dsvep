<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCellphoneVerificationColumnToMembersTable extends Migration
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
            $table->integer('cellphone_verify_code')->after('email_verify')->nullable();
            $table->DateTime('cellphone_verify_expire')->after('cellphone_verify_code')->nullable();
            $table->boolean('cellphone_verify_status')->after('cellphone_verify_expire')->default(false);
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
            $table->dropColumn('cellphone_verify_code');
            $table->dropColumn('cellphone_verify_expire');
            $table->dropColumn('cellphone_verify_status');
        });
    }
}
