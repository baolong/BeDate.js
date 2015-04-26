/**
  * 参数：
  *     startYear：起始年份，默认1900
  *     endYear: 结束年份，默认2100
  *     container：日历容器ID
  *     type：日历类型，1：下拉列表。2.界面式。默认：1
  */
var BeDate = function() {
    var datas = {
        startYear: 1900,   //起始年，默认1900
        endYear: 2100,     //结束年，默认2100
        container: null,      //容器
        type: 1,     //日历类型，1：下拉列表。2.界面式。默认为1
        yearContainer: null,   //年容器
        monthContainer: null,   //月分容器
        dayContainer: null,   //日容器
        curYear: null,
        curMonth: null,
        curDay: null
    }, _fn = {
        setYears: function() {
            datas.yearContainer = document.createElement('SELECT');
            datas.yearContainer.setAttribute('name', 'year')
            var str = '';
            for (var y=datas.startYear; y<=datas.endYear; y++) {
                str += '<option';
                if (y == datas.curYear) {
                    str += ' selected';
                }
                str += ' value="' + y + '">' + y + '年</option>';
            }
            datas.yearContainer.innerHTML = str;
            datas.yearContainer.onchange = function() {
                //当年份发生变化，则促发月、日的变化
                var year = this.value;
                _fn.setMonths(year);
            };
            datas.container.appendChild(datas.yearContainer);
            _fn.setMonths(datas.curYear);
        },
        setMonths: function(year) {
            if (datas.monthContainer) {
                //若是用户选择了年份，则判断当前选择的月份是否为二月，是则重置月份列表
                if (datas.monthContainer.value == 2) {
                    _fn.setDays(year, 2);
                }
            } else {
                var month = 1;
                datas.monthContainer = document.createElement('SELECT');
                datas.monthContainer.setAttribute('name', 'month')
                var str = '';
                for (var m=1; m<=12; m++) {
                    str += '<option';
                    if (datas.curMonth == m && datas.curYear == year) {
                        str += ' selected';
                        month = datas.curMonth;
                    }
                    str += ' value="' + m + '">' + m + '月</option>';
                }
                datas.monthContainer.innerHTML = str;
                datas.monthContainer.onchange = function() {
                    //当年份发生变化，则触发月份变化
                    _fn.setDays(datas.yearContainer.value, this.value);
                };
                datas.container.appendChild(datas.monthContainer);
                _fn.setDays(year, month);
            }
        },
        setDays: function(year, month) {
            var str = '',
                now = new Date(),
                days = _fn.getDaysOfMonth(year, month);
            for (var d=1; d<=days; d++) {
                str += '<option';
                if (d == datas.curDay && year == datas.curYear && month == datas.curMonth) {
                    str += ' selected';
                }
                str += ' value="' + d + '">' + d + '日</option>';
            }
            if (datas.dayContainer) {
                datas.dayContainer.innerHTML = str;
            } else {
                datas.dayContainer = document.createElement('SELECT');
                datas.dayContainer.setAttribute('name', 'month')
                datas.dayContainer.innerHTML = str;
                datas.container.appendChild(datas.dayContainer);
            }
        },
        isLeapYear: function(year) {
            /* 判断是否为闰年 */
            return (year % 100 != 0 && year % 4 == 0) || (year%400 == 0);
        },
        getDaysOfMonth: function(year, month) {
            /* 获取某月中的天数 */
            var days = 0;
            if (month == 1 || month == 3 || month == 5 || month == 7 || month == 9 || month == 10 || month == 12) {
                days = 31;
            }
            else if (month == 4 || month == 6 || month == 8 || month == 11) {
                days = 30;
            } else {
                if (_fn.isLeapYear(year)) {
                    days = 29;
                } else {
                    days = 28;
                }
            }
            return days
        }
    }, _init = function(params) {
        if (params) {
            /* 初始化用户事件、属性 start */
            if (!params.container) { return; }
            datas.container =  document.getElementById(params.container);
            if (!datas.container) { return; }
            datas.startYear = params.startYear ? params.startYear : datas.startYear;
            datas.endYear = params.endYear ? params.endYear : datas.endYear;
            /* 初始化用户事件、属性 end */
        }
        var now = new Date();
        datas.curYear = now.getFullYear(),
        datas.curMonth = now.getMonth() + 1;
        datas.curDay = now.getDate();
        _fn.setYears();
    };
    return {
        init: _init
    };
}();
