<div class="lesson-label-wrapper-mobile">
    @if ($lesson_data->type == 'entity')
      <div class="lesson-label-mobile entity">
        <span>實體</span>
      </div>
    @elseif ($lesson_data->type == 'online')
      <div class="lesson-label-mobile online">
        <span>線上</span>
      </div>
    @endif

    @if (date('Y-m-d') > $lesson_data->end_fund)
        @if ($lesson_data->cancel_lesson == true)
            <div class="lesson-type-label-mobile bg-graduation"><span>取消開班</span></div>
        @else
            @if (date('Y-m-d') < $lesson_data->start_time)
                @if ($lesson_data->type == "entity")
                    <div class="lesson-type-label-mobile js-e-prepare bg-complementary1" data-start_time={{ $lesson_data->start_time }}><span>確定開班</span></div>
                @else
                    <div class="lesson-type-label-mobile js-prepare bg-complementary1" data-start_time={{ $lesson_data->start_time }}><span>備課中</span></div>
                @endif
            @else
                @if ($lesson_data->type == "entity")
                    @if ((date('Y-m-d H:i:s') >= $unit_data[0]->l_start_time) && (date('Y-m-d H:i:s') < $last_lesson_time))
                        <div class="lesson-type-label-mobile lesson-start"><span>上課中</span></div>
                    @endif
                @else
                    <div class="lesson-type-label-mobile lesson-start"><span>上課去</span></div>
                @endif
            @endif
        @endif
    @else
        @if ($buy_people >= $lesson_data->least_people)
            <div class="lesson-type-label-mobile js-e-prepare bg-complementary1" data-start_time={{ $lesson_data->start_time }}><span>確定開班</span></div>
        @else
            @if ($lesson_data->origin_fee == $lesson_data->offer_fee)
                <div class="lesson-type-label-mobile js-fundraising bg-fundraising" data-end_fund={{ $lesson_data->end_fund }}><span>離報名截止</span></div>
            @else
                <div class="lesson-type-label-mobile js-fundraising bg-fundraising" data-end_fund={{ $lesson_data->end_fund }}><span>優惠</span></div>
            @endif
        @endif
    @endif
</div>

<div class="shopping-cart-mobile">
    <div class="shopping-cart-header row">
        <div class="l_location col-xs-5 text-left">
            @if ($lesson_data->location != null)
                <span>
                    @if (mb_substr($lesson_data->location, 0, 2) == '其他')
                        其他
                    @else
                        {{ mb_substr($lesson_data->location, 0, 3) }}
                    @endif
                </span>
            @endif
        </div>
        <div class="lesson-sn col-xs-7 text-right">
            編號：{{ $lesson_data->l_id }}
        </div>
        <div class="col-xs-12 shop-info-mobile">
            <div class="shop-name-mobile">
                <span>{{ $lesson_data->l_name }}</span>
            </div>
        </div>
        <div class="col-xs-7 col-folded-inline">
            <div class="shop-fee">
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

        </div>
            
        <div class="col-xs-5 text-right col-favorite">

            @if (isset($member_data))
                @if ($favorite)
                    <span class="card__content__favorite">
                        <button  id="Favorite_m" class="btn card__content__favorite__add__btn" data-l_id="{{ $lesson_data->l_id }}" type="button" name="button">
                            <i class="fas fa-heart" aria-hidden="true"></i>
                            收藏
                        </button>
                    </span>
                @else
                    <span class="card__content__favorite">
                        <button  id="Favorite_m" class="btn card__content__favorite__cancel__btn" data-l_id="{{ $lesson_data->l_id }}" type="button" name="button">
                            <i class="far fa-heart" aria-hidden="true"></i>
                            取消
                        </button>
                    </span>
                @endif
            @endif
        </div>
        @if (date('Y-m-d') >= $lesson_data->start_time && date('Y-m-d H:i:s') < $last_lesson_time)
            <div class="col-xs-12 col_ps">
                <span>(今日上課，欲報名請洽(02)2955-4564)</span>
            </div>
        @endif
    </div>

    <div class="shopping-cart-footer-mobile row">
        <div class="col-xs-12">
            <span id="shop_left_day_time_mobile"></span>
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
    </div>

    <div class="shopping-cart-buttons-mobile">
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
                            <button class="btn btn-warning shop-add" id="check_order_mob">查看訂單</button>
                        </div>
                    @elseif (($has_order === 'checkout') && !$over_deadline)
                        <div>
                            <button class="btn btn-primary shop-add" id="enter_classroom_mob">進入教室</button>
                        </div>
                    @else
                        <div id="cart_opt_mob">
                            @if ((date('Y-m-d') <= $lesson_data->end_fund) && ($lesson_data->offer_fee == 0))
                                @if ($lesson_data->max_people != null && $buy_people >= $lesson_data->max_people)
                                    <span class="btn btn-no-vacancy shop-add disabled" data-start_time={{ $lesson_data->start_time }}>已額滿 </span>
                                @else
                                    <button class="btn btn-success shop-add" id="direct_buy_free_mob">立即上課</button>
                                @endif
                            @elseif ((date('Y-m-d') > $lesson_data->end_fund) && (date('Y-m-d') <= $lesson_data->start_time) && ($lesson_data->origin_fee == 0))
                                @if ($lesson_data->max_people != null && $buy_people >= $lesson_data->max_people)
                                    <span class="btn btn-no-vacancy shop-add disabled" data-start_time={{ $lesson_data->start_time }}>已額滿 </span>
                                @else
                                    <button class="btn btn-success shop-add" id="direct_buy_free_mob">立即上課</button>
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
                                            <button class="btn btn-success col-xs-12" id="direct_buy_mob">購買此課程</button>
                                        @endif
                                    @endif
                                @else
                                    @if (date('Y-m-d H:i:s') >= $lesson_data->end_fund)
                                        @if ($lesson_data->origin_fee == 0)
                                            <button class="btn btn-success shop-add" id="direct_buy_free_mob">立即上課</button>
                                        @else
                                            <button class="btn btn-success col-xs-12" id="direct_buy_mob">購買此課程</button>
                                        @endif
                                    @else
                                        @if ($lesson_data->offer_fee == 0)
                                            <button class="btn btn-success shop-add" id="direct_buy_free_mob">立即上課</button>
                                        @else
                                            <button class="btn btn-success col-xs-12" id="direct_buy_mob">購買此課程</button>
                                        @endif
                                    @endif
                                @endif
                            @endif
                        </div>
                    @endif
                @else
                    <div id="cart_opt_mob">
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
                                        <button class="btn btn-success col-xs-12" onclick="_before_login('buy', {{ $lesson_data->l_id }})">購買此課程</button>
                                    @endif
                                @endif
                            @else
                                @if (date('Y-m-d H:i:s') >= $lesson_data->end_fund)
                                    @if ($lesson_data->origin_fee == 0)
                                        <button class="btn btn-success shop-add" onclick="_before_login('direct', {{ $lesson_data->l_id }})">立即上課</button>
                                    @else
                                        <button class="btn btn-success col-xs-12" onclick="_before_login('buy', {{ $lesson_data->l_id }})">購買此課程</button>
                                    @endif
                                @else
                                    @if ($lesson_data->offer_fee == 0)
                                        <button class="btn btn-success shop-add" onclick="_before_login('direct', {{ $lesson_data->l_id }})">立即上課</button>
                                    @else
                                        <button class="btn btn-success col-xs-12" onclick="_before_login('buy', {{ $lesson_data->l_id }})">購買此課程</button>
                                    @endif
                                @endif
                            @endif
                        @endif
                    </div>
                @endif
            @endif
        </div>
    </div>
</div>
<button class="mobile-shopping_cart_panel-switcher" type="button"><span class="fas fa-caret-down"></span></button>