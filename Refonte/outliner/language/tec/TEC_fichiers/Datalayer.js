
/**
 * Object containing methods and properties linked to Analytics
 */
var Analytics = Analytics || {};
/**
 * Object to use to implement datalayer functions
 */
Analytics.Datalayer = Analytics.Datalayer || {};





(function () {
    /**
     * Send tracking event for the visit of a page
     * @param pageName Titre de la page visitée
     */
    Analytics.Datalayer.TrackVirtualPageView = function (pageName) {
        if (window._satellite && window.__satelliteLoaded) {
            _satellite.track('virtualPageView', {
                pageName: pageName,
                userID: Cookies.GetUserId(),
                language: Cookies.GetUserLanguage(),
                connexionStatus: getConnexionStatus(),
                RGPD_analytics: Cookies.GetAnalyticsConsent() ? 1 : 0,
                RGPD_media: Cookies.GetMediaConsent() ? 1 : 0
            });
        }
    };

    var getConnexionStatus = function () {
        return Cookies.IsUserConnected() ? 'connected' : 'disconnected';
    }

})();