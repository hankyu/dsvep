<div class="accordion">
    <div class="cd-accordion-menu animated">
        @foreach ($order_data as $key => $data)
            @if ($data[0]->delete_time != '')
                <div class="order-card cancel">
            @elseif ($data[0]->checkout_time != '')
                <div class="order-card pay">
            @else
                <div class="order-card not-pay">
            @endif

              <input type="checkbox" name="group-{{ $key }}" id="group-{{ $key }}" checked>
              <label for="group-{{ $key }}">
                  <i class="fas fa-angle-double-down"></i>
                  <span class="order-id">訂單編號：{{ $data[0]->o_id }}</span>

                  @if (($data[0]->delete_time == '') && ($data[0]->checkout_time == ''))
                      <span class="cancel-order" onclick="_cancel_order('{{ $data[0]->o_id }}')">(取消訂單)</span>
                  @endif

                  @if ($data[0]->delete_time != '')
                      <span class="order-status-cancel">已失效</span>
                  @elseif ($data[0]->checkout_time != '')
                      <span class="order-status-pay">已付款</span>
                  @else
                      <span class="order-status-not-pay">未付款</span>
                  @endif

                  <span class="order-time">下單時間：{{ $data[0]->order_time }}</span>
                  <div class="row order-detail">
                      <div class="col-sm-3 col-md-4">
                          <span class="payment-{{ strtolower($data[0]->payment) }}">付款方式：</span>
                      </div>
                      <div class="col-sm-3 col-md-4">
                          <span id="price_sum">總額：{{ $data[0]['total'] }}</span>
                      </div>
                      <div class="order-detail-time col-sm-6 col-md-4">
                          @if ($data[0]->delete_time != '')
                              <span>失效時間：{{ $data[0]->delete_time }}</span>
                          @elseif ($data[0]->checkout_time != '')
                              <span>付款時間：{{ $data[0]->checkout_time }}</span>
                          @else
                              <span class="color-emphasized2">付款期限：{{ $data[0]->expire_time }}</span>
                          @endif
                      </div>
                  </div>
              </label>
              <ul class="order-card-content">
                  <li class="table-bar mob-hidden row">
                      <div class="col-sm-4"><span>課程名稱</span></div>
                      <div class="col-sm-2"><span>價格</span></div>
                      <div class="col-sm-2"><span>狀態</span></div>
                      <div class="col-sm-3"></div>
                  </li>
                  @foreach ($data as $value)
                      <li class="lesson-detail">
                          <div class="row">
                              <div class="card-header col-sm-4">
                                  <a href="/lesson/{{ $value->l_id }}">
                                      <div class="img-wrapper">
                                          <img src="/media/{{ $value->l_id }}/cover/{{ $value['cover'] }}" />
                                      </div>
                                      <span>{{ $value['l_name'] }}</span>
                                  </a>
                              </div>
                              <div class="card-price col-sm-2">
                                  @if ($value->price == 0)
                                      <span>免費</span>
                                  @else
                                      <span>NT${{ $value->price }}</span>
                                  @endif
                              </div>
                              <div class="card-status col-sm-2">
                                  @if ($value->refund_time != '')
                                      <span class="color-emphasized2">已退款</span>
                                  @elseif ($value->delete_time != '')
                                      <span>已失效</span>
                                  @elseif ($value->checkout_time == '')
                                      <span>未付款</span>
                                  @else
                                      <span>購買完成</span>
                                  @endif
                              </div>
                              <div class="card-action col-sm-3">
                                  @if ($value->refund_time != '')
                                      <span>退款時間：{{ $value->refund_time }}</span>
                                  @endif
                              </div>
                          </div>
                      </li>
                  @endforeach
              </ul>
          </div>
        @endforeach
    </div>
</div>
