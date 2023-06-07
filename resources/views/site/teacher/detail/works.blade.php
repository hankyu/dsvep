<div class="teacher_contents" id="works_content">
  <div class="title">
    <h6>作品
      @if ($member_data != "")
        @if ($member_data->m_id == $teacher_member_data->m_id)
          <i id="edit_works" class="fas fa-pencil-alt" aria-hidden="true"></i>
        @endif
      @endif
    </h6>
  </div>
  <div>
    <span id="span_works_exp">{!! nl2br(e(str_replace("<br />", "", $teacher_search_data->works_exp))) !!}</span>
    @if ($teacher_search_data->works_link != null)
      <hr />
      相關連結：<span id="span_works_link">{{ HTML::link($teacher_search_data->works_link, null, ['target' => '_blank']) }}</span><br />
    @else
      <span id="span_works_link"></span>
    @endif
    {{-- <hr />
    <span>作品集：<a href="#">我ㄉ作品</a></span> --}}
  </div>
</div>
