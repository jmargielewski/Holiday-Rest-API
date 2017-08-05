$(function() {


    let wrapper = $('<div>', {class: 'wrapper'});
    let app = $('<div>', {class: 'appSearch'});
    let input = $('<input>', {class: 'inputSearch'});
    let button = $('<button>', {class: 'buttonSearch'});

    button.text('Search');

    app.append(input);
    app.append(button);
    wrapper.append(app);
    $('body').append(wrapper);

});
