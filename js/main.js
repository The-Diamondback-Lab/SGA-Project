/**
 * Created by Xiaoyu on 3/10/2015.
 */
$(function(){
    var currPage = 0;
    var top = 0;
    var scrolling = false;
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
        console.log(delta + " " + currPage + " " + $(".content section").length);

        if(!scrolling){
            currPage = Math.min($(".content section").length - 1, Math.max(currPage + (delta > 0? -1 : 1), 0));
            scrolling = true;
            $(".content").animate({
                scrollTop: $(".content section")[currPage].offsetTop, easing: "easeout"
            }, 750, 0, function () {
                scrolling = false
            });


        }
    }

});

angular.module("app", [])

.controller("formCTRL", function($scope){
        $scope.questions = [
            {q: "Who are you?", ans:["Undergrad","Grad"]},
            {q: "Where do you live?", ans:["On Campus","Off Campus"]},
            {q: "Are you a part time student?", ans:["Yes","No"]},
            {q: "Do you park?", ans:["Yes","No"]}
        ];
    })