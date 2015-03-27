/**
 * Created by Xiaoyu on 3/10/2015.
 */
var currPage = 0, maxPage = 1;
var breadcrumb = [0];
var MAX_PAGE = 5;
var top = 0;
var scrolling = false, display = 1;
var chart;
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
$(function(){

    $($(".content section")[1]).css("display","block");
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

                var series = [{
                    type: 'pie',
                    name: 'Student Funds',
                    data: $scope.data,
                    point:{
                        events:{
                            click: function (event) {
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
                        text: 'Your Student Fees',
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
            $('.total-funds-text > .h2').html($scope.data[index].total_funds);
            $('.total-funds-text > .h3').html((100 * $scope.data[index].total_funds / $scope.TOTAL_FUNDS).toFixed(2) + "%");
            $('.student-pays-text > .h2').html($scope.data[index].student_funds);
            $('.student-pays-text > .h3').html((100 * $scope.data[index].student_funds / $scope.TOTAL_STUDENT_FUNDS).toFixed(2) + "%")
        }

        $scope.nodes = [
            {id:0, name: ".item0", next: [1, 1], q: "Who are you?", ans:["Undergraduate","Graduate"]},
            {id:1, name: ".item1", next: [3, 2], q: "Where do you live?", ans:["On Campus","Off Campus"]},
            {id:2, name: ".item2", next: [3, 3], q: "Are you a part time student?", ans:["Yes","No"]},
            {id:3, name: ".item3", next: false, q: "Do you park?", ans:["Yes","No"]}
        ];
        /* array containing links between form sections (for example you can skip .item2 (are you full time or not) if you said you lived on campus*/
        $scope.answers = [];
        $scope.data = [
            {name: 'DOTS', y: 500.0, id: 0, total_funds: 10000000, student_funds: 100},
            {name: 'Nyumburu', y: 45.0, id: 1, total_funds: 10000000, student_funds: 200},
            {name: 'Student Activities Fee', y: 45.0, id: 2, total_funds: 10000000, student_funds: 300},
            {name: 'Stamp', y: 45.0, id: 3, total_funds: 10000000, student_funds: 500},
            {name: 'Sustainability Fund', y: 45.0, id: 4, total_funds: 10000000, student_funds: 400},
            {name: 'Facilities Fund', y: 45.0, id: 5, total_funds: 10000000, student_funds: 600},
            {name: 'Performing Arts', y: 45.0, id: 6, total_funds: 10000000, student_funds: 700},
            {name: 'Health Center', y: 45.0, id: 7, total_funds: 10000000, student_funds: 800},
            {name: 'Campus Recreation', y: 45.0, id: 8, total_funds: 10000000, student_funds: 900},
            {name: 'Technology', y: 45.0, id: 9, total_funds: 10000000, student_funds: 1000},
            {name: 'Athletics', y: 45.0, id: 10, total_funds: 10000000, student_funds: 1100},
            {name: 'Libraries', y: 45.0, id: 11, total_funds: 10000000, student_funds: 1200}
        ];
        $scope.TOTAL_STUDENT_FUNDS = 7800;
        $scope.TOTAL_FUNDS = 120000000;
        $scope.currNode = $scope.nodes[0];

    })

