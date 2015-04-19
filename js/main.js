/**
 * Created by Xiaoyu on 3/10/2015.
 */
var currPage = 0, maxPage = 1;
var breadcrumb = [0];
var MAX_PAGE = 5;
var top = 0;
var scrolling = false, display = 1;
var chart, konami = false, memecount = 0, tabchart = true;;
var toggle = function(target){
    switch(target){
        case 0:
            $("#resulttabs > li")[0].setAttribute("class","selected");
            $("#resulttabs > li")[1].setAttribute("class","");
            $("#chart").css("display","block");
            $("#table").css("display","none");
            tabchart = true;
            break;
        case 1:
            $("#resulttabs > li")[0].setAttribute("class","");
            $("#resulttabs > li")[1].setAttribute("class","selected");
            $("#chart").css("display","none");
            $("#table").css("display","block");
            tabchart = false;
            break;
    }
    $(window).trigger('resize');
};
var scroll = function($scope){
    $(".content").animate({
        scrollTop: $(".content section")[currPage].offsetTop, easing: "easeout"
    }, 750, 0, function () {
        scrolling = false;
        if(currPage + 1 < MAX_PAGE){
            $($(".content section")[currPage + 1]).css("display","none");
        }
    });
    $(".page-indicator li").each(function(){
        this.setAttribute("id","")
    });
    if($scope && currPage > 0){
        $(".indicator" + (Math.min($scope.currNode.id, currPage - 1)))[0].setAttribute("id","active");
    }
}
Number.prototype.formatMoney = function(c, d, t){
var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };
$(function(){
    console.log(document.documentElement.clientWidth);
    // https://github.com/tommcfarlin/konami-code Thanks to tommcfarlin for awesome konami code js!
    console.log("%c konami code", 'background: #222; color: #bada55; font-size:3em');
    $(window).konami(
        {
            code: [38,38,40,40,37,39,37,39,66,65],
            cheat: function() {
                console.log('%c dank memes begin', 'background: #222; color: #bada55; font-size:3em');
                konami = true;
            }
        }
    );
    
    $(window).keyup(function(e){
        if(konami && e.keyCode == 65){
            memecount = (memecount + 1);
            console.log(memecount + "/ 100");
            if (memecount == 3){
                new Audio('js/Oh Baby A Triple.mp3').play();
            } else if(memecount == 100){
                new Audio('js/Darude Airhorn.mp3').play();
                memecount = 0;
                konami = false;
            } else {
                new Audio('js/AIRHORN.mp3').play();
            }
       } else if(e.keyCode == 27){
            $("#info")[0].setAttribute("class","");
            chart.series[0].data.forEach(function(element){
                element.select(false);
            });
       } else if(e.keyCode == 9){
            e.preventDefault();
            e.stopPropagation();
       } else if(e.keyCode == 37){

       } else if(e.keyCode == 39){

       }
    });

    $(".splash").css("display","block");
    Highcharts.theme = {
        colors: ["#FFFFFF"],
        chart: {
            backgroundColor: '#E51837',
            plotBorderColor: '#606063'
        },
        title: {
            style: {
                color: '#E0E0E3',
                textTransform: 'uppercase',
                fontSize: '20px'
            }
        },
        subtitle: {
            style: {
                color: '#E0E0E3',
                textTransform: 'uppercase'
            }
        },
        xAxis: {
            gridLineColor: '#707073',
            labels: {
                style: {
                    color: '#E0E0E3'
                }
            },
            lineColor: '#707073',
            minorGridLineColor: '#505053',
            tickColor: '#707073',
            title: {
                style: {
                    color: '#A0A0A3'

                }
            }
        },
        yAxis: {
            gridLineColor: '#707073',
            labels: {
                style: {
                    color: '#E0E0E3'
                }
            },
            lineColor: '#707073',
            minorGridLineColor: '#505053',
            tickColor: '#707073',
            tickWidth: 1,
            title: {
                style: {
                    color: '#A0A0A3'
                }
            }
        },
        tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            style: {
                color: '#F0F0F0'
            }
        },
        plotOptions: {
            series: {
                dataLabels: {
                    color: '#B0B0B3'
                },
                marker: {
                    lineColor: '#333'
                }
            },
            pie:{
                borderWidth:2,
                borderColor:'#E51837'
            }
        },
        legend: {
            itemStyle: {
                color: '#E0E0E3'
            },
            itemHoverStyle: {
                color: '#FFF'
            },
            itemHiddenStyle: {
                color: '#606063'
            }
        },
        credits: {
            style: {
                color: '#666'
            }
        },
        labels: {
            style: {
                color: '#707073'
            }
        },

        drilldown: {
            activeAxisLabelStyle: {
                color: '#F0F0F3'
            },
            activeDataLabelStyle: {
                color: '#F0F0F3'
            }
        },
        exporting: { enabled: false },

        navigation: {
            buttonOptions: {
                symbolStroke: '#DDDDDD',
                theme: {
                    fill: '#505053'
                }
            }
        },

        // scroll charts
        rangeSelector: {
            buttonTheme: {
                fill: '#505053',
                stroke: '#000000',
                style: {
                    color: '#CCC'
                },
                states: {
                    hover: {
                        fill: '#707073',
                        stroke: '#000000',
                        style: {
                            color: 'white'
                        }
                    },
                    select: {
                        fill: '#000003',
                        stroke: '#000000',
                        style: {
                            color: 'white'
                        }
                    }
                }
            },
            inputBoxBorderColor: '#505053',
            inputStyle: {
                backgroundColor: '#333',
                color: 'silver'
            },
            labelStyle: {
                color: 'silver'
            }
        },

        navigator: {
            handles: {
                backgroundColor: '#666',
                borderColor: '#AAA'
            },
            outlineColor: '#CCC',
            maskFill: 'rgba(255,255,255,0.1)',
            series: {
                color: '#7798BF',
                lineColor: '#A6C7ED'
            },
            xAxis: {
                gridLineColor: '#505053'
            }
        },

        scrollbar: {
            barBackgroundColor: '#808083',
            barBorderColor: '#808083',
            buttonArrowColor: '#CCC',
            buttonBackgroundColor: '#606063',
            buttonBorderColor: '#606063',
            rifleColor: '#FFF',
            trackBackgroundColor: '#404043',
            trackBorderColor: '#404043'
        },

        // special colors for some of the
        legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
        background2: '#505053',
        dataLabelsColor: '#B0B0B3',
        textColor: '#C0C0C0',
        contrastTextColor: '#F0F0F3',
        maskColor: 'rgba(255,255,255,0.3)'
    };

    // Apply the theme
    Highcharts.setOptions(Highcharts.theme);

    window.onresize = function(){
        console.log(document.documentElement.clientWidth);
        console.log("resized");
        var reloadInfo = $("#info.show");
        reloadInfo.removeClass("show");
        setTimeout(function(){
            reloadInfo.addClass("show");
        }, 500);
        $(".content")[0].scrollTop = $(".content section")[currPage].offsetTop;
        if ($(window).width() > 757){
            if(tabchart){
                chart.setSize($("div.container").width(), $("div.container").height(), false);
                $("#table").css("display","none");
                $("#chart").css("display","block"); 
            } else {
                $("#table").height($("body").height() - 126 + "px");
            }
        } else {
            $("#table").css("display","block").height($("body").height() - 126 + "px");
            $("#chart").css("display","none");
            console.log("mobile");
        }
    };
    $("#info > .closebtn").click(function(){
        $("#info")[0].setAttribute("class","");
        chart.series[0].data.forEach(function(element){
            element.select(false);
        })
    });
    $("#info.show").click(function(e){
        console.log("info");
        e.stopPropagation();
        e.preventDefault();
    });

})

angular.module("app", [])

    .controller("formCTRL", function($scope){
        if ($(".content")[0].addEventListener) {
            // IE9, Chrome, Safari, Opera
            $(".content")[0].addEventListener("mousewheel", MouseWheelHandler, false);
            // Firefox
            $(".content")[0].addEventListener("DOMMouseScroll", MouseWheelHandler, false);
        }
        // IE 6/7/8
        else $(".content").attachEvent("onmousewheel", MouseWheelHandler);

        function MouseWheelHandler(e) {

            // cross-browser wheel delta
            var e = window.event || e; // old IE support
//            console.log(e)
            var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

            if(!scrolling){
                if(delta > 0 && currPage > 0 && currPage < MAX_PAGE) {
                    currPage = breadcrumb.pop();
                    $scope.answers.pop();
                    maxPage = Math.max(currPage, 1);
                    scrolling = true;
                } else if(delta < 0 && currPage < maxPage) {
                    breadcrumb.push(currPage);
                    currPage = Math.min(currPage + 1, maxPage);
                    scrolling = true;

                }

                if(scrolling){
                    scroll();
                }
//                console.log(currPage);
            }
        }

        $scope.start = function(hard){
            $scope.init();
            $("#restart-btn").removeClass("show").addClass("hidden");
            breadcrumb.push(currPage);
            currPage = hard ? 0 : 1;
            $($(".content section")[1]).css("display","block");
            scrolling = true;
            scroll($scope);
        }

        $scope.proceed = function(node, value){
            breadcrumb.push(currPage);
            $scope.answers.push(value);
            if(node.next){
                $($(".content section")[node.next[value] + 1]).css("display","block");
                scrolling = true;
                maxPage = node.next[value] + 1;
                currPage = node.next[value] + 1;

                $scope.currNode = $scope.nodes[node.next[value]];

                scroll($scope);
            } else {
                maxPage = MAX_PAGE;
                currPage = MAX_PAGE;

                scroll($scope);

                console.log($scope.answers);
                $scope.data = $scope.calc($scope.answers);
                if ($(window).width() > 757){
                    $("#table").css("display","none");
                    $("#chart").css("display","block");
                } else {
                    $("#table").css("display","block");
                    $("#chart").css("display","none");
                    console.log("mobile");
                }
                $(".toggle-chart-table >.title-div > h2").html("Your Annual Fees: $" + $scope.TOTAL_STUDENT_FUNDS.formatMoney(2, '.', ','));
                var series = [{
                    type: 'pie',
                    name: 'Student Funds',
                    data: $scope.data,
                    point:{
                        events:{
                            click: function (event) {
                                console.log(this.id);
                                $scope.show(this.id);
                            }
                        }
                    },
                    dataLabels:{
                        color: 'white'
                    },
                    startAngle: -60
                }];

                chart = new Highcharts.Chart({
                    chart: {
                        renderTo: 'chart',
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        events:{
                            click: function (event) {
                                $("#info").removeClass("show");
                                chart.series[0].data.forEach(function(element){
                                    element.select(false);
                                });
                            }
                        }
                    },
                    title: {
                        text: '',
                        floating: true,
                        y: 50,
                        x: $('#chart').width() * 0.85 / 3,
                        style: {
                            color: '#fff',
                            font: 'bold 2em "PT Sans", sans-serif'
                        }
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            }
                        }
                    },
                    series: series
                });
                chart.setSize($("div.container").width(), $("div.container").height(), false);

            }
        };

        $scope.init = function(){
            breadcrumb=[0];
            currPage = 0;
            $scope.answers = [];
            $scope.TOTAL_STUDENT_FUNDS = 0;
            $scope.TOTAL_FUNDS = 0;
            $scope.currNode = $scope.nodes[0];
        }

        $scope.show = function(index){
            if ($("#info.show").length > 0){
                $("#info").removeClass("show");
            } else {;
                $('#info').addClass("show");
                $('.piesection-name').html($scope.data[index].name);
                $('.total-funds-text > .tfees').html("$" + $scope.data[index].student_fees_support.formatMoney(2, '.', ','));
                $('.total-funds-text > .tpercent').html((100 * $scope.data[index].student_fees_support_percentage).toFixed(2) + "%");
                $('.student-pays-text > .sfees').html("$" + $scope.data[index].y.formatMoney(2, '.', ','));
                $('.student-pays-text > .spercent').html((100 * $scope.data[index].y / $scope.TOTAL_STUDENT_FUNDS).toFixed(2) + "%");
                $('#info #expenses').html("");
                for(var k = 0; k < Math.min($scope.data[index].top3.length, 3); k++){
                    var expenses = $scope.data[index].top3[k];
                    var x = document.createElement("li");
                    var i = document.createTextNode(expenses);
                    x.appendChild(i);
                    $('#info #expenses')[0].appendChild(x);
                    console.log(expenses);
                }
                $('#info #text').html($scope.data[index].sgatext);
            }
        }

        $scope.nodes = [
            {id:0, name: ".item0", next: [1, 2], q: "Who are you?", ans:["Undergraduate","Graduate"]},
            {id:1, name: ".item1", next: [3, 2], q: "Where do you live?", ans:["On the campus","Off the campus"]},
            {id:2, name: ".item2", next: [3, 3], q: "Are you a part-time student?", ans:["Yes","No"]},
            {id:3, name: ".item3", next: false, q: "Do you park on the campus?", ans:["Yes","No"]}
        ];
        
        $scope.calc = function(answers){
            var undergrad = (answers[0] == 0),
                onCampus = (undergrad && (answers[1] == 0)),
                partTime = undergrad ? (!onCampus && (answers[2] == 0)) : (answers[1] == 0),
                parking = (undergrad && !onCampus ? (answers[3] == 0) : (answers[2] == 0));
            var res = [
                {name: 'DOTS Shuttle-UM', y: (partTime ? 94.54 : 189.08), total_funds: 8434183.77, student_fees_support: 5507522, id:0},
                {name: 'Performing Arts', y: (partTime ? 27.58 : 55.16), total_funds: 7095464, student_fees_support: 1681625, id: 1},
                {name: 'Campus Recreation Services', y: (partTime ? 187.96 : 375.92), total_funds: 12911525.88, student_fees_support: 10974797,id: 2},
                {name: 'Student Sustainability', y: (undergrad ? (partTime ? 6 : 12) : 0), total_funds: 288510, student_fees_support: 288510, id: 3},
                {name: 'Student Activities', y: (undergrad ? (partTime ? 37.52 : 75.04) : 32.30), total_funds: 1383508 + 113930, student_fees_support: 1383508 + 113930, id: 4},
                {name: 'Student Technology', y: (partTime ? 82 : 164), total_funds: 4780829, student_fees_support: 4780829, id: 5},
                {name: 'University Health Center', y: (partTime ? 39.86 : 79.72), total_funds: 19350700, student_fees_support: 2322084, id: 6},
                {name: 'Athletics', y: (!undergrad || partTime ? 135.50 : 406.38), total_funds: 63200000, student_fees_support: 11376000, id: 7},
                {name: 'Library Technology', y: (partTime ? 50 : 100), total_funds: 24175416.67, student_fees_support: 2901050, id: 8},
                {name: 'Nyumburu', y: (partTime ? 9.84 : 19.68), total_funds: 787284.81, student_fees_support: 746346, id: 9},
                {name: 'Resident Life', y: (onCampus ? 6424 : 0), total_funds: 56186160, student_fees_support: 56186160, id: 10},
                {name: 'Dining Services', y: (onCampus ? 4209 : 0), total_funds: 35614182, student_fees_support: 35614182, id: 11},
                {name: 'Stamp Student Union', y:(partTime ? 160.24 : 320.48), total_funds: 11668676.25,  student_fees_support: 9334941, id: 12},
                {name: 'Facilities Management', y: (partTime ? 9.04 : 18.08), total_funds: 1954525, student_fees_support: 1954525, id: 13},
                {name: 'DOTS Parking Fee', y:  parking && (onCampus ? 481 : 249), total_funds: 15325777, student_fees_support: 4398498, id:14}
            ];
            Array.prototype.find = function(str){
                for(var i = 0; i < res.length; i++){
                    if(res[i].name === str){
                        return res[i];
                    }
                }
            };
            console.log(res.find("Nyumburu"));
            var info = {
                'DOTS Parking Fee': {
                    top3: [
                        "Maintenance and upkeep of lots and overhead related to campus parking",
                        "Pay for DOTS employees and student staff"
                    ],
                    sgatext: "There will be no fee increase next year. However, the parking fee is slated to increase significantly in following years as the number of parking spaces on the campus decreases due to construction projects. The parking fee for on-campus residents is projected to disappear along with resident parking in either 2017 or 2018.",
                    ap_name:""
                },
                'Resident Life': {
                    top3: [
                        "Mandatory dorm costs such as maintenance, overhead, furniture and cable",
                        "Personnel including resident assistants, housekeeping and 4-WORK staff",
                        "The Residence Hall Association"
                    ],
                    sgatext: "The Resident Life fee will increase slightly to pay for increased overhead costs. A potential increase could pay for better furniture, two-ply toilet paper or better cable services. ",
                    ap_name:""
                },
                'DOTS Shuttle-UM': {
                    top3: [
                        "Regularly scheduled shuttle bus service, including commuter buses, the circulator and evening routes",
                        "NITE Ride",
                        "Paratransit services and miscellaneous buses, such as the airport shuttles"
                    ],
                    sgatext: "The Shuttle-UM fee will see two increases next year — $2.23 per student to run the Purple, Gold and Green evening service routes starting at 10:00 a.m. on Saturday and Sunday and $1.50 per student to establish a facilities renewal fund for regular maintenance of shuttle facilities.",
                    ap_name:""
                },
                'Campus Recreation Services': {
                    top3: [
                        "Employee salaries, split equally between full-time and student staff",
                        "Operation and upkeep costs for recreational facilities",
                        "Program operating expenses, including materials for intramurals, equipment issue and the Maryland Adventure Program"
                    ],
                    sgatext: "CRS is currently looking at the feasibility of the long-discussed South Campus recreation center. If officials determine a fee increase is necessary to build the facility, they’ll discuss the issue with a number of student groups.",
                    ap_name:""
                },
                'Student Activities': {
                    top3: (undergrad) ? [
                        "More than $600,000 in student group funding, allocated through the Student Government Association",
                        "Student Entertainment Events programming, including Art Attack and the Homecoming Comedy Show",
                        "The Undergraduate Legal Aid Office"
                    ] : [
                        "Tuition remission and stipends for Graduate Student Government executives",
                        "Events such as Graduate Research Interaction Day, Cherry Blossom Cruise and King’s Dominion Trip",
                        "Funding to co-sponsor graduate student group events"
                    ],
                    sgatext: (undergrad) ? 
                        "An increase would make more money available for 400-plus student groups, some of which have not been able to fully fund their events. The SGA has proposed an increase of $5.28 that students will vote on in this year’s elections." :
                        "The GSG will not be pursuing a fee increase, but a possible fee increase would go toward funding for co-sponsorships, more sophisticated lobbying efforts on behalf of graduate students and potentially more events.",
                    ap_name:""
                },
                'Student Sustainability':{
                    top3:[
                        "Grant funding for projects to improve the environmental performance of the campus, such as food gardens, increased bicycle parking and solar panels on top of the A.V. Williams Building"
                    ],
                    sgatext:"The sustainability fee is not set to change, but a potential increase would result in more funding for more sustainability projects around the campus.",
                    ap_name:""
                },
                'Athletics':{
                    top3:[
                        "Student tickets for all athletic events, including 10,000 seats for football and 6,000 for basketball",
                        "Debt service on Xfinity Center",
                        "Internships and part-time student jobs in the athletic department"
                    ],
                    sgatext:"The athletics fee is not set to change, but a potential increase would go toward giveaways, such as student T-shirts.",
                    ap_name:""
                },
                'Nyumburu':{
                    top3:[
                        "Operating costs for student programming and activities",
                        "Staff and adjunct instructor salaries and health benefits",
                        "Supplies and furniture"
                    ],
                    sgatext: "A fee increase would allow Nyumburu to host conferences and activities for at-risk Prince George’s County students in collaboration with academic departments. Officials have proposed a fee increase, but the amount is still being determined.",
                    ap_name:""
                },
                'Performing Arts': {
                    top3:[
                        "Clarice Smith Performing Arts Center maintenance and upkeep ",
                        "Internships, graduate assistant learning and regular student employment",
                        "Free student programming, including performance tickets, workshops and festivals such as NextNOW Fest"
                    ],
                    sgatext:"The fee will see a small increase to fund mandatory overhead budget adjustments. A potential increase could result in more arts programming by The Clarice.",
                    ap_name:""
                },
                'Student Technology':{
                    top3:[
                        "Technology infrastructure across the campus, including computers, internet, Wi-Fi, printers and software",
                        "Infrastructure improvements such as updated software and hardware",
                        "Classroom technology"
                    ],
                    sgatext: "There is no request for an increase in this fee. A potential fee increase could cover additional Wi-Fi infrastructure and free software for students.",
                    ap_name:""
                },
                'Library Technology':{
                    top3:[
                        "Acquisition, maintenance and refresh cycle of public workstations, loaner equipment, scanners, multimedia production technology, emerging technologies and software",
                        "University Libraries student employees",
                        "Acquisition of e-resources"
                    ],
                    sgatext: "University Libraries is not asking asking for a fee increase at this point. However, a potential fee increase could fund increased staff support, emerging technologies and media production, more collaboration workstations, more equipment loans and expansion of the engineering MakerSpace in McKeldin Library.",
                    ap_name:""
                },
                'University Health Center':{
                    top3:[
                        "General health care promotion programs",
                        "Campus Advocates Respond and Educate (CARE) to Stop Violence, a peer-based sexual assault and relationship violence response service",
                        "Smoking cessation, meditation and nutrition programs"
                    ],
                    sgatext:"The fee will see a small increase to fund mandatory overhead budget adjustments. An increase in the fee could result in more resources for CARE and other educational health programming.",
                    ap_name:""
                },
                'Stamp Student Union':{
                    top3:[
                        "General maintenance for Stamp Student Union",
                        "Student staff for the information desk, campus engagement and student group services",
                        "Campus engagement programming, such as homecoming, Alternative Breaks and Office of Multicultural Involvement & Community Advocacy and Leadership & Community Service-Learning programs"
                    ],
                    sgatext:"The Stamp fee will increase $1.90 to expand staff support and educational, fundraising and development programming for student groups.",
                    ap_name:""
                },
                'Facilities Management':{
                    top3:["none"],
                    sgatext:"The student facilities fee is a newly repurposed fee. Money is being collected into a fund that will pay for student-driven facilities projects, such as installing outlets on McKeldin Mall, starting next year.",
                    ap_name:""
                },
                'Dining Services': {
                    top3:[
                        "Maintenance costs and overhead costs for the dining halls",
                        "Salaries and pay for dining hall and shop employees",
                        "Food and supplies for the dining halls and shops"
                    ],
                    sgatext: "The fee will see a small increase to fund mandatory overhead budget adjustments. A larger potential fee increase could result in better-quality dining hall food, longer hours on the weekends and more dining points per student.",
                    ap_name:""
                }
            };
            for(var department in info){
                res.find(department).top3 = info[department].top3;
                res.find(department).sgatext = info[department].sgatext;
                res.find(department).ap_name = info[department].ap_name;
            }
            res.sort(function(a,b){return b.y-a.y});
            console.log(res);
            console.log((undergrad ? "undergrad " : "graduate ") + (onCampus ? "on campus " : "off campus ") + (partTime ? "part time " : "full time ") + (parking ? "has parking" : "no parking "));
            for(var i = 0; i < res.length; i++){
                res[i].id = i;
                $scope.TOTAL_STUDENT_FUNDS += res[i].y;
                console.log(res[i].name + " " + res[i].y);
                $scope.TOTAL_FUNDS += res[i].total_funds;
                res[i].student_fees_support_percentage = res[i].student_fees_support / res[i].total_funds;
                if(res[i].y == 0){
                    res.splice(i, 1);
                    i--;
                }
            }
            console.log($scope.TOTAL_FUNDS, $scope.TOTAL_STUDENT_FUNDS);
            $("#info").removeClass("show");
            $("#splash").removeClass("hidden").addClass("show");
            $("#restart-btn").removeClass("hidden").addClass("show");
            return res;
        }

        $scope.init();

    })

