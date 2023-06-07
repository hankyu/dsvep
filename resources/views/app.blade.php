<!DOCTYPE html>
<html lang="zh-Hant-TW">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="_token" content="{{ csrf_token() }}">
        <meta name="description" content="大俠學習平台承襲了大俠攝影教室十多年來的辦學經驗，榮獲政府人才發展品質管理系統之肯定(TTQS)，提供一個優質的學習平台環境，豐富的教學資源、結合線上與線下的學習，讓所有想進修的朋友，都能找到適合自己的課程。讓大家不論是在生活中、職場上都能保有持續學習的動力，創造個人的影響力。">
        <meta name="keywords" content="大俠學習平台, 大俠學習平台" />
        <meta name="author" content="大俠攝影教室">
        <link href="{{ asset('css/app.css') }}" rel="stylesheet" type="text/css"/>
        <link rel="icon" href="{{ URL::asset('img/DS 16x16 favicon.png') }}" sizes="16x16" type="image/png">
        <link rel="icon" href="{{ URL::asset('img/DS 32x32 favicon.png') }}" sizes="32x32" type="image/png">
        <link rel="icon" href="{{ URL::asset('img/DS 48x48 favicon.png') }}" sizes="48x48" type="image/png">
        <title>大俠學習平台-持續學習</title>
        <script type='text/javascript'>
             window.Laravel = <?php echo json_encode([
                'csrfToken' => csrf_token(),
            ]); ?>
        </script>
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-127152828-1"></script>
        <script type="text/javascript">
            if (document.location.hostname.indexOf("ds-vep.com") !== -1 && document.location.hostname.indexOf("test.ds-vep.com") === -1)
            {
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'UA-127152828-1');

                // Hotjar Tracking Code for https://www.ds-vep.com/
                (function(h,o,t,j,a,r){
                    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                    h._hjSettings={hjid:1128147,hjsv:6};
                    a=o.getElementsByTagName('head')[0];
                    r=o.createElement('script');r.async=1;
                    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                    a.appendChild(r);
                })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            }else{
                console.warn('it\'s test version without ga, without hotjar');
            }
        </script>
        <noscript>
            <p style="text-align:center;margin-top:20vh;font-size: 2rem;line-height: 1.5;">大俠教學平台需要瀏覽器支持 JavaScript</p>
            <p style="text-align:center;font-size: 1rem;">請使用支持 Javascript 的瀏覽器（例如 chrome... 等瀏覽器），</p>
            <p style="text-align:center;font-size: 1rem;">並將其 Javascript 啟用（預設即為啟用)</p>
        </noscript>
    </head>
    <body>
        <div id="app">
            <router-view ref="routerView"></router-view>
        </div>

        <script type="text/javascript" src="{{ asset('js/app.js') }}"></script>
        <script type="text/javascript" charset="utf-8" >var CN="ds-vep.com";</script>
        <!-- <script type="text/javascript" src="//ssllogo.twca.com.tw/twcaseal_v3.js" charset="utf-8"></script> -->
    </body>
</html>