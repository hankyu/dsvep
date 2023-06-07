<div class="teacher-side-bar">
    <div id="ava_edit_btn" class="avatar">
        <div class="show-pic">
            @if ($teacher_member_data->avg_img == null)
                {{ Html::image('img/personal/avatar/avatar-vistor.png') }}
            @else
                {{ Html::image('img/personal/avatar/' . $teacher_member_data->avg_img) }}
            @endif
        </div>
    </div>
    <div>
        <div id="avatar_nickname" class="membername">
            <span>{{ $teacher_member_data->nickname }}</span>
        </div>
    </div>
    <div id="option">
        @if (isset($member_data->m_id))
            @if ($member_data->m_id != $teacher_member_data->m_id)
                <div id="add_message" class="left-bar-message" data-account="{{ $teacher_member_data->account }}" data-nickname="{{ $teacher_member_data->nickname }}">
                    {{-- <i class="fa fa-comments fa-lg" aria-hidden="true"></i><span>傳送訊息</span> --}}
                </div>
            @endif
        @endif
        <div class="left-bar-score">
          {{-- <i class="fa fa-star fa-lg" aria-hidden="true"></i><span>滿分</span> --}}
        </div>
    </div>
</div>
