var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.directive('multiselect', function () {
    var directive = {
        link: function (scope, element) {
            $(element).multiselect({
                enableClickableOptGroups: true,
                enableCollapsibleOptGroups: true,
                nonSelectedText: "Select type",
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
                includeSelectAllOption: true,
            })
        },
        restrict: 'A'
    };
    return directive;
});

routerApp.controller("SearchController", function ($scope, $state) {
    $scope.search = function () {
        var currentKeyword = $scope.searchText;

        if (currentKeyword === undefined || currentKeyword == "")
            currentKeyword = '*';

        $state.go('Search', { Keyword: currentKeyword }, { reload: false });
    },
    $scope.globalSearch = function () {
        $state.go('GlobalSearch', { Search: $scope.searchText.replace("'", "%27") }, { reload: true });
    }
});

routerApp.config(['$httpProvider', function ($httpProvider) {
    //initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }

    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    // extra
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
}]);

routerApp.run(function ($rootScope, $state, $stateParams, $templateCache, $timeout) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$templateCache = $templateCache;
    $rootScope.$on('$stateChangeStart', function () {
        $templateCache.removeAll();
    });
    $rootScope.$on('$stateChangeSuccess', function () {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
    $(document).on("UserUpdatedEvent", function (e) {
        if (e.reload)
            location.reload();
        else
            $state.reload();
    });
    $(document).on("globalSearchEvent", function () {
        $state.go('search', {}, { reload: true });
    });
});

routerApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.rule(function ($injector, $location) {
        var path = $location.url();
        console.log(path);
        // check to see if the path already has a slash where it should be
        if (path[path.length - 1] === '/' || path.indexOf('/?') > -1) {
            return;
        }

        if (path.indexOf('?') > -1) {
            return path.replace('?', '/?');
        }
        console.log(path);
        return path + '/';
    });

    /***********************************************************************************************************************/
    /* BASEROUTE */
    /***********************************************************************************************************************/
    $stateProvider
    .state('base', {
        url: '/:c/:a',
        templateUrl: function (params) { return '/' + params.c + '/' + params.a },
        controller: function ($scope, $stateParams, $state, $window, $location) {
            $.event.trigger({ type: 'BasePageDiplayed' });
        }
    })
    $stateProvider
    .state('baseview', {
        url: '/:c/:a/:id',
        templateUrl: function (params) { return '/' + params.c + '/' + params.a + '/' + params.id }
    })
    $stateProvider
    .state('custom', {
        url: '/Custom/:code',
        templateUrl: function (params) { return '/ItemType/Index?Code=' + params.code.toUpperCase() }
    })
    $stateProvider
        .state('customview', {
            url: '/Custom/:code/:id',
            templateUrl: function (params) { return '/ItemType/View?Code=' + params.code.toUpperCase() + '&ID=' + params.id }
        });
})
