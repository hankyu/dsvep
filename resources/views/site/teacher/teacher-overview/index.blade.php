@extends('site.layout.layout')
@section('content')
  {{ Html::style('css/page_css/site/teacher-area/overview.css') }}
  <div class="container">
    <div class="row">
      <center>
        <h2 class="margintop-30">王牌講師</h2>
      </center>
      <hr>
      <div class="container overview-menu">
        <a class="overview-menu-item popular active" href="#" id="popular"><i class="fas fa-sort-down" aria-hidden="true"></i><span>人氣</span></a>
        <a class="overview-menu-item evaluate" href="#" id="evaluate"><i class="fas fa-sort-down" aria-hidden="true"></i><span>評價</span></a>
      </div>
      <div class="indList list-unstyled">
        @foreach ($all_teacher_data as $teacher_datas)
          @foreach ($all_member_data as $member_datas)
            @if ($teacher_datas->m_id == $member_datas->m_id)
              <div class="item col-lg-3 col-md-4 col-sm-6 col-xs-12" data-popular="{{ rand(0, 500) }}" data-evaluate="{{ rand(0, 5) }}">
                <section class="thumbnail">
                  <figure class="teacher-avatar">
                    <a href="/#/teacher/{{ $teacher_datas->t_id }}">
                      {{ Html::image('img/personal/avatar/' . $member_datas->avg_img) }}
                    </a>
                  </figure>
                  <article class="caption">
                    <h3 class="h4 p0 title">{{ $member_datas->nickname }}
                        @if ($member_datas->m_name != null)
                            {{ '(' . $member_datas->m_name . ')' }}
                        @endif
                    </h3>
                    <hr />
                    <div class="intro-exp-wrapper">
                      <span>{!! str_replace("<br />", chr(13).chr(10), $teacher_datas->intro_exp) !!}</span>
                    </div>
                    @if ($teacher_datas->teach_type !== null)
                        <div class="teacher__card__caption__teach__type">
                            教學類型：
                            @php
                              $type = nl2br(e(str_replace("<br />", "", $teacher_datas->teach_type)))
                            @endphp
                            {!! preg_replace('([\,\n\r\t]+)', ' ', $type) !!}
                        </div>
                    @endif
                  </article>
                </section>
              </div>
              @break
            @endif
          @endforeach
        @endforeach
      </div>
    </div>
  </div>
  {{ Html::script('js/page_js/site/all-teacher/overview.js') }}
@stop
