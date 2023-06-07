<div class="teacher_contents" id="teach_content">
  <div class="title">
    <h6>教學經驗
      @if ($member_data != "")
        @if ($member_data->m_id == $teacher_member_data->m_id)
          <i id="edit_teach" class="fas fa-pencil-alt" aria-hidden="true"></i>
        @endif
      @endif
    </h6>
  </div>
  <div>
    <span id="span_teach_exp">{!! nl2br(e(str_replace("<br />", "", $teacher_search_data->teach_exp))) !!}</span>
  </div>
</div>
