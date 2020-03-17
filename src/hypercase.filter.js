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