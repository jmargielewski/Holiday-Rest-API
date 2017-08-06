$(function() {

    var pl = "PL";
    let urlAPI = `https://holidayapi.com/v1/holidays?key=b8a9beec-2f3e-4319-b0f7-68ee562d49df&country=${pl}&year=2016&month=05`;


    let wrapper = $('<div>', {class: 'wrapper'});
    let app = $('<div>', {class: 'appSearch'});
    let input = $('<input>', {class: 'inputSearch'});
    let button = $('<button>', {class: 'buttonSearch'});

    let ul = $('<ul>', {class: 'ulHolidays'});

    let list;
    let predefinedValues;

    button.text('Search');
    app.append(input);
    app.append(button);
    wrapper.append(app);
    $('body').append(wrapper);

    ////////////////////////

    predefinedValues = [
        "AR",
        "AO",
        "AT",
        "AU",
        "AW",
        "AX",
        "BA",
        "BE",
        "BG",
        "BO",
        "BR",
        "BS",
        "CA",
        "CH",
        "CN",
        "CO",
        "CR",
        "CU",
        "CZ",
        "DE",
        "DK",
        "DO",
        "EC",
        "ES",
        "FI",
        "FR",
        "GB",
        "GB-ENG",
        "GB-NIR",
        "GB-SCT",
        "GB-WLS",
        "GR",
        "GT",
        "HK",
        "HN",
        "HR",
        "HU",
        "ID",
        "IE",
        "IN",
        "IL",
        "IS",
        "IT",
        "JP",
        "KZ",
        "LS",
        "LU",
        "MG",
        "MQ",
        "MU",
        "MX",
        "MZ",
        "NG",
        "NL",
        "NO",
        "PE",
        "PK",
        "PH",
        "PL",
        "PR",
        "PT",
        "PY",
        "RE",
        "RO",
        "RU",
        "SC",
        "SE",
        "SG",
        "SI",
        "ST",
        "SK",
        "TN",
        "TR",
        "UA",
        "US",
        "UY",
        "VE",
        "ZA",
        "ZW",
    ];

    let createList = function ( values ){
        if ( list ){
            app.remove( list );
        }

        let ulInput = $('<ul>');

        values.forEach( function ( value ){
            let li = $('<li>');
            li.text(value);
            ulInput.append(li);
        });
        return ulInput;

    };

    let manageList = function ( string ){
        let showedValues = predefinedValues.filter( function ( values ){
            return values.indexOf( string ) == 0;
        });
        if ( showedValues.length ){
            list = createList( showedValues );
            app.append( list );
        } else if ( list != null ){
            app.remove( list );
            list = null;
        }
    };

    let onType = function(){
        manageList(this.value);
    };


    let clearList = function(){
        list.addClass('hide');
    };

    input.on('blur', clearList);

    input.on('keyup', onType);


    ////////////////////////




    function createListHolidays( holidays ) {
          for(let i = 0 ; i < holidays.length; i++) {
              let li = $('<li>');
              let h2 = $('<h2>').text(holidays[i].name);
              let span = $('<span>').text(holidays[i].date);
              h2.append(span);
              li.append(h2);
              ul.append(li);
              wrapper.append(ul);
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

});
