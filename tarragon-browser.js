var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);
var elems = $$('link[type="text/data"]');
Array.prototype.forEach.call(elems, function(elem) {
    fetch(elem.href)
    .then(function(response) {
        return response.json()
    }).then(function(data) {
        console.log('parsed json', data);

        for (selector in data) {
            var body = data[selector];
            $(selector).innerHTML = body;
        }
    }).catch(function(ex) {
        console.log('parsing failed', ex)
    })
});
