$(function() {
    $('form.register').on('submit', function(event) {
        event.preventDefault();
    });

    $('input[type=submit]').on('click', function(event) {

        var fname = $('.register input[name=fname]').val().trim();
        var lname = $('.register input[name=lname]').val().trim();
        var pass = $('.register input[name=password]').val().trim();
        var email = $('.register input[name=email]').val().trim();

        var data = {
            fname: fname,
            lname: lname,
            password: pass,
            email: email
        };

        $.ajax({
            type: 'POST',
            url: '/register',
            data: data,
            success: function(resData) {
                if (resData === 0) {
                    window.location.replace('index');
                } else {
                    $('input[type=email]').addClass('red-border');
                }
            }
        });

    })
});