<div class="classmate-wrapper row">
    <div class="col-xs-12 marginbot-30">
        <div class="classmate-card center col-xs-12 col-sm-4 col-sm-offset-4">
            @if ($lesson_data->type == 'online')
                <i class="fa fa-users" aria-hidden="true"></i>
                <span>課程人次：{{ $buy_people_num }}</span><br>
            @endif

            <i class="fa fa-users" aria-hidden="true"></i>
            <span>課程人數：{{ count($classmate) }}</span>
        </div>
    </div>

    <table class="table table-bordered table-condensed table-striped" style="max-height: 90vh; overflow: scroll">
        <thead>
            <tr>
                <td>購買人</td>
                <td>電話</td>
                <td>信箱</td>
            </tr>
        </thead>
        <tbody id="tbodyClassmate"></tbody>
    </table>
</div>
{{ Html::script('js/page_js/site/profile/classmate.js') }}
