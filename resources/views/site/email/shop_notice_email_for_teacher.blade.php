<div style="width: 60%; margin: 0 auto; padding:15px; background: #EEE6; border-radius: 5px; font-size: 16px;">
    <p><b>講師您好：</b></p>
    <p style="text-indent: 16px; padding: 5px;">您的課程 <a href="{{ $lesson_URL }}"><b>{{ $lesson_name }}</b></a> 已有同學購買完成！</p>
    <p style="padding: 5px;">購買時間為：{{ $buy_time }}
    <p style="padding: 5px;">本課程將於 <b style="color: #D21;">{{ $time }}</b> 開始正式上課</p>

    @if ($address != null)
        <p style="padding: 5px;">上課地點： {{ $address }}</p>
    @endif

    <p style="padding: 5px;">提醒您隨時注意課程的最新資訊並做好準備</p>
    <p style="padding: 5px;"><b style="color: #D21;">詳細上課注意事項，請參考課程頁面</b></p>
    <p style="padding: 5px;">如有任何問題請與我們聯繫，將會有專人替您服務</p>
    <p style="padding: 5px;">上班時間:週一~週五 13:00~22:00</p>
    <p style="padding: 5px;">電話:02-29554564</p>
    <p style="padding: 5px;">mail: eason.yea@gmail.com</p>
    <p style="padding: 5px;">line: @dashaphoto</p>
    <!-- <a href="https://www.ds-vep.com/">
        <img style="width: 100%;" src="https://i.imgur.com/sOZ4eIY.png">
    </a> -->
    <p style="color: #666; font-size: 14px;">本信件由平台自動產生發送，請勿直接回覆</p>
    <p>如有任何疑問，請洽詢<a href="https://www.ds-vep.com/" style="text-decoration: none;">大俠學習平台</a></p>
    <p>大俠學習開發團隊</p>
</div>
