@if (($teacher_search_data->repo_exp != null) || ($teacher_search_data->repo_link != null))
  <div class="teacher_contents" id="reports_content">
    <div class="title">
      <h6>報導
        @if ($member_data != "")
          @if ($member_data->m_id == $teacher_member_data->m_id)
            <i id="edit_reports" class="fas fa-pencil-alt" aria-hidden="true"></i>
          @endif
        @endif
      </h6>
    </div>
    <div>
      @if ($teacher_search_data->repo_exp != null)
        <span id="span_reports_exp">{!! nl2br(e(str_replace("<br />", "", $teacher_search_data->repo_exp))) !!}</span>
      @else
        <span id="span_reports_exp"></span>
      @endif
      @if (($teacher_search_data->repo_exp != null) && ($teacher_search_data->repo_link != null))
        <hr />
      @endif
      @if ($teacher_search_data->repo_link != null)
        相關連結：<span id="span_reports_link">{{ HTML::link($teacher_search_data->repo_link, null, ['target' => '_blank']) }}</span>
      @else
        <span id="span_reports_link"></span>
      @endif
    </div>
  </div>
@else
  @if ($member_data != "")
    @if ($member_data->m_id == $teacher_member_data->m_id)
      <div class="teacher_contents" id="reports_content">
        <div class="title">
          <h6>報導
            <i id="edit_reports" class="fas fa-pencil-alt" aria-hidden="true"></i>
          </h6>
        </div>
        <div>
          還沒有介紹報導<span id="span_reports_exp"></span>
          <span id="span_reports_link"></span>
        </div>
      </div>
    @endif
  @endif
@endif
