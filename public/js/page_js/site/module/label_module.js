function labelModule()
{
    function dataFormatAlert()
    {
        console.log('%c-----Data Format Error-----', 'color: red; font-size: 32px;');
    }

    function isDateFormat(data)
    {
        return Object.prototype.toString.call(data) === '[object Date]';
    }

    return {
        judgementLabelText: function(
        {
            cancel_lesson  = false,
            today          = null,
            now            = null,
            left_fund_day  = null,
            left_start_day = null,
            start_time     = null,
            type           = null,
            l_start_time   = null,
            l_end_time     = null,
            max_people     = null,
            buy_people     = null,
            buyer          = null,
            end_fund       = null,
            least_people   = null,
            offer_fee      = null,
            origin_fee     = null
        })
        {
            let is_dev       = window.location.host != 'ds-vep.com',
                label_result = {};

            buy_people = buy_people || buyer || 0;

            if (cancel_lesson == true)
            {
                label_result.label_text  = '取消開班';
                label_result.label_class = 'bg-graduation';
                return label_result;
            }
            else if (today != null && start_time != null)
            {
                // Check Format Start

                if (
                        isDateFormat(today) &&
                        isDateFormat(start_time) &&
                        is_dev()
                   )
                { dataFormatAlert(); }

                if (today.toString().match('00:00:00') == null && is_dev())
                { dataFormatAlert(); }

                // Check Format End

                start_time = new Date(start_time.replace(/-/g, '/'));

                if (today >= start_time)
                {
                    if (type == 'online')
                    {
                        label_result.label_text  = '上課去';
                        label_result.label_class = 'lesson-start';
                        return label_result;
                    }
                    else if (type == 'entity' && l_start_time != null && l_end_time != null)
                    {
                        l_start_time = new Date(l_start_time.replace(/-/g, '/'));
                        l_end_time   = new Date(l_end_time.replace(/-/g, '/'))

                        if (today.toString() == start_time.toString() && now < l_start_time)
                        {
                            label_result.label_text  = '今日上課';
                            label_result.label_class = 'bg-emphasized1';
                            return label_result;
                        }
                        else if (now < l_start_time)
                        {
                            label_result.label_text  = '即將上課';
                            label_result.label_class = 'lesson-start';
                            return label_result;
                        }
                        else if (now < l_end_time)
                        {
                            label_result.label_text  = '上課中';
                            label_result.label_class = 'lesson-start';
                            return label_result;
                        }
                        else
                        {
                            label_result.label_text  = '已結業';
                            label_result.label_class = 'btn-rainbow';
                            return label_result;
                        }
                    }
                    else { return 'data error'; }
                }
                else if (end_fund != null && (left_fund_day != null || left_start_day != null))
                {
                    // Check Format Start

                    if (
                            isDateFormat(end_fund) &&
                            (isDateFormat(left_fund_day) || isDateFormat(left_start_day)) &&
                            is_dev()
                       )
                    { dataFormatAlert(); }

                    // Check Format End

                    end_fund   = new Date(end_fund.replace(/-/g, '/'));

                    if (max_people != null && buy_people >= max_people)
                    {
                        // Check Format Start

                        if (isNaN(max_people) && is_dev) { dataFormatAlert(); }

                        // Check Format End

                        label_result.label_text  = '已額滿 再' + left_start_day + '天上課';
                        label_result.label_class = 'js-e-prepare bg-no-vacancy';
                        return label_result;
                    }
                    else if (today > end_fund)
                    {
                        if (type == 'online')
                        {
                            label_result.label_text  = '備課中 再' + left_start_day + '天上課';
                            label_result.label_class = 'lesson-start';
                            return label_result;
                        }
                        else if (type == 'entity')
                        {
                            label_result.label_text  = '確定開班 再' + left_start_day + '天上課';
                            label_result.label_class = 'js-e-prepare bg-complementary1';
                            return label_result;
                        }
                        else { return 'data error'; }
                    }
                    else if (buy_people != null && least_people != null && offer_fee != null && origin_fee != null)
                    {
                        // Check Format Start

                        if (
                              isNaN(least_people) &&
                              isNaN(offer_fee) &&
                              isNaN(origin_fee) &&
                              is_dev()
                           )
                        { dataFormatAlert(); }

                        // Check Format End

                        if (buy_people >= least_people)
                        {
                            if (offer_fee != origin_fee)
                            {
                                label_result.label_text  = '確定開班 優惠剩' + left_fund_day + '天';
                                label_result.label_class = 'js-e-prepare bg-complementary1';
                                return label_result;
                            }
                            else
                            {
                                label_result.label_text  = '確定開班 再' + left_start_day + '天上課';
                                label_result.label_class = 'js-e-prepare bg-complementary1';
                                return label_result;
                            }
                        }
                        else
                        {
                            if (offer_fee != origin_fee)
                            {
                                label_result.label_text  = '離優惠剩' + ((left_fund_day == 1) ? '最後一' : left_fund_day) + '天';
                                label_result.label_class = 'js-fundraising bg-fundraising';
                                return label_result;
                            }
                            else
                            {
                                label_result.label_text  = '離報名截止剩' + ((left_fund_day == 1) ? '最後一' : left_fund_day) + '天';
                                label_result.label_class = 'js-fundraising bg-fundraising';
                                return label_result;
                            }
                        }
                    }
                    else { return 'data error'; }
                }
                else { return 'data error'; }
            }
            else { return 'data error'; }
        }
    }
}
