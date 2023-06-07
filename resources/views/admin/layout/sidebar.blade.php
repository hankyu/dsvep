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
        <div class="personal-name">
          {{ $member_data->nickname }}
        </div>
      </li>
      <li><a href="/admin/member/overview">人員管理</a></li>
      <li><a href="/admin/audit/teacher/overview">審核講師</a></li>
      <li><a href="/admin/audit/lesson/overview">審核課程</a></li>
      <li><a href="/admin/rollcall">出席管理</a></li>
      <li><a href="/admin/topic/overview">分類管理</a></li>
      <li><a href="/admin/wish/overview">願望清單</a></li>
      {{-- <li><a href="#">審核平台</a></li> --}}
      {{-- <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">流量統計<span class="caret"></span></a>
        <ul class="dropdown-menu">
          <a href="/admin/statistic/browse/overview">使用者瀏覽歷程</a>
          <a href="/admin/statistic/browse/analyze">瀏覽狀況統計</a>
          <a href="/admin/statistic/click/overview">點擊歷程列表</a>
          <a href="/admin/statistic/click/analyze">點擊狀況統計</a>
        </ul>
      </li> --}}
      <li><a href="/admin/accounting">會計系統</a></li>
      <li><a href="/admin/event/overview">活動系統</a></li>
      @if ($member_data->authority == 'yoshocon')
        <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">資料庫管理<span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="/admin/sql/member">會員管理</a></li>
            <li><a href="/admin/sql/lesson">課程管理</a></li>
            <li><a href="/admin/sql/order">訂單管理</a></li>
          </ul>
        </li>
      @endif
      <li><a href="/admin/exit">離開</a></li>
    </ul>
  </nav>
</div>
