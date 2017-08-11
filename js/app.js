$(function() {

    const inputsDivBtn = $('.inputsDivBtn');
    const btnHintList = $('.btnListCountry');
    const listCountriesCloseBtn = $('.listCountriesCloseBtn');


    let createHintList = function (){



        let wrapListHints = $('.listCountries');
        let countryNamesWraper = $('<div>', { class: 'countryNamesWraper'});
        let listHints = [
            'AR Argentina','AO Angola','AT Austria','AU Australia',
            'AW Aruba','AX Åland Islands','BA Bosnia and Herzegovina','BE Belgium',
            'BG Bulgaria','BO Bolivia','BR Brazil','BS The Bahamas','CA Canada',
            'CH Switzerland','CN China','CO Colombia','CR Costa Rica',
            'CU Cuba','CZ Czech Republic','DE Germany','DK Denmark',
            'DO Dominican Republic','EC Ecuador','ES Spain','FI Finland',
            'FR France','GB United Kingdom','GB-ENG England','GB-NIR Northern Ireland',
            'GB-SCT Scotland','GB-WLS Wales','GR Greece','GT Guatemala',
            'HK Hong Kong','HN Honduras','HR Croatia','HU Hungary',
            'ID Indonesia','IE Ireland','IN India','IL Israel',
            'IS Iceland','IT Italy','JP Japan','KZ Kazakhstan',
            'LS Lesotho','LU Luxembourg','MG Madagascar','MQ Martinique',
            'MT Malta','MU Mauritius','MX Mexico','MZ Mozambique',
            'NG Nigeria','NL Netherlands','NO Norway','PE Peru',
            'PK Pakistan','PH Philippines','PL Poland','PR Puerto Rico',
            'PT Portugal','PY Paraguay','RE Réunion','RO Romania',
            'RU Russia','SC Seychelles','SE Sweden','SG Singapore',
            'SI Slovenia','ST Sao Tome and Principe','SK Slovakia','TN Tunisia',
            'TR Turkey','UA Ukraine','US United States','UY Uruguay',
            'VE Venezuela','ZA South Africa','ZW Zimbabwe',
        ];

        [...listHints].forEach( function( listItem ){
            let countryName = $('<div>');
            let countryShortName = $('<b>');

            if ( listItem.indexOf('-') > -1 ){
                countryShortName.text( listItem.slice(0,6) );
                countryName.text( listItem.slice(6,30) );
            } else {
                countryShortName.text( listItem.slice(0,3) );
                countryName.text( listItem.slice(3,30) );
            }
            countryName.prepend(countryShortName);
            countryNamesWraper.append(countryName);
        });
        wrapListHints.append(countryNamesWraper);
        wrapListHints.slideToggle('listCountriesHidden');
    };

    let removeHintList = function(){
            $('.listCountries').slideUp();
            $('.countryNamesWraper').remove();
    }

    let changeCountry = function (){
        let countryInput = $('#inputText');
        let monthInput = $('#inputMonth');
        let userValueOfCountry = countryInput.val().toUpperCase();
        let userValueOfDate = monthInput.val();
        let userValueOfYear = userValueOfDate.slice(0,4);
        let userValueOfMonth = userValueOfDate.slice(5,7);

        let urlAPI = `https://holidayapi.com/v1/holidays?key=b8a9beec-2f3e-4319-b0f7-68ee562d49df&country=${userValueOfCountry}&year=${userValueOfYear}&month=${userValueOfMonth}`;



        if( userValueOfCountry.length < 2 ){
            $('.inputsWrap').nextAll().remove();
            let infoEmpty = $('<p>', {class: 'errorEmptyValue'});
            infoEmpty.text('Wrong name of the Country.');
            $('.inputsWrap').after(infoEmpty);
        } else if ( userValueOfDate.length === 0 ){
            $('.inputsWrap').nextAll().remove();
            let infoEmpty = $('<p>', {class: 'errorEmptyValue'});
            infoEmpty.text('Please enter a correct date: (dd-mm-yyyy)');
            $('.inputsWrap').after(infoEmpty);
        } else {

            if ( $('.listCountries').css('display') === "block" ){
                $('.listCountries').slideUp();
            };

            $('.inputsWrap').nextAll().remove();
            createList( urlAPI );
        }
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
    btnHintList.on('click', createHintList);
    listCountriesCloseBtn.on('click', removeHintList);
});
