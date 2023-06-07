function runningNumberModule()
{
    let entityRegister = [];

    function runNumber(target, n, precision, customizeFn)
    {
        let 
            currEntityObj;

        garbageCollect();

        currEntityObj = entityRegister[entityRegister.length] = {entity: runningNumberModuleEntity(), finish: false};
        currEntityObj.entity.init(target, n, precision, currEntityObj, customizeFn);
    }

    function garbageCollect()
    {
        let 
            tmpArr = entityRegister;

            entityRegister = tmpArr.filter((elm) => {
            let bool = !elm.finish;
            delete elm.entity;
            return bool;
        });
    }

    /* --------------------- */
    /*     Module Entity     */
    /* --------------------- */
    function runningNumberModuleEntity()
    {
        let
            step,
            targetNumber,
            precision,
            entityRefer,
            $target,
            steps = [50.00, 42.18, 34.55, 27.30, 20.61, 14.64, 9.55, 5.45, 2.45, 0.62, 0.00, 0.62, 2.45, 5.45, 9.55, 14.64, 20.61, 27.30, 34.55, 42.18, 50.00, 57.82, 65.45, 72.70, 79.39, 85.36, 90.45, 94.55, 97.55, 99.38, 100.00, 99.38, 97.55, 94.55, 90.45, 85.36, 79.39, 72.70, 65.45, 57.82],
            durations = [20, 20, 20, 19, 18, 17, 16, 15, 13, 12, 10, 8, 7, 5, 4, 3, 2, 1, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 7, 8, 10, 12, 13, 15, 16, 17, 18, 19, 20, 20],
            stepDuration = 1;
            customizeShow = false;

        function init(target, n, p, refer, fn)
        {
            $target = $(target);
            targetNumber = n;
            precision = p
            entityRefer = refer;

            stepDuration *= (Math.random()+1);

            if(typeof fn === 'function')
            {
                customizeShow = fn;
            }
            startRunningNumber(); 
        }

        function startRunningNumber()
        {
            step = 0;
            if(targetNumber == 0)
            {
                show(targetNumber);
                finish();
            }
            else
            {
                keepRunning();
            }
        }

        function keepRunning()
        {
            let showNumber = targetNumber * steps[step] / 100;

            show(showNumber);
            if(showNumber == targetNumber)
            {
                finish();
            }
            else
            {
                step++;
                setTimeout(() => {
                    if(step < steps.length)
                    {
                        keepRunning();
                    }
                    else
                    {
                        show(targetNumber);
                        finish();
                    }
                }, stepDuration* durations[step]);
            }
        }

        function show(num){
            if(customizeShow)
            {
                customizeShow(num, $target, precision);
            }
            else
            {
                $target.text(num.toFixed(precision));
            }
        }

        function finish()
        {
            // do something.
            entityRefer.finish = true;
        }

        return {
            startRunningNumber: startRunningNumber,
            init: init
        }
    }

    return {
        runNumber: runNumber
    }
}