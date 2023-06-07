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
    </div>
    @if (isset($member_data))
        <span class="card__content__favorite">
            <button id="Favorite" class="btn card__content__favorite__add__btn" data-l_id="{{ $lesson_data->l_id }}" type="button" name="button">
                <i class="fa fa-heart" aria-hidden="true"></i>
                加入收藏
            </button>
        </span>
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

  <button class="btn btn-success" type="button" name="button">購買此課程</button>
</div>

<div id="shop_fund" class="shop-fund row" data-fundraising_day="{{ $lesson_data->fundraising_day }}" data-end_fund="{{ $lesson_data->end_fund }}" data-least_people="{{ $lesson_data->least_people }}">
  <span id="shop_left_day_time"></span>
  <span class="shop-people">
    <i class="fa fa-users text-theme-color" aria-hidden="true"></i>
    <span>{{ $lesson_data->least_people }}</span>
  </span>
</div>
