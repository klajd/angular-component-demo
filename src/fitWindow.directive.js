(function () {
    'use strict';

    angular.module('component.demo')
        .directive('fitWindow', FitWindowDirective);

    FitWindowDirective.$inject = ['$window'];
    function FitWindowDirective($window) {
        return {
            restrict: 'A',
            link: link
        };

        function link(scope, element, attrs) {

            $window.onresize = onWindowResize;

            onWindowResize();

            function onWindowResize() {
                var heights = window.innerHeight;
                element[0].style.minHeight = heights - 112 + "px";
            }
        }
    }
    
})();
