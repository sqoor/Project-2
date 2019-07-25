$(document).ready(function() {
    var username = $('#username');
    var password = $('#password');
    var submitBtn = $('#submitBtn');

    function isValid(field1, field2) {
        console.log('validate clicked')

        // console.log('field1:', field1.val())
        // console.log('field1:', field2.val())
        // console.log('is field1 emtpy', field1.val() === '')
        // console.log('is field2 emtpy', field2.val() === '')
        
        if(field1.val() === '') {
            console.log('username is not filled');
            return false;
        } 
        if (field2.val() === '') { 
            console.log('password is not filled');
            return false;
        }

        return true;
    }

    submitBtn.on('click', function(e) {
        e.preventDefault();

        if(isValid(username, password)) {
            console.log('valid')
            console.log('username:', username.val())
            console.log('password:', password.val())
        }
        else  {
            console.log('not valid');
        }
    });

    
});