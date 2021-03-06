var forms = forms || {};

/**
 * Contains function to handle forms
 */
forms.state = forms.state || {};

/**
 * Disable mofification of a form given its id
 * @param {any} formId
 */
forms.state.disableForm = function (formId) {
    var form = document.getElementById(formId);
    var elements = form.elements;
    for (var i = 0, len = elements.length; i < len; ++i) {
        elements[i].disabled = true;
    }
};

/**
 * Enable modification of a form given its id
 * @param {string} formId
 */
forms.state.enableForm = function (formId) {
    var form = document.getElementById(formId);
    var elements = form.elements;
    for (var i = 0, len = elements.length; i < len; ++i) {
        elements[i].disabled = false;
    }
};


/**
 * Sets buttons to loading state
 * @param {event} event
 * @returns {function} function used to rollback loading state
 */
forms.state.enableLoading = function (event) {


    var elements = event.target.elements;
    console.log(elements);
    var elementsToRollback = [];
    for (var i = 0; i < elements.length; i++) {

        if (elements[i].type === 'submit') {

            elements[i].classList.add('is-loading');

        } else if (!elements[i].disabled) {

            elements[i].disabled = true;
            elementsToRollback.push(elements[i]);

        }
    }

    return function () {

        for (var i = 0; i < elements.length; i++) {

            if (elements[i].classList.contains('is-loading')) {
                elements[i].classList.remove('is-loading');
            }
        }
        while (element = elementsToRollback.pop()) {
            element.disabled = false;
        }
    }
}
