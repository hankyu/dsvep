<div id="teacher_intro" class="teacher-intro row">
    <div id="teacher_avator" class="col-xs-4 teacher-avator center">
        <a href="{{ '../teacher/' . $l_teacher_data->t_id }}">
            {{ Html::image('img/personal/avatar/' . $l_member_data->avg_img) }}
            <span class="center">
                {{ $l_member_data->nickname }}

                @if (!is_null($l_member_data->m_name))
                    ( {{ $l_member_data->m_name }} )
                @endif

            </span>
            <span style="color: #337AB7">點我查看更多</span>
        </a>
    </div>

    <div class="line-height-1em">
        <div id="teacher_desc" class="col-sm-8 col-xs-6 teacher-desc">
            <p>
                <div class="teacher-title"><span>自我介紹</span></div>
                {!! str_replace(chr(13).chr(10), "<br />", $l_teacher_data->intro_exp) !!}
            </p>

            <p>
                <div class="teacher-title"><span>教學類型</span></div>
                {!! str_replace(chr(13).chr(10), "<br />", $l_teacher_data->teach_type) !!}
            </p>

            <p>
                <div class="teacher-title"><span>教學經驗</span></div>
                {!! str_replace(chr(13).chr(10), "<br />", $l_teacher_data->teach_exp) !!}
            </p>
        </div>
    </div>
</div>
