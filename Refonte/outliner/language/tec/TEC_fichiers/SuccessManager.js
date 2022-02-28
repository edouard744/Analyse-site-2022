var forms = forms || {};

forms.successManager = (function () {
    var self = {};
    var successContainerSuffix = '-success-container';
    var successMessageSuffix = '-success-message';

    self.config = {
        globalSuccessContainerId: "",
        globalSuccessMessageId: ""
    };
    
    self.withPrefix = function (prefix) {
        if (! 'string' === typeof prefix) {
            throw ("prefix must be of type string");
        }
        self.config.globalSuccessContainerId = '#' + prefix + successContainerSuffix;
        self.config.globalSuccessMessageId = '#' + prefix + successMessageSuffix;
        return self;
    };


    self.clearContainer = function () {
        $(self.config.globalSuccessContainerId).removeClass('is-success').addClass('is-empty');
        $(self.config.globalSuccessMessageId).html("");
    };

    self.displayMessage = function (message) {
        var successContainerElement = $(self.config.globalSuccessContainerId);
        var successMessageElement = $(self.config.globalSuccessMessageId);

        successContainerElement.removeClass('is-empty').addClass('is-success');
        successMessageElement.html(message);



        $("html").scrollTop(successContainerElement.offset().top - 80 /* Approximation of mobile header height + 10px */);
    };

    return self;
});