$(function() {

    const inputsDivBtn = $('.inputsDivBtn');

    let changeCountry = function (){
        let countryInput = $('#inputText');
        let monthInput = $('#inputMonth');
        let userValueOfCountry = countryInput.val().toUpperCase();
        let userValueOfDate = monthInput.val();
        let userValueOfYear = userValueOfDate.slice(0,4);
        let userValueOfMonth = userValueOfDate.slice(5,7);
        let urlAPI = `https://holidayapi.com/v1/holidays?key=b8a9beec-2f3e-4319-b0f7-68ee562d49df&country=${userValueOfCountry}&year=${userValueOfYear}&month=${userValueOfMonth}`;
        
        createList( urlAPI );

    };

    let createList = function( urlAPI ){
        let sectionHolidays = $('.holidays');
        let holidaysWrap = $('<div>', {class: 'holidaysWrap'});
        let ul = $('<ul>', {class: 'holidaysList'});

        function createListHolidays( holidays ) {
            for(let i = 0 ; i < holidays.length; i++) {
                let li = $('<li>');
                li.text(holidays[i].name + ' ' + holidays[i].date);
                ul.append( li );
                holidaysWrap.append( ul );
                sectionHolidays.append( holidaysWrap );
            };
        }
        function loadHolidays() {
            $.ajax({
                url: urlAPI
            }).done( function( response ){
                createListHolidays( response.holidays );
            }).fail( function( error ) {
                console.log( 'ERROR: ', error);
            })
        }
        loadHolidays()
    }

    inputsDivBtn.on('click', changeCountry);

    //predefinedCountryValues = [
    //         "AR",
    //         "AO",
    //         "AT",
    //         "AU",
    //         "AW",
    //         "AX",
    //         "BA",
    //         "BE",
    //         "BG",
    //         "BO",
    //         "BR",
    //         "BS",
    //         "CA",
    //         "CH",
    //         "CN",
    //         "CO",
    //         "CR",
    //         "CU",
    //         "CZ",
    //         "DE",
    //         "DK",
    //         "DO",
    //         "EC",
    //         "ES",
    //         "FI",
    //         "FR",
    //         "GB",
    //         "GB-ENG",
    //         "GB-NIR",
    //         "GB-SCT",
    //         "GB-WLS",
    //         "GR",
    //         "GT",
    //         "HK",
    //         "HN",
    //         "HR",
    //         "HU",
    //         "ID",
    //         "IE",
    //         "IN",
    //         "IL",
    //         "IS",
    //         "IT",
    //         "JP",
    //         "KZ",
    //         "LS",
    //         "LU",
    //         "MG",
    //         "MQ",
    //         "MU",
    //         "MX",
    //         "MZ",
    //         "NG",
    //         "NL",
    //         "NO",
    //         "PE",
    //         "PK",
    //         "PH",
    //         "PL",
    //         "PR",
    //         "PT",
    //         "PY",
    //         "RE",
    //         "RO",
    //         "RU",
    //         "SC",
    //         "SE",
    //         "SG",
    //         "SI",
    //         "ST",
    //         "SK",
    //         "TN",
    //         "TR",
    //         "UA",
    //         "US",
    //         "UY",
    //         "VE",
    //         "ZA",
    //         "ZW",
    //     ];
});
