var noLoggedInUser = localStorage.length < 1;

if(noLoggedInUser) {
    console.log('there is no user logged in');
    window.location.href = '/';
}


$(document).ready(function() {
    var logout = $('#logout');
    var username = localStorage.getItem('username');

    function showWelcomingMessage() {
        console.log('Welcome ', username);
        $('.welcome div').prepend('Welcome ' + username)
        
        setTimeout(function(){
            $('.welcome').fadeOut('slow', function () {
                $('.welcome').remove();
            });
        }, 800)
    }
    
    logout.on('click', function() {
        console.log('logout clicked');
        localStorage.clear();
        window.location.href = '/';
    });

    
    $('.username').html(username);

    showWelcomingMessage();
});