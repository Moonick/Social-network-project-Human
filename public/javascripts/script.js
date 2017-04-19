$(function() {
    $('#side-menu').metisMenu();

    $('#create-post .btnPicture').on('click', function() {
        $('#create-post input[type=file]').click();
    });

    $.get("/user", function(data) {
        $("#side-menu> li >a img")[0].src = data.profImgUrl;
        $("ul.dropdown-user a")[0].text = capitalizeFirstLetter(data.fname) + " " + capitalizeFirstLetter(data.lname);
        $(".user-name")[0].text = capitalizeFirstLetter(data.fname) + " " + capitalizeFirstLetter(data.lname);
        // console.log($("#side-menu> li >a img")[0])
        console.log($(".user-name")[0])

        function capitalizeFirstLetter(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    });
});

//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(function() {
    $(window).bind("load resize", function() {
        var topOffset = 50;
        var width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }

        var height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
        }
    });

    var url = window.location;
    // var element = $('ul.nav a').filter(function() {
    //     return this.href == url;
    // }).addClass('active').parent().parent().addClass('in').parent();
    var element = $('ul.nav a').filter(function() {
        return this.href == url;
    }).addClass('active').parent();

    while (true) {
        if (element.is('li')) {
            element = element.parent().addClass('in').parent();
        } else {
            break;
        }
    }
});