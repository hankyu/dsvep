<div class="shopping-cart">
    @if ($lesson_data->type == 'entity')
        <div class="lesson-label entity">
            <span>實體</span>
        </div>
    @elseif ($lesson_data->type == 'online')
        <div class="lesson-label online">
            <span>線上</span>
        </div>
    @endif

    <div class="shop-title">

        <p class="p_location">
        @if ($lesson_data->location != null)
            @if (mb_substr($lesson_data->location, 0, 2) == '其他')
                其他
            @else
                {{ mb_substr($lesson_data->location, 0, 3) }}
            @endif
        @else
            &nbsp;
        @endif
        </p>
        
        <div class="shop-name">
            <h2>{{ $lesson_data->l_name }}</h2>
            <p class="lesson-sn">課程編號：{{ $lesson_data->l_id }}</p>

            @if (isset($member_data))
                @if ($favorite)
                    <span class="card__content__favorite">
                        <button id="Favorite" class="btn card__content__favorite__add__btn" data-l_id="{{ $lesson_data->l_id }}" type="button" name="button">
                            <i class="fas fa-heart" aria-hidden="true"></i>
                            加入收藏
                        </button>
                    </span>
                @else
                    <span class="card__content__favorite">
                        <button id="Favorite" class="btn card__content__favorite__cancel__btn" data-l_id="{{ $lesson_data->l_id }}" type="button" name="button">
                            <i class="far fa-heart" aria-hidden="true"></i>
                            取消收藏
                        </button>
                    </span>
                @endif
            @endif
        </div>

        @if ($lesson_data->t_id === ($teacher_data->t_id ?? null) || ($member_data->authority ?? null) === 'worker')
            <div class="edit_bar">
                <a href="/teacher/lesson/manage/{{ $lesson_data->l_id }}/info"><span class="btn btn-info btn-edit"><span class="fas fa-edit"></span>編輯課程</span></a>
            </div>
        @endif
        
        {{-- <div class="shop-star">
            <span>
                <i class="fa fa-star fa-2x text-theme-color" aria-hidden="true"></i>
                <i class="fa fa-star fa-2x text-theme-color" aria-hidden="true"></i>
                <i class="fa fa-star fa-2x text-theme-color" aria-hidden="true"></i>
                <i class="fa fa-star fa-2x text-theme-color" aria-hidden="true"></i>
                <i class="fa fa-star fa-2x text-theme-color" aria-hidden="true"></i>
                <span> (0 / 0)</span>
            </span>
        </div> --}}
    </div>
    <hr>
    <div>
        @if (date('Y-m-d') > $lesson_data->end_fund)
            @if ($lesson_data->cancel_lesson == true)
                <span class="lesson-type-shop bg-graduation">取消開班 </span>
            @else
                @if (date('Y-m-d') < $lesson_data->start_time)
                    @if ($lesson_data->type == "entity")
                        <span class="lesson-type-shop js-e-prepare bg-complementary1" data-start_time={{ $lesson_data->start_time }}>確定開班 </span>
                    @else
                        <span class="lesson-type-shop js-prepare bg-complementary1" data-start_time={{ $lesson_data->start_time }}>備課中 </span>
                    @endif
                @else
                    @if ($lesson_data->type == "entity")
                        @if ((date('Y-m-d H:i:s') >= $unit_data[0]->l_start_time) && (date('Y-m-d H:i:s') < $last_lesson_time))
                            @if(date('Y-m-d') == $lesson_data->start_time)
                                <span class="lesson-type-shop bg-emphasized1">今日上課</span>
                            @else
                                <span class="lesson-type-shop lesson-start">上課中</span>
                            @endif
                        @endif
                    @else
                        <span class="lesson-type-shop lesson-start">上課去</span>
                    @endif
                @endif
            @endif
        @else
            @if ((!is_null($lesson_data->max_people)) && ($buy_people >= $lesson_data->max_people))

            @elseif ($buy_people >= $lesson_data->least_people)
                <span class="lesson-type-shop js-e-prepare bg-complementary1" data-start_time={{ $lesson_data->start_time }}>確定開班 </span>
            @else
                @if ($lesson_data->origin_fee == $lesson_data->offer_fee)
                    <span class="lesson-type-shop js-fundraising bg-fundraising" data-end_fund={{ $lesson_data->end_fund }}>離報名截止</span>
                @else
                    <span class="lesson-type-shop js-fundraising bg-fundraising" data-end_fund={{ $lesson_data->end_fund }}>優惠</span>
                @endif
            @endif
        @endif
    </div>

    <div class="shop-fee margin">
        @if (date('Y-m-d') <= $lesson_data->end_fund)
            @if ($lesson_data->offer_fee === 0)
                <span class="discount">免費</span>
            @else
                <span class="discount">NT${{ $lesson_data->offer_fee }}</span>
            @endif
            @if ($lesson_data->offer_fee != $lesson_data->origin_fee)
                <span class="no-discount">${{ $lesson_data->origin_fee }}</span>
            @endif
        @else
            @if ($lesson_data->origin_fee === 0)
                <span class="discount">免費</span>
            @else
                <span class="discount">NT${{ $lesson_data->origin_fee }}</span>
            @endif
            @if (date('Y-m-d') >= $lesson_data->start_time && date('Y-m-d H:i:s') < $last_lesson_time)
                <p>(上課中，欲報名請洽(02)2955-4564)</p>
            @endif
        @endif

        @if ($lesson_data->type == 'online')
            @if(isset($lesson_data->deadline))
                <div class="watch-deadline">觀看期限：{{ $lesson_data->deadline == 999 ? '永久' : $lesson_data->deadline . ' 個月' }}</div>
            @endif
        @endif
    </div>


    <div>
        @if (date('Y-m-d') <= $lesson_data->end_fund)
            @if ($lesson_data->type == 'entity')
                @if ($lesson_data->offer_fee != $lesson_data->origin_fee)
                    <span class="span-block">離優惠截止剩：{{ $lesson_data->end_fund }} <i class="fa fa-question-circle" data-container="body" data-toggle="popover" data-placement="top" data-content="若募資未達標準，將全額退費。"></i></span>
                @else
                    <span class="span-block">募資截止日期：{{ $lesson_data->end_fund }} <i class="fa fa-question-circle" data-container="body" data-toggle="popover" data-placement="top" data-content="若募資未達標準，將全額退費。"></i></span>
                @endif
            @else
                @if ($lesson_data->offer_fee != $lesson_data->origin_fee)
                    <span class="span-block">離募資結束剩：{{ $lesson_data->end_fund }} <i class="fa fa-question-circle" data-container="body" data-toggle="popover" data-placement="top" data-content="若募資未達標準，將全額退費。"></i></span>
                @else
                    <span class="span-block">募資結束日期：{{ $lesson_data->end_fund }} <i class="fa fa-question-circle" data-container="body" data-toggle="popover" data-placement="top" data-content="若募資未達標準，將全額退費。"></i></span>
                @endif
            @endif
        @endif

        <span class="span-block">課程開始日期：{{ $lesson_data->start_time }}</span>

    </div>

    <div id="cart_area">
        @if ((($member_data->authority ?? null) == 'worker') || ($lesson_data->t_id == ($teacher_data->t_id ?? null)))
            <div>
                <a href="/#/profile/lesson/classroom/{{ $lesson_data->l_id }}"><span class="btn btn-primary shop-add">進入教室</span></a>
            </div>
        @elseif ($lesson_data->cancel_lesson == true)
            <button class="btn btn-danger shop-add disabled">取消開班</button>
        @else
            @if ($member_data != '')
                @if ($has_order === true)
                    <div>
                        <button class="btn btn-warning shop-add" id="check_order">查看訂單</button>
                    </div>
                @elseif (($has_order === 'checkout') && !$over_deadline)
                    <div>
                        <button class="btn btn-primary shop-add" id="enter_classroom">進入教室</button>
                    </div>
                @else
                    <div id="cart_opt">
                        @if ((date('Y-m-d') <= $lesson_data->end_fund) && ($lesson_data->offer_fee == 0))
                            @if ($lesson_data->max_people != null && $buy_people >= $lesson_data->max_people)
                                <span class="btn btn-no-vacancy shop-add disabled" data-start_time={{ $lesson_data->start_time }}>已額滿 </span>
                            @else
                                <button class="btn btn-success shop-add" id="direct_buy_free">立即上課</button>
                            @endif
                        @elseif ((date('Y-m-d') > $lesson_data->end_fund) && (date('Y-m-d') <= $lesson_data->start_time) && ($lesson_data->origin_fee == 0))
                            @if ($lesson_data->max_people != null && $buy_people >= $lesson_data->max_people)
                                <span class="btn btn-no-vacancy shop-add disabled" data-start_time={{ $lesson_data->start_time }}>已額滿 </span>
                            @else
                                <button class="btn btn-success shop-add" id="direct_buy_free">立即上課</button>
                            @endif
                        @else
                            @if ($lesson_data->type == 'entity')
                                @if ((date('Y-m-d H:i:s') >= $lesson_data->start_time) && (date('Y-m-d H:i:s') < $last_lesson_time))
                                    @if ((date('Y-m-d') == $lesson_data->start_time) && (date('Y-m-d H:i:s') < $last_lesson_time))
                                        <span class="btn btn-today shop-add bg-emphasized1 disabled">今日上課</span>
                                    @else
                                        <button class="btn btn-danger shop-add disabled">上課中</button>
                                    @endif
                                @elseif (date('Y-m-d H:i:s') >= $last_lesson_time)
                                    <button class="btn btn-danger shop-add disabled">已結業</button>
                                @else
                                    @if ((!is_null($lesson_data->max_people)) && ($buy_people >= $lesson_data->max_people))
                                        <span class="btn btn-no-vacancy shop-add disabled" data-start_time={{ $lesson_data->start_time }}>已額滿 </span>
                                    @else
                                        <button class="btn btn-success shop-add" id="direct_buy">購買此課程</button>
                                    @endif
                                @endif
                            @else
                                @if (date('Y-m-d H:i:s') >= $lesson_data->end_fund)
                                    @if ($lesson_data->origin_fee == 0)
                                        <button class="btn btn-success shop-add" id="direct_buy_free">立即上課</button>
                                    @else
                                        <button class="btn btn-success shop-add" id="direct_buy">購買此課程</button>
                                    @endif
                                @else
                                    @if ($lesson_data->offer_fee == 0)
                                        <button class="btn btn-success shop-add" id="direct_buy_free">立即上課</button>
                                    @else
                                        <button class="btn btn-success shop-add" id="direct_buy">購買此課程</button>
                                    @endif
                                @endif
                            @endif
                        @endif
                    </div>
                @endif
            @else
                <div id="cart_opt">
                    @if ((date('Y-m-d') <= $lesson_data->end_fund) && ($lesson_data->offer_fee == 0))
                        @if ($lesson_data->max_people != null && $buy_people >= $lesson_data->max_people)
                            <span class="btn btn-no-vacancy shop-add disabled" data-start_time={{ $lesson_data->start_time }}>已額滿 </span>
                        @else
                            <button class="btn btn-success shop-add" onclick="_before_login('direct', {{ $lesson_data->l_id }})">立即上課</button>
                        @endif
                    @elseif ((date('Y-m-d') > $lesson_data->end_fund) && (date('Y-m-d') <= $lesson_data->start_time) && ($lesson_data->origin_fee == 0))
                        @if ($lesson_data->max_people != null && $buy_people >= $lesson_data->max_people)
                            <span class="btn btn-no-vacancy shop-add disabled" data-start_time={{ $lesson_data->start_time }}>已額滿 </span>
                        @else
                            <button class="btn btn-success shop-add" onclick="_before_login('direct', {{ $lesson_data->l_id }})">立即上課</button>
                        @endif
                    @else
                        @if ($lesson_data->type == 'entity')
                            @if ((date('Y-m-d H:i:s') >= $lesson_data->start_time) && (date('Y-m-d H:i:s') < $last_lesson_time))
                                @if ((date('Y-m-d') == $lesson_data->start_time) && (date('Y-m-d H:i:s') < $last_lesson_time))
                                    <span class="btn btn-today shop-add bg-emphasized1 disabled">今日上課</span>
                                @else
                                    <button class="btn btn-danger shop-add disabled">上課中</button>
                                @endif
                            @elseif (date('Y-m-d H:i:s') >= $last_lesson_time)
                                <button class="btn btn-danger shop-add disabled">已結業</button>
                            @else
                                @if ($lesson_data->max_people != null && $buy_people >= $lesson_data->max_people)
                                    <span class="btn btn-no-vacancy shop-add disabled" data-start_time={{ $lesson_data->start_time }}>已額滿 </span>
                                @else
                                    <button class="btn btn-success shop-add" onclick="_before_login('buy', {{ $lesson_data->l_id }})">購買此課程</button>
                                @endif
                            @endif
                        @else
                            @if (date('Y-m-d H:i:s') >= $lesson_data->end_fund)
                                @if ($lesson_data->origin_fee == 0)
                                    <button class="btn btn-success shop-add" onclick="_before_login('direct', {{ $lesson_data->l_id }})">立即上課</button>
                                @else
                                    <button class="btn btn-success shop-add" onclick="_before_login('buy', {{ $lesson_data->l_id }})">購買此課程</button>
                                @endif
                            @else
                                @if ($lesson_data->offer_fee == 0)
                                    <button class="btn btn-success shop-add" onclick="_before_login('direct', {{ $lesson_data->l_id }})">立即上課</button>
                                @else
                                    <button class="btn btn-success shop-add" onclick="_before_login('buy', {{ $lesson_data->l_id }})">購買此課程</button>
                                @endif
                            @endif
                        @endif
                    @endif
                </div>
            @endif
        @endif
    </div>
</div>

<div id="shop_fund" class="shop-fund row" data-end_fund="{{ $lesson_data->end_fund }}" data-least_people="{{ $lesson_data->least_people }}" data-buy_people="{{ $buy_people }}">
    <span id="shop_left_day_time"></span>
    {{-- <span class="shop-people">
        目標人數
        <i class="fa fa-users text-theme-color" aria-hidden="true"></i>
        @if ($lesson_data->least_people == 0)
            <span>{{ $buy_people }}</span>
        @else
            <span>{{ $buy_people }}/{{ $lesson_data->least_people }}</span>
        @endif
    </span> --}}
</div>
