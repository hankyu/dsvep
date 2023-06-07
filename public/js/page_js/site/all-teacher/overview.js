// site\teacher\lesson-overview\index.blade.php 課程總覽
// site\teacher\teacher-overview\index.blade.php 王牌講師
var teacher_overview = (function()
{
    var _const;
    _const = function()
    {
        this._construct();
    }
    _const.prototype =
    {
        _construct: function()
        {
            //Sort Dom
            this._indList = $('.indList');
            this._item = $('.item');

            //Menu button
            this._btn_popular  = $('#popular');
            this._btn_evaluate = $('#evaluate');

            this._start();
        },
        _start: function()
        {
            var objThis = this;
            objThis._initialAll();
        },
        _initialAll: function()
        {
            this._btn_evaluate.on('click', $.proxy(function()
            {
                //Sort By Evaluate DESC or ASC
                var items_array = [];

                if (this._btn_evaluate.find('i')[0].className.indexOf('desc') != -1) { items_array = this._sort_lesson_asc(this._item, 'data-evaluate'); }
                else { items_array = this._sort_lesson_desc(this._item, 'data-evaluate'); }

                this._indList.append(items_array);
                this._btn_evaluate.find('i').toggleClass('fa-sort-down fa-sort-up');
                $('.overview-menu-item.active').removeClass('active');
                this._btn_evaluate.addClass('active');
            }, this));

            this._btn_popular.on('click', $.proxy(function()
            {
                //Sort By Popular DESC or ASC
                var items_array = [];

                if (this._btn_popular.find('i')[0].className.indexOf('desc') != -1) { items_array = this._sort_lesson_asc(this._item, 'data-popular'); }
                else { items_array = this._sort_lesson_desc(this._item, 'data-popular'); }

                this._indList.append(items_array);
                this._btn_popular.find('i').toggleClass('fa-sort-down fa-sort-up');
                $('.overview-menu-item.active').removeClass('active');
                this._btn_popular.addClass('active');
            }, this));

            //Bootstrap Tooltip On the Lesson Overview
            $('[data-toggle="tooltip"]').tooltip();
        },
        _sort_lesson_asc: function(items_array, order_by)
        {
            //依照order_by升序排列
            return items_array.sort(function(a, b) { return parseInt(a.attributes[order_by].nodeValue) < parseInt(b.attributes[order_by].nodeValue) ? 1 : -1; });
        },
        _sort_lesson_desc: function(items_array, order_by)
        {
            //依照order_by降序排列
            return items_array.sort(function(a, b) { return parseInt(a.attributes[order_by].nodeValue) > parseInt(b.attributes[order_by].nodeValue) ? 1 : -1; });
        }
    }
    return _const;
}());

var teacher_overview;
$(function()
{
    teacher_overview = new teacher_overview();
})
