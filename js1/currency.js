function auto_cur() {
    var isoCode;
    $.getJSON("https://ipinfo.io", function(data) {
        isoCode = data.country;
        countryGeo = data.country
        currency()
    });

    function currency() {
        $(".country-name-geo").text(countryGeo)
        var currency1 = ["AT", "CH", "DE", "LI", "LU", "BE", "CZ", "ES", "FR", "GR", "HU", "IT", "NL", "PL", "PT", "RO", "RS", "HR", "SK", "SL", "DK", "FI", "NO", "SE"]
        if (isoCode == "GB") {
            $(".currency").text("£")
            return true
        }
        if (isoCode == "ZA") {
            $(".currency").text("R")
            $(".currency-1").text("5995")
            $(".currency-2").text("199")
            $(".currency-3").text("766064")
            $(".currency-4").text("25126,21")
            $(".currency-5").text("4980")
            $(".currency-6").text("25895")
            return true
        }
        if (currency1.indexOf(isoCode) >= 0) {
            $(".currency").text("€")
        } else {
            $(".currency").text("$")
        }
    }
};
auto_cur()