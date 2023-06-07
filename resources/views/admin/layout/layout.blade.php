<!doctype html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>  {{ $title }}  </title>
    <meta http-equiv="cache-control" content="max-age=0" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="expires" content="-1" />
    <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
    <meta http-equiv="pragma" content="no-cache" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="google-site-verification" content="jrXrZ4Y5wnkcGCbGXn7czKiNY-Hr35RtHcqO6f7I654" />
    <meta name="_token" content="{{ csrf_token() }}"/>
    {{ Html::style('font-awesome/css/font-awesome.min.css') }}
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
    <link rel="stylesheet" href="{{ asset('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css') }}">
    {{ HTML::style('css/nivo-lightbox.css') }}
    {{ HTML::style('css/nivo-lightbox-theme/default/default.css') }}
    {{ HTML::style('css/animations.css') }}
    {{ HTML::style('css/style.css') }}
    {{ HTML::style('css/page_css/admin/layout.css')}}
    {{ HTML::style('css/alertify.bootstrap.css') }}
    {{ HTML::style('css/alertify.core.css') }}
    {{ HTML::style('css/color.css') }}
    <link rel="stylesheet" href="{{ asset('https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.0.0-beta.2.4/assets/owl.carousel.min.css') }}">
    <link rel="stylesheet" href="{{ asset('https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.0.0-beta.2.4/assets/owl.theme.default.min.css') }}">
    <link rel="stylesheet" href="{{ asset('https://cdn.datatables.net/1.10.16/css/dataTables.bootstrap.min.css') }}" />
    <link rel="stylesheet" href="{{ asset('https://cdn.datatables.net/responsive/2.1.1/css/responsive.bootstrap.min.css') }}" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.0/jquery-confirm.min.css" rel="stylesheet" >
    <script src="{{ asset('https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js') }}"></script>
    <script src="{{ asset('https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.0.0-beta.2.4/owl.carousel.min.js') }}"></script>
    <script src="{{ asset('https://www.google.com/recaptcha/api.js') }}"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.0/jquery-confirm.min.js"></script>
    <script src="https://www.gstatic.com/firebasejs/4.3.0/firebase.js"></script>
    <script src="https://www.gstatic.com/firebasejs/4.3.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/4.3.0/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/4.3.0/firebase-database.js"></script>
    <script src="https://www.gstatic.com/firebasejs/4.3.0/firebase-storage.js"></script>
    <script src="{{ asset('https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js') }}"></script>
    {{ Html::script('js/datatables.buttons.min.js') }}
    <script src="{{ asset('https://cdn.datatables.net/1.10.16/js/dataTables.bootstrap.min.js') }}"></script>
    <script src="{{ asset('https://cdn.datatables.net/responsive/2.1.1/js/dataTables.responsive.min.js') }}"></script>
    <script src="{{ asset('https://cdn.datatables.net/responsive/2.1.1/js/responsive.bootstrap.min.js') }}"></script>
    {{ Html::script('js/buttons.flash.min.js') }}
    {{ Html::script('js/jszip.min.js') }}
    {{ HTML::script('js/page_js/site/module/firebase_module.js') }}
    {{ HTML::script('js/page_js/admin/layout.js') }}
  </head>
  <body>
    @include('admin.layout.header')
    <div class="body-content">
      <input type="hidden" id="_time" value="{{ $_time ?? '' }}" />
      @yield('content')
    </div>
    @include('admin.layout.footer')
    @include('admin.layout.sidebar')
    {{ HTML::script('js/page_js/admin/accordionsMenu.js') }}
    {{ HTMl::script('js/bootstrap.min.js') }}
    {{ HTML::script('js/jquery.sticky.js') }}
    {{ HTML::script('js/jquery.easing.min.js') }}
    {{ HTML::script('js/jquery.scrollTo.js') }}
    {{ HTML::script('js/jquery.appear.js') }}
    {{ HTML::script('js/stellar.js') }}
    {{ HTML::script('js/nivo-lightbox.min.js') }}
    {{ HTML::script('js/custom.js') }}
    {{ HTML::script('js/css3-animate-it.js') }}
    {{ HTML::script('js/owl.js') }}
    {{ HTML::script('js/alertify.min.js') }}
  </body>
</html>
