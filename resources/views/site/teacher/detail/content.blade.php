<div class="col-md-8 col-lg-9">
  <ul class="nav nav-tabs scroll">
    <li id="tab_teacher" class="active"><a href="javascript:void(0);">導師介紹</a></li>
    <li id="tab_portfolios"><a href="javascript:void(0);">導師作品</a></li>
    <li id="tab_lesson"><a href="javascript:void(0);">導師課程</a></li>
  </ul>
  <div id="teacher_content" class="teacher-content">
    @include('site.teacher.detail.introduce')
    @include('site.teacher.detail.works')
    @include('site.teacher.detail.books')
    @include('site.teacher.detail.certificate')
    @include('site.teacher.detail.awards')
    @include('site.teacher.detail.reports')
    @include('site.teacher.detail.published')
    @include('site.teacher.detail.type')
    @include('site.teacher.detail.teach')
  </div>
  @include('site.teacher.detail.portfolios')
  <div id="lesson_content" class="lesson-content row">
    @if (count($lesson_data) == 0)
      <div class="no-lseeon col-xs-12">
        <span>該導師目前沒有課程喔</span>
      </div>
    @else
      @if ($member_data != '')
        @if ($member_data->authority === 'worker')
          <div class="worker-view col-xs-12">
            <span><strong>行政視角</strong></span>
          </div>
          @foreach ($lesson_data as $lesson_data)
            <div class="lesson-card col-lg-4 col-md-6 col-sm-4 col-xs-12">
              <section class="thumbnail">
                <figure>
                  @if ($lesson_data->apply_situation == "success")
                    <a href="/#/lesson/{{ $lesson_data->l_id }}">
                  @else
                    <a href="/teacher/lesson/manage/{{ $lesson_data->l_id }}/info">
                  @endif
                    <div class="lesson-type-label">
                      <span class="lesson-type {{ $lesson_data->type }}"></span>
                    </div>
                    <div class="img-wrapper">
                      <div class="pub-status-wrapper">
                        @if ($lesson_data->pub_situation == false)
                          @if ($lesson_data->apply_situation == 'audit')
                            <span class="pub-status-label bg-emphasized3"><i class="far fa-clock" aria-hidden="true"></i> 審核中</span>
                          @elseif ($lesson_data->apply_situation == 'fail')
                            <span class="pub-status-label bg-fail"><i class="fas fa-times" aria-hidden="true"></i> 審核失敗</span>
                          @else
                            <span class="pub-status-label bg-draft"><i class="fas fa-pencil-alt" aria-hidden="true"></i> 草稿</span>
                          @endif
                        @else
                          <span class="pub-status-label bg-emphasized4"><i class="fas fa-check" aria-hidden="true"></i> 已發佈</span>
                        @endif
                      </div>
                      @if ($lesson_data->cover == "")
                        {{ Html::image('https://dummyimage.com/1024x768/cccccc/ffffff') }}
                      @else
                        {{ Html::image('media/' . $lesson_data->l_id . '/cover/' . $lesson_data->cover) }}
                      @endif
                    </div>
                  </a>
                </figure>
                <article class="caption">
                  <span><b>{{ $lesson_data->l_name }}</b></span>
                  @if ($lesson_data->apply_situation == "success")
                    @if ($lesson_data->type == 'entity')
                      <p class="margin-0">
                        {{ substr($lesson_data->unit_data[0]->l_start_time, 0, 10) . ['(日)', '(一)', '(二)', '(三)', '(四)', '(五)', '(六)'][date('w', strtotime(substr($lesson_data->unit_data[0]->l_start_time, 0, 10)))] . substr($lesson_data->unit_data[0]->l_start_time, 11, 5) }}
                        <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
                        <span>{{ mb_substr($lesson_data->location, 0, 2) }}</span>
                      </p>
                    @else
                      <p class="margin-0" style="visibility: hidden"><i class="fas fa-map-marker-alt" aria-hidden="true"></i></p>
                    @endif
                    @if (date('Y-m-d') >= $lesson_data->end_fund)
                      <div>
                        <p class="margin-0">
                          @if ($lesson_data->offer_fee === 0)
                            <span class="price">免費</span>
                          @else
                            <span class="price">原價 ${{ $lesson_data->origin_fee }}</span>
                          @endif
                        </p>
                        @if ($lesson_data->cancel_lesson == true)
                            <span class="lesson-type bg-graduation" data-start_time={{ $lesson_data->start_time }}>取消開班</span>
                        @else
                            @if (date('Y-m-d') < $lesson_data->start_time)
                                <span class="lesson-type js-e-prepare bg-complementary1" data-start_time={{ $lesson_data->start_time }}>備課中 </span>
                            @else
                                @if ($lesson_data->type == 'entity')
                                    @if (date('Y-m-d H:i:s') > date(substr($lesson_data->unit_data[count($lesson_data->unit_data) - 1]->l_end_time, 0, 16)))
                                      <span class="lesson-type btn-rainbow">已結業</span>
                                    @elseif (date('Y-m-d') == $lesson_data->start_time)
                                      <span class="lesson-type bg-emphasized1">今日上課</span>
                                    @else
                                      <span class="lesson-type lesson-start">上課中</span>
                                    @endif
                                @else
                                    <span class="lesson-type lesson-start">上課去</span>
                                @endif
                            @endif
                        @endif
                      </div>
                    @else
                      <div>
                          <p class="margin-0">
                              @if ($lesson_data->offer_fee === 0)
                                  <span class="price">免費</span>
                              @else
                                  <span class="price">NT$ {{ $lesson_data->offer_fee }}</span>
                              @endif
                              @if ($lesson_data->origin_fee != $lesson_data->offer_fee)
                                  <span class="no-discount">原價 ${{ $lesson_data->origin_fee }}</span>
                              @endif
                          </p>
                          @if (count($lesson_data->buy_people) >= $lesson_data->least_people)
                              <span class="lesson-type js-e-prepare bg-complementary1" data-start_time={{ $lesson_data->start_time }}>備課中 </span>
                          @else
                              @if ($lesson_data->origin_fee == $lesson_data->offer_fee)
                                  <span class="lesson-type js-fundraising bg-fundraising" data-end_fund={{ $lesson_data->end_fund }}>離報名截止</span>
                              @else
                                  <span class="lesson-type js-fundraising bg-fundraising" data-end_fund={{ $lesson_data->end_fund }}>優惠</span>
                              @endif
                          @endif
                      </div>
                    @endif
                  @else
                    @if ($lesson_data->type == 'entity')
                      <p class="margin-0">
                        @if (count($lesson_data->unit_data) != 0)
                          {{ substr($lesson_data->unit_data[0]->l_start_time, 0, 10) . ['(日)', '(一)', '(二)', '(三)', '(四)', '(五)', '(六)'][date('w', strtotime(substr($lesson_data->unit_data[0]->l_start_time, 0, 10)))] . substr($lesson_data->unit_data[0]->l_start_time, 11, 5) }}
                        @else
                          正式開課日期：{{ $lesson_data->start_time }}
                        @endif
                        @if ($lesson_data->location != '')
                          <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
                          <span>{{ mb_substr($lesson_data->location, 0, 2) }}</span>
                        @endif
                      </p>
                    @else
                      <p class="margin-0" style="visibility: hidden"><i class="fas fa-map-marker-alt" aria-hidden="true"></i></p>
                    @endif
                    <div>
                      <p class="margin-0">
                        @if ($lesson_data->offer_fee === 0)
                          <span class="price">免費</span>
                        @elseif ($lesson_data->offer_fee == "")
                          <span class="price">價格未定</span>
                        @else
                          <span class="price">NT$ {{ $lesson_data->offer_fee }}</span>
                        @endif
                      </p>
                      <span class="lesson-type bg-private">未公開</span>
                    </div>
                  @endif
                  @if (($lesson_data->pub_situation == false) && ($lesson_data->apply_situation == 'audit'))
                    <div class="col-xs-6 center">
                      <a href="/teacher/lesson/manage/{{ $lesson_data->l_id }}/preview" target="_blank"><span class="margintop-20 btn btn-success">查看預覽</span></a>
                    </div>
                    <div class="col-xs-6 center">
                      <button onclick="_cancel_audit({{ $lesson_data->l_id }}, '{{ $lesson_data->l_name }}')" class="margintop-20 btn btn-danger">取消審核</button>
                    </div>
                  @else
                    @if (($lesson_data->pub_situation == false) && ($lesson_data->apply_situation != 'audit'))
                      <div class="col-xs-6 center">
                        <a href="/teacher/lesson/manage/{{ $lesson_data->l_id }}/info" class="margintop-20 btn btn-info">編輯</a>
                      </div>
                      <div class="col-xs-6 center">
                        <button onclick="_delete_lesson({{ $lesson_data->l_id }}, '{{ $lesson_data->l_name}}')" class="margintop-20 btn btn-danger">刪除</button>
                      </div>
                    @else
                      <div class="col-xs-12 center">
                        <a href="/teacher/lesson/manage/{{ $lesson_data->l_id }}/info" class="margintop-20 btn btn-info">編輯</a>
                      </div>
                    @endif
                  @endif
                </article>
              </section>
            </div>
          @endforeach
        @else
          @include('site.teacher.detail.lesson-for-passers-by')
        @endif
      @else
        @include('site.teacher.detail.lesson-for-passers-by')
      @endif
    @endif
  </div>
</div>
