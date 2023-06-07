<!--
░░░░░░░░░░░░░░░░░░░░░░░░░░░    ░░░░░░░░░▄░░░░░░░░░░░░░░▄░░░░
░░░░░░░░░░░░░▄███▄▄▄░░░░░░░    ░░░░░░░░▌▒█░░░░░░░░░░░▄▀▒▌░░░
░░░░░░░░░▄▄▄██▀▀▀▀███▄░░░░░    ░░░░░░░░▌▒▒█░░░░░░░░▄▀▒▒▒▐░░░
░░░░░░░▄▀▀░░░░░░░░░░░▀█░░░░    ░░░░░░░▐▄▀▒▒▀▀▀▀▄▄▄▀▒▒▒▒▒▐░░░
░░░░▄▄▀░░░░░░░░░░░░░░░▀█░░░    ░░░░░▄▄▀▒░▒▒▒▒▒▒▒▒▒█▒▒▄█▒▐░░░
░░░█░░░░░▀▄░░▄▀░░░░░░░░█░░░    ░░░▄▀▒▒▒░░░▒▒▒░░░▒▒▒▀██▀▒▌░░░
░░░▐██▄░░▀▄▀▀▄▀░░▄██▀░▐▌░░░    ░░▐▒▒▒▄▄▒▒▒▒░░░▒▒▒▒▒▒▒▀▄▒▒▌░░
░░░█▀█░▀░░░▀▀░░░▀░█▀░░▐▌░░░    ░░▌░░▌█▀▒▒▒▒▒▄▀█▄▒▒▒▒▒▒▒█▒▐░░
░░░█░░▀▐░░░░░░░░▌▀░░░░░█░░░    ░▐░░░▒▒▒▒▒▒▒▒▌██▀▒▒░░░▒▒▒▀▄▌░
░░░█░░░░░░░░░░░░░░░░░░░█░░░    ░▌░▒▄██▄▒▒▒▒▒▒▒▒▒░░░░░░▒▒▒▒▌░
░░░░█░░▀▄░░░░▄▀░░░░░░░░█░░░    ▀▒▀▐▄█▄█▌▄░▀▒▒░░░░░░░░░░▒▒▒▐░
░░░░█░░░░░░░░░░░▄▄░░░░█░░░░    ▐▒▒▐▀▐▀▒░▄▄▒▄▒▒▒▒▒▒░▒░▒░▒▒▒▒▌
░░░░░█▀██▀▀▀▀██▀░░░░░░█░░░░    ▐▒▒▒▀▀▄▄▒▒▒▄▒▒▒▒▒▒▒▒░▒░▒░▒▒▐░
░░░░░█░░▀████▀░░░░░░░█░░░░░    ░▌▒▒▒▒▒▒▀▀▀▒▒▒▒▒▒░▒░▒░▒░▒▒▒▌░
░░░░░░█░░░░░░░░░░░░▄█░░░░░░    ░▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▒░▒░▒▒▄▒▒▐░░
░░░░░░░██░░░░░█▄▄▀▀░█░░░░░░    ░░▀▄▒▒▒▒▒▒▒▒▒▒▒░▒░▒░▒▄▒▒▒▒▌░░
░░░░░░░░▀▀█▀▀▀▀░░░░░░█░░░░░
░░░░░░░░░█░░░░░░░░░░░░█░░░░
!-->

<!doctype html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>  {{ isset($title) ? $title.' | 大俠學習平台' : '大俠學習平台 - 持續學習 創造影響力'}}  </title>
    <meta name="description" content="大俠學習平台承襲了大俠攝影教室十多年來的辦學經驗，榮獲政府人才發展品質管理系統之肯定(TTQS)，提供一個優質的學習平台環境，豐富的教學資源、結合線上與線下的學習，讓所有想進修的朋友，都能找到適合自己的課程。讓大家不論是在生活中、職場上都能保有持續學習的動力，創造個人的影響力。" />
    <meta name="keywords" content="大俠學習平台, 大俠學習平台" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="pragma" content="no-cache" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="google-site-verification" content="jrXrZ4Y5wnkcGCbGXn7czKiNY-Hr35RtHcqO6f7I654" />
    <meta name="_token" content="{{ csrf_token() }}"/>
    <meta name="google-site-verification" content="ifxdU-cDpKplIW0l4svZ21CI6DyKoikY_IAjywe08yM" />
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
    <link rel="icon" href="{{ URL::asset('img/DS 16x16 favicon.png') }}" sizes="16x16" type="image/png">
    <link rel="icon" href="{{ URL::asset('img/DS 32x32 favicon.png') }}" sizes="32x32" type="image/png">
    <link rel="icon" href="{{ URL::asset('img/DS 48x48 favicon.png') }}" sizes="48x48" type="image/png">
    <link rel="stylesheet" href="{{ asset('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css') }}">
    {{ HTML::style('css/nivo-lightbox.css') }}
    {{ HTML::style('css/nivo-lightbox-theme/default/default.css') }}
    {{ HTML::style('css/animations.css') }}
    {{ HTML::style('css/style.css') }}
    {{ HTML::style('css/page_css/site/layout.css')}}
    {{ HTML::style('css/alertify.bootstrap.css') }}
    {{ HTML::style('css/alertify.core.css') }}
    {{ HTML::style('css/color.css') }}
    <link rel="stylesheet" href="{{ asset('https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.0.0-beta.2.4/assets/owl.carousel.min.css') }}">
    <link rel="stylesheet" href="{{ asset('https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.0.0-beta.2.4/assets/owl.theme.default.min.css') }}">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.0/jquery-confirm.min.css" rel="stylesheet" >
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.4/css/bootstrap-select.min.css">
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-127152828-1"></script>
    <script type="text/javascript">
        if (document.location.hostname.search("ds-vep.com") !== -1)
        {
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-127152828-1');
        }
    </script>
    <script src="{{ asset('https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js') }}"></script>
    <script src="{{ asset('https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.0.0-beta.2.4/owl.carousel.min.js') }}"></script>
    <script src="{{ asset('https://www.google.com/recaptcha/api.js') }}"></script>
    <script src="{{ asset('https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.2.3/jquery-confirm.min.js') }}"></script>
    <script src="{{ asset('https://www.gstatic.com/firebasejs/4.3.0/firebase.js') }}"></script>
    <script src="{{ asset('https://www.gstatic.com/firebasejs/4.3.0/firebase-app.js') }}"></script>
    <script src="{{ asset('https://www.gstatic.com/firebasejs/4.3.0/firebase-auth.js') }}"></script>
    <script src="{{ asset('https://www.gstatic.com/firebasejs/4.3.0/firebase-database.js') }}"></script>
    <script src="{{ asset('https://www.gstatic.com/firebasejs/4.3.0/firebase-storage.js') }}"></script>
    <script src="{{ asset('https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.4/js/bootstrap-select.min.js') }}"></script>
    {{ HTML::script('js/page_js/site/ie-block.js') }}
    {{ HTML::script('js/page_js/site/module/label_module.js') }}
    {{ Html::script('js/page_js/site/module/price_module.js') }}
    {{ HTML::script('js/page_js/site/module/firebase_module.js') }}
    {{ HTML::script('js/page_js/site/layout.js') }}

    <!-- Facebook Pixel Code -->
    <script>
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '2113502455398374');
      fbq('track', 'PageView');
    </script>
    <noscript><img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=2113502455398374&ev=PageView&noscript=1"
    /></noscript>
    <!-- End Facebook Pixel Code -->
  </head>
  <body>
    @include('site.layout.header')
    <input type="hidden" id="login_account" value="{{ $member_data->account ?? ''}}" />
    <input type="hidden" id="email_verify" value="{{ $verify ?? 'yes' }}">
    <input type="hidden" id="verify" value="{{ $verify_result ?? '' }}" />
    <input type="hidden" id="email" value="{{ $member_data->email ?? '' }}">
    <input type="hidden" id="oauth_register" value="{{ $oauth_register ?? '' }}">
    <div class="body-content">
      @yield('content')
    </div>
    <button type="button" class="btn_page_top"><span class="fas fa-angle-up"></span></button>
    @include('site.layout.footer')
    @include('site.layout.modal')
    @include('site.layout.sidebar')
    {{ HTML::script('js/MD5.js') }}
    {{ HTML::script('js/page_js/site/accordionsMenu.js') }}
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
