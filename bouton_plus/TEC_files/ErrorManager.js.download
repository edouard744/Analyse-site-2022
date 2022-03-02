var forms = forms || {};
forms.ErrorManager = (function () {
    var self = {};
    var errorContainerSuffix = '-error-container';
    var errorMessageSuffix = '-error-message';

    self.config = {
        globalErrorContainerId: "",
        globalErrorMessageId:""
    };


    self.withPrefix = function (prefix) {
        if ("string" !== typeof prefix) {
            throw ("prefix must be of type string");
        }
        self.config.globalErrorContainerId = prefix + errorContainerSuffix;
        self.config.globalErrorMessageId = prefix + errorMessageSuffix;
        return self;
    };
    self.displayErrorMessage = function(message) {
        $("#" + self.config.globalErrorMessageId).html(message);
        $("#"+self.config.globalErrorContainerId).removeClass('is-empty').addClass('is-error');
    };
    self.clearErrorContainer = function() {
        $("#"+self.config.globalErrorContainerId).removeClass('is-error').addClass('is-empty');
        $("#"+self.config.globalErrorMessageId).html("");
    };
    self.displayError = function (data) {
        $(window).scrollTop(0);
        if (typeof data.IsValid !== 'undefined' && !data.IsValid) {
            // Gère les erreurs type SubmissionForms
            $.each(data.Errors,
                function (i) {
                    var elem = $("#" + data.Errors[i]);
                    var parent;
                    if (elem.hasClass("js-select")) {
                        parent = elem.parent().parent();
                    } else {
                        parent = elem.parent();
                    }

                    if (parent.hasClass("ui-form-field")) {
                        parent.addClass("is-error");
                    } else {
                        parent = $("#" + data.Errors[i] + "-parent");
                        if (parent.hasClass("ui-form-field")) {
                            parent.addClass("is-error");
                        }
                    }
                });
            return true;
        } else if (typeof data.Exceptions !== 'undefined') {
            // Gère les erreurs type ServiceException
            $.each(data.Exceptions,
                function (i) {
                    var ex = data.Exceptions[i];
                    if (ex.IsGlobal) {
                        $("#" + self.config.globalErrorContainerId).removeClass('is-empty').addClass('is-error');
                        $("#" + self.config.globalErrorMessageId).html(ex.Message);
                    } else {
                        var elem = $("#" + ex.Field);
                        var parent;
                        if (elem.hasClass("js-select")) {
                            parent = elem.parent().parent();
                        } else {
                            parent = elem.parent();
                        }

                        if (parent.hasClass("ui-form-field")) {
                            parent.addClass("is-error");
                            $("#error-" + ex.Field).html(ex.Message);
                        }
                    }
                });
            return true;
        }
        return false;
    };

    return self;
});