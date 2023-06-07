<div class="container">
    @if (count($order_data) == 0)
        <div class="not-found row center">
            <span>您尚未購買任何課程</span>
        </div>
    @else
        <div id="data_not_found" class="not-found row center block">
            <span>找不到任何課程資料</span>
        </div>
        @foreach ($order_data as $lesson)
            <div class="lesson-overview-crad row {{ $lesson->type }}">
                <div class="lesson-overview-header col-xs-12">
                    <div class="lesson-overview-label">
                        <span>{{ $lesson->type == 'entity' ? '實體課程' : '線上課程' }}</span>
                    </div>
                    @if ($lesson->end_fund >= Date('Y-m-d'))
                        <div class="lesson-status-label fundraising" data-end_fund={{ $lesson->end_fund }}>
                            <span>{{ $lesson->type == 'entity' ? '招生中' : '募資中' }}</span>
                        </div>
                    @elseif (!$lesson->cancel_lesson)
                        @if ($lesson->start_time > Date('Y-m-d'))
                            <div class="lesson-status-label prepare" data-start_time={{ $lesson->start_time }}>
                                <span>{{ $lesson->type == 'entity' ? '準備中' : '備課中' }}</span>
                            </div>
                        @else
                            @if ($lesson->type == 'entity')
                                <div class="lesson-status-label prepare">
                                    <span>{{ $lesson->l_end_time >= Date('Y-m-d H:i:s') ? '上課中' : '已結業' }}</span>
                                </div>
                            @else
                                <div class="lesson-status-label prepare">
                                    <span>上課去</span>
                                </div>
                            @endif
                        @endif
                    @endif
                    <a href="../../lesson/{{ $lesson->l_id }}" target="_self">
                        <img src="/media/{{ $lesson->l_id }}/cover/{{ $lesson->cover }}" />
                    </a>
                </div>
                <div class="lesson-overview-teacher">
                    <a href="/#/teacher/{{ $lesson->t_id }}">
                        {{ Html::image('img/personal/avatar/' . $lesson->avg_img) }}
                    </a>
                </div>
                <div class="lesson-overview-content col-xs-12 col-sm-5 col-md-6">
                    <div class="title">
                        <h3>{{ $lesson->l_name }}</h3>
                        <h5>{{ $lesson->l_sub_name }}</h5>
                        @if($lesson->type == 'online' && strtotime(date('Y-m-d')) > strtotime($lesson->start_time))
                            @if(isset($lesson->order_deadline))
                                <div class="watch-deadline">觀看期限：{{ ( $lesson->lesson_deadline == 999) ? '永久' : $lesson->order_deadline }}</div>
                            @endif
                        @endif
                    </div>
                </div>
                @if (!$lesson->cancel_lesson)
                    @if (Date('Y-m-d') > $lesson->order_deadline && $lesson->order_deadline)
                        <div class="btn lesson-overview-footer lesson-overview-footer-expired" disabled>
                            <span>觀看到期</span>
                        </div>
                    @else
                        <div class="lesson-overview-footer" onclick="enter_classroom('{{ $lesson->l_id }}')">
                          <span>開始學習</span>
                        </div>
                    @endif
                @else
                    <div class="btn lesson-overview-footer lesson-overview-footer-danger" disabled>
                        <span>取消開班</span>
                    </div>
                @endif
            </div>
        @endforeach
    @endif
</div>
