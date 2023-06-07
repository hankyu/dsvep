<div class="eva-card">
  <span>3.5</span>
  <div>
    <i class="fa fa-star color-emphasized1" aria-hidden="true"></i>
    <i class="fa fa-star color-emphasized1" aria-hidden="true"></i>
    <i class="fa fa-star color-emphasized1" aria-hidden="true"></i>
    <i class="fa fa-star color-emphasized1" aria-hidden="true"></i>
    <i class="fa fa-star color-emphasized1" aria-hidden="true"></i>
  </div>
  <span>2則評論</span>
</div>

@for ($i = 0; $i < count($rank_data); $i++)
  <div class="eva-card">
    <div class="eva-card-header row">
      <div class="header-image col-xs-2 col-sm-1">
        <img src="/img/personal/avatar/{{ $member_data->avg_img }}" alt="">
      </div>
      <div class="col-xs-9 padding-0">
        <span>{{ $rank_data[$i]->m_id }}</span>
        <div>
          @for ($j = 0; $j < 5; $j++)
            @if ($j < $rank_data[$i]->item_star)
              <i class="fa fa-star color-emphasized1" aria-hidden="true"></i>
            @else
              <i class="fa fa-star-o color-gray" aria-hidden="true"></i>
            @endif
          @endfor
          <span class="text-date">{{ date('Y/m/d') }}</span>
        </div>
      </div>
    </div>
    <div class="eva-content">
      <span>{{ $rank_data[$i]->item_content }}</span>
    </div>
  </div>
@endfor
