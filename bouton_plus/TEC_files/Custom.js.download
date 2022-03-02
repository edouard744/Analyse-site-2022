var connected = null;

var serviceNotAccepted = null;

var Base64 = { _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) { var t = ""; var n, r, i, s, o, u, a; var f = 0; e = Base64._utf8_encode(e); while (f < e.length) { n = e.charCodeAt(f++); r = e.charCodeAt(f++); i = e.charCodeAt(f++); s = n >> 2; o = (n & 3) << 4 | r >> 4; u = (r & 15) << 2 | i >> 6; a = i & 63; if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 } t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a) } return t }, decode: function (e) { var t = ""; var n, r, i; var s, o, u, a; var f = 0; e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); while (f < e.length) { s = this._keyStr.indexOf(e.charAt(f++)); o = this._keyStr.indexOf(e.charAt(f++)); u = this._keyStr.indexOf(e.charAt(f++)); a = this._keyStr.indexOf(e.charAt(f++)); n = s << 2 | o >> 4; r = (o & 15) << 4 | u >> 2; i = (u & 3) << 6 | a; t = t + String.fromCharCode(n); if (u != 64) { t = t + String.fromCharCode(r) } if (a != 64) { t = t + String.fromCharCode(i) } } t = Base64._utf8_decode(t); return t }, _utf8_encode: function (e) { e = e.replace(/\r\n/g, "\n"); var t = ""; for (var n = 0; n < e.length; n++) { var r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) { t += String.fromCharCode(r >> 6 | 192); t += String.fromCharCode(r & 63 | 128) } else { t += String.fromCharCode(r >> 12 | 224); t += String.fromCharCode(r >> 6 & 63 | 128); t += String.fromCharCode(r & 63 | 128) } } return t }, _utf8_decode: function (e) { var t = ""; var n = 0; var r = c1 = c2 = 0; while (n < e.length) { r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r); n++ } else if (r > 191 && r < 224) { c2 = e.charCodeAt(n + 1); t += String.fromCharCode((r & 31) << 6 | c2 & 63); n += 2 } else { c2 = e.charCodeAt(n + 1); c3 = e.charCodeAt(n + 2); t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63); n += 3 } } return t } }

function getCookie(cname) {
    var name = cname + "=";
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

var realTimeSetTimeout = [];

function clearAllRealTimeTimeout() {
    for (var i = 0; i < realTimeSetTimeout.length; i++) {
        clearTimeout(realTimeSetTimeout[i]);
    }
    realTimeSetTimeout = [];
}

//Detect IOS devices
function iOS() {

    var iDevices = [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ];

    if (!!navigator.platform) {
        while (iDevices.length) {
            if (navigator.platform === iDevices.pop()) { return true; }
        }
    }

    return false;
}

// GLOBAL
function InitComponents(divBlock) {
    COMPONENTS.forEach(function (component) {
        requestAnimationFrame(function () {
            if ($(divBlock).hasClass(component.el.substring(1))) {
                const instance = new window.components[component.id]({ el: divBlock });
                instance.init();
            }
            $(divBlock).find(component.el).each(function (i, el) {
                try {
                    const $el = $(el);
                    const instance = new window.components[component.id]({ el: $el });
                    instance.init();
                }
                catch (err) {
                    console.log(divBlock + err.message);
                }
            });
        });
    });
}
// GLOBAL

// Global search
function GlobalSearch_init() {
    var searchInput = document.getElementById('site-search-input');
    var siteSearch = document.getElementById('site-search');
    var jqXHR;
    var timeout;

    $("#site-search-input").off("keypress").on('keypress', function (e) {
        if (e.which == 13) {
            $('#site-search .close-search').click();
        }
    });

    $(siteSearch).find('form').submit(function (event) {
        event.preventDefault();
        if (timeout != undefined)
            clearTimeout(timeout);
        $.event.trigger({
            type: 'GlobalSearch',
            Keywords: $(searchInput).val()
        });
    });

    searchInput.addEventListener('focus', function (evt) {
        siteSearch.classList.add('is-focus');
    });

    searchInput.addEventListener('blur', function (evt) {
        siteSearch.classList.remove('is-focus');
    });

    searchInput.addEventListener('input', function (evt) {
        var el = this;
        var value = this.value;

        timeout = setTimeout(function () {
            if (value == el.value) {
                if (jqXHR != undefined)
                    jqXHR.abort();
                jqXHR = $.ajax({
                    type: 'POST',
                    url: "/Home/SearchDropDown",
                    data: {
                        Keywords: value
                    },
                    success: function (returnData) {
                        if (value == el.value) {
                            $(siteSearch).find('.site-search-result.js-site-search-results .container').html(returnData)
                            siteSearch.classList.add('is-filled');
                            $('.site-search-result.js-site-search-results a').off('click').on('click', function () {
                                $('#site-search .close-search').click();
                            });
                        }
                    }
                })
            }
        }, 500);
    });
}
// Global search

// Advertisement
function fillAdvertisement(blockID, container, duration) {
    if (blockID) {
        $(container).find('.pub-container').hide();
        $(container).find('.pub-container').load("/Pub/GetLast?ID=" + blockID, function () {
            if (duration > 1) {
                setTimeout(function () {
                    $(container).find('.pub-container').show();
                }, duration)
            } else
                $(container).find('.pub-container').show();
        });
    }
}
// Advertisement

//CGU
var cguPopup = null;
var cguPopupClass = null;
function ShowCGUPopup(next, p1) {
    $.ajax({
        type: 'GET',
        url: "User/UserDisclaimer",
        success: function (returnData) {
            $("#cgu-popup").remove();

            if (returnData == 'ERROR') {
                $('#server-error').removeClass('is-empty is-error').addClass('is-error');
            }
            else {
                if (null != loginPopup) {
                    loginPopup.close();
                }
                $("body").append(returnData);
                cguPopup = new window.Popup({ template: 'cgu-popup' });
                cguPopup.show();
                cguPopupClass = new window.components.Cgu();
                BindFormCGU(next, p1);
                $('.js-popup-close').off('click').on('click', function () {
                    if (null != cguPopup) {
                        cguPopup.close();
                        ShowLoginPopup(next, p1);
                    }
                });
            }
        }
    });
}
function BindFormCGU(next, p1) {
    $('#frmDisclaimer').submit(function (event) {
        event.preventDefault();
        $.ajax({
            type: 'POST',
            url: "/User/DisclaimerAccepted",
            data: $('#frmDisclaimer').serialize(),
            success: function (data) {
                if (null != cguPopup) {
                    cguPopup.close();
                    $("#cgu-popup").remove();
                }
                if (data == 'SUCCESS') {
                    if (typeof next !== 'undefined' && next) {
                        if (typeof p1 !== 'undefined' && p1) {
                            next(p1);
                        } else {
                            next();
                        }
                        if (next === redirect) {
                            return;
                        }
                    }
                    location.reload();
                }
                else {
                    ShowLoginPopup(next, p1);
                    $('#server-error').removeClass('is-empty is-error').addClass('is-error');
                }
            }
        });
    });
}
//CGU

// Login

function redirect(url) {
    window.location = url;
}

var loginPopup = null;
function ShowLoginPopup(next, p1) {
    loginPopup = new window.Popup({ template: 'login-popup' });
    loginPopup.show();
    BindFormLogin(next, p1);
    $('.login-popup-close').off('click').on('click', function () {
        loginPopup.close();
    });
}
function BindFormLogin(next, p1) {
    var nbrTentative = 9;
    var passwordSent = "";
    var loginSent = "";
    $('#frmLogin').submit(function (event) {
        event.preventDefault();

        passwordSent = $('#frmLogin').serializeArray().find(function (p) { return p.name === 'Password' }).value;
        loginSent = $('#frmLogin').serializeArray().find(function (p) { return p.name === 'UserName' }).value;

        $.ajax({
            type: 'POST',
            url: "/User/TecLogOn",
            data: $('#frmLogin').serialize(),
            success: function (data) {
                data = data.toUpperCase();
                $('#frmLogin .ui-form-message').removeClass('is-empty is-error').addClass('is-empty');
                $('#frmLogin .field-message').hide();
                $('.ui-form-field').removeClass('is-error');
                if (data == 'SUCCESS') {
                    if (typeof next !== 'undefined' && next) {
                        if (typeof p1 !== 'undefined' && p1) {
                            next(p1);
                        } else {
                            next();
                        }
                        if (next === redirect) {
                            return;
                        }
                    }

                    location.reload();
                } else {
                    if (data == 'USERDISCLAIMER') {

                        ShowCGUPopup(next, p1);
                        //$.event.trigger({
                        //    type: 'GoToUserDisclaimer',
                        //    ReturnUrl: Base64.encode(typeof p1 !== 'undefined' && p1 ? p1 : window.location.href)
                        //});
                        return;
                    }
                    if (data == 'ID' || data == 'PWD' || data.split('|')[0] === 'PWD') {
                        var identifiantId = '#field-pseudo';
                        $(identifiantId).addClass('is-error');
                        $(identifiantId).find('.field-message').show();
                        var passwordId = '#field-pwd';
                        $(passwordId).addClass('is-error');
                        $(passwordId).find('.field-message').show();
                        var messageElement = $("#wrong-password-message");
                        messageElement.removeClass('is-empty is-error').addClass('is-error');
                        var count = data.split('|')[1] || nbrTentative--;   // If login is wrong => let's make user think it might not have been
                        $("#password-try-left").html("<b>" + count + "</b>")
                        if (nbrTentative < 0) {
                            $('#login-submit-button').attr('disabled', true);
                        }
                        return;
                    }
                    if (data.split('|')[0] === 'MAIL') {
                        $("#email-not-validated").html((data.split('|')[1]).toLowerCase());
                        sessionStorage.setItem('loginInfo', angular.toJson({
                            email: (data.split('|')[1]).toLowerCase(),
                            password: passwordSent,
                            login: loginSent
                        }));
                        var elId = '#inactive-account-message';
                        $(elId).removeClass('is-empty is-error').addClass('is-error');
                        return;
                    }
                    if (data == 'PDFNOTAPPROVED') {
                        if (null != loginPopup) {
                            loginPopup.close();
                        }
                        $.event.trigger({
                            type: 'GoToPdfNotApproved'
                        });
                        return;
                    }
                    if (data === 'BLOCKED') {
                        $('#blocked-account-message').removeClass('is-empty is-error').addClass('is-error');
                        return;
                    }
                    if (data === 'ERROR') {
                        $('#server-error').removeClass('is-empty is-error').addClass('is-error');
                        return;
                    }
                    if (data === 'WAITINGADMINISTRATOR') {
                        $('#waiting-admin-message').removeClass('is-empty is-error').addClass('is-error');
                        return;
                    }
                    if (data === 'TEMPORARYACCOUNT') {
                        $('#temporary-account-message').removeClass('is-empty is-error').addClass('is-error');
                        return;
                    }
                    if (data === 'USER_DELETED') {
                        $('#user-deleted-message').removeClass('is-empty is-error').addClass('is-error');
                        return;
                    }
                    if (data.split('|')[0] === 'MIGRATEDACCOUNTNOTVALIDATED') {
                        $("#migrated-email-not-validated").html((data.split('|')[1]).toLowerCase());
                        sessionStorage.setItem('loginInfo', angular.toJson({
                            email: (data.split('|')[1]).toLowerCase(),
                            password: passwordSent,
                            login: loginSent
                        }));
                        var elId = '#inactive-account-message';
                        $('#migrated-not-validated-message').removeClass('is-empty is-error').addClass('is-error');
                        return;
                    }

                }
            }
        });
    });
}
// Login

// Logout
function LogOff() {
    $.ajax({
        type: 'POST',
        url: "/User/TecLogOff",
        data: {},
        success: function () {
            window.location = "/";
        }
    })
}

// Register
function RegisterForm_init() {

    var form = document.getElementById('frmRegister');
    var formKlass = new window.components['FormValidation']({ el: form });
    formKlass.init();

    $('#frmRegister').submit(function (event) {

        event.preventDefault();

        if (!formKlass.validate()) {
            return;
        }

        $.ajax({
            type: 'POST',
            url: $(this).attr('action'),
            data: $(this).serialize(),
            success: function (returnData) {
                if (typeof returnData === 'object') {
                    if (returnData != null && !returnData.IsValid) {
                        $.each(returnData.Errors,
                            function (i) {
                                var elem = $("#" + returnData.Errors[i]);
                                var parent;
                                if (elem.hasClass("js-select")) {
                                    parent = elem.parent().parent();
                                    if (!parent.hasClass("ui-form-field")) {
                                        parent = parent.parent();
                                    }
                                } else {
                                    parent = elem.parent();
                                }

                                if (parent.hasClass("ui-form-field")) {
                                    parent.addClass("is-error");
                                }
                            });
                    }

                    if (returnData != null && returnData.Error != undefined) {
                        $('#register-error-container').removeClass('is-empty').addClass('is-error');
                        $('#register-error-message').html(returnData.Error);
                    }

                } else {
                    $('#main-content-div').html(returnData);
                }
                $(window).scrollTop(0);
            }
        });
    });
}
// Register

// Register Rights
function RegisterRightsForm_init() {

    var form = document.getElementById('frmRegisterRights');
    var formKlass = new window.components['FormValidation']({ el: form });
    formKlass.init();

    $('#frmRegisterRights').submit(function (event) {


        event.preventDefault();

        if (!formKlass.validate()) {
            return;
        }

        $.ajax({
            type: 'POST',
            url: $(this).attr('action'),
            data: $(this).serialize(),
            success: function (returnData) {
                if (typeof returnData === 'object') {
                    $('#register-error-container').removeClass('is-empty').addClass('is-error');
                    $('#register-error-message').html(returnData.Error);
                } else {
                    $('#main-content-div').html(returnData);
                }
                $(window).scrollTop(0);
            }
        });
    });
}
// Register Rights


// Register Rights


// Jobs Index
function JobsIndexResult_Init() {
    $(".pageNumber").off("click").on("click", function () {
        $("input[name='Pagination.CurrentPage']").val($(this).html())
        $('#frmJobsIndex').submit();
    })
}

function JobsIndex_init() {
    InitComponents($("#jobsContainer"));
    $('#frmJobsIndex').submit(submitJobsIndex);
    $('#frmJobsIndex').submit();
    $("#frmJobsIndex").off("change").on("change", function (e) {
        $('#frmJobsIndex').submit();
    })
}

function submitJobsIndex(event) {
    event.preventDefault();
    $("#jobsWrapper").load("/Job/Search", $(event.target).serialize())
}
// Jobs Index

// News Index
//function NewsIndexResult_Init()
//{        
//    $(".pageNumber").off("click").on("click", function () {
//        $("input[name='Pagination.CurrentPage']").val($(this).html())
//        $('#frmNewsIndex').submit();
//    })
//}

function NewsIndex_init() {
    InitComponents($("#newsContainer"));
    //$('#frmNewsIndex').submit(submitNewsIndex);
    //$('#frmNewsIndex').submit();
    //$("#frmNewsIndex").off("change").on("change", function (e) {
    //    $('#frmNewsIndex').submit();
    //})
}
function submitNewsIndex(event) {
    //event.preventDefault();
    ////$("#newsWrapper").load("/News/Search", $(event.target).serialize())
    //var parms = $(event.target).serializeArray();
    //$.ajax({
    //    url: "/News/Search", 
    //    type: "POST",
    //    data: parms, 
    //    complete: function(data){
    //        $("#newsWrapper").empty();
    //        $("#newsWrapper").append(data.responseText);
    //    }
    //});
    //debugger;
    //loadContent($("#newsWrapper"), "/News/Search", parms);

}
// News Index

// 3 Cards news
function ThreeCardNews_init(typeTec) {
    typeTec = typeTec != undefined ? typeTec : '';
    $("#threeCardsNews").load("/News/SearchLast", { TypeTec: typeTec }, function (response, status, xhr) {
        InitComponents($("#threeCardsNews"));
        $("#frm3Cards").off("change").on("change", function (e) {
            ThreeCardNews_init($("#typetec-container").val());
        })
    });
}
// 3 Cards news

// InfoTraffic Carrousel Widget
function InfoTrafficCarousel_init() {
    $("#perturbation-container").load("/Perturbation/SearchLast", {}, function () {
        InitComponents($("#info-carousel"));
    });
}
// InfoTraffic Carrousel Widget

// HistorySearchForm
function HistorySearchForm_Init(View) {

    $("#historyWrapper").load("/History/Index", { View: View, Type: "Itinerary" }, function () {
        //HistorySearchForm_BindDeleteHistoryButtons("ItineraryHistoryWidgetResult", "Itinerary");
        HistorySearchForm_BindItineraryLinkButtons();
    });
    //document.getElementById("historyButton").addEventListener("click", function (evt) {
    //    $("#historyWrapper").load("/History/Index", { View: "ItineraryHistoryWidgetResult", Type: "Itinerary" }, function () {
    //        //HistorySearchForm_BindDeleteHistoryButtons("ItineraryHistoryWidgetResult", "Itinerary");
    //        HistorySearchForm_BindItineraryLinkButtons();
    //    });
    //});
    $(".itinerary-result-delete").off("click").on("click", function (evt)
    {
        navigationHistory.deleteHistory($(this).attr("data-key"), $(this).attr("data-index"));
        $(this).remove();
    });

    $("#clearHistory").off("click").on("click", function (evt) {
        navigationHistory.deleteHistory('Itinerary');
        $("#historyWrapper").empty();
        //$("#historyWrapper").load("/History/Index", { View: "ItineraryHistoryWidgetResult", Type: "Itinerary", clear: true }, function () {
        //    HistorySearchForm_BindDeleteHistoryButtons("ItineraryHistoryWidgetResult", "Itinerary");
        //    HistorySearchForm_BindItineraryLinkButtons();
        //})
    });
}

//function HistorySearchForm_BindDeleteHistoryButtons(view, whatBind) {
//    $(".itinerary-result-delete").off("click").on("click", function (evt) {
//        evt.preventDefault();
//        $("#historyWrapper").load("/History/Delete", { View: view, Key: $(this).attr("data-key"), Type: whatBind }, function () {
//            HistorySearchForm_BindDeleteHistoryButtons(view, whatBind);
//            if (whatBind == "Itinerary")
//                HistorySearchForm_BindItineraryLinkButtons();
//            else if (whatBind == "Planning")
//                HistorySearchForm_BindPlanningLinkButtons();
//        })
//    })
//}

function HistorySearchForm_BindPlanningLinkButtons() {
    $(".itinerary-result-link").off("click").on("click", function (evt) {
        evt.preventDefault();
        var el = $(this);
        $("input#PlanningElementID").val(el.attr("data-ID"));
        $("input#PlanningElementType").val(el.attr("data-PlanningType"));
        $("input#planning-line-stop-input").val(el.attr("data-Name"));
        $('#frmSearchPlanning').submit();
    });
}

function HistorySearchForm_BindItineraryLinkButtons() {
    $(".itinerary-result-link").off("click").on("click", function (evt) {
        evt.preventDefault();
        var el = $(this);
        $("input#Origin-Latitude").val(el.attr("data-OriginLatitude"));
        $("input#Origin-Longitude").val(el.attr("data-OriginLongitude"));
        $("input#Destination-Latitude").val(el.attr("data-DestinationLatitude"));
        $("input#Destination-Longitude").val(el.attr("data-DestinationLongitude"));
        $("input#journey-from").val(el.attr("data-journeyfrom"));
        $("input#journey-to").val(el.attr("data-journeyto"));
        $('.itinerary-how-option').each(function () {
            if ($(this).prop('tagName') == 'OPTION') {
                var val = $(this).val();
                $(this).parent().parent().find('.c-select-options').children('button').each(function () {
                    if ($(this).attr('data-value') == val && ((!(el.attr("data-How").toLowerCase().indexOf(val) >= 0) && $(this).hasClass('is-active')) || (el.attr("data-How").toLowerCase().indexOf(val) >= 0 && !$(this).hasClass('is-active'))))
                        $(this).click();
                });
            }
            else {
                if (!(el.attr("data-How").toLowerCase().indexOf($(this).val()) >= 0)) {
                    $(this).remove();
                    var i = 0;
                    $('.itinerary-how-option').each(function () {
                        $(this).attr("name", "Parameters.SearchCriterions[12].Values[" + i + "]")
                        i++;
                    });
                }
            }
        });
        if ($('#itinerary-type').length) {
            $('#itinerary-type').parent().find('.c-select-options').children('button').each(function () {
                if ($(this).attr('data-value') == el.attr("data-Type"))
                    $(this).click()
            });
        }
        else {
            $('#frmSearchItinerary').append('<input type="hidden" name="Parameters.SearchCriterions[18].Name" value="Type" />')
            $('#frmSearchItinerary').append('<input type="hidden" name="Parameters.SearchCriterions[18].Value" value="' + el.attr("data-Type") + '" />')
        }
        $('#frmSearchItinerary').submit();
    })
}

//function HistoryItinerary_Init() {
//    $("#historyWrapper").load("/History/Index", { View: "ItineraryHistoryResult", Type: "Itinerary" }, function () {
//        HistorySearchForm_BindDeleteHistoryButtons("ItineraryHistoryResult", "Itinerary");
//        HistorySearchForm_BindItineraryLinkButtons();
//    });
//    document.getElementById("clearHistory").addEventListener("click", function (evt) {
//        $("#historyWrapper").load("/History/Index", { View: "ItineraryHistoryResult", Type: "Itinerary", clear: true }, function () {
//            HistorySearchForm_BindDeleteHistoryButtons("ItineraryHistoryResult", "Itinerary");
//            HistorySearchForm_BindItineraryLinkButtons();
//        })
//    });
//}

function HistoryPLanning_Init() {
    $("#historyWrapper").load("/History/Index", { View: "PlanningHistoryResult", Type: "Planning" }, function () {
        HistorySearchForm_BindDeleteHistoryButtons("PlanningHistoryResult", "Planning");
        HistorySearchForm_BindPlanningLinkButtons();
    });
    document.getElementById("clearHistory").addEventListener("click", function (evt) {
        $("#historyWrapper").load("/History/Index", { View: "PlanningHistoryResult", Type: "Planning", clear: true }, function () {
            HistorySearchForm_BindDeleteHistoryButtons("PlanningHistoryResult", "Planning");
            HistorySearchForm_BindPlanningLinkButtons();
        })
    });
}

// PlanningSearchForm
function PlanningSearchForm_init() {
    var inputAutoComplete = document.getElementById('planning-line-stop-input');
    var inputAutocompleteDropdown = document.getElementsByClassName('js-autocomplete-dropdown-line-stop-input')[0];
    var allDropdownButtons = inputAutocompleteDropdown.querySelectorAll("button");
    var sessionToken = null;

    inputAutoComplete.addEventListener('focusout', function (evt) {
        sessionToken = null;
        if (!($(evt.relatedTarget).hasClass("autocomplete-dropdown"))) {
            if ($(this).val().length && $(this).hasClass('autocomplete-is-visible'))
                $(this).next(".autocomplete-dropdown").find('.autocomplete-dropdown-option[data-type!="myLocation"]:first').click();

            this.classList.remove('autocomplete-is-visible');
        }
    });

    inputAutocompleteDropdown.addEventListener('focusout', function (evt) {
        sessionToken = null;
        if ($(inputAutoComplete).val().length && $(inputAutoComplete).hasClass('autocomplete-is-visible'))
            $(inputAutoComplete).next(".autocomplete-dropdown").find('.autocomplete-dropdown-option[data-type!="myLocation"]:first').click();
        inputAutoComplete.classList.remove('autocomplete-is-visible');
    });

    inputAutoComplete.addEventListener('focus', function (evt) {
        sessionToken = GetGuid();
        var value = this.value;
        PlanningSearchForm_callAutoCompleteContent(this, value, 0, sessionToken);
        this.classList.remove('autocomplete-is-visible');
    });

    inputAutoComplete.addEventListener('input', function (evt) {
        $('#PlanningElementID').val("");
        $('#PlanningElementType').val("");
        var value = this.value;
        PlanningSearchForm_callAutoCompleteContent(this, value, 200, sessionToken);
        this.classList.remove('autocomplete-is-visible');
    });

    $('#frmSearchPlanning').submit(function (event) {
        event.preventDefault();
        if ($('#frmSearchPlanning #planning-line-stop-input').val().length && $('#frmSearchPlanning #PlanningElementType').val().length && $('#frmSearchPlanning #PlanningElementID').val().length) {
            $('#frmSearchPlanning #planning-line-stop-input').css('color', '').closest('.ui-form-field').css('border-color', '')
            $('#frmSearchPlanning button[type="submit"]').addClass('is-loading');
            if ($('#frmSearchPlanning #PlanningElementType').val() == 'Line')
                navigationHistory.save(new navigationHistory.history(navigationHistory.historyType.LINE, $('#frmSearchPlanning #planning-line-stop-input').val(), $('#frmSearchPlanning #PlanningElementID').val()));
            else if (($('#frmSearchPlanning #PlanningElementType').val() == 'Stop'))
                navigationHistory.save(new navigationHistory.history(navigationHistory.historyType.STOP, $('#frmSearchPlanning #planning-line-stop-input').val(), $('#frmSearchPlanning #PlanningElementID').val()));

            $.event.trigger({
                type: 'PlanningSearch',
                planningType: $('#frmSearchPlanning #PlanningElementType').val(),
                id: $('#frmSearchPlanning #PlanningElementID').val(),
                name: $('#frmSearchPlanning #planning-line-stop-input').val().replace('+', '@@')
            })
        }
        else {
            $('#frmSearchPlanning #planning-line-stop-input').css('color', '#e73037').closest('.ui-form-field').css('border-color', '#e73037')
        }
    })

    PlanningSearchForm_bindItineraryPlaceOption($('#planning-line-stop-input'), $('#planning-line-stop-input').next('.autocomplete-dropdown'))
}

var jqXHR;
function PlanningSearchForm_callAutoCompleteContent(el, value, time, sessionToken) {
    setTimeout(function () {
        if (value == $(el).val()) {
            if (jqXHR != undefined)
                jqXHR.abort();
            jqXHR = $.ajax({
                url: "/Planning/SearchAjax", data: { Text: value, SessionToken: sessionToken }, type: 'POST',
                success: function (returnData) {
                    if (value == $(el).val()) {
                        $(el).removeClass('autocomplete-is-visible');
                        $(el).next(".autocomplete-dropdown").html(returnData);
                        $(document).off('BindAutocompleteOption').on('BindAutocompleteOption', function () {
                            PlanningSearchForm_bindItineraryPlaceOption(el, $(el).next(".autocomplete-dropdown"));
                        })
                    }
                },
                complete: function () {
                    if (value == $(el).val())
                        PlanningSearchForm_bindItineraryPlaceOption(el, $(el).next(".autocomplete-dropdown"));
                }
            });
        }
    }, time)
}
function PlanningSearchForm_bindItineraryPlaceOption(el, start) {
    $(start).find('.autocomplete-dropdown-option').off('click').on('click', function () {
        $(el).val($(this).data("name"));
        $('#PlanningElementID').val($(this).data("id"));
        $('#PlanningElementType').val($(this).data("type"));
        $(el).removeClass('autocomplete-is-visible')
    }).off('focus').on("focus", function () {
        $("#ResetPlanningButton").css("display", "block");

        if (!$(el).hasClass('autocomplete-is-visible'))
            $(el).addClass('autocomplete-is-visible');
    });
};

// ItinerarySearchForm / ItinerarySearchForm / ItinerarySearchForm
function ItinerarySearchForm_init() {

    var inputAutoCompleteFrom = document.getElementById('journey-from');
    var inputAutocompleteDropdown1 = document.getElementsByClassName('js-autocomplete-dropdown-journey-from')[0];
    var allDropdownButtons = inputAutocompleteDropdown1.querySelectorAll("button");
    var sessionTokenTo = null;

    inputAutoCompleteFrom.addEventListener('focusout', function (evt) {
        sessionTokenTo = null;
        if (!($(evt.relatedTarget).hasClass("autocomplete-dropdown"))) {
            if ($(this).val().length && $(this).hasClass('autocomplete-is-visible'))
                $(this).next(".autocomplete-dropdown").find('.autocomplete-dropdown-option[data-type!="myLocation"]:first').click();

            this.classList.remove('autocomplete-is-visible');
        }
    });

    inputAutocompleteDropdown1.addEventListener('focusout', function (evt) {
        sessionTokenTo = null;
        if ($(inputAutoCompleteFrom).val().length && $(inputAutoCompleteFrom).hasClass('autocomplete-is-visible'))
            $(inputAutoCompleteFrom).next(".autocomplete-dropdown").find('.autocomplete-dropdown-option[data-type!="myLocation"]:first').click();
        inputAutoCompleteFrom.classList.remove('autocomplete-is-visible');
    });

    inputAutoCompleteFrom.addEventListener('focus', function (evt) {
        sessionTokenTo = GetGuid();
        var value = this.value;
        ItinerarySearchForm_callAutoCompleteContent(this, value, 'Origin', 0, sessionTokenTo);
        this.classList.add('autocomplete-is-visible');
    });

    inputAutoCompleteFrom.addEventListener('input', function (evt) {
        $('#Origin-StopId').val("");
        $('#Origin-Latitude').val("");
        $('#Origin-Longitude').val("");
        var value = this.value;
        ItinerarySearchForm_callAutoCompleteContent(this, value, 'Origin', 200, sessionTokenTo);
    });

    var inputAutoCompleteTo = document.getElementById('journey-to');
    var inputAutocompleteDropdown = document.getElementsByClassName('js-autocomplete-dropdown-journey-to')[0];
    var resetOriginButton = document.getElementById('ResetOriginButton');
    var resetDestinationButton = document.getElementById('ResetDestinationButton');
    var allDropdownButtons = inputAutocompleteDropdown.querySelectorAll("button");
    var sessionTokenFrom = null;

    inputAutoCompleteTo.addEventListener('focusout', function (evt) {
        sessionTokenFrom = null;
        if (!($(evt.relatedTarget).hasClass("autocomplete-dropdown"))) {
            if ($(this).val().length && $(this).hasClass('autocomplete-is-visible'))
                $(this).next(".autocomplete-dropdown").find('.autocomplete-dropdown-option[data-type!="myLocation"]:first').click();

            this.classList.remove('autocomplete-is-visible');
        }
    });

    inputAutocompleteDropdown.addEventListener('focusout', function (evt) {
        sessionTokenFrom = null;
        if ($(inputAutoCompleteTo).val().length && $(inputAutoCompleteTo).hasClass('autocomplete-is-visible'))
            $(inputAutoCompleteTo).next(".autocomplete-dropdown").find('.autocomplete-dropdown-option[data-type!="myLocation"]:first').click();
        inputAutoCompleteTo.classList.remove('autocomplete-is-visible');
    });

    inputAutoCompleteTo.addEventListener('focus', function (evt) {
        sessionTokenFrom = GetGuid();
        var value = this.value;
        ItinerarySearchForm_callAutoCompleteContent(this, value, 'Destination', 0, sessionTokenFrom);
        this.classList.add('autocomplete-is-visible');
    });

    inputAutoCompleteTo.addEventListener('input', function (evt) {
        $('#Destination-StopId').val("");
        $('#Destination-Latitude').val("");
        $('#Destination-Longitude').val("");
        $('#journey-from').attr("data-geolocate", false);
        $('#journey-to').attr("data-geolocate", false);
        var value = this.value;
        ItinerarySearchForm_callAutoCompleteContent(this, value, 'Destination', 200, sessionTokenFrom);
    });

    resetOriginButton.addEventListener("click", function (evt) {
        $("#Origin-Longitude").val("");
        $("#Origin-Latitude").val("");
        $("#Origin-StopId").val("");
        $("#Origin-StreetName").val("");
        $("#Origin-Municipality").val("");
        $("#Origin-CivicNumber").val("");
        $('#journey-from').attr("data-geolocate", false);
    });

    resetDestinationButton.addEventListener("click", function (evt) {
        $("#Destination-Longitude").val("");
        $("#Destination-Latitude").val("");
        $("#Destination-StopId").val("");
        $("#Destination-StreetName").val("");
        $("#Destination-Municipality").val("");
        $("#Destination-CivicNumber").val("");
        $('#journey-to').attr("data-geolocate", false);
    });

    document.getElementById("reverseItineraries").addEventListener("click", function (evt) {

        ItinerarySearchForm_reverse('Origin-StopId', 'Destination-StopId');
        ItinerarySearchForm_reverse('Origin-StreetName', 'Destination-StreetName');
        ItinerarySearchForm_reverse('Origin-Municipality', 'Destination-Municipality');
        ItinerarySearchForm_reverse('Origin-CivicNumber', 'Destination-CivicNumber');
        ItinerarySearchForm_reverse('Origin-Latitude', 'Destination-Latitude');
        ItinerarySearchForm_reverse('Origin-Longitude', 'Destination-Longitude');
        ItinerarySearchForm_reverse('journey-from', 'journey-to');

    })

    $('#frmSearchItinerary').submit(function (event) {
        event.preventDefault();
        $('#frmSearchItinerary button[type="submit"]').addClass('is-loading');

        var journeyFrom = $("#frmSearchItinerary #journey-from").val();
        var journeyTo = $("#frmSearchItinerary #journey-to").val();
        var originStopID = $("#frmSearchItinerary #Origin-StopId").val();
        var destinationStopID = $("#frmSearchItinerary #Destination-StopId").val();
        var type = $("#itinerary-type").val();
        var how = $("#itinerary-how").val();


        var originLatitude = $("#frmSearchItinerary #Origin-Latitude").val();
        var originLongitude = $("#frmSearchItinerary #Origin-Longitude").val();
        var destinationLatitude = $("#frmSearchItinerary #Destination-Latitude").val();
        var destinationLongitude = $("#frmSearchItinerary #Destination-Longitude").val();

        var originGeolocate = $("#frmSearchItinerary #journey-from").data("geolocate");
        var destinationGeolocate = $("#frmSearchItinerary #journey-to").data("geolocate");
        if ((!originLatitude || !originLongitude || !destinationLatitude || !destinationLongitude)) {
            if (originGeolocate || destinationGeolocate) {
                $.ajax({
                    url: "/Home/TranslateMessage", data: { Message: "Impossible d'accéder à votre position", Component: "LocationDropdown" }, type: 'POST',
                    async: false,
                    success: function (returnData) {
                        if (returnData.length > 0) {
                            if (originGeolocate)
                                $("#frmSearchItinerary #journey-from").val(returnData);
                            if (destinationGeolocate)
                                $("#frmSearchItinerary #journey-to").val(returnData);
                        }
                        else {
                            if (originGeolocate)
                                $("#frmSearchItinerary #journey-from").val(returnData);
                            if (destinationGeolocate)
                                $("#frmSearchItinerary #journey-to").val(returnData);
                        }
                    }
                });
            }
            else {
                $("#ItineraryMessageLabelEmpty").show();
                $("#ItineraryMessageLabelSame").hide();
                $("#ItineraryMessageContainer").show();
                window.dispatchEvent(new CustomEvent('hero:resize'));
            }
            $('#frmSearchItinerary button[type="submit"]').removeClass('is-loading');
            return false
        }

        if ((originLatitude && originLongitude && destinationLatitude && destinationLongitude && originLatitude == destinationLatitude && originLongitude == destinationLongitude)) {
            $('#frmSearchItinerary button[type="submit"]').removeClass('is-loading');
            $("#ItineraryMessageLabelSame").show();
            $("#ItineraryMessageLabelEmpty").hide();
            $("#ItineraryMessageContainer").show();
            window.dispatchEvent(new CustomEvent('hero:resize'));
            return false
        }

        navigationHistory.save(new navigationHistory.history(navigationHistory.historyType.ITINERARY, journeyFrom, originStopID, originLatitude, originLongitude, journeyTo, destinationStopID, destinationLatitude, destinationLongitude, how, type));

        $.event.trigger({
            type: 'ItinerarySearch',
            parameters: $('#frmSearchItinerary').serialize(),
        })
    })
    $('#frmSearchFaresItinerary').submit(function (event) {
        event.preventDefault();

        $('#frmSearchFaresItinerary button[type="submit"]').addClass('is-loading');
        $.ajax({
            type: 'POST',
            url: $('#frmSearchFaresItinerary').attr('action'),
            data: $('#frmSearchFaresItinerary').serialize(),
            success: function () {
                $.event.trigger({ type: 'ItineraryFaresSearch' })
            }
        })
    })
    ItinerarySearchForm_bindItineraryPlaceOption($('#journey-from'), $('#journey-from').next('.autocomplete-dropdown'), 'Origin')
    ItinerarySearchForm_bindItineraryPlaceOption($('#journey-to'), $('#journey-to').next('.autocomplete-dropdown'), 'Destination')
}

function ItinerarySearchForm_reverse(inputFrom, inputTo) {

    var origin = $("#" + inputFrom).val();
    $("#" + inputFrom).val($("#" + inputTo).val());
    $("#" + inputTo).val(origin);

}

function ItinerarySearchForm_geoLocateInput(el, place) {
    this.objInput = el;
    this.place = place;
    this.getLocation = function () {

        $(this.objInput).attr("data-geolocate", true);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.bindPositionSuccess.bind(this), this.bindPositionError.bind(this));
        } else {
            $(this.objInput).val("La géolocalisation n'est pas supportée par votre navigateur.");
        }
    }

    this.bindPositionSuccess = function (position) {

        var objInput = $(this.objInput);
        if (position != undefined && position.coords != undefined && position.coords.latitude != undefined && position.coords.longitude != undefined) {
            $.ajax({
                url: "/Home/TranslateMessage", data: { Message: "Ma position actuelle", Component: "LocationDropdown" }, type: 'POST',
                async: false,
                success: function (returnData) {
                    if (returnData.length > 0) {
                        objInput.val(returnData);
                    }
                    else {
                        objInput.val("Ma position actuelle");
                    }
                }
            });
            $("#" + this.place + "-Latitude").val(position.coords.latitude);
            $("#" + this.place + "-Longitude").val(position.coords.longitude);
        } else {
            $.ajax({
                url: "/Home/TranslateMessage", data: { Message: "Impossible d'accéder à votre position", Component: "LocationDropdown" }, type: 'POST',
                async: false,
                success: function (returnData) {
                    if (returnData.length > 0) {
                        objInput.val(returnData);
                    }
                    else {
                        objInput.val("Impossible d'accéder à votre position");
                    }
                }
            });
        }
    }

    this.bindPositionError = function (error) {

        var objInput = $(this.objInput);
        $.ajax({
            url: "/Home/TranslateMessage", data: { Message: error.message, Component: "LocationDropdown" }, type: 'POST',
            async: false,
            success: function (returnData) {
                if (returnData.length > 0) {
                    $("#" + el.id).removeClass("autocomplete-is-visible");
                    objInput.val(returnData);
                }
                else {
                    $("#" + el.id).removeClass("autocomplete-is-visible");
                    objInput.val(error.message);
                }
            }
        });
    }
};

var jqXHR;
function ItinerarySearchForm_callAutoCompleteContent(el, value, place, time, sessionToken) {
    setTimeout(function () {
        if (value == $(el).val()) {
            if (jqXHR != undefined)
                jqXHR.abort();
            jqXHR = $.ajax({
                url: "/Itinerary/SearchAjax", data: { Text: value, SessionToken: sessionToken }, type: 'POST',
                success: function (returnData) {
                    if (value == $(el).val()) {
                        $(el).next(".autocomplete-dropdown").html(returnData);
                        $(document).off('BindAutocompleteOption').on('BindAutocompleteOption', function () {
                            ItinerarySearchForm_bindItineraryPlaceOption(el, $(el).next(".autocomplete-dropdown"), place);
                        })
                    }
                },
                complete: function () {
                    if (value == $(el).val())
                        ItinerarySearchForm_bindItineraryPlaceOption(el, $(el).next(".autocomplete-dropdown"), place);
                }
            });
        }
    }, time)
}
function ItinerarySearchForm_bindItineraryPlaceOption(el, start, place) {
    $(start).find('.autocomplete-dropdown-option').off('click').on('click', function () {
        $(el).attr("data-geolocate", false);
        $(el).val($(this).data("name"));
        $('#' + place + '-StopId').val($(this).data("id"));
        $('#' + place + '-Latitude').val($(this).data("lat"));
        $('#' + place + '-Longitude').val($(this).data("lng"));
        $(el).removeClass('autocomplete-is-visible')

        //fetch lng/lat si lat/lng vide
        var name = $(this).data("name");

        if ($(this).attr('data-placeid') && $(this).attr('data-sessiontoken'))
            getPlaceDetail($(this).data("placeid"), $(this).data("sessiontoken"), name, '#' + place + '-Latitude', '#' + place + '-Longitude');

        else if (($(this).data("lat") == "" || $(this).data("lng") == "") && !($(this).attr('data-type') != undefined && $(this).attr('data-type') === 'myLocation'))
            getLocation(name, '#' + place + '-Latitude', '#' + place + '-Longitude');

        else if ($(this).attr('data-type') != undefined && $(this).attr('data-type') === 'myLocation')
            new ItinerarySearchForm_geoLocateInput(el, place).getLocation();

    }).off('focus').on("focus", function () {
        if ($(el).attr("id") == "journey-from")
            $("#ResetOriginButton").css("display", "block");

        if ($(el).attr("id") == "journey-to")
            $("#ResetDestinationButton").css("display", "block");

        if (!$(el).hasClass('autocomplete-is-visible'))
            $(el).addClass('autocomplete-is-visible');
    });
};
// ItinerarySearchForm / ItinerarySearchForm / ItinerarySearchForm


function TrafficSearchForm_init(defaultText) {

    var inputAutoCompleteFrom = document.getElementById('journey-from');
    var lineID = document.getElementById('lineId');
    var stopID = document.getElementById('stopId');
    //var inputAutocompleteDropdown1 = document.getElementsByClassName('js-autocomplete-dropdown-journey-from')[0];
    var inputAutocompleteDropdown = document.getElementsByClassName('autocomplete-dropdown dropdown-menu')[0];
    var sessionToken = null;
    inputAutoCompleteFrom.addEventListener('focusout', function (evt) {
        sessionToken = null;
        if (!($(evt.relatedTarget).hasClass("autocomplete-dropdown"))) {
            if ($(this).val().length && $(this).hasClass('autocomplete-is-visible'))
                $(this).next(".autocomplete-dropdown").find('.autocomplete-dropdown-option[data-type!="myLocation"]:first').click();

            this.classList.remove('autocomplete-is-visible');

            setTimeout(function () {
                $(".c-select-option").removeClass("is-active");
                var ClassificationID = "";
                var ClassificationText = "";
                $(".c-select-option").each(function () {
                    if ($(this).attr("data-value").charAt(0) == $(lineID).val().charAt(0) || $(this).attr("data-value").charAt(0) == $(stopID).val().charAt(0)) {
                        ClassificationID = $(this).attr("data-value");
                        ClassificationText = $(this).text();
                    }
                });

                $("#ClassificationSelect").val(ClassificationID);
                $(".c-select-label").text(ClassificationText);
                $(".c-select-options").find("[data-value='" + ClassificationID + "']").addClass("is-active");

                if (ClassificationID == "") {
                    var Classifications = [];
                    $(".c-select-option").each(function () {
                        Classifications.push($(this).attr("data-value"));
                    });
                    $(".c-select-option").addClass("is-active");
                    $("#ClassificationSelect").val(Classifications);
                    $(".c-select-label").text(defaultText);
                }
            }, 100)
        }
    });

    inputAutocompleteDropdown.addEventListener('focusout', function (evt) {
        sessionToken = null;
        if ($(inputAutoCompleteFrom).val().length && $(inputAutoCompleteFrom).hasClass('autocomplete-is-visible'))
            $(inputAutoCompleteFrom).next(".autocomplete-dropdown").find('.autocomplete-dropdown-option[data-type!="myLocation"]:first').click();
        inputAutoCompleteFrom.classList.remove('autocomplete-is-visible');
    });

    inputAutoCompleteFrom.addEventListener('focus', function (evt) {
        sessionToken = GetGuid();
        var value = this.value;
        TrafficSearchForm_callAutoCompleteContent(this, value, 'Origin', 0, sessionToken);
        this.classList.add('autocomplete-is-visible');
    });

    inputAutoCompleteFrom.addEventListener('input', function (evt) {
        $("#stopId").val("");
        $("#lineId").val("");
        $('#Origin-Latitude').val("");
        $('#Origin-Longitude').val("");
        $('#Type').val("");
        $('#municipalityId').val("");
        var value = this.value;
        TrafficSearchForm_callAutoCompleteContent(this, value, 'Origin', 200, sessionToken);
    });

    $("#submitButton").off("click").on("click", function (e) {
        $("#CurrentPage").val(0);
    });

    $('#frmSearchTraffic').submit(function (event) {
        event.preventDefault();
        $.ajax({
            type: 'POST',
            url: $('#frmSearchTraffic').attr('action'),
            data: $('#frmSearchTraffic').serialize(),
            beforeSend: function () {
                $('#frmSearchTraffic button[type="submit"]').addClass('is-loading');
            },
            success: function (data) {
                $("#trafficWrapper").empty();
                $("#trafficWrapper").append(data);
                //$.event.trigger({ type: 'TrafficSearch' })
            },
            complete: function () {
                $('#frmSearchTraffic button[type="submit"]').removeClass('is-loading');

            }
        })
    })

    TrafficSearchForm_bindItineraryPlaceOption($('#journey-from'), $('#journey-from').next('.autocomplete-dropdown'), 'Origin')
    //TrafficSearchForm_bindItineraryPlaceOption($('#journey-to'), $('#journey-to').next('.autocomplete-dropdown'), 'Destination')
}

var jqXHR;
function TrafficSearchForm_callAutoCompleteContent(el, value, place, time, sessionToken) {
    setTimeout(function () {
        if (value == $(el).val()) {
            if (jqXHR != undefined)
                jqXHR.abort();
            jqXHR = $.ajax({
                url: "/Traffic/SearchAjax", data: { Text: value, SessionToken: sessionToken }, type: 'POST',
                success: function (returnData) {
                    if (value == $(el).val()) {
                        $(el).next(".autocomplete-dropdown").html(returnData);
                        $(document).off('BindAutocompleteOption').on('BindAutocompleteOption', function () {
                            TrafficSearchForm_bindItineraryPlaceOption(el, $(el).next(".autocomplete-dropdown"), place);
                        })
                    }
                },
                complete: function () {
                    if (value == $(el).val())
                        TrafficSearchForm_bindItineraryPlaceOption(el, $(el).next(".autocomplete-dropdown"), place);
                }
            });
        }
    }, time)
}

function TrafficSearchForm_bindItineraryPlaceOption(el, start, place) {
    $(start).find('.autocomplete-dropdown-option').off('click').on('click', function () {
        $("#stopId").val("");
        $("#lineId").val("");
        $('#Origin-Latitude').val("");
        $('#Origin-Longitude').val("");
        $('#Type').val("");
        $('#municipalityId').val("");

        var type = $(this).data("type");
        if (type) {
            switch (type) {
                case "Stop":
                    $("#stopId").val($(this).data("id"));
                    break;
                case "Line":
                    $("#lineId").val($(this).data("id"));
                    break;
                case "Ville":
                    $("#municipalityId").val($(this).data("id"));
                    break;
                default:
            }
        }
        $('#Origin-Latitude').val($(this).data("lat"));
        $('#Origin-Longitude').val($(this).data("lng"));
        $('#journey-from').val($(this).data("name"));


        //fetch lng/lat si lat/lng vide
        if (($(this).data("lat") == "" || $(this).data("lng") == "") && !($(this).attr('data-type') != undefined && $(this).attr('data-type') === 'myLocation')) {
            $.ajax({
                type: 'POST',
                url: "/AutocompleteZone/SearchLocation",
                data: {
                    Text: $(this).data("name")
                },
                success: function (returnData) {
                    $('#Origin-Latitude').val(returnData.Lat);
                    $('#Origin-Longitude').val(returnData.Lng);
                }
            });
        }

        $('#Type').val(type);
        //$('#journey-from').val($(this).data('name'));
        $(el).removeClass('autocomplete-is-visible')

        if ($(this).attr('data-type') != undefined && $(this).attr('data-type') === 'myLocation') { new ItinerarySearchForm_geoLocateInput(el, place).getLocation(); }
    }).off("focus").on("focus", function () {
        if (!$(el).hasClass('autocomplete-is-visible'))
            $(el).addClass('autocomplete-is-visible');
    });
};

// PointOfSale

function PointOfSaleSearchForm_init() {
    var inputAutoCompleteFrom = document.getElementById('address-input');
    var inputAutocompleteDropdown = document.getElementsByClassName('js-autocomplete-dropdown-address-input')[0];
    var allDropdownButtons = inputAutocompleteDropdown.querySelectorAll("button");
    var sessionToken = null;


    inputAutoCompleteFrom.addEventListener('focusout', function (evt) {
        sessionToken = null;
        if (!($(evt.relatedTarget).hasClass("autocomplete-dropdown"))) {
            if ($(this).val().length && $(this).hasClass('autocomplete-is-visible'))
                $(this).next(".autocomplete-dropdown").find('.autocomplete-dropdown-option[data-type!="myLocation"]:first').click();

            this.classList.remove('autocomplete-is-visible');
        }
    });

    inputAutocompleteDropdown.addEventListener('focusout', function (evt) {
        sessionToken = null;
        if ($(inputAutoCompleteFrom).val().length && $(inputAutoCompleteFrom).hasClass('autocomplete-is-visible'))
            $(inputAutoCompleteFrom).next(".autocomplete-dropdown").find('.autocomplete-dropdown-option[data-type!="myLocation"]:first').click();
        inputAutoCompleteFrom.classList.remove('autocomplete-is-visible');
    });

    inputAutoCompleteFrom.addEventListener('focus', function (evt) {
        sessionToken = GetGuid();
        var value = this.value;
        PointOfSaleSearchForm_callAutoCompleteContent(this, value, 'Origin', 0, sessionToken);
        this.classList.remove('autocomplete-is-visible');
    });

    inputAutoCompleteFrom.addEventListener('input', function (evt) {
        this.classList.remove('autocomplete-is-visible');
        $('#Nearby-Latitude').val("");
        $('#Nearby-Longitude').val("");
        var value = this.value;
        PointOfSaleSearchForm_callAutoCompleteContent(this, value, 'Origin', 200, sessionToken);
    });

    $('#frmSearchPointOfSale').submit(function (event) {
        $('#frmSearchPointOfSale button[type="submit"]').addClass('is-loading');
        event.preventDefault();
        $.ajax({
            type: 'POST',
            url: $('#frmSearchPointOfSale').attr('action'),
            data: $('#frmSearchPointOfSale').serialize(),
            success: function () {
                $.event.trigger({ type: 'NearbySearch' })
            }
        })
    })

    PointOfSaleSearchForm_bindItineraryPlaceOption($('#address-input'), $('#address-input').next('.autocomplete-dropdown'), 'Nearby')
}

var jqXHR;
function PointOfSaleSearchForm_callAutoCompleteContent(el, value, place, time, sessionToken) {
    setTimeout(function () {
        if (value == $(el).val()) {
            if (jqXHR != undefined)
                jqXHR.abort();
            jqXHR = $.ajax({
                url: "/PointOfSale/SearchAjax", data: { Text: value, SessionToken: sessionToken }, type: 'POST',
                success: function (returnData) {
                    if (value == $(el).val()) {
                        $(el).removeClass('autocomplete-is-visible');
                        $(el).next(".autocomplete-dropdown").html(returnData);
                        $(document).off('BindAutocompleteOption').on('BindAutocompleteOption', function () {
                            PointOfSaleSearchForm_bindItineraryPlaceOption(el, $(el).next(".autocomplete-dropdown"), place);
                        })
                    }
                },
                complete: function () {
                    if (value == $(el).val())
                        PointOfSaleSearchForm_bindItineraryPlaceOption(el, $(el).next(".autocomplete-dropdown"), place);
                }
            });
        }
    }, time)
}

function PointOfSaleSearchForm_bindItineraryPlaceOption(el, start, place) {
    $(start).find('.autocomplete-dropdown-option').off('click').on('click', function () {
        $(el).val($(this).data("name"));
        //$('#IDTraffic').val($(this).data("id"));
        $('#Nearby-Latitude').val($(this).data("lat"));
        $('#Nearby-Longitude').val($(this).data("lng"));
        //$('#Type').val($(this).data("type"));

        //fetch lng/lat si lat/lng vide
        if ($(this).attr('data-placeid') && $(this).attr('data-sessiontoken'))
            getPlaceDetail($(this).data("placeid"), $(this).data("sessiontoken"), $(this).data("name"), '#Nearby-Latitude', '#Nearby-Longitude');

        else if (($(this).data("lat") == "" || $(this).data("lng") == "") && !($(this).attr('data-type') != undefined && $(this).attr('data-type') === 'myLocation'))
            getLocation(name, '#Nearby-Latitude', '#Nearby-Longitude');

        $(el).removeClass('autocomplete-is-visible')
    }).off('focus').on("focus", function () {
        if (!$(el).hasClass('autocomplete-is-visible'))
            $(el).addClass('autocomplete-is-visible');
    });
};



function GetGuid() {
    //// return uuid of form xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
    var uuid = '', ii;
    for (ii = 0; ii < 32; ii += 1) {
        switch (ii) {
            case 8:
            case 20:
                uuid += '-';
                uuid += (Math.random() * 16 | 0).toString(16);
                break;
            case 12:
                uuid += '-';
                uuid += '4';
                break;
            case 16:
                uuid += '-';
                uuid += (Math.random() * 4 | 8).toString(16);
                break;
            default:
                uuid += (Math.random() * 16 | 0).toString(16);
        }
    }
    return uuid;

};
//NearbySearchForm
function NearbySearchForm_init() {

    var inputAutoCompleteFrom = document.getElementById('nearby-from');
    var inputAutocompleteDropdown = document.getElementsByClassName('js-autocomplete-dropdown-address-input')[0];
    var allDropdownButtons = inputAutocompleteDropdown.querySelectorAll("button");
    var sessionToken = null;

    inputAutoCompleteFrom.addEventListener('focusout', function (evt) {
        sessionToken = null;
        if (!($(evt.relatedTarget).hasClass("autocomplete-dropdown"))) {
            if ($(this).val().length && $(this).hasClass('autocomplete-is-visible'))
                $(this).next(".autocomplete-dropdown").find('.autocomplete-dropdown-option[data-type!="myLocation"]:first').click();

            this.classList.remove('autocomplete-is-visible');
        }
    });

    inputAutocompleteDropdown.addEventListener('focusout', function (evt) {
        sessionToken = null;
        if ($(inputAutoCompleteFrom).val().length && $(inputAutoCompleteFrom).hasClass('autocomplete-is-visible'))
            $(inputAutoCompleteFrom).next(".autocomplete-dropdown").find('.autocomplete-dropdown-option[data-type!="myLocation"]:first').click();
        inputAutoCompleteFrom.classList.remove('autocomplete-is-visible');
    });

    inputAutoCompleteFrom.addEventListener('focus', function (evt) {
        sessionToken = GetGuid();
        var value = this.value;
        NearbySearchForm_callAutoCompleteContent(this, value, 'Origin', 0, sessionToken);
        this.classList.add('autocomplete-is-visible');
    });

    inputAutoCompleteFrom.addEventListener('input', function (evt) {

        $('#frmSearchNearby #IDNearby').val("");
        $('#frmSearchNearby #Nearby-Latitude').val("");
        $('#frmSearchNearby #Nearby-Longitude').val("");
        $('#frmSearchNearby #Type').val("");
        $("#frmSearchNearby #nearby-from").attr("data-geolocate", false);
        var value = this.value;
        NearbySearchForm_callAutoCompleteContent(this, value, 'Origin', 200, sessionToken);
    });

    $('#frmSearchNearby').submit(function (event) {
        $('#frmSearchNearby button[type="submit"]').addClass('is-loading');
        event.preventDefault();
        var originName = $("#frmSearchNearby #nearby-from").val();
        var originLatitude = $("#frmSearchNearby #Nearby-Latitude").val();
        var originLongitude = $("#frmSearchNearby #Nearby-Longitude").val();
        var originGeolocate = $("#frmSearchNearby #nearby-from").data("geolocate");
        var IDNearby = $("#frmSearchNearby #IDNearby").val();
        //var Type = $("#frmSearchNearby #Type").val();

        if ((!originLatitude || !originLongitude)) {
            if (originGeolocate) {
                $.ajax({
                    url: "/Home/TranslateMessage", data: { Message: "Impossible d'accéder à votre position", Component: "LocationDropdown" }, type: 'POST',
                    async: false,
                    success: function (returnData) {
                        if (returnData.length > 0) {
                            $("#frmSearchNearby #nearby-from").val(returnData);
                        }
                        else {
                            $("#frmSearchNearby #nearby-from").val(returnData);
                        }
                    }
                });
            }
            else {
                $("#frmSearchNearby #ErrorMessageContainer").show();
                $("#frmSearchNearby #Error1").show();
                $("#frmSearchNearby #Error2").hide();
                window.dispatchEvent(new CustomEvent('hero:resize'));
            }
            $('#frmSearchNearby button[type="submit"]').removeClass('is-loading');
            return false;
        }

        $.ajax({
            type: 'POST',
            url: $('#frmSearchNearby').attr('action'),
            data: $('#frmSearchNearby').serialize(),
            success: function ()
            {
                if (!originGeolocate)
                    navigationHistory.save(new navigationHistory.history(navigationHistory.historyType.NEARBY, originName, IDNearby, originLatitude, originLongitude));

                $.event.trigger({ type: 'NearbySearch' })
            }
        })
    })

    NearbySearchForm_bindItineraryPlaceOption($('#nearby-from'), $('#nearby-from').next('.autocomplete-dropdown'), 'Nearby')
}


var jqXHR;
function NearbySearchForm_callAutoCompleteContent(el, value, place, time, sessionToken) {
    setTimeout(function () {
        if (value == $(el).val()) {
            if (jqXHR != undefined)
                jqXHR.abort();
            jqXHR = $.ajax({
                url: "/Nearby/SearchAjax", data: { Text: value, SessionToken: sessionToken }, type: 'POST',
                success: function (returnData) {
                    if (value == $(el).val()) {
                        $(el).next(".autocomplete-dropdown").html(returnData);
                        $(document).off('BindAutocompleteOption').on('BindAutocompleteOption', function () {
                            NearbySearchForm_bindItineraryPlaceOption(el, $(el).next(".autocomplete-dropdown"), place);
                        })
                    }
                },
                complete: function () {
                    if (value == $(el).val())
                        NearbySearchForm_bindItineraryPlaceOption(el, $(el).next(".autocomplete-dropdown"), place);
                }
            });
        }
    }, time)
}

function NearbySearchForm_geoLocateInput(el, place) {
    this.objInput = el;
    this.place = place;

    this.getLocation = function () {

        $(this.objInput).attr("data-geolocate", true);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.bindPositionSuccess.bind(this), this.bindPositionError.bind(this));
        } else {
            $(this.objInput).val("La géolocalisation n'est pas supportée par votre navigateur.");
        }
    }

    this.bindPositionSuccess = function (position) {
        var objInput = $(this.objInput);
        if (position != undefined && position.coords != undefined && position.coords.latitude != undefined && position.coords.longitude != undefined) {
            $.ajax({
                url: "/Home/TranslateMessage", data: { Message: "Ma position actuelle", Component: "LocationDropdown" }, type: 'POST',
                async: false,
                success: function (returnData) {
                    if (returnData.length > 0) {
                        objInput.val(returnData);
                    }
                    else {
                        objInput.val("Ma position actuelle");
                    }
                }
            });
            $("#frmSearchNearby #Nearby-Latitude").val(position.coords.latitude);
            $("#frmSearchNearby #Nearby-Longitude").val(position.coords.longitude);
        } else {
            $.ajax({
                url: "/Home/TranslateMessage", data: { Message: "Impossible d'accéder à votre position", Component: "LocationDropdown" }, type: 'POST',
                async: false,
                success: function (returnData) {
                    if (returnData.length > 0) {
                        objInput.val(returnData);
                    }
                    else {
                        objInput.val("Impossible d'accéder à votre position");
                    }
                }
            });
        }
    }

    this.bindPositionError = function (error) {
        var objInput = $(this.objInput);
        $.ajax({
            url: "/Home/TranslateMessage", data: { Message: error.message, Component: "LocationDropdown" }, type: 'POST',
            async: false,
            success: function (returnData) {
                if (returnData.length > 0) {
                    $("#" + el.id).removeClass("autocomplete-is-visible");
                    objInput.val(returnData);
                }
                else {
                    $("#" + el.id).removeClass("autocomplete-is-visible");
                    objInput.val(error.message);
                }
            }
        });
    }
};

function NearbySearchForm_bindItineraryPlaceOption(el, start, place) {
    $(start).find('.autocomplete-dropdown-option').off('click').on('click', function () {
        $(el).attr("data-geolocate", false);
        $(el).val($(this).data("name"));
        $('#IDNearby').val($(this).data("id"));
        $('#frmSearchNearby #Nearby-Latitude').val($(this).data("lat"));
        $('#frmSearchNearby #Nearby-Longitude').val($(this).data("lng"));


        //fetch lng/lat si lat/lng vide
        if ($(this).attr('data-placeid') && $(this).attr('data-sessiontoken'))
            getPlaceDetail($(this).data("placeid"), $(this).data("sessiontoken"), $(this).data("name"), '#Nearby-Latitude', '#Nearby-Longitude');

        else if (($(this).data("lat") == "" || $(this).data("lng") == "") && !($(this).attr('data-type') != undefined && $(this).attr('data-type') === 'myLocation'))
            getLocation(name, '#Nearby-Latitude', '#Nearby-Longitude');

        $('#Type').val($(this).data("type"));
        $(el).removeClass('autocomplete-is-visible')

        if ($(this).attr('data-type') != undefined && $(this).attr('data-type') === 'myLocation') { new NearbySearchForm_geoLocateInput(el, place).getLocation(); }
    }).off('focus').on("focus", function () {
        $("#ResetNearbyButton").css("display", "block");

        if (!$(el).hasClass('autocomplete-is-visible'))
            $(el).addClass('autocomplete-is-visible');
    });
};

// SwitchLanguage
function SwitchLanguage(Code) {
    $.ajax({
        url: "/User/SwitchLanguage", data: { LanguageCode: Code }, type: 'POST',
        success: function () {
            window.location = "/"
        }
    });
}

// BannerCookie
function CloseBannerCookie(el, BannerCookieID) {
    $.ajax({
        url: "/User/CloseBannerCookie", data: { BannerCookieID: BannerCookieID }, type: 'POST',
        success: function () {
            el.closest('.cc-window').remove();
        }
    });
}

function getPlaceDetail(placeID, sessionToken, name, place1, place2) {
    $.ajax({
        type: 'POST',
        url: "/AutocompleteZone/SearchPlaceDetail",
        data: {
            PlaceID: placeID,
            SessionToken: sessionToken,
        },
        success: function (returnData) {
            if (returnData.success) {
                $(place1).val(returnData.Result.Data.Geometry.Location.Lat);
                $(place2).val(returnData.Result.Data.Geometry.Location.Lng);
            }
            else {
                getLocation(name, place1, place2);
            }
        },

    });
}

function getLocation(name, place1, place2) {
    $.ajax({
        type: 'POST',
        url: "/AutocompleteZone/SearchLocation",
        data: {
            Text: name
        },
        success: function (returnData) {
            $(place1).val(returnData.Lat);
            $(place2).val(returnData.Lng);
        }
    });
}

function initShareButton() {
    $('.share-facebook').off('click').on('click', function (event) {
        event.preventDefault();
        var width = 575,
            height = 400,
            left = ($(window).width() - width) / 2,
            top = ($(window).height() - height) / 2,
            url = 'http://www.facebook.com/sharer.php?s=100&u=' + $(this).attr('data-share-url'),
            opts = 'toolbar=0' +
                ',status=0' +
                ',width=' + width +
                ',height=' + height +
                ',top=' + top +
                ',left=' + left;

        window.open(url, 'sharer', opts);
    });

    $('.share-twitter').off('click').on('click', function (event) {
        event.preventDefault();
        var width = 575,
            height = 400,
            left = ($(window).width() - width) / 2,
            top = ($(window).height() - height) / 2,
            url = $(this).attr('data-share-url'),
            opts = 'status=1' +
                ',width=' + width +
                ',height=' + height +
                ',top=' + top +
                ',left=' + left;

        window.open(url, 'twitter', opts);

        return false;
    });
}

function scrollToAnchor(elementID) {

    if ($('#' + elementID).length > 0) {
        var currentElementScroll = $('#' + elementID).offset().top;
        var currentScroll = $(document).scrollTop();
        var headerHeight = $("#main-content").length > 0 && currentScroll > currentElementScroll ? $("#main-content").offset().top : 0;

        $('html, body').animate({
            scrollTop: (currentElementScroll - headerHeight)
        }, 500);

        if ($('.collapse' + ' ' + '#' + elementID).length > 0) {
            $('.collapse' + ' ' + '#' + elementID).trigger("click");
            //setTimeout(function () { $('.collapse' + ' ' + '#' + elementID).trigger("click");}, 1000);
        }
    }
}

var navigationHistory =
{
    historyType: {
        ITINERARY: { value: 0, key: "Itinerary", max:10 },
        LINE: { value: 1, key: "Line", max: 10 },
        STOP: { value: 2, key: "Stop", max: 10 },
        PLANNING: { value: 3, key: "Planning", max: 10 },
        TRAFFIC: { value: 4, key: "Traffic", max: 10 },
        POINTOFSALE: { value: 5, key: "PointOfSale", max: 10 },
        NEARBY: { value: 6, key: "Nearby", max: 10 }
    },
    history: function (HistoryType, DescriptionFrom, IDFrom, LatitudeFrom, LongitudeFrom, DescriptionTo, IDTo, LatitudeTo, LongitudeTo, How, Type)
    {
        this.HistoryType = HistoryType;
        this.DescriptionFrom = DescriptionFrom;
        this.IDFrom = IDFrom;
        this.LatitudeFrom = navigationHistory.convertGeographics(LatitudeFrom);
        this.LongitudeFrom = navigationHistory.convertGeographics(LongitudeFrom);
        this.DescriptionTo = DescriptionTo;
        this.IDTo = IDTo;
        this.LatitudeTo = navigationHistory.convertGeographics(LatitudeTo);
        this.LongitudeTo = navigationHistory.convertGeographics(LongitudeTo);
        this.How = How;
        this.Type = Type;
    },
    storageAvailable:
        function (type) {
            if (getCookie('CookieBannerClosed'))
            {
                var storage;
                try
                {
                    storage = window[type];
                    var x = '__storage_test__';
                    storage.setItem(x, x);
                    storage.removeItem(x);
                    return true;
                }
                catch (e) {
                    return e instanceof DOMException && (
                        // everything except Firefox
                        e.code === 22 ||
                        // Firefox
                        e.code === 1014 ||
                        // test name field too, because code might not be present
                        // everything except Firefox
                        e.name === 'QuotaExceededError' ||
                        // Firefox
                        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                        // acknowledge QuotaExceededError only if there's something already stored
                        (storage && storage.length !== 0);
                }
            }
            return false;
        },

    save: function (value) {
        if (this.storageAvailable('localStorage'))
        {
            var items = this.getSingle(value.HistoryType.key);
            var exist = this.exist(items, value);

            if (!exist)
            {
                if (items.length >= value.HistoryType.max)
                    items.shift();
                items.push(value);
                localStorage.setItem(value.HistoryType.key, JSON.stringify(items));
            }
        }
    },
    exist: function (items, value)
    {
        var exist = false;
        $.each(items, function (index, el) {
            //Attention ordre des properties est important !!!!
            //Improve se baser sur des champs déterminé au lieu de l'objet complet
            if (JSON.stringify(value) === JSON.stringify(el))
            {
                exist = true;
            }
        });
        return exist;
    },
    getAll: function () {
        if (this.storageAvailable('localStorage')) {
            for (var i = 0, len = localStorage.length; i < len; ++i) {
                console.log(localStorage.getItem(localStorage.key(i)));
            }
        }
    },
    getSingle: function (key) {
        if (this.storageAvailable('localStorage')) {
            var result = JSON.parse(localStorage.getItem(key));
            return result == null ? [] : result;
        }
        return [];
    },
    deleteHistory: function (key, index) {
        if (navigationHistory.storageAvailable('localStorage')) {
            var items = navigationHistory.getSingle(key);

            localStorage.removeItem(key);

            if (index != undefined) {
                items.splice(index, 1);
                $.each(items, function (index, el) {
                    navigationHistory.save(el);
                });
            }
        }
    },
    convertGeographics: function (value) { return (value ? value.toString().replace(',', '.') : ''); },
    autoComplete: function (search, key, label, selector, favoris)
    {
        if (navigationHistory.storageAvailable('localStorage'))
        {
            var items = navigationHistory.getSingle(key);
            if (items.length > 0)
            {
                var stops = [];
                if (favoris) {
                    try {
                        favoris = JSON.parse(favoris);
                        $.each(favoris, function (index, favorisItem) {
                            stops.push(favorisItem.DescriptionFrom);
                            if (favorisItem.DescriptionTo)
                                stops.push(favorisItem.DescriptionTo);
                        });
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
                $.each(items, function (index, item) {
                    
                    if (stops.indexOf(item.DescriptionFrom) < 0 && (search.length == 0 || item.DescriptionFrom.toUpperCase().indexOf(search.toUpperCase()) >= 0)) {
                        var IdFrom = '';
                        if (key !== navigationHistory.historyType.ITINERARY.key) {
                            IdFrom = item.IDFrom;
                        }
                        $(selector).append(addAutocomplete(item.DescriptionFrom, item.LatitudeFrom, item.LongitudeFrom, IdFrom, label, item.HistoryType.key)).show();
                        stops.push(item.DescriptionFrom);
                    }
                    if (item.DescriptionTo) {
                        var IdTo = '';
                        if (key !== navigationHistory.historyType.ITINERARY.key) {
                            IdTo = item.IDTo;
                        }
                        if (stops.indexOf(item.DescriptionTo) < 0 && (search.length == 0 || item.DescriptionTo.toUpperCase().indexOf(search.toUpperCase()) >= 0)) {
                            $(selector).append(addAutocomplete(item.DescriptionTo, item.LatitudeTo, item.LongitudeTo, IdTo, label, item.HistoryType.key)).show();
                            stops.push(item.DescriptionTo);
                        }
                    }
                });

                function addAutocomplete(name, latitude, longitude, ID, label, type) {
                    return "<button type='button' name='geolocalisation' class='autocomplete-dropdown-option dropdown-item' data-name='" + name + "' data-lng='" + longitude + "' data-lat='" + latitude + "' data-type='" + type + "' data-id='" + ID + "'><span class='svg svg-favorites'><svg width='18' height='18' aria-label='" + label + "'><use xlink:href='/Content/Slicing/assets/sprite.svg#history'></use></svg></span> " + name + "</button > ";
                }
            }
        }
    }
}

function initGetBlock(pageID, pageVersionID, blocks, container)
{
    if (blocks.length > 0)
    {
        var current = 0;
        container = container == undefined ? '.frmSaveBlockOrder' : container;

        function getBlockAjax()
        {
            if (current < blocks.length)
            {
                doAjax("/CmsPageManager/GetBlock", {
                    PageID: pageID, BlockID: blocks[current], IsEditing: true, PageVersionID: pageVersionID
            }, "POST",
                function () {
                    $(container).append($("#waiting").clone());
                },
                function (returnData) {
                    $(container).append(returnData);
                    initializeBind();
                    $(container + ' #waiting').remove();
                },
                function () {
                    current++;
                    getBlockAjax();
                }
                    );
        }
    }
    getBlockAjax();
    }
};
