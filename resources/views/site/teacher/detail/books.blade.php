@if (($teacher_search_data->book_exp != null) || ($teacher_search_data->book_link != null))
  <div class="teacher_contents" id="books_content">
    <div class="title">
      <h6>著作
        @if ($member_data != "")
          @if ($member_data->m_id == $teacher_member_data->m_id)
            <i id="edit_books" class="fas fa-pencil-alt" aria-hidden="true"></i>
          @endif
        @endif
      </h6>
    </div>
    <div>
      @if ($teacher_search_data->book_exp != null)
        <span id="span_books_exp">{!! nl2br(e(str_replace("<br />", "", $teacher_search_data->book_exp))) !!}</span>
      @else
        <span id="span_books_exp"></span>
      @endif
      @if (($teacher_search_data->book_exp != null) && ($teacher_search_data->book_link != null))
        <hr />
      @endif
      @if ($teacher_search_data->book_link != null)
        相關連結：<span id="span_books_link">{{ HTML::link($teacher_search_data->book_link, null, ['target' => '_blank']) }}</span>
      @else
        <span id="span_books_link"></span>
      @endif
    </div>
  </div>
@else
  @if ($member_data != "")
    @if ($member_data->m_id == $teacher_member_data->m_id)
      <div class="teacher_contents" id="books_content">
        <div class="title">
          <h6>我的著作
            <i id="edit_books" class="fas fa-pencil-alt" aria-hidden="true"></i>
          </h6>
        </div>
        <div>
          還沒有介紹著作<span id="span_books_exp"></span>
          <span id="span_books_link"></span>
        </div>
      </div>
    @endif
  @endif
@endif
