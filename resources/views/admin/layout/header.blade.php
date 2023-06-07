<div class="blank"></div>
<div id="navigation">
  <nav class="navbar navbar-custom" role="navigation">
    <div class="container">
      <div class="row vertical-center">
        <div class="col-sm-10 col-xs-8">
          <div id="page-content-wrapper navbar-header" style="float: left; padding-right:30px">
            <button type="button" class="hamburger is-closed " data-toggle="offcanvas">
              <span class="hamb-top"></span>
              <span class="hamb-middle"></span>
              <span class="hamb-bottom"></span>
            </button>
          </div>
          <div class="site-logo">
            {{ link_to('/admin', 'ADMIN', array('class' => 'brand')) }}
          </div>
        </div>
        <div class="col-sm-2 col-xs-4">
          <div class="header-user-img">
            <img class="header-avatar-img" src="{{ URL::asset('img/personal/avatar/' . $avatar) }}">
          </div>
        </div>
      </div>
    </div>
  </nav>
</div>
