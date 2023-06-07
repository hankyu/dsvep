<?php
Route::get('/', 'Web\AppController@getApp');
Route::group(['middleware' => 'DomainDirector'], function()
{
    Route::group(['middleware' => 'save_browse_record'], function()
    {
        /**************************/
        /*  ---  Index Page  ---  */
        /**************************/
        // Route::get('/', 'HomeController@index');

        /*** Announcement ***/
        Route::get('/announcement', 'HomeController@announcementPage');

        /*** Register New Member ***/
        Route::post('/register', 'MemberController@register');

        /*** Login Account ***/
        Route::get('/login', 'HomeController@loginPage');

        Route::post('/login', 'MemberController@login');

        /*** Member Approval Manage System ***/
        Route::get('/approval', 'ApprovalController@lessonApprovalManagePage');

        Route::get('/approval/expire', 'ApprovalController@expireLessonApprovalManagePage');

        /*** oAuth Account ***/
        Route::group(['prefix' => '/oauth'], function()
        {
            Route::get('/google', 'MemberController@loginViaGoogle');

            Route::get('/google/callback', 'MemberController@google_login_callback');
        });

        /*** Log Out Account ***/
        Route::get('/logout', 'MemberController@logout');

        /*** All Lesson Overview ***/
        Route::get('/lesson/all', 'HomeController@allPublicLessonPage');

        /*** Every Lesson Link ***/
        Route::get('/lesson/{id}', 'LessonController@lessonShopPage');

        /*** Member Email Verification ***/
        Route::get('/verify/{code}', 'HomeController@verifyEmail');

        Route::group(['prefix' => '/contact'], function()
        {
            /*** About ***/
            Route::get('/about', 'HomeController@aboutUsPage');

            /*** Terms ***/
            Route::get('/terms', 'HomeController@termsOfServicePage');
        });

        /*** Become Teacher Introduce Page ***/
        Route::get('/teacher-introduce', 'HomeController@becomeTeacherIntroducePage');

        Route::group(['middleware' => 'approve'], function()
        {
            /**************************/
            /* ---  Profile Page  --- */
            /**************************/

            Route::group(['prefix' => '/profile'], function()
            {
                /*** Personal Detail Page ***/
                Route::get('/detail', 'PersonalController@profile');

                /*** Personal Lesson Overview ***/
                Route::get('/lesson/overview', 'PersonalController@memberPossessLessonOverviewPage');

                /*** Personal Lesson Classroom ***/
                Route::get('/lesson/classroom/{id}', 'PersonalController@lesson_classroom');

                /*** Personal QR Code Roll Call ***/
                Route::get('/lesson/rollcall/{l_id}/{u_id}', 'PersonalController@rollcall');

                /*** Modify Prosonal Detail ***/
                Route::post('/modifyProfileData', 'PersonalController@modifyProfileData');

                /*** Personal Favorite ***/
                Route::get('/favorite', 'PersonalController@favorite');

                /*** Personal Messaeg ***/
                Route::get('/message', 'PersonalController@message');

                /*** Personal Order ***/
                Route::get('/order', 'PersonalController@order');

                /*** Personal Wish ***/
                Route::get('/wish', 'PersonalController@personalWishPage');

                /*** Rollcall Report ***/
                Route::get('/rollcall-report', 'PersonalController@rollcallReportPage');
            });

            /*** Become Teacher Page ***/
            Route::get('/becometeacher', 'HomeController@applyBecomeTeacherPage');

            /*************************/
            /* ---  Worker Page  --- */
            /*************************/
            Route::group(['prefix' => 'worker'], function()
            {
                Route::get('/create', 'WorkerController@create');

                Route::get('/rollcall-report', 'WorkerController@rollcall_report');
            });

            /*** Modify Avatar Picture ***/
            Route::post('/avatar_modify', 'PersonalController@modify_avatar');

            /**************************/
            /* ---  Teacher Page  --- */
            /**************************/

            /*** Apply Teacher Page ***/
            Route::group(['prefix' => 'teacher'], function()
            {
                /*** The Teacher Rollcall Report Page ***/
                Route::get('/rollcall-report', 'TeacherController@rollcall_report');

                Route::group(['prefix' => 'lesson'], function()
                {
                    /*** Create Lesson Information Page ***/
                    Route::get('/create', 'TeacherController@create_lesson');

                    /***************************************/
                    /* ---  Create Lesson Manage Page  --- */
                    /***************************************/
                    Route::group(['prefix' => '/manage/{id}'], function()
                    {
                        Route::get('/', 'TeacherController@create_lesson_manage_index');

                        /*** Information ***/
                        Route::get('/info', 'TeacherController@create_lesson_manage_info');

                        Route::post('/info/save', 'TeacherController@create_lesson_manage_info_save');

                        /*** Goals ***/
                        Route::get('/goal', 'TeacherController@create_lesson_manage_goal');

                        Route::post('/goal/save', 'TeacherController@create_lesson_manage_goal_save');

                        /*** Detail ***/
                        Route::get('/detail', 'TeacherController@create_lesson_manage_detail');

                        Route::post('/detail/save', 'TeacherController@create_lesson_manage_detail_save');

                        /*** Chapter ***/
                        Route::get('/chapter', 'TeacherController@create_lesson_manage_chapter');

                        Route::post('/chapter/save', 'TeacherController@createLessonManageChapterSave');

                        Route::post('/chapter/upload_video', 'TeacherController@create_lesson_manage_chapter_upload_video');

                        /*** Media ***/
                        Route::get('/media', 'TeacherController@create_lesson_manage_media');

                        Route::post('/media/save', 'TeacherController@create_lesson_manage_media_save');

                        /*** Preview ***/
                        Route::get('/preview', 'TeacherController@create_lesson_manage_preview');

                        /*** Submit Lesson ***/
                        Route::post('/submit', 'TeacherController@create_lesson_manage_submit');

                        Route::get('/audit', 'TeacherController@create_lesson_manage_audit');
                    });

                    /*** The Teacher Lesson Overview Page ***/
                    Route::get('/overview', 'TeacherController@lesson_overview');

                });

                /*** The Teacher Lesson Income Overview ***/
                Route::get('/accounting', 'TeacherController@teacherAccountingPage');
            });

            /*** Upload Apply Teacher Content ***/
            Route::post('/upload/becometeacher', 'TeacherController@upload_become_teacher');

            /********************************/
            /* ---  Shopping Cart Page  --- */
            /********************************/
            Route::group(['prefix' => '/cart'], function()
            {
                /*** Cart Page ***/
                Route::get('/{id}', 'CartController@lessonConfirmPage');


                /*** Refreash Cart Total ***/
                Route::get('/get_cart_total', 'CartController@get_cart_total');

                /*** Go To Spgateway Page ***/
                Route::post('/direct/spgateway', 'CartController@spgateway');
            });
        });

        /*********************************/
        /* ---  Teacher Detail Page  --- */
        /*********************************/

        /*** Teacher Overview Page ***/
        Route::get('/teacher/overview', 'TeacherController@teacher_overview');

        /*** Teacher Detail Data Page ***/
        Route::get('/teacher/{t_id}', 'TeacherController@teacher_detail');

        /***********************************/
        /* ---  Dasha Manage Platform  --- */
        /***********************************/
        Route::group(['middleware' => 'authority_platform'], function()
        {
            Route::group(['prefix' => 'admin'], function()
            {
                /*** Index ***/
                Route::get('/', 'AdminController@index');

                /*** Accounting Page ***/
                Route::get('/accounting', 'AdminController@adminAccountingPage');

                /*** Audit Teacher Page ***/
                Route::get('/audit/teacher/overview', 'AdminController@auditTeacherPage');

                /*** Audit Lesson Page ***/
                Route::get('/audit/lesson/overview', 'AdminController@auditLessonPage');

                /*** Audit Refund Page ***/
                Route::get('/audit/refund/overview', 'AdminController@audit_refund');

                /*** Audit Preview Lesson ***/
                Route::get('/audit/lesson/preview/{id}', 'AdminController@auditLessonPreviewPage');

                /*** Exit Manage Page ***/
                Route::get('/exit', 'AdminController@exitAdmin');

                /*** Member Overview ***/
                Route::get('/member/overview', 'AdminController@memberOverviewPage');

                /*** Topic Manage ***/
                Route::get('/topic/overview', 'AdminController@topicOverviewPage');

                /*** Wish List Page***/
                Route::get('/wish/overview','AdminController@wishListPage');

                /*** Wish List Page***/
                Route::get('/rollcall','AdminController@rollcall_report');

                /*** Event Manage ***/
                Route::get('/event/overview', 'AdminController@eventOverviewPage');

                /*** Data Statistic ***/
                Route::group(['prefix' => 'statistic'], function()
                {
                    Route::group(['prefix' => 'browse'], function()
                    {
                        Route::get('/overview', 'AdminController@browseOverviewPage');

                        Route::get('/analyze', 'AdminController@browseAnalyzePage');
                    });

                    Route::group(['prefix' => 'click'], function()
                    {
                        Route::get('/overview', 'AdminController@clickOverviewPage');

                        Route::get('/analyze', 'AdminController@clickAnalyzePage');
                    });
                });

                /*** Dasha Database Manage ***/
                Route::group(['prefix' => 'sql', 'middleware' => 'manage_data_authority'], function()
                {
                    Route::get('/member', 'AdminController@memberDataManagePage');

                    Route::get('/lesson', 'AdminController@lessonDataManagePage');

                    Route::get('/order', 'AdminController@orderDataManagePage');
                });
            });
        });

        /********************************/
        /* ---  Dasha Web Tutorial  --- */
        /********************************/
        Route::get('/tutorial', 'HomeController@webUseTutorialPage');

    });

    Route::get('/{shorturl}', 'HomeController@shorturl');

    Route::group(['prefix' => 'member'], function()
    {
        /*** Member Login Ajax ***/
        Route::post('/login', 'AjaxController@memberLoginAjax');

        /*** Member Check Login Ajax ***/
        Route::post('/checkLogin', 'AjaxController@memberCheckloginAjax');

        /*** Member Singup Ajax ***/
        Route::post('/signUp', 'AjaxController@memberSignupAjax');

        /*** Member getPlainPassword Ajax ***/
        Route::post('/getPlainPassword', 'AjaxController@memberGetPlainPasswordAjax');

        /*** Member logout Ajax ***/
        Route::post('/logout', 'AjaxController@memberLogoutAjax');

        /*** Member updateDataForTeacher Ajax ***/
        Route::post('/updateDataForTeacher', 'AjaxController@memberUpdateDataForTeacher');

        /*** Member uploadAvatar Ajax ***/
        Route::post('/uploadAvatar', 'AjaxController@memberUploadAvatar');

        /*** Member getMemberDetail Ajax ***/
        Route::post('/getMemberDetail', 'AjaxController@memberGetMemberDetail');

        /*** Member sendEmailValidation Ajax ***/
        Route::post('/sendEmailVerification', 'AjaxController@memberSendEmailVerification');

        /*** Member updateMemberData Ajax ***/
        Route::post('/updateMemberData', 'AjaxController@memberUpdateMemberData');

        /*** Member updatePassword Ajax ***/
        Route::post('/updatePassword', 'AjaxController@memberUpdatePassword');

        /*** Member updatePassword Ajax ***/
        Route::post('/updateBankInfo', 'AjaxController@memberUpdateBankInfo');

        /*** Member getLessonPermission Ajax ***/
        Route::post('/getLessonPermission', 'AjaxController@memberGetLessonPermissionAjax');

        /*** Member getPhoneVerificationCode Ajax ***/
        Route::post('/getPhoneVerificationCode', 'AjaxController@memberGetPhoneVerificationCodeAjax');

        /*** Member getPhoneVerificationCodeTime Ajax ***/
        Route::post('/getPhoneVerificationCodeTime', 'AjaxController@memberGetPhoneVerificationCodeTimeAjax');

        /*** Member checkPhoneVerificationCode Ajax ***/
        Route::post('/checkPhoneVerificationCode', 'AjaxController@memberCheckPhoneVerificationCodeAjax');

    });

    Route::group(['prefix' => 'lesson'], function()
    {
        /*** Lesson getLessons Ajax ***/
        Route::post('/getLessons', 'AjaxController@lessonGetLessonsAjax');

        /*** Lesson getPromotingLessons Ajax ***/
        Route::post('/getPromotingLessons', 'AjaxController@lessonGetPromotingLessonsAjax');

        /*** Lesson getMyLessons Ajax ***/
        Route::post('/getMyLessons', 'AjaxController@lessonGetMyLessonsAjax');

        /*** Lesson getLessonDetail Ajax ***/
        Route::post('/getLessonDetail', 'AjaxController@lessonGetLessonDetailAjax');

        /*** Lesson getLessonUnitDetail Ajax ***/
        Route::post('/getLessonUnitDetail', 'AjaxController@lessonGetLessonUnitDetailAjax');

        /*** Lesson getLessonShopQA Ajax ***/
        Route::post('/getLessonShopQA', 'AjaxController@lessonGetLessonShopQaAjax');

        /*** Lesson sendLessonShopQA Ajax ***/
        Route::post('/sendLessonShopQA', 'AjaxController@lessonSendLessonShopQaAjax');

        /*** Lesson getLessonShopQA Ajax ***/
        Route::post('/switchFavorite', 'AjaxController@lessonSwitchFavoriteAjax');

        /*** Lesson getLessonClassmates Ajax ***/
        Route::post('/getLessonClassmates', 'AjaxController@lessonGetLessonClassmatesAjax');

        /*** Lesson getLessonUnitTimes Ajax ***/
        Route::post('/getLessonUnitTimes', 'AjaxController@lessonGetLessonUnitTimesAjax');

        /*** Lesson startStudy Ajax ***/
        Route::post('/startStudy', 'AjaxController@lessonStartStudyAjax');

        /*** Lesson checkAllLessonsSave Ajax ***/
        Route::post('/checkAllLessonsSave', 'AjaxController@lessonCheckAllLessonsSaveAjax');

        /*** Lesson checkAllLessonsSave Ajax ***/
        Route::post('/checkAllTeachersSave', 'AjaxController@lessonCheckAllTeachersSaveAjax');

        /*** Lesson getAreas Ajax ***/
        Route::post('/getAreas', 'AjaxController@lessonGetAreasAjax');

        /*** Lesson getTopicLabels Ajax ***/
        Route::post('/getTopicLabels', 'AjaxController@lessonGetTopicLabels');

        /*** Lesson getTeacherLessons Ajax ***/
        Route::post('/getTeacherLessons', 'AjaxController@lessonGetTeacherLessons');

        /*** Lesson deleteLesson Ajax ***/
        Route::post('/deleteLesson', 'AjaxController@lessonDeleteLesson');
    });

    Route::group(['prefix' => 'rollcall'], function() {
        /*** Rollcall getLessonRollcalls Ajax ***/
        Route::post('/getLessonRollcalls', 'AjaxController@rollcallGetLessonRollcallsAjax');

        /*** Rollcall getRollcallQRCode Ajax ***/
        Route::post('/getRollcallQRCode', 'AjaxController@rollcallGetRollcallQRCodeAjax');

        /*** Rollcall updateRollcall Ajax ***/
        Route::post('/updateRollcall', 'AjaxController@rollcallUpdateRollcallAjax');
    });

    Route::group(['prefix' => 'teacher'], function() {
        /*** Teacher getTeacher Ajax ***/
        Route::post('/getTeacher', 'AjaxController@teacherGetTeacherAjax');

        /*** Teacher getTeachers Ajax ***/
        Route::post('/getTeachers', 'AjaxController@teacherGetTeachersAjax');

        /*** Teacher getTeacherDetail Ajax ***/
        Route::post('/getTeacherDetail', 'AjaxController@teacherGetTeacherDetailAjax');

        /*** Teacher updateTeacherDetail Ajax ***/
        Route::post('/updateTeacherDetail', 'AjaxController@teacherUpdateTeacherDetailAjax');

        /*** Teacher updatePortfolios Ajax ***/
        Route::post('/updatePortfolios', 'AjaxController@teacherUpdatePortfoliosAjax');
    });

    Route::group(['prefix' => 'wish'], function() {
        /*** Wish postMyWish Ajax ***/
        Route::post('/postMyWish', 'AjaxController@wishPpostMyWishAjax');

        /*** Wish getMyWishes Ajax ***/
        Route::post('/getMyWishes', 'AjaxController@wishGetMyWishesAjax');

        /*** Wish getWishImage Ajax ***/
        Route::post('/getWishImage', 'AjaxController@wishGetWishImageAjax');
    });

    Route::group(['prefix' => 'order'], function() {
        /*** Order getOrders Ajax ***/
        Route::post('/getOrders', 'AjaxController@orderGetOrdersAjax');

        /*** Order cancelOrder Ajax ***/
        Route::post('/cancelOrder', 'AjaxController@orderCancelOrderAjax');

        /*** Order buyFreeLesson Ajax ***/
        Route::post('/buyFreeLesson', 'AjaxController@orderBuyFreeLessonAjax');

        /*** Order cancelLessonExistedOrder Ajax ***/
        Route::post('/cancelLessonExistedOrder', 'AjaxController@orderCancelLessonExistedOrderAjax');

        /*** Order checkOrderCancel Ajax ***/
        Route::post('/checkOrderCancel', 'AjaxController@orderCheckOrderCancel');

        /*** Order CLIENT_BACK url Ajax ***/
        Route::get('/clientBACK', 'AjaxController@orderSpgatewayClientBACK');

        /*** Order notify url Ajax ***/
        Route::post('/notify', 'AjaxController@orderSpgatewayNotify');

        /*** Order customer url Ajax ***/
        Route::post('/customer', 'AjaxController@orderSpgatewayCustomer');
    });

    /******************/
    /* ---  AJAX  --- */
    /******************/
    Route::group(['prefix' => 'ajax'], function()
    {
        Route::post('/add_event', 'AjaxController@add_event');

        Route::post('/addFavorite', 'AjaxController@addFavorite');

        Route::post('/add_topic', 'AjaxController@add_topic');

        Route::post('/addCashBuyer', 'AjaxController@addCashBuyer');

        Route::post('/add_click_data', 'AjaxController@add_click_data');

        Route::post('/add_coupon', 'AjaxController@add_coupon');

        Route::post('/addWishesData', 'AjaxController@addWishesData');

        Route::post('/audit_lesson', 'AjaxController@audit_lesson');

        Route::post('/audit_teacher', 'AjaxController@audit_teacher');

        Route::get('/become_teacher_check_rule', 'AjaxController@become_teacher_check_rule');

        Route::get('/become_teacher_refuel', 'AjaxController@become_teacher_refuel');

        Route::post('/cancelFavorite', 'AjaxController@cancelFavorite');

        Route::post('/cancel_audit/{id}', 'AjaxController@cancel_audit');

        Route::post('/cancelOwnOrderViaId', 'AjaxController@cancelOwnOrderViaId');

        Route::post('/changeAuthority', 'AjaxController@changeAuthority');

        Route::post('/changePassword', 'AjaxController@changePassword');

        Route::post('/changeTeacherPortfolios', 'AjaxController@changeTeacherPortfolios');

        Route::post('/accountExist', 'AjaxController@accountExist');

        Route::post('/getOfferPrice', 'AjaxController@getOfferPrice');

        Route::post('/loginAdmin', 'AjaxController@loginAdmin');

        Route::post('/checkLessonHasRestrict', 'AjaxController@checkLessonHasRestrict');

        Route::post('/checkShopData', 'AjaxController@checkShopData');

        Route::post('/checkCellphoneVerificationCode', 'AjaxController@checkCellphoneVerificationCode');

        Route::post('/copy_lesson', 'AjaxController@copy_lesson');

        Route::post('/create_lesson', 'AjaxController@create_lesson');

        Route::delete('/delete_cart_1_data', 'AjaxController@delete_cart_1_data');

        Route::delete('/delete_category', 'AjaxController@delete_category');

        Route::delete('/deleteCoupon', 'AjaxController@deleteCoupon');

        Route::delete('/delete_event', 'AjaxController@delete_event');

        Route::delete('/delete_lesson/{id}', 'AjaxController@delete_lesson');

        Route::delete('/delete_topic', 'AjaxController@delete_topic');

        Route::post('/directBuyFreeLesson', 'AjaxController@directBuyFreeLesson');

        Route::post('/edit_category', 'AjaxController@edit_category');

        Route::post('/editOrderNote', 'AjaxController@editOrderNote');

        Route::post('/edit_profile_bank', 'AjaxController@edit_profile_bank');

        Route::post('/editOrderReceiptData', 'AjaxController@editOrderReceiptData');

        Route::post('/edit_topic', 'AjaxController@edit_topic');

        Route::get('/expire_search', 'AjaxController@expire_search');

        Route::get('/get_all_lesson_data', 'AjaxController@get_all_lesson_data');

        Route::get('/getAllOrderData', 'AjaxController@getAllOrderData');

        Route::post('/get_all_pub_teacher_data', 'AjaxController@get_all_pub_teacher_data');

        Route::post('/get_all_teacher_name', 'AjaxController@get_all_teacher_name');

        Route::post('/get_all_teacher_popular', 'AjaxController@get_all_teacher_popular');

        Route::get('/get_browse_analyze', 'AjaxController@get_browse_analyze');

        Route::get('/get_browse_list', 'AjaxController@get_browse_list');

        Route::get('/get_approval_list', 'AjaxController@get_approval_list');

        Route::get('/get_audit_lesson_list', 'AjaxController@get_audit_lesson_list');

        Route::get('/get_audit_teacher_list', 'AjaxController@get_audit_teacher_list');

        Route::get('/get_click_analyze', 'AjaxController@get_click_analyze');

        Route::get('/get_click_list', 'AjaxController@get_click_list');

        Route::get('/get_event_list', 'AjaxController@get_event_list');

        Route::get('/getFavoriteLessonData', 'AjaxController@getFavoriteLessonData');

        Route::get('/getTeacherPortfolios', 'AjaxController@getTeacherPortfolios');

        Route::get('/getTeacherLesson', 'AjaxController@getTeacherLesson');

        Route::get('/get_topic_data', 'AjaxController@get_topic_data');

        Route::get('/get_topic_list', 'AjaxController@get_topic_list');

        Route::get('/get_member_list', 'AjaxController@get_member_list');

        Route::get('/get_lesson_filter_data', 'AjaxController@get_lesson_filter_data');

        Route::post('/get_user_data_session', 'AjaxController@get_user_data_session');

        Route::post('/get_lesson_income_data_for_teacher', 'AjaxController@get_lesson_income_data_for_teacher');

        Route::get('/getAllWishData', 'AjaxController@getAllWishData');

        Route::get('/getOwnWishData', 'AjaxController@getOwnWishData');

        Route::post('/getWishImage', 'AjaxController@getWishImage');

        Route::get('getLessonShopResponse', 'AjaxController@getLessonShopResponse');

        Route::get('/getPlatformIncomeData', 'AjaxController@getPlatformIncomeData');

        Route::post('/getRollcallNeedTeacherList', 'AjaxController@getRollcallNeedTeacherList');

        Route::post('/getRollcallTeacherLessonList', 'AjaxController@getRollcallTeacherLessonList');

        Route::post('/getRollcallMemberPossessLessonList', 'AjaxController@getRollcallMemberPossessLessonList');

        Route::post('/getRollcallList', 'AjaxController@getRollcallList');

        Route::post('/getRollcallQRCode', 'AjaxController@getRollcallQRCode');

        Route::post('/getLessonClassmate', 'AjaxController@getLessonClassmate');

        Route::post('sendRollcallData', 'AjaxController@sendRollcallData');

        Route::get('/initIndexData', 'AjaxController@initIndexData');

        Route::post('/modify_teacher_detail/{t_id}/{item}', 'AjaxController@modify_teacher_detail');

        Route::post('/searchMemberPurchaseHistory', 'AjaxController@searchMemberPurchaseHistory');

        Route::post('/searchOrderData', 'AjaxController@searchOrderData');

        Route::post('/abortReceipt', 'AjaxController@abortReceipt');

        Route::post('/orderRefund', 'AjaxController@orderRefund');

        Route::post('/resendEmail', 'AjaxController@resendEmail');

        Route::post('/restrictLessonUnableRefund', 'AjaxController@restrictLessonUnableRefund');

        Route::post('/save_profile', 'AjaxController@save_profile');

        Route::post('/searchPassword', 'AjaxController@searchPassword');

        Route::post('/search', 'AjaxController@search');

        Route::post('/send_contact_mail', 'AjaxController@send_contact_mail');

        Route::post('/sendNewResponse', 'AjaxController@sendNewResponse');

        Route::post('/sendEditResponse', 'AjaxController@sendEditResponse');

        Route::post('/sendCellphoneVerificationCode', 'AjaxController@sendCellphoneVerificationCode');

        Route::post('/upload_image', 'AjaxController@upload_image');

        Route::group(['prefix' => 'update'], function()
        {
            Route::post('/member', 'AjaxController@update_sql_member');

            Route::post('/lesson', 'AjaxController@update_sql_lesson');

            Route::post('/order', 'AjaxController@update_sql_order');
        });

        Route::get('/getMemberData', 'AjaxController@getMemberData');
    });
});

Route::group(['middleware' => 'web'], function ()
{

});