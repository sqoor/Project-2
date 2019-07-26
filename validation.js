var users = [ 
    { name: 'Abdullah', password: '1234' },
    { name: 'Mohammed', password: '1234' },
    { name: 'Rachid', password: '1234' },
    { name: 'Ali', password: '1234' },
    { name: 'Elie', password: '1234' },
];


$(document).ready(function() {
    var username = $('#username');
    var password = $('#password');
    var submitBtn = $('#submitBtn');
    var errorMessage = $('#error-message');
   
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
            username.css('border', '3px red solid');
            field1Valid =  false;
        } else {
            username.css('border', '');
            field1Valid = true;
        }
  

        if(field2 === '') {
            password.css('border', '3px red solid');
            field2Valid = false;
        } else {
            password.css('border', '');
            field2Valid = true;
        }

        return field1Valid && field2Valid ? true : false
    }

    function checkUser(field1, field2) {
        var isUser = false;
        users.forEach(function(user) {
            // console.log('username', user.name);
            if(field1 === user.name && field2 === user.password) {
                console.log('Welcome ' + field1);
                isUser = true;
            }
        }); 
        
        if(isUser) {
            setError('Welcome ' + field1);
            // redirec to the users's page, to-do-list app
        } else {
            setError('Username and password you have entered do not match, try again.');
        }
    }

    submitBtn.on('click', function(e) {
        e.preventDefault();

        if(isValid(username.val(), password.val())) {
            console.log('valid')
            console.log('username:', username.val())
            console.log('password:', password.val())

            checkUser(username.val(), password.val());
        }
        else  {
            console.log('not valid, empty field(s)');

            setError('You should enter the empty fields.');
        }
    });
});