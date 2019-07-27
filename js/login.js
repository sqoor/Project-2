var users = [ 
    { username: 'Abdullah', password: '1234' },
    { username: 'Mohammed', password: '1234' },
    { username: 'Rachid', password: '1234' },
    { username: 'Ali', password: '1234' },
    { username: 'Elie', password: '1234' },
];


$(document).ready(function() {
    var username = $('#username');
    var password = $('#password');
    var submitBtn = $('#submitBtn');
    var errorMessage = $('#error-message');

    function saveUserData(user) {
        for(var property in user) {
            localStorage.setItem(property, user[property]);
        }
    }
   
    function setError(message) {
        errorMessage.html('<strong>Ops!</strong> ' + message);
        errorMessage.addClass('show animated bounce');
      
        setTimeout(function() {
            errorMessage.removeClass('animated bounce');
        }, 1000) 
    }

    function isValid(field1, field2) {
        var field1Valid;
        var field2Valid;

        if(field1 === '') {
            username.addClass('emptyField');
            field1Valid =  false;
        } else {
            username.removeClass('emptyField');
            field1Valid = true;
        }
  

        if(field2 === '') {
            password.addClass('emptyField');
            field2Valid = false;
        } else {
            password.removeClass('emptyField');
            field2Valid = true;
        }

        return field1Valid && field2Valid ? true : false
    }

    function checkUser(field1, field2) {
        var isUser = false;
        users.forEach(function(user) {
            if(field1 === user.username && field2 === user.password) {
                saveUserData(user);
                isUser = true;
            }
        }); 
        
        if(isUser) {
            var queryString = '?user=' + field1;
            window.location.href = 'userpage.html' + queryString;
            // window.location.replace('userpage.html' + queryString);
        } else {
            setError('Username and password you have entered do not match, try again.');
        }
    }

    submitBtn.on('click', function(e) {
        e.preventDefault();

        if(isValid(username.val(), password.val())) {
            checkUser(username.val(), password.val());
        }
        else  {
            setError('You should enter the empty fields.');
        }
    });
});
