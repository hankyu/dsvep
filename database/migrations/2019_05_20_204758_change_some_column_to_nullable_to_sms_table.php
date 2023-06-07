<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeSomeColumnToNullableToSmsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('sms', function (Blueprint $table) 
        {
            $table->string('msgid')->nullable()->change();
            $table->string('point')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('sms', function (Blueprint $table) 
        {
            $table->string('msgid')->nullable(false)->change();
            $table->string('point')->nullable(false)->change();
        });
    }
}
