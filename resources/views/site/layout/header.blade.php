<div class="blank"></div>
<div id="navigation">
  <nav class="navbar navbar-custom" role="navigation">
      <div class="container">
        <div class="header-wrapper">
            <div class="header-title">
                <button type="button" class="hamburger is-closed " data-toggle="offcanvas">
                    <span class="hamb-top"></span>
                    <span class="hamb-middle"></span>
                    <span class="hamb-bottom"></span>
                </button>
                <div class="site-logo">
                    {{ link_to('/', '大俠學習平台', array('class' => 'brand')) }}
                </div>
                <div class="search-bar">

                    @if (($member_data != '') && isset($teacher_data))
                        @php
                            $situation = $teacher_data['auth_situation'] ?? $teacher_data->auth_situation
                        @endphp
                        @if ($situation != 'success')
                            <a href="/becometeacher"><i class="fas fa-chalkboard-teacher"></i>成為講師</a>
                        @endif
                    @else
                        <a href="/#/teacher-introduce"><i class="fas fa-chalkboard-teacher"></i>成為講師</a>
                    @endif

                    <a href="/#/lesson/all"><i class="fas fa-search"></i>找課程?</a>
                </div>
            </div>

            <div class="header-info">
                @if ($member_data == '')
                    <div class="">
                        <button class="btn btn-info" id="sidebar_login">登入</button>
                    </div>
                @else
                  <div class="header-user-img">
                    <button class="btn btn-default dropdown-toggle header-avatar-btn" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img class="header-avatar-img" src="{{ URL::asset('img/personal/avatar/' . $avatar) }}">
                    </button>
                    <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
                        <li><a href="/#/profile/detail">基本資料</a></li>
                        <li><a href="/#/profile/lesson/overview">我的課程</a></li>
                        <li><a href="/#/profile/rollcall-report">我的出席</a></li>
                        <li><a href="/#/profile/message">我的訊息</a></li>
                        <li><a href="/#/profile/order">我的訂單</a></li>
                        <li><a href="/#/profile/wish">我的願望</a></li>
                        <li><a href="/profile/favorite">我的收藏</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="/logout">登出</a></li>
                    </ul>
                  </div>
                @endif
            </div>
        </div>
      </div>
  </nav>
</div>

<div id="search_wrapper" class="search-wrapper container row">
  <div class="animateion-before" style="display: none;"></div>
  <div class="animateion-after" style="display: none;"></div>
  <div class="search-close">
    <span id="search_close"><i class="fas fa-times fa-2x" aria-hidden="true"></i></span>
  </div>
  <div id="load_animation" class="search-load col-xs-12 col-lg-10 col-lg-offset-1" style="display: none;">
      <div class="loader"></div>
  </div>
  <div id="search_result" class="search-result transparent col-xs-12 col-lg-10 col-lg-offset-1"></div>
</div>
