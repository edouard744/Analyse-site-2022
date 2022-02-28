var Cookies = Cookies || {};

(function () {
    Cookies.GetCookie = getCookie;
    Cookies.SetCookie = setCookie;
    Cookies.GetUserId = getUserId;
    Cookies.IsUserConnected = isUserConnected;
    Cookies.GetUserLanguage = getUserLanguage;
    Cookies.GetAnalyticsConsent = getAnalyticsConsent;
    Cookies.GetMediaConsent = getMediaConsent;
    Cookies.SaveRgpdCookies = saveRgpdCookies;

    Cookies.CookieBanner = {};
    Cookies.CookieBanner.DisplayBanner = displayCookieBanner;
    Cookies.CookieBanner.CloseBanner = closeCookieBanner;
    Cookies.CookieBanner.SubmitForm = saveRgpdCookies;

    function displayCookieBanner(gdprConsent) {
        var analytical = getAnalyticsConsent();
        var advertising = getMediaConsent();
        gdprConsent = gdprConsent ||
        {
            essential: true,
            functional: true,
            analytical: analytical,
            advertising: advertising
        };
        
        for (var cookie in gdprConsent) {
            if (gdprConsent.hasOwnProperty(cookie)) {
                $("#cookie-form-" + cookie).prop("checked", gdprConsent[cookie]);
            }
        }

        $("#cookieForm").submit(function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            saveRgpdCookies();
            closeCookieBanner();
        });
        $("#gdpr-cookie-accept").click(function () {
            $("#target").submit();
        });
        $("#gdpr-cookie-accept-all").click(function () {
            selectAll();
            $("#target").submit();
        });
        $("#gdpr-cookie-message").show();
        $("#cookie-form-analytical").focus();
    }

    function saveRgpdCookies() {
        var analyticsConsent = $("#cookie-form-analytical").is(":checked");
        var mediaConsent = $("#cookie-form-advertising").is(":checked");

        var prefs = {
            essential: true,
            functional: true,
            analytical: analyticsConsent,
            advertising: mediaConsent
        };
        setCookie('GDPR_Consent', JSON.stringify(prefs), 365);
    }

    function closeCookieBanner() {
        $("#gdpr-cookie-message").hide();
    }

    function getCookie(cookieName) {
        var name = cookieName + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function setCookie(name, value, expiry_days) {
        var d = new Date();
        d.setTime(d.getTime() + (expiry_days * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";domain=.letec.be;path=/";
        return getCookie(name);
    }

    function getUserId() {
        return getCookie('UserID');
    }

    function isUserConnected() {
        return !!getUserId();
    }

    function getUserLanguage() {
        var languageAndCulture = getCookie('language');
        return languageAndCulture ? languageAndCulture.substring(0, 2) : 'FR';
    }

    function getAnalyticsConsent() {
        var cookie = getCookie('GDPR_Consent');
        if (cookie !== null && cookie) {
            return JSON.parse(cookie).analytical;
        }
        return false;
    }

    function getMediaConsent() {
        var cookie = getCookie('GDPR_Consent');
        if (cookie !== null && cookie) {
            return JSON.parse(cookie).advertising;
        }
        return false;
    }

    function selectAll() {
        $('#gdpr-cookie-message input').each(function () {
            this.checked = true;
        });
    }
})();
