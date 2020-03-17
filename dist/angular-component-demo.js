(function () {
    'use strict';

    angular.module('component.demo', []);
    
})();
(function () {
    'use strict';

    angular.module('component.demo')
        .filter('hypercase', HypercaseFilter);

    HypercaseFilter.$inject = [];
    function HypercaseFilter() {
        return function (value) {
            return value.replace(/\s/g, '-');
        };
    }

})();
(function () {
    'use strict';

    angular.module('component.demo')
        .filter('titlecase', TitlecaseFilter);

    TitlecaseFilter.$inject = [];
    function TitlecaseFilter() {
        return function (value) {
            if(!value) return;
            
            return value.replace(/-/g, ' ').replace(/\w\S*/g, function(txt){
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        };
    }

})();
(function () {
    'use strict';

    angular.module('component.demo')
        .component('componentDemo', {
            templateUrl: 'demo.component.html',
            controller: DemoController,
            controllerAs: "vm",
            bindings: {
                config: "<"
            },
        });

    DemoController.$inject = ['$location', '$window', '$filter', '$http'];
    function DemoController($location, $window, $filter, $http) {
        var vm = this;
        vm.active = -1;
        vm.tabs = [];

        vm.$onInit = function () {
            $http.get('package.json').then(function (response) {
                angular.extend(vm, vm.config || {}, response.data);
            }).catch(function () {
                angular.extend(vm, vm.config);
            }).finally(load);
        };

        vm.$onChanges = function (changesObj) {
            if (!changesObj.config)
                return;

            angular.extend(vm, changesObj.config);
        };

        function load() {

            var path = $location.path().replace('/', '').replace(/-/g, ' ');
            var tab = vm.tabs.forEach(function (item, idx) {
                if (item.title == path) vm.active = idx;
            });

            if (vm.active === -1 && vm.tabs.length) {
                path = $filter('hypercase')(vm.tabs[0].title);
                $location.path(path);
                vm.active = 0;
            }
        }
    }

})();
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

angular.module("component.demo").run(["$templateCache", function($templateCache) {$templateCache.put("demo.component.html","<div ng-cloak>\r\n\r\n    <a href=\"{{vm.repository.url}}\">\r\n        <img class=\"fork-me hidden-xs\" alt=\"Fork me on GitHub\" src=\"https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png\">\r\n    </a>\r\n\r\n    <nav class=\"navbar navbar-demo\">\r\n        <div class=\"container\">\r\n            <div class=\"navbar-header\">\r\n                <button type=\"button\" class=\"navbar-toggle collapsed\" ng-click=\"vm.collapse = !vm.collapse\" aria-expanded=\"false\" aria-controls=\"navbar\">\r\n                    <span class=\"sr-only\">Toggle navigation</span>\r\n                    <span class=\"icon-bar\"></span>\r\n                    <span class=\"icon-bar\"></span>\r\n                    <span class=\"icon-bar\"></span>\r\n                </button>\r\n                <a class=\"navbar-brand\" href=\"#\">{{::vm.name | titlecase}}</a>\r\n            </div>\r\n            <div class=\"navbar-collapse collapse\" ng-class=\"{in : vm.collapse}\">\r\n                <ul class=\"nav navbar-nav\">\r\n                    <li ng-repeat=\"menu in vm.tabs\" ng-class=\"{active: $index === vm.active}\">\r\n                        <a href=\"#{{menu.title | hypercase}}\" ng-click=\"vm.active = $index;\">{{menu.title}}</a>\r\n                    </li>\r\n                </ul>\r\n                <ul class=\"nav navbar-nav navbar-right visible-xs\">\r\n                    <li><a href=\"{{::vm.repository.url}}\">Github</a></li>\r\n                </ul>\r\n                <ul class=\"nav navbar-nav navbar-right hidden-xs\">\r\n                    <li><a href=\"#\">{{vm.version}}</a></li>\r\n                </ul>\r\n            </div>\r\n\r\n        </div>\r\n    </nav>\r\n\r\n    <div class=\"container container-demo\" fit-window ng-click=\"vm.collapse = false;\">\r\n        <ng-include src=\"vm.tabs[vm.active].template\"></ng-include>\r\n    </div>\r\n\r\n    <footer class=\"footer\">\r\n        <div class=\"container text-center\">\r\n            <strong>{{::vm.author}}</strong> All rights reserved.\r\n        </div>\r\n    </footer>\r\n\r\n</div>");}]);