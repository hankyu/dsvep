<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\Lesson;
use App\Main;
use App\Order;
use App\Teacher;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->call(function()
        {
            $lesson = new Lesson();
            $lesson->send_notify_lesson_mail();
        })->dailyAt('07:00');

        $schedule->call(function()
        {
            $lesson = new Lesson();
            $teacher = new Teacher();

            $lesson->checkLessonWhetherStart();
            sleep(5);
            $lesson->checkPromotingLessonsSave();
            $lesson->checkAllLessonsSave();
            $teacher->checkPopTeachersSave();
        })->dailyAt('00:05');

        $schedule->call(function()
        {
            $lesson = new Lesson();
            $lesson->checkCurrentPrice();
        })->dailyAt('00:00');

        $schedule->call(function()
        {
            $order = new Order();
            $order->checkReceipSend();
        })->dailyAt('06:00');

        $schedule->call(function()
        {
            $lesson = new Lesson();
            $lesson->checkOnlineLessonStart();
        })->dailyAt('05:00');

        $schedule->call(function()
        {
            $order = new Order();
            $order->checkOrderExpire();
            //$order->checkOrderCancel();
        })->everyMinute();
    }

    /**
     * Register the Closure based commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        require base_path('routes/console.php');
        $this->load(__DIR__.'/Commands');
    }
}
