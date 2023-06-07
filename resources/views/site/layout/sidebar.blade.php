<div id="wrapper">
  <div class="overlay"></div>
  <nav class="navbar navbar-inverse navbar-fixed-top" id="sidebar-wrapper" role="navigation">
    <div class="sidebar-hamburger-close">
      <button type="button" class="hamburger is-open" data-toggle="offcanvas">
        <span class="hamb-top"></span>
        <span class="hamb-middle"></span>
        <span class="hamb-bottom"></span>
      </button>
    </div>
    <ul class="nav sidebar-nav">
      <li></li>
      <li class="sidebar-brand">
        <div class="personal-pic">
          {{ HTML::image('img/personal/avatar/' . $avatar) }}
        </div>
        @if ( $member_data != "" )
          <div class="personal-name">
            <a href="/#/profile/detail">
              <span id="user-name">{{ $member_data->nickname }}</span>
              <span class="spn-checkProfile">查看個人資料</span>
            </a>
          </div>
        @else
          <div class="personal-name personal-name-visitor">
            <span>訪客</span>
          </div>
        @endif
      </li>

      <hr>

      <li><a href="/#/announcement"><span class="fas fa-bullhorn"></span>最新公告</a></li>
      <li><a href="/#/teacher/overview"><span class="fas fa-bookmark"></span>王牌講師</a></li>
      <li><a href="/#/lesson/all"><span class="fas fa-landmark"></span>所有課程</a></li>
      @if (($member_data != '') && isset($teacher_data))
        @php
            $situation = $teacher_data['auth_situation'] ?? $teacher_data->auth_situation
        @endphp
        @if ($situation != 'success')
        <li class="emphasized2"><a href="/becometeacher"><span class="fas fa-chalkboard-teacher"></span>成為講師</a></li>
        @endif
      @else
      <li class="emphasized2"><a href="/#/teacher-introduce"><span class="fas fa-chalkboard-teacher"></span>成為講師</a></li>
      @endif

      @if ($member_data != '')
        <hr>
        <li><a href="/#/profile/lesson/overview"><span class="fas fa-book"></span>我的課程</a></li>
        <li><a href="/#/profile/rollcall-report"><span class="fas fa-calendar-check"></span>我的出席</a></li>
        <li><a href="/#/profile/message"><span class="fas fa-comment"></span>我的訊息</a></li>
        <li><a href="/#/profile/order"><span class="fas fa-list-alt"></span>我的訂單</a></li>
        <li><a href="/#/profile/wish"><span class="fas fa-dove"></span>我的願望</a></li>
        <li><a href="/profile/favorite"><span class="fas fa-box-open"></span>我的收藏</a></li>
      @endif


      @if (isset($teacher_data->m_id))
        @if (($teacher_data->auth_situation == 'success') && ($teacher_data->check_rule == true))
          <hr>
          <li><a href="/#/teacher/{{ $teacher_data->t_id }}" ><span class="fas fa-home"></span>導師室</a></li>
          <li><a href="/teacher/lesson/create"><span class="fas fa-sign-out-alt fa-rotate-270"></span>創建課程</a></li>
          <li><a href="/teacher/lesson/overview"><span class="fas fa-book-reader"></span>課程管理</a></li>
          <li><a href="/teacher/rollcall-report"><span class="fas fa-calendar-check"></span>課程出席</a></li>
          <li><a href="/teacher/accounting"><span class="fas fa-dollar-sign"></span>課程收益</a></li>
        @endif
      @endif

      {{-- @if ($member_data != '')
        <li><a href="#">合作單位</a></li>
      @endif --}}

      {{-- @if ($user_data != '')
        <li><a href="#">合作單位後台</a></li>
      @endif --}}

      @if ($member_data != '')
        @php
          $is_worker = $member_data->authority == 'worker';
          $is_yoshocon = $member_data->authority == 'yoshocon';
          $is_saigo = $member_data->authority == 'saigo';
        @endphp
        @if ($is_worker || $is_yoshocon || $is_saigo)
          <hr>
        @endif
        @if ($is_worker)
          <li><a href="/worker/create"><span class="fas fa-exchange-alt"></span>代創課程</a></li>
          <li><a href="/worker/rollcall-report"><span class="fas fa-calendar-check"></span>點名管理</a></li>
        @endif

        @if ($is_yoshocon || $is_saigo)
          <li><a href="#" id="link_admin"><span class="fas fa-cog"></span>平台管理後台</a></li>
        @endif

        @if ($is_yoshocon || $is_saigo || $is_worker)
          <li><a href="/approval"><span class="fas fa-edit"></span>報名管理系統</a></li>
        @endif
      @endif

      <hr>
      <li><a href="/#/tutorial"><span class="fas fa-rocket"></span>網站使用教學</a></li>
      <li><a style="cursor: pointer;" id="contact-sidebar"><span class="fas fa-envelope"></span>聯絡客服</a></li>

      @if ($member_data != '')
        <hr>
        <li><a href="/logout"><span class="fas fa-sign-out-alt fa-rotate-180"></span>登出</a></li>
      @endif
    </ul>
  </nav>
</div>
