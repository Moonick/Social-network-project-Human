$(function() {
    $('.create-account a').on('click', function() {
        $.ajax({
            type: 'GET',
            url: '/login',
            success: function() {
                window.location.replace('register')
            }
        })
    })
});