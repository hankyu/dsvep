<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddStarColumnToRankTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('ranks', function (Blueprint $table)
        {
            //
            $table->integer('item_star')->after('item_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('ranks', function (Blueprint $table)
        {
            //
            $table->dropColumn('item_star');
        });
    }
}
