<div>
  <div id="ava_edit_btn" class="avatar">
    <div class="show-pic">
      @if ($lesson_data->cover == '')
        <img src="{{ URL::asset('https://dummyimage.com/1024x768/cccccc/ffffff') }}">
      @else
        {{ Html::image('media/' . $lesson_data->l_id . '/cover/' . $lesson_data->cover) }}
      @endif
    </div>
  </div>
  <div>
    <div id="avatar_nickname" class="lesson-name">
      <span>{{ $lesson_data->l_name }}</span>
      <span class="text-danger"> ({{ $lesson_data->type == 'entity' ? '實體課程' : '線上課程' }})</span>
    </div>
    <div class="step">
      <a href="/teacher/lesson/manage/{{ $lesson_data->l_id }}/info"><span id="step_1">課程資訊</span></a>
      <a href="/teacher/lesson/manage/{{ $lesson_data->l_id }}/goal"><span id="step_2">課程目標</span></a>
      <a href="/teacher/lesson/manage/{{ $lesson_data->l_id }}/detail"><span id="step_3">上課資訊</span></a>
      <a href="/teacher/lesson/manage/{{ $lesson_data->l_id }}/chapter"><span id="step_4">章節編排</span></a>
      <a href="/teacher/lesson/manage/{{ $lesson_data->l_id }}/media"><span id="step_5">封面圖影</span></a>
    </div>
  </div>
  <div class="row btn-container">
    @if ($lesson_data->pub_situation == false)
      <button class="btn btn-info col-xs-8 col-sm-5" id="btn_preview">預覽</button>
      <button class="btn btn-info col-xs-8 col-sm-5 col-sm-offset-2" id="btn_submit">送出審核</button>
    @else
      <button class="btn btn-info col-xs-8 col-sm-offset-2" id="btn_preview">預覽</button>
    @endif
    @if ($lesson_data->type == 'entity')
        @if ($member_data->authority == 'worker')
            <button class="btn btn-rainbow btn-block" id="btn_copy">課程複製</button>
        @elseif ($lesson_data->t_id === ($teacher_data->t_id ?? null))
            <button class="btn btn-rainbow btn-block" id="btn_own_copy">課程複製</button>
        @endif
    @endif
  </div>
</div>
