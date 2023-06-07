@if (count($condition_data) != 0)
  <div class="center lesson-preview-bar">
    該課程的上課條件
  </div>
  <div class="fit-area-text">
    @for ($i = 0; $i < count($condition_data); $i++)
      {{ $i + 1 }}. {{ $condition_data[$i]->content }}<br>
    @endfor
  </div>
@endif

@if (count($suit_data) != 0)
  <div class="center lesson-preview-bar">
    適合這課程的學生
  </div>
  <div class="fit-area-text">
    @for ($i = 0; $i < count($suit_data); $i++)
      {{ $i + 1 }}. {{ $suit_data[$i]->content }}<br>
    @endfor
  </div>
@endif

@if (count($learn_data) != 0)
  <div class="center lesson-preview-bar">
    上完後可以學到什麼
  </div>
  <div class="fit-area-text">
    @for ($i = 0; $i < count($learn_data); $i++)
      {{ $i + 1 }}. {{ $learn_data[$i]->content }}<br>
    @endfor
  </div>
@endif
