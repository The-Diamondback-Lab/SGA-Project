/**
 * Created by Xiaoyu on 3/10/2015.
 */
var currPage = 0, maxPage = 1;
var breadcrumb = [0];
var MAX_PAGE = 5;
var top = 0;
var scrolling = false;
var chart;
$(function(){

    Highcharts.theme = {
        colors: ["#2b908f", "#90ee7e", "#f45b5b", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
            "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
        chart: {
            backgroundColor: 'rgba(0,0,0,1)',
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
            boxplot: {
                fillColor: '#505053'
            },
            candlestick: {
                lineColor: 'white'
            },
            errorbar: {
                color: 'white'
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

    $("#info > .closebtn").click(function(){
        $("#info")[0].setAttribute("class","");
        chart.series[0].data.forEach(function(element){
            element.select(false);
        })
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
            var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

            if(!scrolling){
                if(delta > 0 && currPage > 0) {
                    currPage = breadcrumb.pop();
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
                scrolling = false
            });
            $(".page-indicator li").each(function(){
                this.setAttribute("id","")
            });
            $(".indicator" + (Math.min($scope.currNode.id, currPage - 1)))[0].setAttribute("id","active");
        }

        $scope.proceed = function(node, value){
            breadcrumb.push(currPage);
            $scope.answers[node.id] = value;
            for(var index = node.id + 1; index < $scope.nodes.length; index++) {
                $scope.answers[index] = -1;
            }
            console.log($scope.answers + " " + maxPage);
            if(node.next.length > 0){
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
                                $('#info')[0].setAttribute("class","show");
                                $('.piesection-name').html($scope.data[this.id].name);
                            }
                        }
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
                        y: 30,
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
                //$scope.loadChart(series, 'Student Funds');

            }
        };

        $scope.nodes = [
            {id:0, name: ".item0", next: [1, 1], q: "Who are you?", ans:["Undergraduate","Graduate"]},
            {id:1, name: ".item1", next: [3, 2], q: "Where do you live?", ans:["On Campus","Off Campus"]},
            {id:2, name: ".item2", next: [3, 3], q: "Are you a part time student?", ans:["Yes","No"]},
            {id:3, name: ".item3", next: false, q: "Do you park?", ans:["Yes","No"]}
        ];
        /* array containing links between form sections (for example you can skip .item2 (are you full time or not) if you said you lived on campus*/
        $scope.answers = [-1, -1, -1, -1];
        $scope.data = [
            {name: 'DOTS', y: 500.0, id: 0},
            {name: 'Nyumburu', y: 45.0, id: 1},
            {name: 'Student Activities Fee', y: 45.0, id: 2},
            {name: 'Stamp', y: 45.0, id: 3},
            {name: 'Sustainability Fund', y: 45.0, id: 4},
            {name: 'Facilities Fund', y: 45.0, id: 5},
            {name: 'Performing Arts', y: 45.0, id: 6},
            {name: 'Health Center', y: 45.0, id: 7},
            {name: 'Campus Recreation', y: 45.0, id: 8},
            {name: 'Technology', y: 45.0, id: 9},
            {name: 'Athletics', y: 45.0, id: 10},
            {name: 'Libraries', y: 45.0, id: 11}
        ];
        $scope.currNode = $scope.nodes[0];

    })

