<div id="summary" class="active">
    @if( isset($teacher_data['auth_situation']) )
        @if($teacher_data['auth_situation'] == 'fail' ||  'refuel')
        <section class="header-pic header-pic-fail">
            <div class="animatedParent">
                <div class="header-content text-center">
                    <h2 class="page-title">審核結果 - 未通過</h2>
                    <article class="article-fail-reason">
                        <p>
                            未通過原因：<br>
                            {{ $teacher_data['audit_reason'] }}
                        </p>
                        <p>如需了解更多，請撥打<span class="color-emphasized2">(02)2955-4564</span>或寄信至<span class="color-emphasized2">eason.yea@gmail.com</span></p>
                    </article>
                    <p class="p-over-bgim">修正您的資料，加入我們成為講師吧</p>
                    <button id="{{ $teacher_data['auth_situation'] == 'fail'? 'btn_here_refuel' : 'btn_become_teacher_refuel' }}" class="{{ $teacher_data['auth_situation'] == 'refuel'? 'btn-become-teacher-introduce ' : '' }}btn-create btn-scroll">填寫資料</button>
                </div>
            </div>
        </section>
        @endif
    @endif
</div>
<div id="fill_page" class="container">
    <div class="row">
        <div id="become_teacher_menu" class="become-teacher-menu navbar-default"  role="navigation">
            <ul class="nav navbar-nav">
                <li class="become-teacher-menu-item active" onclick="_menu_scroll_to('education')">
                    <a href="#education">
                        <span>學歷</span>
                    </a>
                </li>
                <li class="become-teacher-menu-item" onclick="_menu_scroll_to('introduce')">
                    <a href="#introduce">
                        <span>自我介紹</span>
                    </a>
                </li>
                <li class="become-teacher-menu-item" onclick="_menu_scroll_to('works')">
                    <a href="#works">
                        <span>作品</span>
                    </a>
                </li>
                <li class="become-teacher-menu-item" onclick="_menu_scroll_to('book')">
                    <a href="#book">
                        <span>著作</span>
                    </a>
                </li>
                <li class="become-teacher-menu-item" onclick="_menu_scroll_to('certificate')">
                    <a href="#certificate">
                        <span>證書</span>
                    </a>
                </li>
                <li class="become-teacher-menu-item" onclick="_menu_scroll_to('awards')">
                    <a href="#awards">
                        <span>獎項</span>
                    </a>
                </li>
                <li class="become-teacher-menu-item" onclick="_menu_scroll_to('report')">
                    <a href="#report">
                        <span>報導</span>
                    </a>
                </li>
                <li class="become-teacher-menu-item" onclick="_menu_scroll_to('published')">
                    <a href="#published">
                        <span>公開發表</span>
                    </a>
                </li>
                <li class="become-teacher-menu-item" onclick="_menu_scroll_to('teaching')">
                    <a href="#teaching">
                        <span>授課類型</span>
                    </a>
                </li>
                <li class="become-teacher-menu-item" onclick="_menu_scroll_to('teaching_experience')">
                    <a href="#teaching_experience">
                        <span>授課經驗</span>
                    </a>
                </li>
            </ul>
        </div>

        <div id="profile" data-spy="scroll" data-target="#become_teacher_menu" data-offset="-10" class="col-md-8 col-md-offset-2 col-lg-offset-2 col-sm-10 col-sm-offset-1">
            <div class="become-teacher-profile-content">
                {!! Form::open(['id' => 'become_teacher_form', 'class' => 'apply-content', 'url' => '/upload/becometeacher']) !!}
                {!! Form::hidden('hidden_become_teacher_field', null, ['id' => 'hidden_become_teacher_field']) !!}

                <div id="education" class="become-teacher-card">
                    <h3>學歷<span class="color-emphasized2">*</span></h3>
                    <div class="form-group row has-feedback" id="form_edu_school">
                        <label class="col-sm-2 col-form-label">學校</label>
                    <div class="col-sm-10">
                        {!! Form::text('edu_school', $teacher_data['edu_school'] ?? null, ['id' => 'edu_school', 'class' => 'form-control', 'require', 'placeholder' => '最高學位的學校，EX:台大', 'maxlength' => '30']) !!}
                        <span class="form-control-feedback fa" id="i_edu_school" aria-hidden="true"></span>
                    </div>
                </div>
                <div class="form-group row has-feedback" id="form_edu_dapartment" class="become-teacher-card">
                    <label class="col-sm-2 col-form-label">科系</label>
                    <div class="col-sm-10">
                        {!! Form::text('edu_dapartment', $teacher_data['edu_dapartment'] ?? null, ['id' => 'edu_dapartment', 'class' => 'form-control', 'require', 'placeholder' => '最高學位的科系，EX:電機工程系', 'maxlength' => '30']) !!}
                        <span class="form-control-feedback fa" id="i_edu_dapartment" aria-hidden="true"></span>
                    </div>
                </div>
                <div class="form-group row has-feedback" id="form_edu_degree" class="become-teacher-card">
                    <label class="col-sm-2 col-form-label">教育程度</label>
                    <div class="col-sm-10">
                        {!! Form::text('edu_degree', $teacher_data['edu_degree'] ?? null, ['id' => 'edu_degree', 'class' => 'form-control', 'require', 'placeholder' => '最高學位，EX:大學', 'maxlength' => '30']) !!}
                        <span class="form-control-feedback fa" id="i_edu_degree" aria-hidden="true"></span>
                    </div>
                </div>
            </div>

            <div id="introduce" class="become-teacher-card">
                <h3>自我介紹<span class="color-emphasized2">*</span></h3>
                <div class="form-group">
                    {!! Form::textarea('intro_exp', $teacher_data['intro_exp'] ?? null, ['id' => 'intro_exp', 'class' => 'form-control', 'require', 'placeholder' => '簡單介紹自己的經歷']) !!}
                </div>
                <div class="form-group row has-feedback" id="form_intro_link">
                    <div class="col-sm-12">
                        {!! Form::text('intro_link', $teacher_data['intro_link'] ?? null, ['id' => 'intro_link', 'class' => 'form-control', 'placeholder' => '提供過去經歷的連結：例如部落格']) !!}
                        <span class="form-control-feedback fa" id="i_intro_link" aria-hidden="true"></span>
                    </div>
                </div>
            </div>

            <div id="works" class="become-teacher-card">
                <h3>作品<span class="color-emphasized2">*</span></h3>
                <div class="form-group">
                    {!! Form::textarea('works_exp', $teacher_data['works_exp'] ?? null, ['id' => 'works_exp', 'class' => 'form-control', 'require', 'placeholder' => '介紹過去到現在所完成的作品']) !!}
                </div>
                <div class="form-group row has-feedback" id="form_works_link">
                    <div class="col-sm-12">
                        {!! Form::text('works_link', $teacher_data['works_link'] ?? null, ['id' => 'works_link', 'class' => 'form-control', 'placeholder' => '提供過去作品的連結：例如部落格、fliker等等']) !!}
                        <span class="form-control-feedback fa" id="i_works_link" aria-hidden="true"></span>
                    </div>
                </div>
            </div>

            <div id="book" class="become-teacher-card">
                <h3>著作</h3>
                <div class="form-group">
                    {!! Form::textarea('book_exp', $teacher_data['book_exp'] ?? null, ['id' => 'book_exp', 'class' => 'form-control', 'placeholder' => '介紹過去曾經出的書']) !!}
                </div>
                <div class="form-group row has-feedback" id="form_book_link">
                    <div class="col-sm-12">
                        {!! Form::text('book_link', $teacher_data['book_link'] ?? null, ['id' => 'book_link', 'class' => 'form-control', 'placeholder' => '提供過去出版書的連結：例如博客來、出版社等']) !!}
                        <span class="form-control-feedback fa" id="i_book_link" aria-hidden="true"></span>
                    </div>
                </div>
            </div>

            <div id="certificate" class="become-teacher-card">
                <h3>證書</h3>
                <div class="form-group">
                    {!! Form::textarea('certificate_exp', $teacher_data['certificate_exp'] ?? null, ['id' => 'certificate_exp', 'class' => 'form-control', 'placeholder' => '介紹過去考到的證書、證照']) !!}
                </div>
                <div class="form-group row has-feedback" id="form_cerificate_link">
                    <div class="col-sm-12">
                        {!! Form::text('cerificate_link', $teacher_data['cerificate_link'] ?? null, ['id' => 'cerificate_link', 'class' => 'form-control', 'placeholder' => '提供證照圖片的連結：例如fliker、imgur等']) !!}
                        <span class="form-control-feedback fa" id="i_cerificate_link" aria-hidden="true"></span>
                    </div>
                </div>
            </div>

            <div id="awards" class="become-teacher-card">
                <h3>獎項</h3>
                <div class="form-group">
                    {!! Form::textarea('awards_exp', $teacher_data['awards_exp'] ?? null, ['id' => 'awards_exp', 'class' => 'form-control', 'placeholder' => '介紹過去參加比賽所獲得的獎項']) !!}
                </div>
                <div class="form-group row has-feedback" id="form_awards_link">
                    <div class="col-sm-12">
                        {!! Form::text('awards_link', $teacher_data['awards_link'] ?? null, ['id' => 'awards_link', 'class' => 'form-control', 'placeholder' => '提供過去比賽的連結：例如得獎紀錄、獎狀等等']) !!}
                        <span class="form-control-feedback fa" id="i_awards_link" aria-hidden="true"></span>
                    </div>
                </div>
            </div>

            <div id="report" class="become-teacher-card">
                <h3>報導</h3>
                <div class="form-group">
                    {!! Form::textarea('repo_exp', $teacher_data['repo_exp'] ?? null, ['id' => 'repo_exp', 'class' => 'form-control', 'placeholder' => '介紹過去所被採訪的經驗']) !!}
                </div>
                <div class="form-group row has-feedback" id="form_repo_link">
                    <div class="col-sm-12">
                        {!! Form::text('repo_link', $teacher_data['repo_link'] ?? null, ['id' => 'repo_link', 'class' => 'form-control', 'placeholder' => '提供過去被採訪的連結：例如蘋果日報、各家報社等']) !!}
                        <span class="form-control-feedback fa" id="i_repo_link" aria-hidden="true"></span>
                    </div>
                </div>
            </div>

            <div id="published" class="become-teacher-card">
                <h3>公開發表</h3>
                <div class="form-group">
                    {!! Form::textarea('pub_exp', $teacher_data['pub_exp'] ?? null, ['id' => 'pub_exp', 'class' => 'form-control', 'placeholder' => '介紹過去曾經公開發表過的經驗：如展覽、演講、演出等等']) !!}
                </div>
                <div class="form-group row has-feedback" id="form_pub_link">
                    <div class="col-sm-12">
                        {!! Form::text('pub_link', $teacher_data['pub_link'] ?? null, ['id' => 'pub_link', 'class' => 'form-control', 'placeholder' => '提供過去公開發表的連結：例如相關展覽的紀錄']) !!}
                        <span class="form-control-feedback fa" id="i_pub_link" aria-hidden="true"></span>
                    </div>
                </div>
            </div>

            <div id="teaching" class="become-teacher-card">
                <h3>可授課類型<span class="color-emphasized2">*</span></h3>
                <div class="form-group" id="form_teach_type">
                    {!! Form::textarea('teach_type', $teacher_data['teach_type'] ?? null, ['id' => 'teach_type', 'class' => 'form-control', 'require', 'placeholder' => '認為自己可以授課的課程類型：例如攝影基礎、閃光燈等等']) !!}
                </div>
            </div>

            <div id="teaching_experience" class="become-teacher-card">
                <h3>授課經驗<span class="color-emphasized2">*</span></h3>
                <div class="form-group">
                    {!! Form::textarea('teach_exp', $teacher_data['teach_exp'] ?? null, ['id' => 'teach_exp', 'class' => 'form-control', 'require', 'placeholder' => '介紹過去曾經授課的經驗：例如哪間公司、哪種類型的課等等相關資訊']) !!}
                </div>
            </div>
            <div class="col-sm-12 center become-teacher-btn-wrapper">
                <button type="button" class="btn-success btn btn-lg" id="btn_become_teacher">送出</button>
            </div>
                {!! Form::close() !!}
        </div>
    </div>
</div>