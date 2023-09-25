$(document).one("pagecreate", ".demo-page", function () {
    // Initialize the external persistent header and footer
    $("#header").toolbar({theme: "b"});
    $("#footer").toolbar({theme: "b"});

    // Handler for navigating to the next page
    function navnext(next) {
        $(":mobile-pagecontainer").pagecontainer("change", next + ".html", {
            transition: "slide"
        });
    }

    // Handler for navigating to the previous page
    function navprev(prev) {
        $(":mobile-pagecontainer").pagecontainer("change", prev + ".html", {
            transition: "slide",
            reverse: true
        });
    }

    // Navigate to the next page on swipeleft
    $(document).on("swipeleft", ".ui-page", function (event) {
        // Get the filename of the next page. We stored that in the data-next
        // attribute in the original markup.
        var next = $(this).jqmData("next");
        // Check if there is a next page and
        // swipes may also happen when the user highlights text, so ignore those.
        // We're only interested in swipes on the page.
        if (next && (event.target === $(this)[0])) {
            navnext(next);
        }
    });
    // Navigate to the next page when the "next" button in the footer is clicked
    $(document).on("click", ".next", function () {
        var next = $(".ui-page-active").jqmData("next");
        // Check if there is a next page
        if (next) {
            navnext(next);
        }
    });
    // The same for the navigating to the previous page
    $(document).on("swiperight", ".ui-page", function (event) {
        var prev = $(this).jqmData("prev");
        if (prev && (event.target === $(this)[0])) {
            navprev(prev);
        }
    });
    $(document).on("click", ".prev", function () {
        var prev = $(".ui-page-active").jqmData("prev");
        if (prev) {
            navprev(prev);
        }
    });
});
$(document).on("pageshow", ".demo-page", function () {
    var thePage = $(this),
        title = thePage.jqmData("title"),
        next = thePage.jqmData("next"),
        prev = thePage.jqmData("prev");
    // Point the "Trivia" button to the popup for the current page.
    $("#trivia-button").attr("href", "#" + thePage.find(".trivia").attr("id"));
    // We use the same header on each page
    // so we have to update the title
    $("#header h1").text(title);
    // Prefetch the next page
    // We added data-dom-cache="true" to the page so it won't be deleted
    // so there is no need to prefetch it
    if (next) {
        $(":mobile-pagecontainer").pagecontainer("load", next + ".html");
    }
    // We disable the next or previous buttons in the footer
    // if there is no next or previous page
    // We use the same footer on each page
    // so first we remove the disabled class if it is there
    $(".next.ui-state-disabled, .prev.ui-state-disabled").removeClass("ui-state-disabled");
    if (!next) {
        $(".next").addClass("ui-state-disabled");
    }
    if (!prev) {
        $(".prev").addClass("ui-state-disabled");
    }
});


$('#addDataToLOcal').click(function () {
    let array = [
        {
            "albumID": 1,
            "albumArtist": "Jeff Jenkins",
            "albumType": "Jazz Blues",
            "albumName": "Blow ByBlow",
            "albumReview": "Testing the Review 2"
        },
        {
            "albumID": 2,
            "albumArtist": "Jeff Jenkins",
            "albumType": "Jazz Blues",
            "albumName": "Blow ByBlow",
            "albumReview": "Testing the Review 2"
        }
    ]

    localStorage.setItem("scanData", JSON.stringify(array));
});

$('#uploadToCloud').click(function () {
    let items = JSON.parse(localStorage.getItem("scanData"));
    $.each(items, function (key, value) {
        $.post('http://localhost:3001/products/', value).done(function (data){
            console.log('done');
        });
    });

})

$( document ).ready(function() {
    var str = localStorage.getItem("scanData");
    if (str!= null)
        arr = JSON.parse(str);
    var text= '';
    arr.forEach(function (data)
    {
        text += "<img src='img/test.jpg' width='100' height='100'/><h2>ID "+ data.albumID + "</h2><p>Artist: "+ data.albumArtist +"</p><p>Name: "+ data.albumName+ "</p><p>Type: "+ data.albumType+ "</p><p>Review: "+data.albumReview+"</p>";
    });
    $(".mylocaldata").html(text);

    // {
    //
    //     $("#listview").");
    // }
});



$.get('http://localhost:3001/products', function(data) {
    var text= 'No Data';
    $.each(data, function(key, value) {
        text += "<img src='img/test.jpg' width='100' height='100'/><h2>ID "+ data[key].albumID + "</h2><p>Artist: "+ data[key].albumArtist +"</p><p>Name: "+ data[key].albumName+ "</p><p>Type: "+ data[key].albumType+ "</p><p>Review: "+data[key].albumReview+"</p>";
    });
    $(".mypanel").html(text);

});
$(".clearCloudData").click(function () {
    $.getJSON('http://localhost:3001/products/delete', function (data) {
        var text = "All Deleted";
        $(".mypanel").html(text);
    });
    window.location.reload()
});

function removeData()
{
    localStorage.clear();
    window.location.reload()
}

$("#clearData").click(function () {
    $("#detailForm").trigger("reset");
});

