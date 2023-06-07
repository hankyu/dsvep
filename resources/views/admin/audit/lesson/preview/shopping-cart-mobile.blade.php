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
    <div class="col-xs-12 shop-info-mobile">
      <div class="shop-name-mobile">
        <span>{{ $lesson_data->l_name }}</span>
      </div>
      <div class="shop-fee">
        @if ($lesson_data->origin_fee == 0)
          <span class="discount">免費</span>
        @elseif ($lesson_data->offer_fee == 0)
          <span class="discount">免費</span>
          <span class="no-discount">${{ $lesson_data->origin_fee }}</span>
        @else
          <span class="discount">NT${{ $lesson_data->offer_fee }}</span>
          @if ($lesson_data->offer_fee != $lesson_data->origin_fee)
            <span class="no-discount">${{ $lesson_data->origin_fee }}</span>
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
