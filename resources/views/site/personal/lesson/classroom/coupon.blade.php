<div class="row">
  <div class="col-md-4">
    <span>可使用的對象</span>
    <input id="coupon_member" class="form-control" type="text" placeholder="輸入會員帳號/信箱(指定使用) 或者 all(全部通用)">
  </div>
  <div class="col-md-4">
    <span>折扣價格</span>
    <input id="coupon_discount" class="form-control" type="number" placeholder="輸入折扣價格" required>
  </div>
  <div class="col-md-4">
    <span>使用期限</span>
    <input id="coupon_end_time" class="form-control datepicker-here" placeholder="選擇截止日期" required>
  </div>
  <div class="btn-wrapper col-xs-12">
    <button id="btn_add_coupon" class="btn btn-success" type="button" name="button">新增優惠券</button>
  </div>
</div>
<div id="coupon_list" class="coupon-list">


  <div class="list-header hidden-xs row" style="font-size: 15px;">
    <div class="col-sm-1">
      <span>優惠代碼</span>
    </div>
    <div class="col-sm-2">
      <span>創建人員</span>
    </div>
    <div class="col-sm-2">
      <span>創建日期</span>
    </div>
    <div class="col-sm-2">
      <span>截止日期</span>
    </div>
    <div class="col-sm-1">
      <span>折扣價格</span>
    </div>
    <div class="col-sm-2">
      <span>適用對象</span>
    </div>
    <div class="col-sm-2">
      <span>使用狀況</span>
    </div>
  </div>

  @if (count($coupon_data) > 0)
    @for ($i = 0; $i < count($coupon_data); $i++)
      <div class="list-item row">
        <div class="col-sm-1">
          <span class="list-id">{{ $coupon_data[$i]->code }}</span>
        </div>
        <div class="col-sm-2">
          <span class="list-id">{{ $coupon_data[$i]->creator ?? '無資料' }}</span>
        </div>
        <div class="col-sm-2">
          <span class="list-deadline">{{ $coupon_data[$i]->created_at }}</span>
        </div>
        <div class="col-sm-2">
          <span class="list-deadline">{{ explode(" ", $coupon_data[$i]->expire_time)[0] . " 23:59:59" }}</span>
        </div>
        <div class="col-sm-1">
          <span class="list-discount">{{ $lesson_data->origin_fee - $coupon_data[$i]->price == 0 ? '免費' : $coupon_data[$i]->price }}</span>
        </div>
        <div class="col-sm-2">
          <span class="list-apply">{{ $coupon_data[$i]->object == 'all' ? '全部適用' : $coupon_data[$i]->object }}</span>
        </div>
        <div class="col-sm-2">
          <span class="list-situation">{{ $coupon_data[$i]->situation == true ? '可使用' : '無法使用' }}</span>
        </div>
        <div class="action-del">
          <i class="fas fa-times fa-2x btn-remove-coupon" onclick="_remove_coupon('{{ $coupon_data[$i]->code }}')" aria-hidden="true"></i>
        </div>
      </div>
    @endfor
  @else
    <div class="center row">
      <div class="col-xs-12">
        <span>找不到優惠券資料</span>
      </div>
    </div>
  @endif
</div>
