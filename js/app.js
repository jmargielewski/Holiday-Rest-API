
$(function() {

    let urlAPI = 'https://holidayapi.com/v1/holidays?key=b8a9beec-2f3e-4319-b0f7-68ee562d49df&country=PL&year=2016&month=05';

    let sectionHolidays = $('.holidays');
    let holidaysWrap = $('<div>', {class: 'holidaysWrap'});
    let ul = $('<ul>', {class: 'holidaysList'});

    function createListHolidays( holidays ) {
        for(let i = 0 ; i < holidays.length; i++) {
            let li = $('<li>');
            li.text(holidays[i].name + ' ' + holidays[i].date);
            ul.append(li);
            holidaysWrap.append(ul);
            sectionHolidays.append(holidaysWrap);
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

    //////////////////////////

});
