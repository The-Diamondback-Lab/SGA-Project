/**
 * Created by Xiaoyu on 3/10/2015.
 */
var currPage = 0, maxPage = 1;
var breadcrumb = [0];
var MAX_PAGE = 5;
var top = 0;
var scrolling = false;


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

                } else if(delta < 0 && currPage < maxPage) {
                    breadcrumb.push(currPage);
                    currPage = Math.min(currPage + 1, maxPage);

                }

                console.log(currPage);

                scrolling = true;
                $(".content").animate({
                    scrollTop: $(".content section")[currPage].offsetTop, easing: "easeout"
                }, 750, 0, function () {
                    scrolling = false
                });
            }
        }

        $scope.start = function(){
            breadcrumb.push(currPage);
            currPage = 1;
            scrolling = true;
            $(".content").animate({
                scrollTop: $(".content section")[currPage].offsetTop, easing: "easeout"
            }, 750, 0, function () {
                scrolling = false
            });
        }

        $scope.questions = [
            {q: "Who are you?", ans:["Undergraduate","Graduate"]},
            {q: "Where do you live?", ans:["On Campus","Off Campus"]},
            {q: "Are you a part time student?", ans:["Yes","No"]},
            {q: "Do you park?", ans:["Yes","No"]}
        ];
        /* array containing links between form sections (for example you can skip .item2 (are you full time or not) if you said you lived on campus*/
        $scope.links = [
            {id:0, name: ".item0", next: [1, 1]},
            {id:1, name: ".item1", next: [3, 2]},
            {id:2, name: ".item2", next: [3, 3]},
            {id:3, name: ".item3", next: false}
        ];
        $scope.getPrev = function(node){
            if(node.id > 0){
                if($scope.answers[node.id - 1] > -1){
                    return $scope.links[node.id - 1];
                } else {
                    return $scope.getPrev($scope.links[node.id - 1]);
                }
            } else {
                return false;
            }

        };
        $scope.getNext = function(node){
            if(node.next[$scope.answers[node.id]]){
                return node.next[$scope.answers[node.id]];
            } else {
                return MAX_PAGE;
            }
        };
        $scope.answers = [-1, -1, -1, -1];
        $scope.proceed = function(node, value){
            breadcrumb.push(currPage);
            $scope.answers[node.id] = value;
            for(var index = node.id + 1; index < $scope.links.length; index++) {
                $scope.answers[index] = -1;
            }
            console.log($scope.answers + " " + maxPage);
            if(node.next.length > 0){
                scrolling = true;
                $(".content").animate({
                    scrollTop: $($scope.links[node.next[value]].name)[0].offsetTop, easing: "easeout"
                }, 750, 0, function () {
                    scrolling = false
                });
                $scope.currNode = $scope.links[node.next[value]];
                maxPage = node.next[value] + 1;
                currPage = node.next[value] + 1;
            } else {
                maxPage = MAX_PAGE;
                currPage = MAX_PAGE;
                $(".content").animate({
                    scrollTop: $(".content section")[currPage].offsetTop, easing: "easeout"
                }, 750, 0, function () {
                    scrolling = false
                });
                console.log($scope.answers);


            }

        };
        $scope.currNode = $scope.links[0];
    })


