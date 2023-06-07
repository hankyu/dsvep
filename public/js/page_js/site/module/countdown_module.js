function countdownModule(customize)
{
    let
    setupTime,
    countdownTime,
    $countdownContainer,
    callback,
    intervalId;

    setup(customize);

    function doCoundown()
    {
        let {hh, mm, ss} = countdownTime;

        if(ss == 0)
        {
            if(mm == 0)
            {
            hh --;
            mm = 59;
            ss = 59;
            }
            else
            {
            mm --;
            ss = 59;
            }
        }
        else
        {
            ss --;
        }
        countdownTime = {hh, mm, ss};
        showCountdown();
        if(hh == 0 && mm == 0 && ss == 0)
        {
            clearInterval(intervalId);
            timeover();
        }
    }

    function timeover()
    {
    if(callback){ callback(); }
    }

    function showCountdown()
    {
    let countdownText;

    countdownText = countdownTime.hh? (countdownTime.hh + '小時') : '';
    countdownText += (countdownText || countdownTime.mm)? (countdownTime.mm + '分') : '';
    countdownText += (countdownText || countdownTime.ss)? (countdownTime.ss + '秒') : '';
    $countdownContainer.text(countdownText);
    }

    function restart()
    {
    stop();
    start();
    }

    function start()
    {
    let {hh, mm, ss} = setupTime;
    countdownTime = {hh, mm, ss};
    showCountdown();
    intervalId = setInterval(doCoundown, 1000);
    }

    function stop()
    {
    clearInterval(intervalId);
    }

    function setup(customize)
    {
    let {hh, mm, ss, container, finish} = customize;
    hh = (typeof hh != 'number' || hh < 0)? 0 : hh;
    mm = (typeof mm != 'number' || mm < 0)? 0 : mm;
    ss = (typeof ss != 'number' || ss < 0)? 0 : ss;
    callback = typeof finish == 'function'? finish : null;
    $countdownContainer = $(container);
    setupTime = {hh, mm, ss};
    }

    return {
    start: start,
    stop: stop,
    restart: restart
    }
}