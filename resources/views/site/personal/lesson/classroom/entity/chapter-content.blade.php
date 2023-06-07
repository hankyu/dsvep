<div class="accordion">
  <ul class="cd-accordion-menu animated">
    @foreach ($unit_num as $num)
      <li class="accordion-title">
        <input type="checkbox" name="group-{{ $num - 1 }}" id="group-{{ $num - 1 }}">
        <label for="group-{{ $num - 1 }}">
          第{{ $num }}堂
          {{
              substr(str_replace('-', '/', $unit_data[$num - 1]->l_start_time), 0, strlen($unit_data[$num - 1]->l_start_time) - 9) .
              ['(日)', '(一)', '(二)', '(三)', '(四)', '(五)', '(六)'][date('w', strtotime(substr($unit_data[$num - 1]->l_start_time, 0, 10)))] .
              substr(str_replace('-', '/', $unit_data[$num - 1]->l_start_time), 10, strlen($unit_data[$num - 1]->l_start_time) - 13)
          }}
          {{-- 開始時間和結束時間日期相同，只顯示時間 --}}
          @if (substr($unit_data[$num - 1]->l_start_time, 0, 10) == substr($unit_data[$num - 1]->l_end_time, 0, 10))
            ~ {{ substr(str_replace('-', '/', $unit_data[$num - 1]->l_end_time), 11, 5) }}
          @else
            ~ {{
                  substr(str_replace('-', '/', $unit_data[$num - 1]->l_end_time), 5, strlen($unit_data[$num - 1]->l_end_time) - 14) .
                  ['(日)', '(一)', '(二)', '(三)', '(四)', '(五)', '(六)'][date('w', strtotime(substr($unit_data[$num - 1]->l_end_time, 0, 10)))] .
                  substr(str_replace('-', '/', $unit_data[$num - 1]->l_end_time), 10, strlen($unit_data[$num - 1]->l_end_time) - 13)
              }}
          @endif
           - {{ $unit_data[$num - 1]->u_name }}
        </label>
        <ul class="accordion-content">
          @if ($unit_data[$num - 1]->description)
            <li class="remark-content row marginbot-10">
              <span class="remark-label">{!! nl2br(e(str_replace("<br />", "", $unit_data[$num - 1]->description))) !!}</span>
            </li>
          @endif
          @if ($unit_data[$num - 1]->remark)
            <li class="remark-content row">
              <span class="remark-title">備註：</span>
              <span class="remark-label">{!! nl2br(e(str_replace("<br />", "", $unit_data[$num - 1]->remark))) !!}</span>
            </li>
          @endif
        </ul>
      </li>
    @endforeach
  </ul>
</div>
