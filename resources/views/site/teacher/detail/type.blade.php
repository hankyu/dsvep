<div class="teacher_contents" id="type_content">
  <div class="title">
    <h6>教學類型
      @if ($member_data != "")
        @if ($member_data->m_id == $teacher_member_data->m_id)
          <i id="edit_type" class="fas fa-pencil-alt" aria-hidden="true"></i>
        @endif
      @endif
    </h6>
  </div>
  <div>
    <span id="span_type_exp">{!! nl2br(e(str_replace("<br />", "", $teacher_search_data->teach_type))) !!}</span>
  </div>
</div>
