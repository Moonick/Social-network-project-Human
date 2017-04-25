$(function() {
    $('#side-menu').metisMenu();

    function addImageBtnPost() {
        $('#create-post .btnPicture').on('click', function() {
            $('#create-post input[type=file]').click();
        });
    }
    setTimeout(addImageBtnPost, 500);

    function addImageBtnPhoto() {
        $('#add-photo .btnPicture').on('click', function() {
            $('#add-photo input[type=file]').click();
        });
    }
    setTimeout(addImageBtnPhoto, 500);
    $(window).on('hashchange', function(e) {
        //execute code
        setTimeout(addImageBtnPhoto, 500);
        setTimeout(addImageBtnPost, 500);
    });


    $.get("/user", function(data) {
        // var img = document.createElement('img');
        // img.style.width = "30px";
        // img.style.height = "auto";
        // img.src = data.profImgUrl;
        var span = document.createElement('span');
        span.innerText = capitalizeFirstLetter(data.fname) + " " + capitalizeFirstLetter(data.lname);
        // $("#side-menu> li >a")[0].append(img);

        $("ul.dropdown-user a")[0].text = capitalizeFirstLetter(data.fname) + " " + capitalizeFirstLetter(data.lname);
        $("#side-menu>li>a")[0].append(span);

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