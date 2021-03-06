


routerApp.run(function ($rootScope, $state, $stateParams, $templateCache, $timeout) {
    $rootScope.$on('$stateChangeStart', function () {
        $('.daterangepicker').remove();
    });
    //$(document).on("ItinenraySearch", function () {
    //    $state.go('base', { c: "Itinerary", a: "Search" }, { reload: true });
    //});
    $(document).on("ItinerarySearch", function (ev) {
        $state.go('ItinerarySearchWithParameters', { parameters: ev.parameters}, { reload: true });
    });
    
    $(document).on("ItineraryFaresSearch", function () {
        $state.go('base', { c: "FaresCalculator", a: "Search" }, { reload: true });
    });
    $(document).on("PlanningSearch", function (ev) {
        $state.go('PlanningDetails', { Type: ev.planningType, ID: ev.id, Name: ev.name}, { reload: true });
    });
    $(document).on("FaresResult", function () {
        $state.go('base', { c: "FaresCalculator", a: "Result" }, { reload: true });
    });
    $(document).on("TrafficSearch", function (ev) {
        $state.go('base', { c: "Traffic", a: "Search" }, { reload: true });
    });
    $(document).on("NearbySearch", function (ev) {
        $state.go('base', { c: "Nearby", a: "Search" }, { reload: true });
    });
    $(document).on("GlobalSearch", function (ev) {
        $state.go('GlobalSearch', { Keywords: ev.Keywords }, { reload: true });
    });
    $(document).on("SubmitedTECForm", function (ev) {
        $state.go('FormsThanks', { Code: ev.Code }, { reload: true });
    });
    $(document).on("SubmitedDeleteAccount", function (ev) {
        $state.go('DeleteAccount', {  }, { reload: true });
    });
    $(document).on("GoToFavorites", function (ev) {
        $state.go('base', { c: "User", a: "MyFavorites" }, { reload: true });
    });
    $(document).on("GoToNotifications", function (ev) {
        $state.go('base', { c: "User", a: "MyNotifications" }, { reload: true });
    });
    $(document).on("GoToHome", function (ev) {
        $state.go('base', { c: "Home", a: "Home" }, { reload: true });
    });
    $(document).on("GoToPdfNotApproved", function (ev) {
        $state.go('ViewLogin', { er: 'pdf' }, { reload: true });
    });
    $(document).on("GoToVerificationMail", function (ev) {
        $state.go('VerificationMail', {
            bearer: ev.token }, { reload: true });
    });
    $(document).on("GoToPageCode", function (ev) {
        $state.go('PageCode', {
            Code: ev.Code
        }, { reload: true });
    });
    $(document).on("GoToEshopManualRegistration", function (event) {
        $state.go('RegisterEshopManually', null, { reload: true });
    });

    $(document).on('GoToViewUserAccount', function (event) {
        $state.go(
            'ViewUserAccount',
            {
                submitSuccess: !!event.submitSuccess
            },
            {
                reload: true
            }
        );
    });
    $(document).on("GoToMyAccount", function (event) {
        if (!!event.isFromEmailValidation) {
            $state.go('ViewMyAccount', {
                isFromEmailValidation: true
            }, { reload: true });
        } else {
            $state.go('ViewMyAccount', null, { reload: true });
        }
    });
    $(document).on('GoToViewPrivacyPolicy', function (event) {
        $state.go(
            'ViewPrivacyPolicy',
            {
                isFromEmailValidation: !!event.isFromEmailValidation
            },
            {
                reload: true
            }
        ); 
    });
    $(document).on('goToConnexionIssue', function (event) {
        $state.go('baseview', { c: 'Form', a: 'ConnexionIssue', id: event.issueType }, { reload: true });
    });
    $(document).on('goToSuccessResetPassword', function (event) {
        $state.go('SuccessResetPassword');
    });
    $(document).on('goToSuccessForgotPassword', function (event) {
        $state.go('SuccessForgotPassword');
    });
    //$rootScope.$on('$stateChangeSuccess', function () {
    //    $(function(){
    //        fillAdvertisement();
    //    })
    //});
});


routerApp.config(function ($stateProvider, $urlRouterProvider) {
    /***********************************************************************************************************************/
    /* HOME */
    /***********************************************************************************************************************/
    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: function (params) { return '/Home/Home' }
        })


    /***********************************************************************************************************************/
    /* Page */
    /***********************************************************************************************************************/
    $stateProvider
        .state('Page', {
            url: "/View/:Name/:ID",
            templateUrl: function (params) { return '/CmsPage/View/' + params.ID },
        })
    $stateProvider
        .state('PageScrollTo', {
            url: "/View/:Name/:ID/:ScrollTo",
            templateUrl: function (params) { return '/CmsPage/View/' + params.ID },
            controller: function ($scope, $stateParams, $state, $window, $location) {
                $scope.$on('$viewContentLoaded', function (event, viewConfig) {
                if ($stateParams.ScrollTo)
                {
                    $(function () {
                        scrollToAnchor($stateParams.ScrollTo);
                    });
                }
                });
            }
        })
    $stateProvider
        .state('PageCode', {
            url: "/Page/:Code",
            templateUrl: function (params) { return '/Page/Show?Code=' + params.Code },
        })
    $stateProvider
        .state('PageTypeCode', {
            url: "/Page/:Type/:Code",
            templateUrl: function (params) { return '/Page/Show?Code=' + params.Code + '&TypeCode=' + params.Type },
        })
    //State pour avoir page sans blocks (structure cms) mais valide (style cgu, privacypolicy) et sans code.
    $stateProvider
        .state('PageWithoutBlocksView', {
            url: "/Page/View/:Type/:Code",
            params: {
                Type: { squash: true, value: '' },
                Code: { squash: true, value: '' },
            },
            templateUrl: function (params) { return '/Page/PageWithoutBlocksView?Code=' + params.Code + '&TypeCode=' + params.Type },
        })

    /***********************************************************************************************************************/
    /* News */
    /***********************************************************************************************************************/
    $stateProvider
        .state('News', {
            url: "/News/Detail/:Title/:ID",
            templateUrl: function (params) { return '/News/Detail/' + params.ID },
        })
    /***********************************************************************************************************************/
    /* Itinerary */
    /***********************************************************************************************************************/
    $stateProvider
        .state('ItinerarySearchWithParameters', {
            url: "/Itinerary/Search/:parameters",
            templateUrl: function (params) { return '/Itinerary/Search?' + params.parameters },
        })
    //$stateProvider
    //    .state('ItinerarySearchWithParametersDirection', {
    //        url: "/Itinerary/Search/:parameters/:direction",
    //        templateUrl: function (params) { $(".pagination-big-element").removeClass("is-loading"); $("a[name='" + params.direction.toLowerCase() + "']").addClass('ui-button is-loading'); return '/Itinerary/PreviousOrNextTrip?Direction=' + params.direction + '&' + params.parameters },
    //    })
    $stateProvider
        .state('ItineraryDetails', {
            url: "/Itinerary/Detail/:parameters",
            templateUrl: function (params) { return '/Itinerary/Detail?' + params.parameters },
        })
    //$stateProvider
    //    .state('ItineraryDetailsDirection', {
    //        url: "/Itinerary/Detail/:parameters/:direction",
    //        templateUrl: function (params) { $(".itinerary-button-direction").removeClass("is-loading"); $("a[name='" + params.direction.toLowerCase() + "']").addClass('ui-button is-loading'); return '/Itinerary/PreviousOrNextTrip?Direction=' + params.direction + '&' + params.parameters },
    //    })

    $stateProvider
        .state('ItineraryDetailUrl', {
            url: "/Itinerary/DetailUrl/:OriginLatitude/:OriginLongitude/:DestinationLatitude/:DestinationLongitude/:JourneyFrom/:JourneyTo/:Type",
            templateUrl: function (params) { return '/Itinerary/DetailUrl?OriginLatitude=' + params.OriginLatitude + '&OriginLongitude=' + params.OriginLongitude + '&DestinationLatitude=' + params.DestinationLatitude + '&DestinationLongitude=' + params.DestinationLongitude + '&JourneyFrom=' + params.JourneyFrom + '&JourneyTo=' + params.JourneyTo+ '&Type=' + params.Type },
        })
    /***********************************************************************************************************************/
    /* Planing */
    /***********************************************************************************************************************/
    $stateProvider
        .state('PlanningDetails', {
            url: "/Planning/Details/:Type/:Name/:ID",
            templateUrl: function (params) { return '/Planning/Details?PlanningType=' + params.Type + '&Name=' + params.Name + '&ID=' + params.ID },
        })
    /***********************************************************************************************************************/
    /* Traffic */
    /***********************************************************************************************************************/
    $stateProvider
        .state('TrafficDetail', {
            url: "/Traffic/Detail/:PerturbationID",
            templateUrl: function (params) { return '/Traffic/Detail?PerturbationID=' + params.PerturbationID },
        })
    /***********************************************************************************************************************/
    /* Nearby */
    /***********************************************************************************************************************/
    $stateProvider
        .state('NearbyItinerary', {
            url: "/Nearby/Itinerary/:Direction/:Latitude/:Longitude/:StopId/:Title",
            templateUrl: function (params) { return '/Nearby/Itinerary?Direction=' + params.Direction + '&Latitude=' + params.Latitude + '&Longitude=' + params.Longitude + '&StopId=' + params.StopId + '&Title=' + params.Title },
        })

    /***********************************************************************************************************************/
    /* GlobalSearch */
    /***********************************************************************************************************************/
    $stateProvider
        .state('GlobalSearch', {
            url: "/Search/:Keywords",
            templateUrl: function (params) { return '/Home/Search?Keywords=' + encodeURIComponent(params.Keywords) },
            controller: function ($scope, $stateParams, $state, $window, $location) {
                //if ($('#site-search').hasClass('is-filled') || $('#site-search').hasClass('is-focus'))
                //    $('#site-search .close-search').click();
                //$('#site-search').removeClass('is-filled');
                //$('#site-search-input').val('');
                //$('#site-search .site-search-result.js-site-search-results .container').html(returnData)
            }
        })
    /***********************************************************************************************************************/
    /* Forms */
    /***********************************************************************************************************************/
    $stateProvider
        .state('FormsThanks', {
            url: "/Form/:Code/Thanks",
            templateUrl: function (params) { return '/Form/Thanks/?code=' + params.Code },
        })

    /***********************************************************************************************************************/
    /* ValidateMail */
    /***********************************************************************************************************************/
    $stateProvider
        .state('ValidateMail', {
            url: "/User/ValidateMail/:username/:token",
            templateUrl: function (params) { return '/User/ValidateMail?UserName=' + params.username + '&Token=' + params.token },
        })
    /***********************************************************************************************************************/
    /* ResetPasswordValidateToken */
    /***********************************************************************************************************************/
    $stateProvider
        .state('ResetPassword', {
            url: "/User/ResetPassword/:username/:token",
            templateUrl: function (params) { return '/User/ResetPasswordValidateToken?UserName=' + params.username + '&Token=' + params.token },
        })
    /***********************************************************************************************************************/
    /* DeleteAccount */
    /***********************************************************************************************************************/
    $stateProvider
        .state('DeleteAccount',
            {
                url: "/User/Delete",
                templateUrl: function (params) { return '/User/Delete' },
            })
    
    /***********************************************************************************************************************/
    /* Eshop : static urls */
    /***********************************************************************************************************************/
    $stateProvider
        .state('ViewConfirmRegister',
            {
                url: "/View/ConfirmRegister",
                templateUrl: function (params) { return '/View/ConfirmRegister' },
            });
    $stateProvider
        .state('ViewRegister',
            {
                url: "/View/Register?error&error_atlas",
                templateUrl: function (params) {
                    var value = params.error || params.error_atlas;
                    var stringValue = "";
                    if (typeof value === 'undefined' || typeof value !== typeof stringValue || value === "true") {
                        value = "";
                    }

                    return '/View/Register?Error=' + value;
                },
            });
    $stateProvider
        .state('ViewCgu',
            {
                url: "/View/Cgu",
                templateUrl: function (params) { return '/View/Cgu' },
            });
    $stateProvider
        .state('ViewPrivacyPolicy',
            {
                url: "/User/MyPrivacy?isFromEmailValidation",
                templateUrl: function (params) { return ('/User/MyPrivacy' + (params.isFromEmailValidation ? '?isFromEmailValidation=true' : '')) },
            });
    $stateProvider
        .state('ViewUserAccount',
            {
                url: "/User/MyAccount?origin",
                templateUrl: function (params) { return ('/User/MyAccount?Origin=' + params.origin) },
            });
    $stateProvider
        .state('ViewMyAccount',
            {
                url: "/View/MyAccount?origin&isFromEmailValidation",
                templateUrl: function (params) { return '/View/MyAccount?Origin=' + params.origin+ (params.isFromEmailValidation ? '&isFromEmailValidation=true' : '') },
            });
    $stateProvider
        .state('ViewLogin',
            {
                url: "/View/Login?origin&error=:er",
                templateUrl: function (params) { return '/View/Login?Origin=' + params.origin+'&Error=' + params.er },
            });

    $stateProvider
        .state('PosDp', {
            url: "/User/PosDp/:userid/:token",
            templateUrl: function (params) {
                return "/User/GetCreatePosDb?userId=" + params.userid + "&token=" + params.token;
            }
        }).state('VerificationMail', {
            url: "/User/ValidateMail?bearer&u",
            templateUrl: function (params) {
                return "/User/GetMailVerificationInfo?bearer=" + params.bearer + "&u=" + params.u;
            }
        }).state('RegisterEshopManually', {
            url: "/User/RegisterEshopManually",
            templateUrl: function () {
                return "/User/RegisterEshopManually";
            }
        })
        /***********************************************************************************************************************/
        /* Eshop : static urls */
        /***********************************************************************************************************************/
        //.state('contact', {
        //    url: '/Contact',
        //    templateUrl: '/Contact'
        //})
        /************************************************************************************************************************/
        /* Forms */
        /************************************************************************************************************************/
        .state('SuccessResetPassword', {
            url: '/User/ResetPassword/Success',
            templateUrl: function () {
                return '/Form/Success/ResetPassword';
            }
        }).state('SuccessForgotPassword', {
            url: '/User/ForgotPassword/Success',
            templateUrl: function () {
                return '/Form/Success/ForgotPassword';
            }
        })
        ;
});

routerApp.run(['$rootScope', function ($rootScope) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        console.log('$stateChangeStart to ' + toState.to + '- fired when the transition begins. toState,toParams : \n', toState, toParams);
    });

    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        if (error && error.status)
        {
            if (error.status === 404)
                window.location.href = '/Error/404';
        }
        console.log('$stateChangeError - fired when an error occurs during transition.');
        console.log(arguments);
    });

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        clearAllRealTimeTimeout();
        console.log('$stateChangeSuccess to ' + toState.name + '- fired once the state transition is complete.');
    });

    $rootScope.$on('$viewContentLoaded', function (event) {
        console.log('$viewContentLoaded - fired after dom rendered', event);
    });

    $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
        console.log('$stateNotFound ' + unfoundState.to + '  - fired when a state cannot be found by its name.');
        console.log(unfoundState, fromState, fromParams);
    });
}]);