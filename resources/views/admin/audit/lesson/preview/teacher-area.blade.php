<div id="teacher_intro" class="teacher-intro row">
  <div id="teacher_avator" class="col-xs-4 center">
    <a href="{{ '/#/teacher/' . $teacher_data_for_lesson->t_id }}">
      {{ Html::image('img/personal/avatar/' . $member_data_for_teacher->avg_img) }}
      <span>{{ $member_data_for_teacher->m_name }}</span>
    </a>
  </div>
  <div id="teacher_desc" class="col-sm-8 col-xs-6 teacher-desc">
    {!! str_replace(chr(13).chr(10), "<br />", $teacher_data_for_lesson->intro_exp) !!}
  </div>
</div>
