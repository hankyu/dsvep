@extends('site.teacher.create-lesson.create-layout')
@section('create-content')
    <div class="col-md-9 lesson-content">
        <div>
            @if (!(strtotime(date('Y-m-d')) >= strtotime($lesson_data->start_time) && ($lesson_data->pub_situation)))
                <button class="btn btn-info" style="float: right" id="btn_detail_save"><i class="fas fa-save" aria-hidden="true"></i> Save</button>
            @endif
            <h3><span style="margin-left: 20px">{{ $step }}</span></h3>
        </div>

        <hr />

        <div class="content">
            <p>*開課流程參考</p>

            @if ($lesson_data->type == 'entity')
                <img class="lesson-flow-chart" src="{{ URL::asset('img/entity_lesson_flow_chart.png') }}" alt="實體課程開課流程圖">
            @else
                <img class="lesson-flow-chart" src="{{ URL::asset('img/online_lesson_flow_chart.png') }}" alt="線上課程開課流程圖">
            @endif

            <br /><br /><br />
            <div class="lesson-free col-md-12 marg in-0 marginbot-20 row">
                <input class="cbk-lesson-free" type="checkbox" id="lesson_is_free">
                <label class="col-form-label no-select" for="lesson_is_free"><i class="fa"></i>免費課程</label>
            </div>

            <div class="col-md-12 col-md-offset-0 form-group row" id="form_lesson_fundraising_day">
                @if ($lesson_data->type == 'entity')
                    <label class="col-form-label">確定開班日期</label>
                    <span class="icon-describe">
                        <i class="fa fa-question-circle" aria-hidden="true" data-toggle="tooltip" data-placement="right" title="招生截止日，決定是否要開班的日期"></i>
                    </span>
                    <br />
                    <div class="col-md-5">
                        <input class="form-control datepicker-here" id="lesson_fundraising_day" data-end_fund="{{ $lesson_data->end_fund }}" value="{{ $lesson_data->end_fund }}" placeholder="選擇確定開班日期" readonly>
                    </div>
                @else
                    <label class="col-form-label">募資結束日期</label>
                    <br />
                    <div class="col-md-5">
                        <input class="form-control datepicker-here" id="lesson_fundraising_day" data-end_fund="{{ $lesson_data->end_fund }}" value="{{ $lesson_data->end_fund }}" placeholder="選擇募資結束日期" readonly>
                    </div>
                @endif
            </div>

            <div class="col-md-12 col-md-offset-0 form-group row" id="form_lesson_start_day">
                <label class="col-form-label">正式開課日期</label><br />
                <div class="col-md-5">
                    <input class="form-control datepicker-here" id="lesson_start_day" data-start_time="{{ $lesson_data->start_time }}" value="{{ $lesson_data->start_time }}" placeholder="選擇正式開課日期" readonly>
                </div>
            </div>

            <div class="col-md-12 col-md-offset-0 form-group row" id="form_lesson_offer_fee">
                @if ($lesson_data->type == 'entity')
                    <label class="col-form-label">折扣價格</label><br />
                @else
                    <label class="col-form-label">募資時期價格</label><br />
                @endif
                <div class="col-md-5">
                    <input type="number" class="form-control" id="lesson_offer_fee" value="{{ $lesson_data->offer_fee }}" placeholder="上限100萬元(該欄位為確定開班前的價格)">
                </div>
            </div>

            <div class="col-md-12 col-md-offset-0 form-group row" id="form_lesson_origin_fee">
                <label class="col-form-label">原價</label><br />
                <div class="col-md-5">
                    <input type="number" class="form-control" id="lesson_origin_fee" value="{{ $lesson_data->origin_fee }}" placeholder="上限100萬元">
                </div>
            </div>

            <div class="col-md-12 col-md-offset-0 form-group row" id="form_lesson_least_people">
                <label class="col-form-label">確定開課人數</label><br />
                <div class="col-md-5">
                    <input type="number" class="form-control" id="lesson_least_people" value="{{ $lesson_data->least_people }}" placeholder="最多100人">
                </div>
            </div>

            @if ($lesson_data->type == 'online')
                <div class="col-md-12 col-md-offset-0 form-group row" id="form_deadline">
                    <label class="col-form-label">觀看期限</label><br />
                    <div class="col-md-10">
                        {{ Form::select('month', [], '', ['id' => 'deadline', 'data-deadline' => $lesson_data->deadline]) }}
                    </div>
                </div>
            @endif

            @if ($lesson_data->type == 'entity')
              <div class="col-md-12 col-md-offset-0 form-group row" id="form_lesson_max_people">
                  <label class="col-form-label">開課上限人數</label><br />
                  <div class="col-md-5">
                      <input type="number" class="form-control" id="lesson_max_people" value="{{ $lesson_data->max_people }}" placeholder="最多100人">
                  </div>
              </div>
            @endif

            {{-- @if ($member_data->account == $account)
                <div class="col-md-12 col-md-offset-0 form-group row" id="form_teacher_fee">
                    <label class="col-form-label">講師費</label>
                    <span class="icon-describe">
                        <i class="fa fa-question-circle" aria-hidden="true" data-toggle="tooltip" data-placement="right" title="填寫時請洽大俠學習客服"></i>
                    </span>
                    <br />
                    <div class="col-md-5">
                        <div class="col-md-4">
                            <input id="teacher_salary" type="radio" name="teacher-fee" value="salary">
                            <label for="teacher_salary">固定</label>
                            </br>
                            <input id="teacher_commission" type="radio" name="teacher-fee" value="commission">
                            <label for="teacher_commission">抽成</label>
                        </div>
                        <div class="col-md-8 fee-input-wrapper">
                            <span class="text-unit">NT$ </span>
                            <input disabled id="teacher_fee" class="form-control fee-input" type="number" placeholder="先選擇計算方式">
                            <span class="text-percentage">%</span>
                        </div>
                    </div>
                </div>
            @endif --}}

            @if ($lesson_data->type == 'entity')
                <div class="col-md-12 col-md-offset-0 form-group row" id="form_lesson_location">
                    <label class="col-form-label">上課地點</label><br />
                    <div class="col-md-10">
                        <select class="form-control" id="area_select">
                            <option></option>
                        </select><br />
                        <input type="text" class="form-control" id="lesson_location" value="{{ $lesson_data->location }}" placeholder="輸入地址或者地標"><br />
                        <input type="text" class="form-control" id="lesson_location_note" value="{{ $lesson_data->location_note }}" placeholder="上課地點詳細位置">
                    </div>
                </div>
            @endif

            <div class="col-md-12 col-md-offset-0 form-group row" id="form_lesson_tag">
                <label class="col-form-label">類別</label><br />
                <div class="col-md-10">
                    {{ Form::select('topic', [], '', ['id' => 'topic']) }}
                    {{ Form::select('category', [], '', ['id' => 'category', 'disabled']) }}
                </div>
            </div>

            <div class="col-md-12 col-md-offset-0 form-group row" id="form_lesson_tag">
                <label class="col-form-label">標籤</label><br />
                <div class="col-md-10">
                    <input type="text" class="form-control" id="lesson_tag" disabled placeholder="尚未開放">
                </div>
            </div>
        </div>
    </div>
@stop
