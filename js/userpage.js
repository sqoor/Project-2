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
            "positionClass": "toast-top-right",
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
    }

    
    function createDeleteBtn() {
        var deleteBtn = document.createElement('i');

        deleteBtn.classList = 'delete-btn fas fa-trash-alt';
        deleteBtn.addEventListener('click', function(e) {
            e.target.parentElement.remove();
        });

        return deleteBtn;
    }

    function addNewItem() {
        var toDoList = document.getElementById('to-do-list');
        var newItem = document.createElement('li');
        var deleteBtn = createDeleteBtn();

        newItem.append(newItemInput.val());
        newItem.appendChild(deleteBtn);
        toDoList.appendChild(newItem);
    }

    function showItemsNumberOnBadge(list) {
        var badge = $('#' + list.id + ' .badge');
        var itemsNumber =  $("#" + list.id).children().length - 1;

        if(itemsNumber != badge.text()) {
            badge.text(itemsNumber)
        }
    }



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