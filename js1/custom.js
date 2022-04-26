$('.hover-modal').hover(function() {
    $('.popup_custom').css("visibility", "visible");
})
$('.close_button').click(function() {
    $('.popup_custom').css("visibility", "hidden");
})
if (device.mobile() || device.ipad() || device.android()) {
    $("#ytplayer").append("<img src=\"images/preloader_Youtube.gif\" id=\"apYou\">");
    $('.hover-modal').remove();
    $(".anticlicker").css('bottom', '65%');
    //$("#ytplayer").append("<iframe width=\"560\" src=\"https://www.youtube.com/embed/UDTQ_YjQBFE?mute=0&amp;autoplay=1&amp;controls=1&amp;disablekb=0&amp;loop=1&amp;modestbranding=1&amp;rel=0&amp;showinfo=0&amp;playlist=UDTQ_YjQBFE\" frameborder=\"0\" allowfullscreen=\"\"></iframe>");
    setTimeout(function() {
        $('#apYou').hide();
        $("#ytplayer").append("<iframe width=\"560\" src=\"https://www.youtube.com/embed/Vcz3z-CP_8o?mute=0&amp;autoplay=1&amp;controls=1&amp;disablekb=0&amp;loop=1&amp;modestbranding=1&amp;rel=0&amp;showinfo=0&amp;playlist=Vcz3z-CP_8o\" frameborder=\"0\" allowfullscreen=\"\"></iframe>");
    }, 2000)
} else {
    $("body").append("<script src=\"js/youtubeUP.js\"><\/script>");
    // $("body").append("<script src=\"https://www.youtube.com/iframe_api\"><\/script>");
}