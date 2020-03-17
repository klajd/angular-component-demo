(function () {
    'use strict';

    angular
        .module('app', [
            'component.demo'
        ])
        .run(function ($rootScope) {
            $rootScope.demoConfig = {
                tabs: [
                    { title: 'Home', template: 'demo/home.html' },
                    { title: 'Docs', template: 'demo/docs.html' }
                ]
            };
        });

})();
