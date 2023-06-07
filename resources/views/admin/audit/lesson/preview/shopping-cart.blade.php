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
    <div class="shop-name">
      <h2>{{ $lesson_data->l_name }}</h2>
      <p><h6 style="color: #337AB7">課程編號：{{ $lesson_data->l_id }}</h6></p>
    </div>
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

  <button class="btn btn-success" type="button" name="button">購買此課程</button>
</div>

<div id="shop_fund" class="shop-fund row" data-fundraising_day="{{ $lesson_data->fundraising_day }}" data-end_fund="{{ $lesson_data->end_fund }}" data-least_people="{{ $lesson_data->least_people }}">
  <span id="shop_left_day_time"></span>
  <span class="shop-people">
    <i class="fa fa-users text-theme-color" aria-hidden="true"></i>
    <span>{{ $lesson_data->least_people }}</span>
  </span>
</div>
