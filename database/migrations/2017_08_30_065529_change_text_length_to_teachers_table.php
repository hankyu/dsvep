<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeTextLengthToTeachersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('teachers', function (Blueprint $table)
        {
            $table->longText('intro_exp')->change();
            $table->longText('intro_link')->change();
            $table->longText('works_exp')->change();
            $table->longText('works_link')->change();
            $table->longText('book_exp')->nullable()->change();
            $table->longText('book_link')->nullable()->change();
            $table->longText('certificate_exp')->nullable()->change();
            $table->longText('certificate_link')->nullable()->change();
            $table->longText('awards_exp')->nullable()->change();
            $table->longText('awards_link')->nullable()->change();
            $table->longText('repo_exp')->nullable()->change();
            $table->longText('repo_link')->nullable()->change();
            $table->longText('pub_exp')->nullable()->change();
            $table->longText('pub_link')->nullable()->change();
            $table->longText('teach_type')->change();
            $table->longText('teach_exp')->change();
            $table->longText('teach_link')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('teachers', function (Blueprint $table)
        {
            $table->string('intro_exp')->change();
            $table->string('intro_link')->change();
            $table->string('works_exp')->change();
            $table->string('works_link')->change();
            $table->string('book_exp')->nullable()->change();
            $table->string('book_link')->nullable()->change();
            $table->string('certificate_exp')->nullable()->change();
            $table->string('certificate_link')->nullable()->change();
            $table->string('awards_exp')->nullable()->change();
            $table->string('awards_link')->nullable()->change();
            $table->string('repo_exp')->nullable()->change();
            $table->string('repo_link')->nullable()->change();
            $table->string('pub_exp')->nullable()->change();
            $table->string('pub_link')->nullable()->change();
            $table->string('teach_type')->change();
            $table->string('teach_exp')->change();
            $table->string('teach_link')->nullable()->change();
        });
    }
}
