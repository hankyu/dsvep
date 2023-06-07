{{ Html::style('css/toggle-switch-custom.css') }}
{{ Html::style('css/popup-custom.css') }}

<div class="rollcall__row rollcall__header">
    <div class="flex">
        <div class="">
            請選擇日期：
        </div>
        <select id="select-u_id" class="dropdown">
        </select>
        <select id="select-unit" class="dropdown"></select>
        <button id="btn-rollcall-qrcode" type="button"><i class="fas fa-qrcode"></i></button>
    </div>
    <div class="rollcall__phonenumber__container flex">
        <div class="">
            電話號碼：
        </div>
        <div id="autocomplete" class="rollcall__phonenumber autocomplete input_animation_container">
          <input id="phoneNumber-input" type="text" name="" value="" class="autocomplete_input input_animation_input">
          <div class="input_animation_bottom"></div>
          {{-- <div class="autocomplete_list">

          </div> --}}
        </div>
    </div>
</div>
<div class="rollcall__row">
  <div id="rollcall-user" class="rollcall__user">

  </div>
</div>
<div class="rollcall__row">
    <div class="rollcall__save">
        <button id="rollcall-save" class="btn btn-primary">儲存</button>
    </div>
</div>

{{ Html::script('js/page_js/site/module/rollcall_module.js') }}
{{ Html::script('js/page_js/site/module/popup-module.js') }}
{{ Html::script('js/page_js/site/profile/rollcall.js') }}
