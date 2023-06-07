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
            <div class="shop-fee">
                @if (is_int($lesson_data->offer_fee) || is_int($lesson_data->origin_fee))
                    @if (date('Y-m-d') > $lesson_data->end_fund)
                        @if ($lesson_data->origin_fee == 0)
                            <span class="discount">免費</span>
                        @else
                            <span class="discount">NT${{ $lesson_data->origin_fee }}</span>
                        @endif
                    @else
                        @if ($lesson_data->offer_fee == 0)
                            <span class="discount">免費</span>
                                @if ($lesson_data->offer_fee != $lesson_data->origin_fee)
                                    <span class="no-discount">${{ $lesson_data->origin_fee }}</span>
                                @endif
                        @else
                            <span class="discount">NT${{ $lesson_data->offer_fee }}</span>
                            @if ($lesson_data->offer_fee != $lesson_data->origin_fee)
                                <span class="no-discount">${{ $lesson_data->origin_fee }}</span>
                            @endif
                        @endif
                    @endif
                @else
                    <span class="discount">NT$未定價</span>
                @endif

                @if ($lesson_data->type == 'online')
                    @if(isset($lesson_data->deadline))
                        <div class="watch-deadline">觀看期限：{{ $lesson_data->deadline == 999 ? '永久' : $lesson_data->deadline . ' 個月' }}</div>
                    @endif
                @endif
            </div>
        </div>
    </div>

    <div class="shopping-cart-footer-mobile row">
        <div class="col-xs-12">
            <span id="shop_left_day_time_mobile"></span>
            <span class="shop-people">
                <i class="fa fa-users text-theme-color" aria-hidden="true"></i>
                <span>{{ $lesson_data->least_people }}</span>
            </span>
        </div>
    </div>

    <div class="shopping-cart-buttons-mobile">
        <button class="col-xs-12 btn btn-success" type="button" name="button">購買此課程</button>
    </div>
</div>