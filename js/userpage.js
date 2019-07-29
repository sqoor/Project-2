var noLoggedInUser = localStorage.length < 1;

if(noLoggedInUser) {
    window.location.href = '/';
}


$(document).ready(function() {
    var logout = $('#logout');
    var username = localStorage.getItem('username');
    var newItemInput = $('#input');
    var addBtn = $('#addBtn');
    

    function showWelcomingMessage() {

        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-center",
            "preventDuplicates": true,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "700",
            "timeOut": "2000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
          }

        toastr["success"]("Welcome " + username);

        localStorage.setItem('showed-welcoming-message', true);
    }

    
    function createDeleteBtn() {
        var deleteBtn = document.createElement('i');

        deleteBtn.classList = 'delete-btn fas fa-trash-alt';
        deleteBtn.addEventListener('click', function(e) {
            e.target.parentElement.remove();
        });

        return deleteBtn;
    }

    function createToListBtn(cssClasses, parent) {
        var toListBtn = document.createElement('i');

        toListBtn.classList = cssClasses;
        toListBtn.addEventListener('click', function(e) {
            var item = e.target.parentElement;
            var siplings = e.path[1].children;
            
            $(item).appendTo(parent);

            for(var sipling of siplings) {
                $(sipling).show()
            }

            $(e.target).hide();
        });

        return toListBtn;
    }


    function addNewItem() {
        var toDoList = document.getElementById('to-do-list');
        var newItem = document.createElement('li');
        var deleteBtn = createDeleteBtn();
        var toDoBtn = createToListBtn('to-do-btn fas fa-plus-circle', '#to-do-list');
        var toProgressBtn = createToListBtn('to-progress-btn fas fa-plus-circle', '#in-progress-list');
        var toCompletedBtn = createToListBtn('to-completed-btn fas fa-plus-circle', '#completed-list');

        newItem.append(newItemInput.val());
        newItem.appendChild(deleteBtn);
        newItem.appendChild(toCompletedBtn);
        newItem.appendChild(toProgressBtn);
        newItem.appendChild(toDoBtn);
        toDoList.appendChild(newItem);

        $('.to-do-btn').hide();
    }

    function showItemsNumberOnBadge(list) {
        var badge = $('#' + list.id + ' .badge');
        var itemsNumber =  $("#" + list.id).children().length - 1;

        if(itemsNumber != badge.text()) {
            badge.text(itemsNumber)
        }
    }


    if(localStorage.getItem('showed-welcoming-message') === null)
        showWelcomingMessage();

    $('.username').html(username);

    logout.on('click', function() {
        localStorage.clear();
        window.location.href = '/';
    });

    addBtn.on('click', function(e) {
        e.preventDefault();

        if(newItemInput.val() === '') {
            toastr.options = {
                "closeButton": false,
                "debug": false,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-top-left",
                "preventDuplicates": true,
                "onclick": null,
                "showDuration": "10000",
                "hideDuration": "1500",
                "timeOut": "1500",
                "extendedTimeOut": "700",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
              }

            toastr["error"]("Empty field, please enter to-do task", "Error")
            return;
        } else {
            addNewItem();

            newItemInput.val('');
        }
    });


    $("#to-do-list").bind("DOMSubtreeModified", function() {
        showItemsNumberOnBadge(this);
    });

    $("#in-progress-list").bind("DOMSubtreeModified", function() {
        showItemsNumberOnBadge(this);
    });

    $("#completed-list").bind("DOMSubtreeModified", function() {
        showItemsNumberOnBadge(this);
    });

   
});