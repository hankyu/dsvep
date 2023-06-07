@foreach ($lesson_data as $lesson_data)
  @if ($authority)
    @if ($lesson_data->apply_situation == 'success')
      <div class="lesson-card col-lg-4 col-md-6 col-sm-4 col-xs-12">
        <section class="thumbnail">
          <figure>
            <a href="/#/lesson/{{ $lesson_data->l_id }}">
              <div class="lesson-type-label">
                <span class="lesson-type {{ $lesson_data->type }}"></span>
              </div>
              <div class="img-wrapper">
                {{ Html::image('media/' . $lesson_data->l_id . '/cover/' . $lesson_data->cover) }}
              </div>
            </a>
          </figure>
          <article class="caption">
            <span><b>{{ $lesson_data->l_name }}</b></span>
            @if ($lesson_data->type == 'entity')
              <p class="margin-0">
                {{ substr($lesson_data->unit_data[0]->l_start_time, 0, 10) . ['(日)', '(一)', '(二)', '(三)', '(四)', '(五)', '(六)'][date('w', strtotime(substr($lesson_data->unit_data[0]->l_start_time, 0, 10)))] . substr($lesson_data->unit_data[0]->l_start_time, 11, 5) }}
                <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
                <span>{{ mb_substr($lesson_data->location, 0, 2) }}</span>
              </p>
            @else
              <p class="margin-0" style="visibility: hidden"><i class="fas fa-map-marker-alt" aria-hidden="true"></i></p>
            @endif
            @if (date('Y-m-d') > $lesson_data->end_fund)
              <div>
                <p class="margin-0">
                  @if ($lesson_data->origin_fee === 0)
                    <span class="price">免費</span>
                  @else
                    <span class="price">NT$ {{ $lesson_data->origin_fee }}</span>
                  @endif
                </p>
                <a href="/#/lesson/{{ $lesson_data->l_id }}">
                    @if ($lesson_data->cancel_lesson == true)
                        <span class="lesson-type bg-graduation" data-start_time={{ $lesson_data->start_time }}>取消開班</span>
                    @else
                        @if (date('Y-m-d') < $lesson_data->start_time)
                            @if ($lesson_data->type == 'entity')
                                @if ($lesson_data->max_people != null && count($lesson_data->buy_people) >= $lesson_data->max_people)
                                    <span class="lesson-type js-e-prepare bg-no-vacancy" data-start_time={{ $lesson_data->start_time }}>已額滿 </span>
                                @else
                                    <span class="lesson-type js-e-prepare bg-complementary1" data-start_time={{ $lesson_data->start_time }}>確定開班 </span>
                                @endif
                            @else
                                <span class="lesson-type js-e-prepare bg-complementary1" data-start_time={{ $lesson_data->start_time }}>備課中 </span>
                            @endif
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
                </a>
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
                <a href="/#/lesson/{{ $lesson_data->l_id }}">
                    @if (count($lesson_data->buy_people) >= $lesson_data->least_people)
                        @if ($lesson_data->type == 'entity')
                            @if ($lesson_data->max_people != null && count($lesson_data->buy_people) >= $lesson_data->max_people)
                                <span class="lesson-type js-e-prepare bg-no-vacancy" data-start_time={{ $lesson_data->start_time }}>已額滿 </span>
                            @else
                                <span class="lesson-type js-e-prepare bg-complementary1" data-start_time={{ $lesson_data->start_time }}>確定開班 </span>
                            @endif
                        @else
                            <span class="lesson-type js-e-prepare bg-complementary1" data-start_time={{ $lesson_data->start_time }}>備課中 </span>
                        @endif
                    @else
                        @if ($lesson_data->origin_fee == $lesson_data->offer_fee)
                            <span class="lesson-type js-fundraising bg-fundraising" data-end_fund={{ $lesson_data->end_fund }}>離報名截止</span>
                        @else
                            <span class="lesson-type js-fundraising bg-fundraising" data-end_fund={{ $lesson_data->end_fund }}>優惠</span>
                        @endif
                    @endif
                </a>
              </div>
            @endif
          </article>
        </section>
      </div>
    @endif
  @else
    @if (($lesson_data->apply_situation == 'success') && (!(date('Y-m-d') >= $lesson_data->end_fund && date('Y-m-d') > $lesson_data->start_time && $lesson_data->type == 'entity' && date('Y-m-d H:i:s') > date(substr($lesson_data->unit_data[count($lesson_data->unit_data) - 1]->l_start_time, 0, 16)) && count($lesson_data->buy_people) < $lesson_data->least_people)) && ($lesson_data->cancel_lesson != true))
      <div class="lesson-card col-lg-4 col-md-6 col-sm-4 col-xs-12">
        <section class="thumbnail">
          <figure>
            <a href="/#/lesson/{{ $lesson_data->l_id }}">
              <div class="lesson-type-label">
                <span class="lesson-type {{ $lesson_data->type }}"></span>
              </div>
              <div class="img-wrapper">
                {{ Html::image('media/' . $lesson_data->l_id . '/cover/' . $lesson_data->cover) }}
              </div>
            </a>
          </figure>
          <article class="caption">
            <span><b>{{ $lesson_data->l_name }}</b></span>
            @if ($lesson_data->type == 'entity')
              <p class="margin-0">
                {{ substr($lesson_data->unit_data[0]->l_start_time, 0, 10) . ['(日)', '(一)', '(二)', '(三)', '(四)', '(五)', '(六)'][date('w', strtotime(substr($lesson_data->unit_data[0]->l_start_time, 0, 10)))] . substr($lesson_data->unit_data[0]->l_start_time, 11, 5) }}
                <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
                <span>{{ mb_substr($lesson_data->location, 0, 2) }}</span>
              </p>
            @else
              <p class="margin-0" style="visibility: hidden"><i class="fas fa-map-marker-alt" aria-hidden="true"></i></p>
            @endif
            @if (date('Y-m-d') > $lesson_data->end_fund)
              <div>
                <p class="margin-0">
                  @if ($lesson_data->origin_fee === 0)
                    <span class="price">免費</span>
                  @else
                    <span class="price">NT$ {{ $lesson_data->origin_fee }}</span>
                  @endif
                </p>
                <a href="/#/lesson/{{ $lesson_data->l_id }}">
                    @if ($lesson_data->cancel_lesson == true)
                        <span class="lesson-type bg-graduation" data-start_time={{ $lesson_data->start_time }}>取消開班</span>
                    @else
                        @if (date('Y-m-d') < $lesson_data->start_time)
                            @if ($lesson_data->type == 'entity')
                                @if ($lesson_data->max_people != null && count($lesson_data->buy_people) >= $lesson_data->max_people)
                                    <span class="lesson-type js-e-prepare bg-no-vacancy" data-start_time={{ $lesson_data->start_time }}>已額滿 </span>
                                @else
                                    <span class="lesson-type js-e-prepare bg-complementary1" data-start_time={{ $lesson_data->start_time }}>確定開班 </span>
                                @endif
                            @else
                                <span class="lesson-type js-e-prepare bg-complementary1" data-start_time={{ $lesson_data->start_time }}>備課中 </span>
                            @endif
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
                </a>
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
                    <a href="/#/lesson/{{ $lesson_data->l_id }}">
                        @if (count($lesson_data->buy_people) >= $lesson_data->least_people)
                            @if ($lesson_data->type == 'entity')
                                @if ($lesson_data->max_people != null && count($lesson_data->buy_people) >= $lesson_data->max_people)
                                    <span class="lesson-type js-e-prepare bg-no-vacancy" data-start_time={{ $lesson_data->start_time }}>已額滿 </span>
                                @else
                                    <span class="lesson-type js-e-prepare bg-complementary1" data-start_time={{ $lesson_data->start_time }}>確定開班 </span>
                                @endif
                            @else
                                <span class="lesson-type js-e-prepare bg-complementary1" data-start_time={{ $lesson_data->start_time }}>備課中 </span>
                            @endif
                        @else
                            @if ($lesson_data->origin_fee == $lesson_data->offer_fee)
                                <span class="lesson-type js-fundraising bg-fundraising" data-end_fund={{ $lesson_data->end_fund }}>離報名截止</span>
                            @else
                                <span class="lesson-type js-fundraising bg-fundraising" data-end_fund={{ $lesson_data->end_fund }}>優惠</span>
                            @endif
                        @endif
                    </a>
                </div>
            @endif
          </article>
        </section>
      </div>
    @endif
  @endif
@endforeach
