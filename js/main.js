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
            {id:1, name: ".item1", next: [3, 2], q: "Where do you live?", ans:["On Campus","Off Campus"]},
            {id:2, name: ".item2", next: [3, 3], q: "Are you a part-time student?", ans:["Yes","No"]},
            {id:3, name: ".item3", next: false, q: "Do you park?", ans:["Yes","No"]}
        ];
        
        $scope.calc = function(answers){
            var undergrad = (answers[0] == 0),
                onCampus = (undergrad && (answers[1] == 0)),
                partTime = undergrad ? (!onCampus && (answers[2] == 0)) : (answers[1] == 0),
                parking = (undergrad && !onCampus ? (answers[3] == 0) : (answers[2] == 0));
            var res = [
                {name: 'DOTS ShuttleUM', y: (partTime ? 94.54 : 189.08), total_funds: 8434183.77, student_fees_support: 5507522, id:0},
                {name: 'Performing Arts', y: (partTime ? 27.58 : 55.16), total_funds: 7095464, student_fees_support: 1681625, id: 1},
                {name: 'CRS', y: (partTime ? 187.96 : 375.92), total_funds: 12911525.88, student_fees_support: 10974797,id: 2},
                {name: 'Sustainability', y: (undergrad ? (partTime ? 6 : 12) : 0), total_funds: 288510, student_fees_support: 288510, id: 3},
                {name: 'Student Activities', y: (undergrad ? (partTime ? 37.52 : 75.04) : 32.30), total_funds: 1383508 + 113930, student_fees_support: 1383508 + 113930, id: 4},
                {name: 'Student Technology', y: (partTime ? 82 : 164), total_funds: 4780829, student_fees_support: 4780829, id: 5},
                {name: 'Health Center', y: (partTime ? 39.86 : 79.72), total_funds: 19350700, student_fees_support: 2322084, id: 6},
                {name: 'Athletics', y: (!undergrad || partTime ? 135.50 : 406.38), total_funds: 63200000, student_fees_support: 11376000, id: 7},
                {name: 'Library', y: (partTime ? 50 : 100), total_funds: 24175416.67, student_fees_support: 2901050, id: 8},
                {name: 'Nyumburu', y: (partTime ? 9.84 : 19.68), total_funds: 787284.81, student_fees_support: 746346, id: 9},
                {name: 'ResLife', y: (onCampus ? 6424 : 0), total_funds: 56186160, student_fees_support: 56186160, id: 10},
                {name: 'Dining Services', y: (onCampus ? 4209 : 0), total_funds: 35614182, student_fees_support: 35614182, id: 11},
                {name: 'Student Union', y:(partTime ? 160.24 : 320.48), total_funds: 11668676.25,  student_fees_support: 9334941, id: 12},
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
                        "Maintenance, upkeep, and debt service of lots and overhead related to parking on campus.",
                        "The fee offsets expenses such as state mandated administrative wages and benefits for office staff that provide service and information to parkers",
                        "Insurance for parking lots "
                    ],
                    sgatext: "While there will be no increase next year, over the next few years the parking fee is slated to increase significantly as the number of parking spaces on campus begin to diminish due to construction projects. These fee increases will be done to keep level funding for parking. Currently, the parking fee for at least freshman and sophomore students is projected to disappear in either 2017 or 2018, as only upperclassman will be able to park on campus."
                },
                'ResLife': {
                    top3: [
                        "Mandatory residence hall costs such as maintenance, overhead, furniture, and cable fees.",
                        "Residence life staff such as RAs, housekeeping, and 4Work",
                        "The Residence Hall Association (RHA)"
                    ],
                    sgatext: "The ResLife fee is currently slated to increase slightly to pay for increased overhead costs. A potential increase could pay for better furniture, two-ply toilet paper, or better cable services. "
                },
                'DOTS ShuttleUM': {
                    top3: [
                        "All of the regular scheduled shuttle bus service, including daytime (commuter buses and the circulator) and evening (color) routes.",
                        "Nite Ride",
                        "Paratransit services, and miscellaneous services like the airport shuttles."
                    ],
                    sgatext: "The ShuttleUM fee is going to see two increases next year. $2.23 per student to run the #116 purple, #118 gold, and #122 green evening service routes starting at 10 AM on Saturday and Sunday. $1.50 per student to establish a facilities renewal fund. This money goes into a sort of savings account to fund regular maintenance to shuttle facilities."
                },
                'CRS': {
                    top3: [
                        "Employee salaries, split approximately equally between full-time staff and student staff",
                        "Operation and upkeep of recreational facilities, like Eppley, Ritchie, the turf complex, etc.",
                        "Program operating expenses, including materials and supplies for Intramurals, equipment issue, Maryland Adventure Program and other expendable goods."
                    ],
                    sgatext: "CRS is currently looking at costs associated with the long discussed South Campus Recreation center to determine its feasibility. CRS will be discussing this issue with various student constituencies over the next several months if it determines a fee increase if necessary to build the new facility, however there are no other plans at this point in time."
                },
                'Student Activities': {
                    top3: (undergrad) ? [
                        "The SGA provides over $600,000 in funding to over 400 student groups on campus. The vast majority of student group programming is funded through SGA allocations.",
                        "Funding for SEE events such as Art Attack and Homecoming Comedy Show",
                        "The Undergraduate Legal Aid Office"
                    ] : [
                        "Tuition remission and stipends for GSG executives.",
                        "Funding for events such as GRID (Graduate Research Interaction Day), Cherry Blossom Cruise, and King’s Dominion Trip.",
                        "Funding to co-sponsor graduate student group events. "
                    ],
                    sgatext: (undergrad) ? 
                        "Over recent months student groups have not been able to be fully funded for their events because of a lack of funds in the allocated portion of money to student groups from the SAF. After thorough research the SGA decided that the most effective solution would be to raise the SAF by $5.28. In the upcoming election, students will be asked to approve or reject this increase." :
                        "The GSG will not be pursuing a fee increase, however a possible fee increase would go to increase funding for co-sponsorships, more sophisticated lobbying efforts on behalf of graduate students, and potentially more events like GRID and the Cherry Blossom Cruise. "
                },
                'Sustainability':{
                    top3:[
                        "All expenses from this fund are grant-funded projects to improve the environmental performance of the campus. ",
                        "To name a few examples, the fee has gone to supporting: student led food gardens at St. Mary’s Hall, Hillel, South Campus Diner and the School of Public Health, increasing bicycle parking, helping the Food Recovery Network, putting solar panels on top of the AV Williams Building, expanding compost collection in the Stamp Food Court"
                    ],
                    sgatext:"The sustainability fee is not set to increase. However, a fee increase would result in more money to fund more sustainability projects around campus."
                },
                'Athletics':{
                    top3:[
                        "Student tickets for all athletics events. Including 10,000 seats for football and 6,000 for basketball",
                        "Debt service on the Xfinity Center",
                        "Internships and part-time student jobs in the Athletic Department"
                    ],
                    sgatext:"The Athletic Department is not asking for a fee increase because of Big Ten revenues. If the fee were to increase, revenue would go towards more giveaways such as t-shirts for students."
                },
                'Nyumburu':{
                    top3:[
                        "Operations for student programming activities ",
                        "Staff and adjunct instructor salaries and health benefits",
                        "Supplies and furniture "
                    ],
                    sgatext: "Nyumburu is planning to ask for a fee increase to host conferences and learning activities in collaboration with academic departments to increase outreach into the Prince George's Community to bring in \"at-risk\" students and expose them to the benefits of higher education."
                },
                'Performing Arts': {
                    top3:[
                        "General maintenance and upkeep of the operations of the Clarice Smith Performing Arts Center. ",
                        "Nearly one-third of fee support goes to internships, graduate assistant learning and regular student employment",
                        "“Free UMD Student Ticket Mondays” to performances. Free access and engagement with artists through workshops and festivals such as the NextNOW Fest."
                    ],
                    sgatext:"The fee will see a small increase to fund mandatory overhead budget adjustments. A potential increase could result in increased arts programming by The Clarice as a whole. "
                },
                'Student Technology':{
                    top3:[
                        "Technology infrastructure across campus, including computers, internet service, wifi, printers, and software.",
                        "Infrastructure improvements, like updated software and hardware and additional services.",
                        "Classroom technology, including workstations, projectors, cameras, etc."
                    ],
                    sgatext: "There is no request for an increase in this fee. A potential fee increase could result in more wifi infrastructure and more free software for students."
                },
                'Library':{
                    top3:[
                        "Acquisition, maintenance, and refresh cycle of public workstations, loaner equipment, scanners, multimedia production technology, emerging technologies, and software.",
                        "Student employees in the Libraries.",
                        "Acquisition of E-Resources. "
                    ],
                    sgatext: "The Libraries is not asking asking for a fee increase at this point. However, a potential fee increase could go to increased staff support emerging technologies and media production, more collaboration workstations, more equipment loans, and expansion of engineering makerspace in McKeldin."
                },
                'Health Center':{
                    top3:[
                        "General health care promotion programs.",
                        "Campus Advocates Respond and Educate (CARE) to Stop Violence, a peer based sexual assault and relationship violence response service. ",
                        "Smoking cessation, meditation, and nutrition programs"
                    ],
                    sgatext:"The fee will see a small increase to fund mandatory overhead budget adjustments. An increase in the fee could result in more resources to CARE and other educational health programming."
                },
                'Student Union':{
                    top3:[
                        "General maintenance for the Stamp building and facilities.",
                        "Student staff for the info desk, campus engagement, and student group services.",
                        "Campus engagement programming such as Homecoming, Alternative Breaks, and MICA/LCSL."
                    ],
                    sgatext:"The Stamp fee will increase $1.90 for the purpose of increasing staff support for student groups. With this new funding, the Stamp will be able to increase its student group educational, fundraising, and development programming."
                },
                'Facilities Management':{
                    top3:["none"],
                    sgatext:"The Student Facilities Fee is a newly re-purposed fee. Money from this fee is being collected into a fund, similar to the student sustainability fee, that will pay for student driven facilities projects. Starting next year, the Facilities Fund Committee will take ideas for projects like installing outlets on McKeldin Mall."
                },
                'Dining Services': {
                    top3:[
                        "Maintenance costs and overhead for the dining halls.",
                        "Salaries and pay for Dining Services employees in the dining halls and shops.",
                        "Food and supplies for the dining halls and shops."
                    ],
                    sgatext: "The fee will see a small increase to fund mandatory overhead budget adjustments. A larger fee increase could result in better quality dining hall food, longer hours on the weekends, and more dining points per student. "
                }
            };
            for(var department in info){
                res.find(department).top3 = info[department].top3;
                res.find(department).sgatext = info[department].sgatext;
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

