<div style="width: 60%; margin: 0 auto; padding:15px; background: #EEE6; border-radius: 5px; font-size: 16px;">
  <p><b>您好，{{ $account }}：</b></p>
  <p style="text-indent: 16px; padding: 5px;">
    感謝您報名了
    @if ($l_start_time != null)
      ，<b style="color: #D21">{{ $l_start_time }}</b>上課的
    @endif
    <a href="{{ $lesson_URL }}"><b>{{ $lesson_name }}</b></a> 課程
  </p>
  <p style="padding: 5px;">本課程由 <b style="color: #D21;">{{ $teacher_name }}</b> 講師上課</p>
  @if ($address != null)
    <p style="padding: 5px;">上課地點： {{ $address }}</p>
  @endif
  <p style="padding: 5px;">由於因人數不足或是講師方面因素，導致<b style="color: #D21;">取消</b>了該門課程</p>
  <p style="padding: 5px;">如尚未繳費之學員，請勿再進行繳納，該筆訂單將會自動取消</p>
  <p style="padding: 5px;">如刷卡繳費之學員，將刷退至原帳戶</p>
  <p style="padding: 5px;">如其他方式繳費(超商、ATM、現金)之學員，請至個人頁面填寫<a href="{{ $profile_URL }}"><b>個人帳戶資料</b></a></p>
  <p style="padding: 5px;">報名費用將於兩週內退回至指定帳戶</p>
  <p style="padding: 5px;">如有任何問題請與我們聯繫，將會有專人替您服務</p>
  <p style="padding: 5px;">上班時間:週一~週五 13:00~22:00</p>
  <p style="padding: 5px;">電話:02-29554564</p>
  <p style="padding: 5px;">mail: eason.yea@gmail.com</p>
  <p style="padding: 5px;">line: @dashaphoto</p>
  <p style="padding: 5px;">造成您的不便，敬請見諒</p>
  <!-- <a href="http://www.ds-vep.com/">
    <img style="width: 100%;" src="https://i.imgur.com/sOZ4eIY.png">
  </a> -->
  <p class="color-darkgray" style="font-size: 14px;">本信件由平台自動產生發送，請勿直接回覆</p>
  <p>如有任何疑問，請洽詢<a href="http://www.ds-vep.com/" style="text-decoration: none;">大俠學習平台</a></p>
  <p>大俠學習開發團隊</p>
</div>
