<div style="width: 60%; margin: 0 auto; padding:15px; background: #EEE6; border-radius: 5px; font-size: 16px;">
  <p><b>您好，{{ $account }} 講師：</b></p>
  <p style="text-indent: 16px; padding: 5px;">感謝您開辦了 <a href="{{ $lesson_URL }}"><b>{{ $lesson_name }}</b></a> 課程</p>
  <p style="padding: 5px;">由於人數已達標，故該門課程確定開班</p>
  <p style="padding: 5px;">本課程將於 <b style="color: #D21;">{{ $time }}</b> 開始正式上課</p>
  @if ($address != null)
    <p style="padding: 5px;">上課地點： {{ $address }}</p>
  @endif
  <p style="padding: 5px;"><b style="color: #D21;">請授課講師確認上課注意事項，以利同學課前準備，注意事項請寫在課表時間的備註欄內</b></p>
  <p style="padding: 5px;">如有任何問題請與我們聯繫，將會有專人替您服務</p>
  <p style="padding: 5px;">上班時間:週一~週五 13:00~22:00</p>
  <p style="padding: 5px;">電話:02-29554564</p>
  <p style="padding: 5px;">mail: eason.yea@gmail.com</p>
  <p style="padding: 5px;">line: @dashaphoto</p>
  <!-- <a href="https://www.ds-vep.com/">
    <img style="width: 100%;" src="https://i.imgur.com/sOZ4eIY.png">
  </a> -->
  <p class="color-darkgray" style="font-size: 14px;">本信件由平台自動產生發送，請勿直接回覆</p>
  <p>如有任何疑問，請洽詢<a href="https://www.ds-vep.com/" style="text-decoration: none;">大俠學習平台</a></p>
  <p>大俠學習開發團隊</p>
</div>
