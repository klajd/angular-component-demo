(function () {
    'use strict';

    angular.module('component.demo')
        .component('componentDemo', {
            templateUrl: 'component.demo/templates/demo.component.html',
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