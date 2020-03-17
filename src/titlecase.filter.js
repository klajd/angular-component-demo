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