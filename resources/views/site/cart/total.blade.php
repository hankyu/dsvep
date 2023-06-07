<div class="cart-receipt row">
  <div class="col-xs-12">
    <span>選擇發票：</span>
    <label id="label_receipt_elec" class="receipt-label">
      <input type="radio" name="receipt" id="receipt_elec" value="receipt_elec" checked>
      <span data-toggle="tooltip" data-placement="top" title="平台將幫您對獎，中獎後將通知">儲存於平台</span>
    </label>
    <label id="label_mobile" class="receipt-label">
      <input type="radio" name="receipt" id="receipt_mobile_barcode" value="mobile_barcode">
      <span>手機載具</span>
      {!! Form::text('mobile_barcode', $member_data->mobile_barcode , ['id' => 'mobile_barcode', 'class' => 'form-control', 'placeholder' => '輸入手機條碼', 'maxlength' => '8', 'autofocus']) !!}
    </label>
    <label id="label_moica" class="receipt-label">
      <input type="radio" name="receipt" id="receipt_moica_barcode" value="moica_barcode">
      <span>自然人憑證載具</span>
      {!! Form::text('moica_barcode', $member_data->moica_barcode , ['id' => 'moica_barcode', 'class' => 'form-control', 'placeholder' => '輸入自然人憑證', 'maxlength' => '16']) !!}
    </label>
    <label id="label_donate" class="receipt-label">
      <input type="radio" name="receipt" id="receipt_love_code" value="love_code">
      <span>捐贈</span>
      {!! Form::text('love_code', $member_data->love_code , ['id' => 'love_code', 'class' => 'form-control', 'placeholder' => '輸入愛心碼', 'maxlength' => '7']) !!}
    </label>
    <label id="label_company" class="receipt-label">
      <input type="radio" name="receipt" id="receipt_company_id" value="company_id">
      <span>公司統編</span>
      {!! Form::text('company_id', $member_data->company_id , ['id' => 'company_id', 'class' => 'form-control', 'placeholder' => '輸入統一編號', 'maxlength' => '8']) !!}
    </label>
  </div>
</div>

<div class="row cart-total">
  <div class="col-xs-12 col-sm-8 offer-code">
    <span class="mob-hidden" style="font-weight: bold;">優惠代碼</span>
    <input type="text" name="coupon" class="cart-text" placeholder="請輸入優惠代碼" id="coupon" />
  </div>
  <div class="col-xs-12 col-sm-4 col-md-4">
    <center>
      <button type="button" id="send" class="btn btn-primary">確定付款</button>
    </center>
  </div>
  <div class="col-xs-12">
    <div style="margin-top:50px"><b>注意事項</b></div>
    <span>部分課程在招生期間提供折扣價格，招生結束後可能會導致價格變動，實體課程開課之後就不接受購買，會自動從購物車中移除。</span><br />
    <span>付款完成以後將會在10分鐘內開通課程</span>
  </div>
</div>
