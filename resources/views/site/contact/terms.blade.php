@extends('site.layout.layout')
@section('content')
  {{ Html::style('css/page_css/site/contact/about.css') }}
  <header class="header header-terms">
    <div class="title">
      服務條款與隱私政策
    </div>
  </header>
  <div class="container">
    <div class="row">
      <div class="menu-outer col-xs-3">
        <ul>
          <li><a href="#privacy" id="btn_privacy" class="menu-item active" onclick="change_section('privacy')">隱私政策</a></li>
          <li><a href="#service" id="btn_service" class="menu-item" onclick="change_section('service')">服務條款</a></li>
          <li><a href="#payment" id="btn_payment" class="menu-item" onclick="change_section('payment')">付款方式</a></li>
          <li><a href="#question" id="btn_question" class="menu-item" onclick="change_section('question')">常見問題</a></li>
          <li><a href="#refund" id="btn_refund" class="menu-item" onclick="change_section('refund')">退款規定</a></li>
          <li><a href="#relisten" id="btn_relisten" class="menu-item" onclick="change_section('relisten')">補課/重聽規定</a></li>
          <li><a href="#teacher" id="btn_teacher" class="menu-item" onclick="change_section('teacher')">講師條款</a></li>
        </ul>
      </div>

      <section id="content_privacy" class="body col-xs-9">
        <h3 class="center">隱私政策</h3>
        <p>
          歡迎您光臨「大俠學習」（以下簡稱本網站），為了讓您能夠安心的使用本網站的各項服務與資訊，特此向您說明本網站的隱私權保護政策，以保障您的權益。<br />
          <br />
          生效日期：2018年7月27日<br />
          <br />
          當您使用我們的服務以及您與該數據相關的選擇時，本頁面會告知您有關個人數據的收集，使用和披露的政策。
          我們使用您的數據來提供和改進服務。使用本服務即表示您同意按照本政策收集和使用信息。除非本隱私政策另有規定，否則本隱私政策中使用的術語與我們的條款和條件具有相同的含義。
          請您詳閱下列內容：
        </p>

        <h4>一、信息收集和使用</h4>
        <p class="indent-20">
          我們將為各種目的收集您幾種不同類型的信息，以便為您提供並且改進我們的服務。
        </p>

        <p class="indent-30">
          <h5>收集的數據類型</h5>
          <p class="indent-20">
            <ul style="list-style-type: decimal;" class="indent-40">
              <li>個人資料</li>
              在使用我們的服務時，我們可能會要求您向我們提供可用於聯繫或可識別您的部分個人身份信息（“個人數據”）。個人身份信息可能包括但不限於：
              <ul style="list-style-type: disc;" class="indent-60">
                <li>電子郵件地址</li>
                <li>名字和姓氏以及出生日期等</li>
                <li>電話號碼</li>
                <li>金融帳本</li>
                <li>居住城市、地址、郵政編碼</li>
                <li>Cookie和使用數據</li>
              </ul>
              <li>使用數據</li>
              我們還可能收集有關如何訪問和使用服務的信息（“使用數據”）。此使用數據可能包括您的個人電腦的Internet協議地址（例如IP地址），瀏覽器類型，瀏覽器版本，您訪問我們服務的頁面，您訪問的時間和日期，在這些頁面上花費的時間，使用的設備標識符以及其他診斷數據。
              <li>追蹤和Cookie數據</li>
              我們使用cookie和類似的追蹤技術來追蹤我們服務上的活動並保留某些信息。
              Cookie是包含少量數據的文件，其中可能包含匿名唯一標識符。Cookie會從網站發送到您的瀏覽器並存儲在您的設備上。以及使用追蹤技術來追蹤信標，標籤和腳本，用於收集和追蹤信息以及改進與分析我們的服務。
              您可以指示您的瀏覽器拒絕所有cookie或指示何時發送cookie。但是，如果您不接受cookie，您可能無法使用我們服務的某些部分。
              <br />
              我們使用的Cookie示例：
              <ul style="list-style-type: disc;" class="indent-60">
                <li>Session Cookies。我們使用Session Cookies來運營我們的服務。</li>
                <li>Security Cookies。出於安全考慮，我們使用Security Cookies。</li>
              </ul>
            </ul>
          </p>

          <h5>使用數據</h5>
          <p class="indent-20">
            https://www.ds-vep.com/將收集的數據用於各種目的：
            <ul style="list-style-type: disc;" class="indent-40">
              <li>提供與維護服務</li>
              <li>通知您有關我們服務的更動</li>
              <li>允許您在選擇時參與我們服務的互動功能</li>
              <li>為客戶提供關懷和支持</li>
              <li>提供分析或有價值的信息，以便我們改進服務</li>
              <li>監控服務的使用情況</li>
              <li>檢測，預防和解決技術問題</li>
            </ul>
          </p>

          <h5>數據傳輸</h5>
          <p class="indent-20">
            <p>您的信息（包括個人數據）可能會被轉移到您所在州，省，國家或其他政府管轄範圍之外的個人電腦上，並且這些個人電腦的數據保護法可能與您所在司法轄區的數據保護法不同。
            <p>如果您位於台灣以外並選擇向我們提供信息，請注意我們將數據（包括個人數據）傳輸到台灣並在那裡處理。
            <p>您同意本隱私政策，然後您提交此類信息即表示您同意該轉讓。
            <p>https://www.ds-vep.com/將採取合理必要的所有步驟，以確保您的數據得到安全並且一致的處理。
            <p>https://www.ds-vep.com/將採取合理必要的所有步驟，以確保您的數據得到安全和一致的處理。除非有適當的控制措施，本隱私政策不會向組織或國家/地區傳輸您的個人數據，包括您的數據安全性和其他個人信息。
          </p>
        </p>

        <h4>二、披露數據</h4>

        <h5>法律要求</h5>
        <p class="indent-20">
          https://www.ds-vep.com/會真誠地相信此類行為是必要的：
          <ul style="list-style-type: disc;" class="indent-40">
            <li>履行法律義務</li>
            <li>保護和捍衛 https://www.ds-vep.com/ 的權利或財產</li>
            <li>防止或調查與服務相關的可能的不當行為</li>
            <li>保護服務端或公眾用戶的人身安全</li>
            <li>防止法律責任</li>
          </ul>
        </p>

        <h5>數據安全</h5>
        <p class="indent-20">
          數據的安全性對我們很重要，但請記住，沒有通過網路傳輸的方法或電子存儲方法是100％安全的。雖然我們努力使用商業上可接受的方式來保護您的個人數據，但我們無法保證其絕對的安全性。
        </p>

        <h5>服務供應商</h5>
        <p class="indent-20">
          我們可能僱用第三方公司和個人來促進我們的平台服務（“服務提供商”），代表我們提供服務，執行與平台相關的服務或協助我們分析我們的平台使用方式。<br />
          這些第三方只能透過代替我們執行這些任務時才能訪問您的個人數據，並且有義務不將其用於任何其他目的。
        </p>

        <h5>鏈接到其他網站</h5>
        <p class="indent-20">
          我們的服務可能包含指向非我們運營的其他網站的鏈接。如果您點擊第三方鏈接，您將被引導至該第三方的網站。我們強烈建議您查看您訪問的每個站點的隱私政策。
        </p>

        <h5>本隱私政策的變更</h5>
        <p class="indent-20">
          我們可能會不時更新我們的隱私政策。我們將通過在此頁面上發布新的隱私政策來通知您任何更改。<br>
          建議您定期查看本隱私政策以了解任何變更。本隱私政策的更改在此頁面上發佈時生效。
        </p>
      </section>

      <section id="content_service" class="body col-xs-9">
        <h3 class="center">服務條款</h3>

        <h4>一、認知與接受條款</h4>
        <p class="indent-20">
          <ul style="list-style-type: decimal;" class="indent-40">
            <li>
              大俠數位媒體股份有限公司(以下簡稱「大俠數位媒體」)係依據本服務條款提供大俠數位媒體（https://www.ds-vep.com）服務 (以下簡稱「本服務」)。當會員完成本服務之會員註冊手續、或開始使用本服務時，即表示已閱讀、瞭解並同意接受本服務條款之所有內容，並完全接受本服務現有與未來衍生的服務項目及內容。本服務公司有權於任何時間修改或變更本服務條款之內容，修改後的服務條款內容將公佈網站上，本服務將不會個別通知會員，建議會員隨時注意該等修改或變更。會員於任何修改或變更後繼續使用本服務時，視為會員已閱讀、瞭解並同意接受該等修改或變更。若不同意上述的服務條款修訂或更新方式，或不接受本服務條款的其他任一約定，會員應立即停止使用本服務。
            </li>
            <li>
              若會員為未滿二十歲之未成年人，應於會員的家長（或監護人）閱讀、瞭解並同意本約定書之所有內容及其後修改變更後，方得註冊為會員、使用或繼續使用本服務。當會員使用或繼續使用本服務時，即推定會員的家長（或監護人）已閱讀、瞭解並同意接受本約定書之所有內容及其後修改變更。
            </li>
            <li>
              會員及本服務雙方同意使用本服務之所有內容包括意思表示等，以電子文件作為表示方式。
            </li>
            <li>
              為了確保會員之個人資料、隱私及消費者權益之保護，於交易過程中將使用會員之個人資料，謹依個人資料保護法第8條規定告知以下事項：
              <ul style="list-style-type: disc;" class="indent-40">
                <li>
                  蒐集之目的：
                  蒐集之目的在於進行行銷業務、消費者、客戶管理與服務、網路購物及其他電子商務服務及與調查、統計與研究分析(法定特定目的項目編號為Ｏ四Ｏ、Ｏ九Ｏ、一四八、一五七)。本服務將藉由加入會員之過程或進行交易之過程來蒐集個人資料。
                  蒐集之個人資料類別，本服務於網站內蒐集的個人資料包括：
                  <ul style="list-style-type: upper-roman;" class="indent-60">
                    <li>電子郵件地址</li>
                    <li>名字和姓氏以及出生日期等</li>
                    <li>電話號碼</li>
                    <li>居住城市、地址、郵政編碼</li>
                    <li>Cookie和使用數據</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </p>

        <h4>二、會員的註冊義務</h4>
        <p class="indent-20">
          為了能使用本服務，會員同意以下事項：
          <ul style="list-style-type: decimal;" class="indent-40">
            <li>依本服務註冊表之提示提供會員本人正確、最新的資料，且不得以第三人之名義註冊為會員。每位會員僅能註冊登錄一個帳號，不可重覆註冊登錄。</li>
            <li>即時維持並更新會員個人資料，確保其正確性，以獲取最佳之服務。</li>
            <li>若會員提供任何錯誤或不實的資料、或未按指示提供資料、或欠缺必要之資料、或有重覆註冊帳號等情事時，本服務有權不經事先通知，逕行暫停或終止會員的帳號，並拒絕會員使用本服務之全部或一部。</li>
          </ul>
        </p>

        <h4>三、本服務隱私權政策</h4>
        <p class="indent-20">
          關於會員的註冊以及其他特定資料依本服務「<a href="https://www.ds-vep.com/contact/terms" target="_blank">隱私權政策</a>」受到保護與規範。
        </p>

        <h4>四、會員帳號、密碼及安全</h4>
        <p class="indent-20">
          <ul style="list-style-type: decimal;" class="indent-40">
            <li>
              完成本服務的登記程序之後，會員將取得一個特定之密碼及會員帳號，維持密碼及帳號之機密安全，是會員的責任。任何依照規定方法輸入會員帳號及密碼與登入資料一致時，無論是否由本人親自輸入，均將推定為會員本人所使用，利用該密碼及帳號所進行的一切行動，會員本人應負完全責任。
            </li>
            <li>
              <ul style="list-style-type: disc;" class="indent-60">
                <li>會員的密碼或帳號遭到盜用或有其他任何安全問題發生時，會員將立即通知本服務。</li>
                <li>每次連線完畢，均結束會員的帳號使用。</li>
                <li>會員的帳號、密碼及會員權益均僅供會員個人使用及享有，不得轉借、轉讓他人或與他人合用。</li>
                <li>帳號及密碼遭盜用、不當使用或其他本服務無法辯識是否為本人親自使用之情況時，對此所致之損害，除證明係因可歸責於本服務之事由所致，本服務將不負任何責任。</li>
                <li>會員的密碼或帳號遭到盜用或有其他任何安全問題發生時，會員將立即通知本服務本服務若知悉會員之帳號密碼確係遭他人冒用時，將立即暫停該帳號之使用(含該帳號所生交易之處理)。</li>
              </ul>
            </li>
          </ul>
        </p>

        <h4>五、兒童及青少年之保護</h4>
        <p class="indent-20">
          為確保兒童及青少年使用網路的安全，並避免隱私權受到侵犯，家長（或監護人）應盡到下列義務： 未滿十二歲之兒童使用本服務時時，應全程在旁陪伴，十二歲以上未滿十八歲之青少年使用本服務前亦應斟酌是否給予同意。
        </p>

        <h4>六、使用者的守法義務及承諾</h4>
        <p class="indent-20">
          會員承諾絕不為任何非法目的或以任何非法方式使用本服務，並承諾遵守中華民國相關法規及一切使用網際網路之國際慣例。會員若係中華民國以外之使用者，並同意遵守所屬國家或地域之法令。會員同意並保證不得利用本服務從事侵害他人權益或違法之行為，包括但不限於：
          <ul style="list-style-type: decimal;" class="indent-40">
            <li>公布或傳送任何誹謗、侮辱、具威脅性、攻擊性、不雅、猥褻、不實、違反公共秩序或善良風俗或其他不法之文字、圖片或任何形式的檔案。</li>
            <li>侵害或毀損本服務或他人名譽、隱私權、營業秘密、商標權、著作權、專利權、其他智慧財產權及其他權利。</li>
            <li>違反依法律或契約所應負之保密義務。</li>
            <li>冒用他人名義使用本服務。</li>
            <li>傳輸或散佈電腦病毒。</li>
            <li>從事未經本服務事前授權的商業行為。</li>
            <li>刊載、傳輸、發送垃圾郵件、連鎖信、違法或未經本服務許可之多層次傳銷訊息及廣告等；或儲存任何侵害他人智慧財產權或違反法令之資料。</li>
            <li>對本服務其他用戶或第三人產生困擾、不悅或違反一般網路禮節致生反感之行為。</li>
            <li>其他不符本服務所提供的使用目的之行為或本服務有正當理由認為不適當之行為。</li>
          </ul>
        </p>

        <h4>七、服務內容之變更與電子報及EDM發送</h4>
        <p class="indent-20">
          <ul style="list-style-type: decimal;" class="indent-40">
            <li>會員同意本服務所提供本服務之範圍，本服務均得視業務需要及實際情形，增減、變更或終止相關服務的項目或內容，且無需個別通知會員。</li>
            <li>會員同意本服務得依實際執行情形，增加、修改或終止相關活動，並選擇最適方式告知會員。</li>
            <li>會員同意本服務得不定期發送電子報或商品訊息(EDM)至會員所登錄的電子信箱帳號。當會員收到訊息後表示拒絕接受行銷時，本服務將停止繼續發送行銷訊息。</li>
          </ul>
        </p>

        <h4>八、服務之停止、中斷</h4>
        <p class="indent-20">
          本服務將依一般合理之技術及方式，維持系統及服務之正常運作。但於以下各項情況時，本服務有權可以停止、中斷提供本服務：
          <ul style="list-style-type: decimal;" class="indent-40">
            <li>本服務網站電子通信設備進行必要之保養及施工時。</li>
            <li>發生突發性之電子通信設備故障時。</li>
            <li>本服務網站申請之電子通信服務被停止，無法提供服務時。</li>
            <li>由於天災等不可抗力之因素或其他不可歸責於本服務致使本服務網站無法提供服務時。</li>
          </ul>
        </p>

        <h4>九、交易行為</h4>
        <p class="indent-20">
          <ul style="list-style-type: decimal;" class="indent-40">
            <li>會員使用本服務進行交易時，應依據本服務所提供之確認商品數量及價格機制進行。</li>
            <li>會員同意使用本服務訂購產品時，於本服務通知確認交易成立前，本服務仍保有不接受訂單或之權利。會員向本服務發出訂購通知後，系統將自動發出接受通知，但此通知並非訂單確認通知，關於交易成立與否本服務將另行告知。若因訂單內容之標的商品或服務，其交易條件(包括但不限於規格、內容說明、圖片、)有誤時，本服務仍得於下單後二工作日內拒絕該筆訂單。</li>
            <li>
              會員若於使用本服務訂購產品後倘任意、取消訂單、或有任何本服務認為不適當而造成本服務作業上之困擾或損害之行為，本服務將可視情況採取拒絕交易、暫停透過金流平台的付款方式，或永久取消會員資格辦理。若會員訂購之產品若包含但不限於以下情形：
              <ul style="list-style-type: disc;" class="indent-60">
                <li>取消開課</li>
                <li>課程因故延期，因商品交易特性之故，導致課程無法順利開放或成立時，本服務將以最適方式(以電子郵件為主，再輔以電話、郵遞或傳真等)告知。</li>
              </ul>
            </li>
            <li>會員使用本服務進行交易時，得依照消費者保護法之規定行使權利。因會員之交易行為而對本服務條款產生疑義時，應為有利於消費者之解釋。</li>
          </ul>
        </p>

        <h4>十、責任之限制與排除</h4>
        <p class="indent-20">
          <ul style="list-style-type: decimal;" class="indent-40">
            <li>本服務所提供之各項功能，均依該功能當時之現況提供使用，本服務對於其效能、速度、完整性、可靠性、安全性、正確性等，皆不負擔任何明示或默示之擔保責任。</li>
            <li>本服務並不保證本服務之網頁、伺服器、網域等所傳送的電子郵件或其內容不會含有電腦病毒等有害物；亦不保證郵件、檔案或資料之傳輸儲存均正確無誤不會斷線和出錯等，因各該郵件、檔案或資料傳送或儲存失敗、遺失或錯誤等所致之損害，本服務不負賠償責任。</li>
          </ul>
        </p>

        <h4>十一、智慧財產權的保護</h4>
        <p class="indent-20">
          <ul style="list-style-type: decimal;" class="indent-40">
            <li>本服務所使用之軟體或程式、網站上所有內容，包括但不限於著作、圖片、檔案、資訊、資料、網站架構、網站畫面的安排、網頁設計，均由本服務或其他權利人依法擁有其智慧財產權，包括但不限於商標權、專利權、著作權、營業秘密與專有技術等。任何人不得逕自使用、修改、重製、公開播送、改作、散布、發行、公開發表、進行還原工程、解編或反向組譯。若會員欲引用或轉載前述軟體、程式或網站內容，必須依法取得本服務或其他權利人的事前書面同意。尊重智慧財產權是會員應盡的義務，如有違反，會員應對本服務負損害賠償責任（包括但不限於訴訟費用及律師費用等）。</li>
            <li>在尊重他人智慧財產權之原則下，會員同意在使用本服務之服務時，不作侵害他人智慧財產權之行為。</li>
            <li>若會員有涉及侵權之情事，本服務可暫停全部或部份之服務，或逕自以取消會員帳號之方式處理。</li>
            <li>
              若有發現智慧財產權遭侵害之情事，請將所遭侵權之情形及聯絡方式，並附具真實陳述及擁有合法智慧財產權之聲明，以下列方式聯絡本服務： 以電子郵件(E-mail)寄送至：eason.yea@gmail.com<br />
            </li>
          </ul>
        </p>

        <h4>十二、會員對本服務之授權</h4>
        <p class="indent-20">
          對於會員上載、傳送、輸入或提供之資料，會員同意本服務網站得於合理之範圍內蒐集、處理、保存、傳遞及使用該等資料，以提供使用者其他資訊或服務、或作成會員統計資料、或進行關於網路行為之調查或研究，或為任何之合法使用。 若會員無合法權利得授權他人使用、修改、重製、公開播送、改作、散布、發行、公開發表某資料，並將前述權利轉授權第三人，請勿擅自將該資料上載、傳送、輸入或提供至本服務。任何資料一經會員上載、傳送、輸入或提供至本服務時，視為會員已允許本服務無條件使用、修改、重製、公開播送、改作、散布、發行、公開發表該等資料，並得將前述權利轉授權他人，會員對此絕無異議。會員並應保證本服務使用、修改、重製、公開播送、改作、散布、發行、公開發表、轉授權該等資料，不致侵害任何第三人之智慧財產權，否則應對本服務負損害賠償責任（包括但不限於訴訟費用及律師費用等）。
        </p>

        <h4>十三、特別授權事項</h4>
        <p class="indent-20">
          因使用本服務所提供之網路交易或活動，可能須透過金流服務平台始能完成訂單交易，因此，您同意並授權本公司得視該次網路交易或活動之需求及目的，將由您所提供且為付款所必要之個人資料(如付款人姓名、信用卡資料、連絡電話、電子信箱等)，提供予金流服務平台，以利完成或取消該次訂單。其餘有關您個人資料使用或處理之規定，煩請參閱「隱私權政策」。
        </p>

        <h4>十四、拒絕或終止會員的使用</h4>
        <p class="indent-20">
          會員同意本服務得基於維護交易安全之考量，因任何理由，包含但不限於缺乏使用，或違反本服務條款的明文規定及精神，終止會員的密碼、帳號（或其任何部分）或本服務（或其任何部分）之使用，或將本服務內任何「會員內容」加以移除並刪除。此外，會員同意若本服務（或其任何部分）之使用被終止，本服務對會員或任何第三人均不承擔責任。
        </p>

        <h4>十五、準據法與管轄法院</h4>
        <p class="indent-20">
          本服務條款之解釋與適用，以及與本服務條款有關或會員與本服務間因交易行為而產生之爭議或糾紛，應依照中華民國法律予以處理，並以台灣台北地方法院為第一審管轄法院，但若法律對於管轄法院另有強制規定者，仍應依其規定。
        </p>
      </section>

      <section id="content_payment" class="body col-xs-9">
        <h3 class="center">付款方式</h3>
        <h4>信用卡支付</h4>
        <div class="indent-20">
          <p>完整支援VISA/MasterCard/JCB/銀聯卡。</p>
          <p>
            選擇信用卡支付，填入「信用卡卡號」、「卡片有效月年」、「卡片背面末三碼」、「付款通知信箱」確認交易明細後進行付款，系統將送出至銀行進行授權。
          </p>
        </div>

        <h4>ATM轉帳</h4>
        <div class="indent-20">
          <h6>ATM</h6>
          <ul>
            <li><i class="fa fa-caret-right blank-right" aria-hidden="true"></i>玉山銀行</li>
            <li><i class="fa fa-caret-right blank-right" aria-hidden="true"></i>台灣銀行</li>
            <li><i class="fa fa-caret-right blank-right" aria-hidden="true"></i>台新銀行</li>
            <li><i class="fa fa-caret-right blank-right" aria-hidden="true"></i>華南銀行</li>
            <li><i class="fa fa-caret-right blank-right" aria-hidden="true"></i>兆豐銀行</li>
          </ul>

          <h6>WebATM</h6>
          <p>請先準備晶片金融卡+晶片讀卡機，藍新金流將引導您至指定金融機構之網路ATM進行轉帳。</p>
        </div>

        <h4>超商付款</h4>
        <div class="indent-20">
          <h6>代碼繳費</h6>
          <p>
            結帳時將會收到一組超商代碼，前往超商多媒體機台 (如: 7-ELEVEN門市ibon) 至代碼繳費功能輸入代碼，即可印出繳費單。
            <a href="https://www.spgateway.com/website/Page/content/cvs_intro" target="_blank">超商代碼繳費步驟</a>
          </p>

          <h6>條碼繳費</h6>
          <p>顧客以雷射印表機印出藍新金流所產出的條碼，前往超商櫃台即可完成繳費。</p>

          <ul>
            <li>四大超商全部通行</li>
            <li><i class="fa fa-caret-right blank-right" aria-hidden="true"></i>7-11</li>
            <li><i class="fa fa-caret-right blank-right" aria-hidden="true"></i>全家</li>
            <li><i class="fa fa-caret-right blank-right" aria-hidden="true"></i>萊爾富</li>
            <li><i class="fa fa-caret-right blank-right" aria-hidden="true"></i>OK</li>
          </ul>
        </div>
      </section>

      <section id="content_question" class="body col-xs-9">
        <h3 class="center">常見問題</h3>
        <h4>精選問題</h4>
        <ul style="list-style-type: decimal;" class="indent-20">
          <li>
            第一次使用大俠學習平台，該如何註冊？<br />
            A：可以點擊右上角的登入然後選擇使用平台註冊或GOOGLE註冊。
          </li>
          <li>
            如何修改個人資料及密碼？<br />
            A：可以從左邊選單的個人檔案去做更改哦！
          </li>
          <li>
            忘記密碼怎麼辦？
            A：請點擊登入按鈕後，使用找回密碼的功能並填寫好註冊的帳號及信箱，稍後新密碼會將送至您的個人信箱。收到密碼後記得到個人檔案將密碼修改回來。
          </li>
        </ul>

        <h4>學員相關問題</h4>
        <ul style="list-style-type: decimal;" class="indent-20">
          <li>
            如何與大俠學習聯繫？<br />
            A：可以點擊網頁下方的聯絡客服寄信通知我們！
          </li>
          <li>
            如何修改個人資料及密碼？<br />
            A：可以從左邊選單的個人檔案去做更改哦！
          </li>
          <li>
            購買線上課程後，有觀看次數或上課期限的限制嗎？<br />
            A：每堂課程的觀看期限可能會不一樣，購課的時候注意商店右方標籤即可，講師也同時保有修改觀看時間的權力哦！
          </li>
          <li>
            請問可以在手機或平板上觀看課程嗎？<br />
            A：可以哦！只要使用瀏覽器登入即可！
          </li>
          <li>
            課程內容是否可以下載、或是離線觀看？<br />
            A：大俠學習的所有課程皆無提共下載功能，且必須在有網路連線的環境下，登入大俠學習才能觀看課程內容。
          </li>
        </ul>

        <h4>購買課程相關問題</h4>
        <ul style="list-style-type: decimal;" class="indent-20">
          <li>
            購買課程該如何付款？<br />
            A：大俠學習目前提共信用卡、超商、ATM轉帳三種付款方式！
          </li>
          <li>
            我不在台灣，購課該如何付款？<br />
            A：你可選擇「信用卡」付款方式，依照各家發卡銀行不同，銀行將另外收取國外交易手續費 (可使用 Visa / Master / JCB / 銀聯卡)。也可選擇「ATM」付款方式，並使用「網路銀行國際匯款」方式，跨國匯款會有入帳的時間差。或者如有親友在台灣，也可以將「ATM繳費帳號」提供給家人或好友，請他們協助繳費
          </li>
          <li>
            購課時信箱是必填的嗎？<br />
            A：是的，為了維護您的權利，我們會將訂單付款的明細記到您的信箱裡，請妥善保管。
          </li>
          <li>
            選擇ATM付款需要手續費嗎？<br />
            A：如果使用與平台合作之相同銀行將不用收取任何手續費，其他銀行手續費將為15元。
          </li>
          <li>
            選擇超商付款需要手續費嗎？<br />
            A：不用哦！
          </li>
          <li>
            選擇超商QRcode付款，前往便利商店該如何列印繳費單？<br />
            A：只需要將QRcode圖檔存在手機裡面就可以使用手機裡的QRcode圖片繳款！
          </li>
          <li>
            退費有甚麼限制或規定嗎？<br />
            A：詳細規則請參閱我們的「退款規定」。
          </li>
          <li>
            如何申請退費？<br />
            A：請至「退費規定 -> 退費規定」裡填寫表單並送出。
          </li>
          <li>
            退費流程是甚麼？<br />
            A：在申請退費之前，請先至個人資料填妥個人帳戶資訊，並在申請退費之後等待通知，將會有專人為您服務。
          </li>
          <li>
            我的發票可以開立統編嗎？<br />
            A：可以哦！請在購物車下方選擇發票開立方式，並在下面購買人資料將資訊填妥。
          </li>
        </ul>
      </section>

      <section id="content_refund" class="body col-xs-9">
        <h3 class="center">退款規定</h3>
        <p class="indent-20">學生註冊繳費後離班者，應依下列規定退費：</p>
        <h4>帶狀課程退費規定</h4>
        <ul class="indent-20">
          <li>一、實際開課日前三十日（含）以前申請退費者，應全額退還已繳費用。</li>
          <li>二、實際開課日前二十九日內申請退費者，應退還已繳費用之百分之九十。</li>
          <li>三、實際開課日後五日內申請退費者，應退還已繳費用之百分之七十。</li>
          <li>四、實際開課日後第六日起，但未逾三分之一，申請退費者，應退還已繳費用之百分之五十。</li>
          <li>五、在班期間已逾三分之一者，得不予退費。</li>
        </ul>

        <h4>講座/一日班  退費規定</h4>
        <ul class="indent-20">
          <li>一、因只有單堂短期課程，若報名講座不克參加請提前告知。</li>
          <li>二、活動前一至三天(不包含活動當天)告知，可選擇退費七成。</li>
          <li>三、開課當天告知無法出席，恕無法退費，但可找人替補名額，敬請見諒！</li>
        </ul>

        <h4>線上課程 退費規定</h4>
        <ul class="indent-20">
          <li>一、如欲申請退費，請於購買後<span style="color: red;">七天內</span>申請，逾期則不接受退款。</li>
          <li>二、如在線上課程開課後點入課程教室頁面即<span style="color: red;">視同觀看</span>，恕不退款。</li>
        </ul>

        <h4>退費申請流程</h4>
        <ul class="indent-20">
          <li>一、請填寫<a class="refund__link" href="https://goo.gl/J5mFc5">退費申請表</a>。</li>
          <li>二、確實填寫申請表格內容。</li>
          <li>三、填寫完後送出，本網站進行您的退費審核。</li>
          <li>四、平台將於申請時間後工作天7-14天匯入帳戶。</li>
        </ul>

        <h4>退費注意事項</h4>
        <ul class="indent-20">
          <li>*如因人數不足取消課程則全額進行退費</li>
          <li>*如因個人因素取消課程需要退費，除按退費規定外將會再另扣除<b>行政處理費100元</b></li>
        </ul>
      </section>

      <section id="content_relisten" class="body col-xs-9">
        <h3 class="center">補課/重聽規定</h3>
        <ul class="indent-20">
          <li>一、登記重聽/補課，但未出席者，將取消該生免費補課/重聽資格，請同學們注意。</li>
          <li>二、補課重聽不須額外支付費用，僅接受同一課程內容補課/重聽，課程名稱相同但內容不同恕無法補課/重聽。例:單眼基礎班程內容相同，可接受不同地區、不同時段、不同講師補課/重聽。</li>
          <li style="color:red; font-weight:bold;">三、確定開班後才能開放補課/重聽申請，開班狀況請注意平台公告。</li>
          <li>四、為避免資源浪費，如報名整期重聽者，室內課出席率未達七成，將會取消補課/重聽資格，把資源留給真正想學習的朋友。</li>
          <li>五、每期保留2~5個補課/重聽補課名額(按課程規定人數不同)</li>
          <li>六、補課/重聽不包含外拍活動，講師會依當期學員參加情形，邀約重聽學員參加。</li>
          <li>七、不額外提供補課/重聽者講義，請自備筆記。</li>
          <li>八、部份主題課程無法免費重聽，會於網頁上註明。如有不清楚之細節歡迎來電或來信詢問。</li>
        </ul>

        <h4>補課/重聽申請流程</h4>
        <ul class="indent-20">
          <li>一、請填寫<a href="https://goo.gl/CnQwsa">補課/重聽申請表。</a></li>
          <li>二、確實填寫申請表格內容</li>
          <li>三、填寫完後送出，本網站將進行您的補課/重聽審核。</li>
        </ul>
      </section>

      <section id="content_teacher" class="body col-xs-9">
        <h3 class="center">講師條款</h3>
        <div class="policy-container">
          <h4>
              一、 講師認知與管理
          </h4>
          <ul class="indent-20">
              <li>
                  大俠職能教育平台(以下稱「本平台」)係由大俠數位媒體股份有限公司(以下稱「本公司」)所設置並提供服務，當講師完成本平台之註冊手續或開始使用本平台服務時，即表示已閱讀並同意接受本平台服務條款之所有內容。
              </li>
              <li>
                  本公司有權於任何時間修改或變更本服務條款內容，並於修改後公佈，不再個別通知講師，建議講師隨時注意本服務條款之修改或變更。
              </li>
              <li>
                  若講師提供任何錯誤或不實的資料、或未按指示提供資料、或欠缺必要之資料、或有重覆註冊教學帳號等，本公司有權不經事先通知，逕行暫停或終止講師之教學帳號，並拒絕講師使用本平台任何服務。講師於註冊教學帳號完成後，如有違反本服務條款或發生有損本公司或本平台名譽之情事，本公司得停止講師之帳號使用，如有造成本公司或本平台之損害，講師應賠償之。 
              </li>
              <li>
                  講師於本平台註冊教學帳號時，應維持帳號與密碼之安全為責任。利用該帳號及密碼所進行的一切行為，不論是否為本人使用，講師本人應負完全之責任。
              </li>
          </ul>
          <h4>
              二、 個人資料保護與保密義務
          </h4>
          <ul class="indent-20">
              <li>
                  本公司會保護講師之個人資料，除因講師可能涉及違法、侵權、違反本服務條款、或經講師本人同意之情形外，本公司不會將講師個人資料提供予上述合作夥伴以外之第三人。
              </li>
              <li>
                  講師於註冊教學帳號完成時起至終止該帳號使用期間，雙方均應善盡保密之責任，以維護雙方之商業秘密，包括往來文件、表單格式、交易紀錄等，非經對方事前書面同意，不得洩漏予其他第三人。一方違反本協議，造成對方受有損害時，應負全部賠償。
              </li>
          </ul>
          <h4>
              三、 課程審核
          </h4>
          <ul class="indent-20">
              <li>
                  講師應將欲上架之課程及訂價交由本公司審核，經本公司審核許可後始得上架。講師若同時間於其他平台開設課程名稱相同或近似之課程，該課程於本平台之訂價不得高於該課程於其他平台之訂價。
              </li>
              <li>
                  於課程已上架後，若發現課程內容有所不宜或有侵害他人權利時，本公司有即刻將該課程下架之權利。
              </li>
          </ul>
          <h4>
              四、 著作權歸屬
          </h4>
          <ul class="indent-20">
              <li>
                  講師就職務上所為之著作（包含文字、圖片、影像、聲音），或透過平台所提供資源而產生之著作（包含文字、圖片、影像、聲音）同意平台有權使用於教學及任何推廣活動。
              </li>
          </ul>
          <h4>
              五、侵害禁止
          </h4>
          1.講師之一切創作內容以不侵害他人之智慧財產權，並同意尊重他人之智慧財產權，在職務上所使用之電腦軟體均應係合法版本，如有違反應自行負擔一切法律責任。
          <h4>
              六、 雙方義務
          </h4>
          <h5>
              (一) 本公司應提供之服務項目如下：
          </h5>
          <ul class="indent-20">
              <li>
                  平台之建置與維護；
              </li>
              <li>
                  廣告文宣製作與發送；
              </li>
              <li>
                  招生宣傳活動之策辦；
              </li>
              <li>
                  提供課程管理、教師管理、學員管理及金流等系統；
              </li>
              <li>
                  學員之答詢、報名、收費、帳務處理作業；
              </li>
              <li>
                  上課空間
              </li>
          </ul>
          <h5>
              (二) 講師之義務如下：
          </h5>
          <ul class="indent-20">
              <li>
                  提供課程大綱、課程師資及授課內容；
              </li>
              <li>
                  提供符合教學內容標準之上課教材；
              </li>
              <li>
                  負責課程頁面內容編輯；
              </li>
              <li>
                  使用本平台提供之系統，進行線上教學活動與社群經營，包括學員互動、教學內容問題解析等；
              </li>
              <li>
                  提供廣告文宣資料，共同參與廣告文案審閱；
              </li>
              <li>
                  協助本公司辦理招生活動宣傳。
              </li>
              <li>
                  不得於課堂上向學員推銷、銷售任何未經雙方同意之其他產品或服務
              </li>
          </ul>
          <h4>
              七、準據法與管轄法院
          </h4>
          本服務條款之解釋與適用，以及與本服務條款有關之爭議，均以中華民國法律為準據法，除法律另有規定者外，雙方並約定以臺灣臺北地方法院為第一審管轄法院。
        </div>
      </section>
    </div>
  </div>
  {{ Html::script('js/page_js/site/contcat/terms.js') }}
@stop
