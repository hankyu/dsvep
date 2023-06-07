@if (($teacher_search_data->awards_exp != null) || ($teacher_search_data->awards_link != null))
  <div class="teacher_contents" id="awards_content">
    <div class="title">
      <h6>獎項
        @if ($member_data != "")
          @if ($member_data->m_id == $teacher_member_data->m_id)
            <i id="edit_awards" class="fas fa-pencil-alt" aria-hidden="true"></i>
          @endif
        @endif
      </h6>
    </div>
    <div>
      @if ($teacher_search_data->awards_exp != null)
        <span id="span_awards_exp">{!! nl2br(e(str_replace("<br />", "", $teacher_search_data->awards_exp))) !!}</span>
      @else
        <span id="span_awards_exp"></span>
      @endif
      @if (($teacher_search_data->awards_exp != null) && ($teacher_search_data->awards_link != null))
        <hr />
      @endif
      @if ($teacher_search_data->awards_link != null)
        相關連結：<span id="span_awards_link">{{ HTML::link($teacher_search_data->awards_link, null, ['target' => '_blank']) }}</span>
      @else
        <span id="span_awards_link"></span>
      @endif
    </div>
  </div>
@else
  @if ($member_data != "")
    @if ($member_data->m_id == $teacher_member_data->m_id)
      <div class="teacher_contents" id="awards_content">
        <div class="title">
          <h6>獎項
            <i id="edit_awards" class="fas fa-pencil-alt" aria-hidden="true"></i>
          </h6>
        </div>
        <div>
          還沒有介紹獎項<span id="span_awards_exp"></span>
          <span id="span_awards_link"></span>
        </div>
      </div>
    @endif
  @endif
@endif
