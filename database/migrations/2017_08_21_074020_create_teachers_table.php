<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTeachersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('teachers', function (Blueprint $table)
        {
            $table->increments('t_id');
            $table->string('edu_school');
            $table->string('edu_dapartment');
            $table->string('edu_degree');
            $table->string('intro_exp');
            $table->string('intro_link');
            $table->string('works_exp');
            $table->string('works_link');
            $table->string('book_exp')->nullable();
            $table->string('book_link')->nullable();
            $table->string('certificate_exp')->nullable();
            $table->string('certificate_link')->nullable();
            $table->string('awards_exp')->nullable();
            $table->string('awards_link')->nullable();
            $table->string('repo_exp')->nullable();
            $table->string('repo_link')->nullable();
            $table->string('pub_exp')->nullable();
            $table->string('pub_link')->nullable();
            $table->string('teach_type');
            $table->string('teach_exp');
            $table->string('teach_link')->nullable();
            $table->string('auth_situation');
            $table->string('audit_reason')->nullable();
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
        Schema::dropIfExists('teachers');
    }
}
