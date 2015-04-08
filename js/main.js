/**
 * Created by Xiaoyu on 3/10/2015.
 */
var currPage = 0, maxPage = 1;
var breadcrumb = [0];
var MAX_PAGE = 5;
var top = 0;
var scrolling = false, display = 1;
var chart, konami = false, memecount = 0;
var toggle = function(target){
    switch(target){
        case 0:
            $("#resulttabs > li")[0].setAttribute("class","selected");
            $("#resulttabs > li")[1].setAttribute("class","");
            $("#chart")[0].setAttribute("style","display:");
            $("#table")[0].setAttribute("style","display:none");
            break;
        case 1:
            $("#resulttabs > li")[0].setAttribute("class","");
            $("#resulttabs > li")[1].setAttribute("class","selected");
            $("#chart")[0].setAttribute("style","display:none");
            $("#table")[0].setAttribute("style","display:");
            break;
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
        $(".content")[0].scrollTop = $(".content section")[currPage].offsetTop;
        if ($(window).width() > 757){
            $("#table").css("display","none");
            $("#chart").css("display","");
        } else {
            $("#table").css("display","");
            $("#chart").css("display","none");
            console.log("mobile");
        }
        $("#info").css("width","100vw").css("height","100vh");
    };
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
                    $scope.scroll();
                }
                console.log(currPage);
            }
        }

        $scope.start = function(){
            breadcrumb.push(currPage);
            currPage = 1;
            $($(".content section")[1]).css("display","block");
            scrolling = true;
            $scope.scroll();
        }

        $scope.scroll = function(){
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
            $(".indicator" + (Math.min($scope.currNode.id, currPage - 1)))[0].setAttribute("id","active");
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

                $scope.scroll();
            } else {
                maxPage = MAX_PAGE;
                currPage = MAX_PAGE;

                $scope.scroll();

                console.log($scope.answers);
                $scope.data = $scope.calc($scope.answers);
                if ($(window).width() > 757){
                    $("#table").css("display","none");
                    $("#chart").css("display","");
                } else {
                    $("#table").css("display","");
                    $("#chart").css("display","none");
                    console.log("mobile");
                }
                $(".toggle-chart-table > h2").html("Your Annual Fees: $" + $scope.TOTAL_STUDENT_FUNDS.formatMoney(2, '.', ','));
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
                    }
                }];

                chart = new Highcharts.Chart({
                    chart: {
                        renderTo: 'chart',
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false
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
                $("#info > .closebtn").click(function(){
                    $("#info")[0].setAttribute("class","");
                    chart.series[0].data.forEach(function(element){
                        element.select(false);
                    })
                });

            }
        };

        $scope.show = function(index){
            $('#info')[0].setAttribute("class","show");
            $('.piesection-name').html($scope.data[index].name);
            $('.total-funds-text > .h2').html("$" + $scope.data[index].student_fees_support.formatMoney(2, '.', ','));
            $('.total-funds-text > .h3').html((100 * $scope.data[index].student_fees_support_percentage).toFixed(2) + "%");
            $('.student-pays-text > .h2').html("$" + $scope.data[index].y.formatMoney(2, '.', ','));
            $('.student-pays-text > .h3').html((100 * $scope.data[index].y / $scope.TOTAL_STUDENT_FUNDS).toFixed(2) + "%")
        }

        $scope.nodes = [
            {id:0, name: ".item0", next: [1, 1], q: "Who are you?", ans:["Undergraduate","Graduate"]},
            {id:1, name: ".item1", next: [3, 2], q: "Where do you live?", ans:["On Campus","Off Campus"]},
            {id:2, name: ".item2", next: [3, 3], q: "Are you a part time student?", ans:["Yes","No"]},
            {id:3, name: ".item3", next: false, q: "Do you park?", ans:["Yes","No"]}
        ];
        /* array containing links between form sections (for example you can skip .item2 (are you full time or not) if you said you lived on campus*/
        $scope.answers = [];
        
        
        $scope.calc = function(answers){
            var undergrad = (answers[0] == 0),
                onCampus = (answers[1] == 0),
                partTime = (!onCampus && (answers[2] == 0)),
                parking = (!onCampus ? (answers[3] == 0) : (answers[2] == 0));
            var res = [
                {name: 'DOTS', y: (partTime ? 94.54 : 189.08), total_funds: 8434183.77, student_fees_support: 5507522, id:0},
                {name: 'Performing Arts', y: (partTime ? 27.58 : 55.16), total_funds: 7095464, student_fees_support: 1681625, id: 1},
                {name: 'CRS', y: (partTime ? 187.96 : 375.92), total_funds: 12911525.88, student_fees_support: 10974797,vid: 2},
                {name: 'Sustainability', y: (undergrad ? (partTime ? 6 : 12) : 0), total_funds: 288510, student_fees_support: 288510, id: 3},
                {name: 'Student Activities', y: (undergrad ? (partTime ? 37.52 : 75.04) : 32.30), total_funds: 1383508 + 113930, student_fees_support: 1383508 + 113930, id: 4},
                {name: 'Student Technology', y: (partTime ? 82 : 164), total_funds: 4780829, student_fees_support: 4780829, id: 5},
                {name: 'Health Center', y: (partTime ? 39.86 : 79.72), total_funds: 19350700, student_fees_support: 2322084, id: 6},
                {name: 'Athletics', y: (!undergrad || partTime ? 135.50 : 406.38), total_funds: 63200000, student_fees_support: 11376000, id: 7},
                {name: 'Library', y: (partTime ? 50 : 100), total_funds: 24175416.67, student_fees_support: 2901050, id: 8},
                {name: 'Nyumburu', y: (partTime ? 9.84 : 19.68), total_funds: 787284.81, student_fees_support: 746346, id: 9},
                {name: 'ResLife', y: (onCampus ? 6424 : 0), total_funds: 56186160, student_fees_support: 56186160, id: 10},
                {name: 'Dining', y: (onCampus ? 4209 : 0), total_funds: 35614182, student_fees_support: 35614182, id: 11},
                {name: 'Student Union', y:(partTime ? 160.24 : 320.48), student_fees_support: 9334941, id: 12},
                {name: 'Parking', y: (partTime ? 0 : (parking && onCampus ? 481 : (parking && !onCampus ? 249 : 0))), total_funds: 4398498, id: 13}
            ];
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
            return res;
        }
        $scope.TOTAL_STUDENT_FUNDS = 0;
        $scope.TOTAL_FUNDS = 0;
        $scope.currNode = $scope.nodes[0];

    })

