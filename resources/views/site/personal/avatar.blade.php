<div class="col-6">
  <div id="ava_edit_btn" class="avatar">
    <div class="show-pic">
      {{ Html::image('img/personal/avatar/' . $avatar) }}
    </div>
    <div class="edit-icon">
      <i class="fa fa-camera"  aria-hidden="true"></i>
    </div>
  </div>
  <div>
    <div id="avatar_nickname" class="membername">
      <span>{{ $member_data->nickname }}</span>
    </div>
  </div>
</div>
