define(["require", "exports", "@syncfusion/ej2-inputs", "@syncfusion/ej2-inputs", "@syncfusion/ej2-buttons", "@syncfusion/ej2-base", "@syncfusion/ej2-charts", "@syncfusion/ej2-grids", "@syncfusion/ej2-charts", "@syncfusion/ej2-calendars"], function (require, exports, ej2_inputs_1, ej2_inputs_2, ej2_buttons_1, ej2_base_1, ej2_charts_1, ej2_grids_1, ej2_charts_2, ej2_calendars_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ej2_base_1.setCurrencyCode('INR');
    ej2_charts_2.Chart.Inject(ej2_charts_2.LineSeries, ej2_charts_2.StackingColumnSeries, ej2_charts_2.Crosshair, ej2_charts_2.DataLabel, ej2_charts_2.ColumnSeries, ej2_charts_2.DateTime, ej2_charts_2.Legend, ej2_charts_2.Tooltip);
    ej2_grids_1.Grid.Inject(ej2_grids_1.DetailRow);
    ej2_charts_1.AccumulationChart.Inject(ej2_charts_1.AccumulationLegend, ej2_charts_1.PieSeries, ej2_charts_1.AccumulationTooltip, ej2_charts_1.AccumulationDataLabel);
    var pricipalObj2;
    var loantenureObj;
    var interestrateObj1;
    var principal;
    var interest;
    var tenure;
    var pie;
    var yearValue;
    var monthValue;
    var yearTenure = true;
    var chart;
    var grid;
    var emi;
    var princ;
    var totalPrincipalYear = 0;
    var totalInterestYear = 0;
    var tent;
    var inter;
    var dataUnits = [];
    var yearWiseData = [];
    var dateObj = new Date();
    var totalInterest = 0;
    var totalAmount = 0;
    var totalPrincipal = 0;
    var endBalance;
    var beginBalance;
    var yearTotal = 0;
    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    var datepickerObj;
    var intl = new ej2_base_1.Internationalization();
    var legendSettings = {
        textStyle: {
            color: '#FFFFFF',
            fontFamily: 'Raleway, sans-serif',
            fontWeight: '600',
            opacity: 0.62,
            size: '16px',
        }
    };
    function getCurrencyVal(value) {
        return "&#8377;" + intl.formatNumber(value);
    }
    function renderSliderControls() {
        pricipalObj2 = new ej2_inputs_1.Slider({
            min: 0,
            value: 300000,
            max: 500000,
            step: 10000,
            type: 'MinRange',
            ticks: { placement: 'After', largeStep: 100000, smallStep: 10000, showSmallTicks: false, format: 'c0' },
            change: function () {
                principal.setProperties({ value: pricipalObj2.value });
                setInitValues();
            },
            changed: function () {
                refreshUI();
            },
            renderingTicks: function (args) {
                var num = Number(args.value) / 1000;
                args.text = num === 0 ? ('' + num) : (num + 'K');
            }
        });
        pricipalObj2.appendTo('#pricipal');
        loantenureObj = new ej2_inputs_1.Slider({
            min: 0,
            value: 15,
            max: 40,
            step: 1,
            type: 'MinRange',
            ticks: { placement: 'After', largeStep: 10, smallStep: 1, showSmallTicks: false },
            change: function () {
                tenure.setProperties({ value: loantenureObj.value });
                setInitValues();
            },
            changed: function () {
                refreshUI();
            }
        });
        loantenureObj.appendTo('#loantenure');
        interestrateObj1 = new ej2_inputs_1.Slider({
            min: 0,
            value: 5.5,
            max: 40,
            step: .25,
            type: 'MinRange',
            ticks: { placement: 'After', largeStep: 5, smallStep: 1, showSmallTicks: false },
            change: function () {
                interest.setProperties({ value: interestrateObj1.value });
                setInitValues();
            },
            changed: function () {
                refreshUI();
            }
        });
        interestrateObj1.appendTo('#interestrate');
    }
    function renderInputControls() {
        renderSliderControls();
        monthValue = new ej2_buttons_1.RadioButton({
            label: 'Month', name: 'tenure', value: 'month',
            change: function () {
                yearTenure = false;
                var currVal = (tenure.value * 12);
                tenure.setProperties({
                    min: 12,
                    max: 480,
                    step: 12,
                    value: currVal
                });
                loantenureObj.setProperties({
                    min: 0,
                    value: currVal,
                    max: 480,
                    step: 12,
                    ticks: { placement: 'after', largeStep: 120, smallStep: 12, showSmallTicks: false }
                });
            }
        });
        monthValue.appendTo('#radio1');
        yearValue = new ej2_buttons_1.RadioButton({
            label: 'Year', name: 'tenure', value: 'year', checked: true,
            change: function () {
                yearTenure = true;
                var currVal = (tenure.value / 12);
                loantenureObj.setProperties({
                    min: 0,
                    value: currVal,
                    max: 40,
                    step: 1,
                    ticks: { largeStep: 10, smallStep: 1, showSmallTicks: false }
                });
                tenure.setProperties({
                    min: 1,
                    max: 40,
                    step: 1,
                    value: currVal
                });
            }
        });
        yearValue.appendTo('#radio2');
        principal = new ej2_inputs_2.NumericTextBox({
            min: 10000,
            value: 300000,
            max: 5000000,
            step: 10000,
            change: function (args) {
                if (args.isInteraction) {
                    pricipalObj2.setProperties({ value: principal.value });
                    refreshUI();
                }
            },
            width: '200px'
        });
        principal.appendTo('#principal_txt');
        interest = new ej2_inputs_2.NumericTextBox({
            min: 0,
            value: 5.5,
            format: '#.##\' %\'',
            max: 40,
            step: .25,
            change: function (args) {
                if (args.isInteraction) {
                    interestrateObj1.setProperties({ value: interest.value });
                    refreshUI();
                }
            },
            width: '165px'
        });
        interest.appendTo('#interest_txt');
        tenure = new ej2_inputs_2.NumericTextBox({
            min: 1,
            value: 25,
            max: 50,
            step: 1,
            format: '#.##',
            change: function (args) {
                if (args.isInteraction) {
                    if (tenure.value) {
                        loantenureObj.setProperties({ value: tenure.value });
                    }
                    refreshUI();
                }
            },
            width: '150px'
        });
        tenure.appendTo('#loan_txt');
    }
    function renderVisalComponents() {
        pie = new ej2_charts_1.AccumulationChart({
            series: [
                {
                    dataSource: [
                        { 'x': 'Principal Amount', y: princ },
                        { 'x': 'Interest Amount', y: ((emi * tent) - princ) }
                    ],
                    radius: '80%', xName: 'x',
                    animation: { enable: true },
                    yName: 'y',
                    startAngle: 290,
                    endAngle: 290, innerRadius: '60%',
                    explode: true, explodeOffset: '10%', explodeIndex: 3,
                }
            ],
            pointRender: function (args) {
                if (args.point.index) {
                    args.border.width = 0;
                    args.fill = 'url(#interest_svg)';
                }
                else {
                    args.border.width = 0;
                    args.border.color = '#e7e7e7';
                    args.fill = 'url(#principal_svg)';
                }
            },
            enableSmartLabels: true,
            legendSettings: {
                visible: false,
            },
            height: '365px',
            width: '100%',
            tooltip: { enable: true },
            load: function (args) {
                var selectedTheme = location.hash.split('/')[1];
                selectedTheme = selectedTheme ? selectedTheme : 'Material';
                args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
            },
            border: '#145300',
            background: '#ffffff'
        });
        pie.appendTo('#payment_pieChart');
        updateChart();
        chart.appendTo('#paymentGraph');
        grid = new ej2_grids_1.Grid({
            dataSource: [],
            columns: [
                { field: 'year', headerText: 'Year', minWidth: '80px', textAlign: 'Center', template: '#columntemplate' },
                {
                    field: 'yearTotal', format: 'C0',
                    hideAtMedia: '(min-width: 480px)', headerText: 'Payment', minWidth: '120px', textAlign: 'Center'
                },
                { field: 'yearPrincipal', format: 'C0', headerText: 'Principal Paid', minWidth: '120px', textAlign: 'Center' },
                { field: 'yearInterest', format: 'C0', headerText: 'Interest Paid', minWidth: '120px', textAlign: 'Center' },
                { field: 'endingBalance', format: 'C0', headerText: 'Balance', minWidth: '80px', textAlign: 'Center' }
            ],
            width: '100%',
            childGrid: {},
        });
        grid.appendTo('#scheduleGrid');
        grid.element.addEventListener('click', function (args) {
            var target = args.target;
            if (target.classList.contains('e-row-toggle') || target.parentElement.querySelector('.e-row-toggle')) {
                target = target.parentElement.querySelector('.e-row-toggle') ? target.parentElement.querySelector('.e-row-toggle') : target;
                if (target.classList.contains('e-icon-gdownarrow')) {
                    target.classList.remove('e-icon-gdownarrow');
                    target.classList.add('e-icon-grightarrow');
                    grid.detailRowModule.collapse(parseInt(ej2_base_1.closest(target, 'tr').getAttribute('aria-rowindex'), 10));
                }
                else {
                    target.classList.remove('e-icon-grightarrow');
                    target.classList.add('e-icon-gdownarrow');
                    grid.detailRowModule.expand(parseInt(ej2_base_1.closest(target, 'tr').getAttribute('aria-rowindex'), 10));
                }
            }
        });
    }
    function childCreated(args) {
        this.getHeaderContent().style.display = 'none';
        this.element.style.display = 'none';
    }
    function childDataBound(args) {
        this.element.style.display = '';
    }
    function updateChart() {
        chart = new ej2_charts_2.Chart({
            primaryXAxis: {
                title: 'Years',
                valueType: 'DateTime',
                labelFormat: 'y',
                intervalType: 'Years',
                majorGridLines: { width: 0 },
                minorGridLines: { width: 0 },
                majorTickLines: { width: 0 },
                minorTickLines: { width: 0 },
                lineStyle: { width: 1, dashArray: '2', color: 'rgba(255,255,255,0.2)' },
                labelStyle: {
                    color: '#989CA9',
                    fontFamily: 'Roboto',
                    fontWeight: '400',
                    size: '12px',
                },
                titleStyle: {
                    color: '#FFFFFF',
                    fontFamily: 'Raleway, sans-serif',
                    fontWeight: '600',
                    opacity: 0.62,
                    size: '16px',
                }
            },
            primaryYAxis: {
                title: 'Balance',
                labelFormat: 'c0',
                rangePadding: 'None',
                lineStyle: { width: 0 },
                majorTickLines: { width: 0 },
                majorGridLines: { width: 1, dashArray: '2', color: 'rgba(255,255,255,0.2)' },
                minorGridLines: { width: 0 },
                minorTickLines: { width: 0 },
                labelStyle: {
                    color: '#989CA9',
                    fontFamily: 'Roboto',
                    fontWeight: '400',
                    size: '16px',
                },
                titleStyle: {
                    color: '#FFFFFF',
                    fontFamily: 'Raleway, sans-serif',
                    fontWeight: '600',
                    opacity: 0.62,
                    size: '16px',
                }
            },
            axes: [{
                    majorGridLines: { width: 0 },
                    minorGridLines: { width: 0 },
                    majorTickLines: { width: 0 },
                    minorTickLines: { width: 0 },
                    rowIndex: 0, opposedPosition: true,
                    lineStyle: { width: 0 },
                    name: 'yAxis',
                    title: 'Payment',
                    labelFormat: 'c0',
                    labelStyle: {
                        color: '#989CA9',
                        fontFamily: 'Roboto',
                        fontWeight: '400',
                        size: '16px',
                    },
                    titleStyle: {
                        color: '#FFFFFF',
                        fontFamily: 'Raleway, sans-serif',
                        fontWeight: '600',
                        opacity: 0.62,
                        size: '16px',
                    }
                }],
            chartMouseUp: function (args) {
                onChartMouseUp(args);
            },
            tooltip: {
                enable: true, shared: true,
                format: '${series.name} : ${point.y}',
                header: '<b>${point.x}<b>',
                fill: '#FFFFFF',
                opacity: 1,
                textStyle: {
                    color: '#555555',
                    fontFamily: 'Roboto',
                    size: '12px',
                    fontWeight: '400',
                },
            },
            chartArea: {
                border: {
                    width: 0
                }
            },
            height: '500px',
            palettes: ['#FB6589', '#3AC8DC', '#FFFFFF'],
            legendSettings: legendSettings, useGroupingSeparator: true,
            border: '#ffffff', background: '#27304c',
            axisLabelRender: axisLabelRender
        });
    }
    function onChartMouseUp(args) {
        if (args.target.indexOf('_chart_legend_') > -1 && (args.target.indexOf('shape') > -1 || args.target.indexOf('text') > -1)) {
            var id = [args.target];
            id = (args.target.indexOf('shape') > -1) ? id[0].split('chart_legend_shape_') : id[0].split('chart_legend_text_');
            var index = parseInt(id[1], 10);
            var series = chart.visibleSeries[index];
            var yName = series.yAxisName;
            var ySName = void 0;
            var visibility = false;
            if (series.visible) {
                for (var i = 0, len = chart.series.length; i < len; i++) {
                    ySName = chart.series[i].yAxisName;
                    if (len === 1 || (chart.series[i].visible &&
                        chart.series[i].index !== series.index && yName === ySName)) {
                        visibility = true;
                    }
                }
                series.yAxis.visible = visibility;
            }
            else {
                series.yAxis.visible = true;
            }
        }
    }
    function axisLabelRender(args) {
        if (window.innerWidth < 576) {
            if (args.axis.name === 'primaryYAxis' || args.axis.name === 'yAxis') {
                var value = Number(args.value) / 1000;
                args.text = value === 0 ? String(value) : (String(value) + 'K');
            }
        }
    }
    function refreshUI1() {
        setInitValues();
        var interestPercent = parseFloat((Math.round((emi * tent) - princ) / Math.round((emi * tent)) * 100).toFixed(2));
        pie.setProperties({
            series: [
                {
                    dataSource: [
                        {
                            'x': 'Principal Amount',
                            y: princ,
                            text: parseFloat(((princ) / Math.round((emi * tent)) * 100).toFixed(2)) + '%'
                        },
                        {
                            'x': 'Interest Amount',
                            y: (tent ? Math.round((emi * tent) - princ) : 0),
                            text: interestPercent ? interestPercent + '%' : ' '
                        }
                    ],
                    radius: '80%', xName: 'x',
                    animation: { enable: true },
                    yName: 'y',
                    startAngle: 290,
                    endAngle: 290, innerRadius: '60%',
                    explode: true, explodeOffset: '10%', explodeIndex: 3
                }
            ],
        });
        pie.refresh();
    }
    function refreshUI() {
        refreshUI1();
        calRangeValues();
        renderControls();
        chart.refresh();
        grid.refresh();
    }
    function setInitValues() {
        emi = calculateEMI();
        princ = principal.value;
        tent = yearTenure ? (tenure.value * 12) : tenure.value;
        dataUnits = [];
        yearWiseData = [];
        dateObj = new Date(datepickerObj.value.getTime());
        totalInterest = 0;
        totalAmount = 0;
        totalPrincipal = 0;
        totalPrincipalYear = 0;
        totalInterestYear = 0;
        document.getElementById('loan_emi').innerHTML = getCurrencyVal(tent ? Math.round(emi) : 0);
        document.getElementById('loan_interest').innerHTML = getCurrencyVal(tent ? Math.round((emi * tent) - princ) : 0);
        document.getElementById('loan_total_payment').innerHTML = getCurrencyVal(tent ? Math.round((emi * tent)) : 0);
        document.getElementById('loan_principal').innerHTML = getCurrencyVal(princ);
    }
    function calRangeValues() {
        for (var i = 0; i < tent; i++) {
            inter = getInterest ? (princ * getInterest()) : princ;
            totalInterest += inter;
            totalAmount += emi;
            totalPrincipal += parseFloat((emi - inter).toFixed(2));
            endBalance = princ - (emi - inter);
            yearTotal += emi;
            totalPrincipalYear += parseFloat((emi - inter).toFixed(2));
            totalInterestYear += inter;
            dataUnits.push({
                month: monthNames[dateObj.getMonth()],
                index: (i + 1),
                totalInterest: Math.round(totalInterest),
                totalAmount: totalAmount,
                emi: Math.round(emi),
                year: dateObj.getFullYear(),
                beginningBalance: Math.round(princ),
                interest: Math.round(inter),
                pricipalPaid: Math.round((emi - inter)),
                endingBalance: Math.round(endBalance)
            });
            if (i === 0 || dateObj.getMonth() === 0) {
                beginBalance = princ;
            }
            if (dateObj.getMonth() === 11 || (i === tent - 1)) {
                yearWiseData.push({
                    beginningBalance: Math.round(beginBalance),
                    totalInterest: Math.round(totalInterest),
                    totalPrincipal: Math.round(totalPrincipal),
                    totalAmount: Math.round(totalAmount),
                    yearTotal: Math.round(yearTotal),
                    endingBalance: Math.round(endBalance),
                    yearN: new Date(dateObj.getFullYear(), 0, 1),
                    year: dateObj.getFullYear(),
                    yearPrincipal: totalPrincipalYear,
                    yearInterest: totalInterestYear
                });
                yearTotal = 0;
                totalPrincipalYear = 0;
                totalInterestYear = 0;
            }
            princ = endBalance;
            if (i < tent - 1) {
                dateObj.setMonth(dateObj.getMonth() + 1);
            }
        }
    }
    function renderControls() {
        grid.setProperties({
            dataSource: yearWiseData, childGrid: {
                created: childCreated,
                dataBound: childDataBound,
                queryString: 'year',
                columns: [
                    { field: 'month', headerText: 'Month', textAlign: 'center', minWidth: '80px' },
                    {
                        field: 'emi', format: 'C0',
                        hideAtMedia: '(min-width: 480px)', headerText: 'Payment', minWidth: '80px', textAlign: 'center'
                    },
                    { field: 'pricipalPaid', format: 'C0', headerText: 'Principal Paid', minWidth: '80px', textAlign: 'center' },
                    { field: 'interest', format: 'C0', headerText: 'Interest Paid', minWidth: '80px', textAlign: 'center' },
                    { field: 'endingBalance', format: 'C0', headerText: 'Balance', minWidth: '80px', textAlign: 'center' }
                ],
                dataSource: dataUnits
            }
        });
        chart.setProperties({
            enableSideBySidePlacement: false,
            series: [
                {
                    type: 'StackingColumn',
                    columnWidth: 0.425,
                    dataSource: yearWiseData,
                    xName: 'yearN', width: 2, marker: {
                        visible: true,
                        width: 10,
                        height: 10,
                    },
                    yName: 'yearPrincipal', name: 'Principal Paid', yAxisName: 'yAxis'
                },
                {
                    type: 'StackingColumn',
                    columnWidth: 0.425,
                    dataSource: yearWiseData,
                    xName: 'yearN', width: 2, marker: {
                        visible: true,
                        width: 10,
                        height: 10,
                    },
                    yName: 'yearInterest', name: 'Interest Paid', yAxisName: 'yAxis'
                },
                {
                    type: 'Line',
                    dataSource: yearWiseData,
                    xName: 'yearN', width: 2, marker: {
                        visible: true,
                        width: 10,
                        height: 10,
                        fill: '#60448D',
                    },
                    yName: 'endingBalance', name: 'Balance',
                },
            ]
        });
    }
    function getInterest() {
        return interest.value ? parseFloat('' + interest.value / 12 / 100) : 0;
    }
    function calculateEMI() {
        var interestValue = getInterest();
        var tent = yearTenure ? (tenure.value * 12) : tenure.value;
        if (interestValue) {
            return principal.value * interestValue *
                (Math.pow((1 + interestValue), tent)) / ((Math.pow((1 + interestValue), tent)) - 1);
        }
        return principal.value / tent;
    }
    function dateChanged() {
        if (ej2_base_1.isNullOrUndefined(datepickerObj.value)) {
            datepickerObj.setProperties({ value: new Date() });
        }
        else {
            refreshUI();
        }
    }
    window.default = function () {
        renderInputControls();
        datepickerObj = new ej2_calendars_1.DatePicker({
            start: 'Year',
            depth: 'Year',
            placeholder: 'Enter date',
            format: 'MMM yyy',
            value: new Date(),
            change: dateChanged,
            showClearButton: false,
            width: '250px',
            strictMode: true,
            showTodayButton: false
        });
        datepickerObj.appendTo('#monthStarter');
        emi = calculateEMI();
        princ = principal.value;
        tent = yearTenure ? (tenure.value * 12) : tenure.value;
        renderVisalComponents();
        dataUnits = [];
        yearWiseData = [];
        dateObj = new Date();
        totalInterest = 0;
        totalAmount = 0;
        totalPrincipal = 0;
        refreshUI();
        window.destroy = function () {
            destroyComponents();
            window.destroy = null;
        };
    };
    function destroyComponents() {
        pricipalObj2.destroy();
        loantenureObj.destroy();
        interestrateObj1.destroy();
        principal.destroy();
        interest.destroy();
        tenure.destroy();
        pie.destroy();
        chart.destroy();
        grid.destroy();
        yearValue.destroy();
        monthValue.destroy();
        datepickerObj.destroy();
    }
    window.getDataState = function () {
        var data = {};
        data.dataUnits = dataUnits;
        data.yearWiseData = yearWiseData;
        return data;
    };
});
