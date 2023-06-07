@extends('site.teacher.create-lesson.create-layout')
@section('create-content')
  <input type="hidden" id="num_condition" value="{{ count($goal_condition_data) }}"/>
  <input type="hidden" id="num_suit" value="{{ count($goal_suit_data) }}"/>
  <input type="hidden" id="num_learn" value="{{ count($goal_learn_data) }}"/>
  <div class="col-md-9 lesson-content">
    <div>
      <button class="btn btn-info btn-save" id="btn_goal_save"><i class="fas fa-save" aria-hidden="true"></i> Save</button>
      <h3><span style="margin-left: 20px">{{ $step }}</span></h3>
    </div>
    <hr />
    <div class="content">

      <div class="col-md-12 col-md-offset-0 form-group row item-area">
        <label class="col-form-label">該課程的上課條件</label>
        <div id="condition_area">
          @for ($i = 0 ; $i < count($goal_condition_data) ; $i++)
            <div id="condition_area_{{ $i + 1 }}">
              <p>
                <div class="col-xs-9 col-sm-10">
                  <input type="text" class="input-lesson form-control" id="lesson_condition_{{ $i + 1 }}" data-id="{{ $goal_condition_data[$i]->id }}" value="{{ $goal_condition_data[$i]->content }}" placeholder="輸入該課程的上課條件">
                </div>
                <button class="btn btn-danger" id="btn_del_condition_{{ $i + 1 }}" onclick="_del_condition({{ $i + 1 }})"><i class="fas fa-trash-alt" aria-hidden="true"></i> 刪除</button>
              </p>
            </div>
          @endfor
        </div>
        <div class="col-xs-9 col-sm-10">
          <button class="btn btn-success" id="btn_add_condition"><i class="fa fa-plus" aria-hidden="true"></i> 新增欄位</button>
        </div>
      </div>

      <div class="col-md-12 col-md-offset-0 form-group row item-area">
        <label class="col-form-label">適合這課程的學生</label>
        <div id="suit_area">
          @for ($i = 0 ; $i < count($goal_suit_data) ; $i++)
            <div id="suit_area_{{ $i + 1 }}">
              <p>
                <div class="col-xs-9 col-sm-10">
                  <input type="text" class="input-lesson form-control" id="lesson_suit_{{ $i + 1 }}" data-id="{{ $goal_suit_data[$i]->id }}" value="{{ $goal_suit_data[$i]->content }}" placeholder="輸入適合這課程的學生">
                </div>
                <button class="btn btn-danger" id="btn_del_suit_{{ $i + 1 }}" onclick="_del_suit({{ $i + 1 }})"><i class="fas fa-trash-alt" aria-hidden="true"></i> 刪除</button>
              </p>
            </div>
          @endfor
        </div>
        <div class="col-xs-9 col-sm-10">
          <button class="btn btn-success" id="btn_add_suit"><i class="fa fa-plus" aria-hidden="true"></i> 新增欄位</button>
        </div>
      </div>

      <div class="col-md-12 col-md-offset-0 form-group row item-area">
        <label class="col-form-label">上完課程後能學會什麼</label>
        <div id="learn_area">
          @for ($i = 0 ; $i < count($goal_learn_data) ; $i++)
            <div id="learn_area_{{ $i + 1 }}">
              <p>
                <div class="col-xs-9 col-sm-10">
                  <input type="text" class="input-lesson form-control" id="lesson_learn_{{ $i + 1 }}" data-id="{{ $goal_learn_data[$i]->id }}" value="{{ $goal_learn_data[$i]->content }}" placeholder="輸入欲開課的副標題">
                </div>
                <button class="btn btn-danger" id="btn_del_learn_{{ $i + 1 }}" onclick="_del_learn({{ $i + 1 }})"><i class="fas fa-trash-alt" aria-hidden="true"></i> 刪除</button>
              </p>
            </div>
          @endfor
        </div>
        <div class="col-xs-9 col-sm-10">
          <button class="btn btn-success" id="btn_add_learn"><i class="fa fa-plus" aria-hidden="true"></i> 新增欄位</button>
        </div>
      </div>
    </div>
  </div>
@stop
