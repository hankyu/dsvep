<div class="teacher_contents" id="intro_content">
  <div class="title">
    <h6>自我介紹
      @if ($member_data != "")
        @if ($member_data->m_id == $teacher_member_data->m_id)
          <i id="edit_introduce" class="fas fa-pencil-alt" aria-hidden="true"></i>
        @endif
      @endif
    </h6>
  </div>
  <div>
    <span id="span_intro_exp">{!! nl2br(e(str_replace("<br />", "", $teacher_search_data->intro_exp))) !!}</span>
    @if ($teacher_search_data->intro_link != null)
      <hr />
      相關連結：<span id="span_intro_link">{{ HTML::link($teacher_search_data->intro_link, null, ['target' => '_blank']) }}</span>
    @else
      <span id="span_intro_link"></span>
    @endif
  </div>
</div>
