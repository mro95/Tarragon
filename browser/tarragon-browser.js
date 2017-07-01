var $ = document.querySelector.bind(document),
    $$ = document.querySelectorAll.bind(document),
    elems = $$('link[type="text/data"]');
Array.prototype.forEach.call(elems, function(elem) {
    fetch(elem.href)
    .then(function(response) {
        return response.json();
    }).then(function(data) {
        for (selector in data) {
            $(selector).innerHTML = data[selector];
        }
    })
});
