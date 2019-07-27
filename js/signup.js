var users = [ 
    { name: 'Abdullah', password: '1234' },
    { name: 'Mohammed', password: '1234' },
    { name: 'Rachid', password: '1234' },
    { name: 'Ali', password: '1234' },
    { name: 'Elie', password: '1234' },
];



$(document).ready(function() {
    var form = $('.form');
    var formData;
    var password = $('input[name=password]');
    var confirm = $('input[name=confirm]');
    var submitBtn = $('#submitBtn');
    var errorMessageDiv = $('#error-message');
    var errorsList = {};

    function getFormData() {
        formData = form.serializeArray();
        console.log(formData);
    }
  
    function checkEmptyFields() {
        var fieldsEmpty = false;

        formData.forEach(function(field) {
           if(field.value === '') {
               $('input[name=' + field.name +']').addClass('emptyField');
               fieldsEmpty = true;
           } else {
               $('input[name=' + field.name +']').removeClass('emptyField');
               fieldsEmpty = false;
           }
        });

        if(fieldsEmpty) {
            setError('Please entery the empty fields.')
            errorsList['fieldsEmpty'] = true;
        } else {
            errorMessageDiv.removeClass('show animated bounce');
            delete errorsList['fieldsEmpty'];
        }
    }

    function setError(message) {
        errorMessageDiv.html('<strong>Ops!</strong> ' + message);
        errorMessageDiv.addClass('show animated bounce');
      
        setTimeout(function() {
            errorMessageDiv.removeClass('animated bounce');
        }, 1000) 
    }

    function shortPasswordError() {
        var passErrorDiv = $('#pass-error');

        if(password.val().length < 4) {
            passErrorDiv.html('Too short');
            errorsList['shortPassword'] = true;
        } else { 
            passErrorDiv.html('');
            delete errorsList['shortPassword'];
        }
    }

    function matchPassword() {
        var confirmError = $('#confirm-error');

        if(password.val() !== confirm.val()) {
            confirmError.text('Do not match.')
            errorsList['passwordNotMatch'] = true;
        } else {
            confirmError.text('');
            delete errorsList['passwordNotMatch'];
        }
    }

    function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    function saveFormData() {
        for(var field in formData) {
            console.log(field);
            console.log(formData[field]);
            localStorage.setItem(formData[field]['name'], formData[field]['value']);
        }
    }

   
    password.on('keyup', function() {
        shortPasswordError();
    });

    confirm.on('keyup', function() {
        matchPassword();
    });


    submitBtn.on('click', function(e) {
        e.preventDefault();

        getFormData();
        checkEmptyFields();

        if(isEmpty(errorsList)) {
            saveFormData();
            var username = formData[0]['value']
            window.location.href = 'userpage.html?' + username;
        }
    });
});
