(function(){
    function createStyle(txt) {
        var style = document.createElement('style');
        style.textContent = txt;
        style.rel = 'stylesheet';
        document.head.appendChild(style);
    }

    try {
        if (localStorage.sourceSansPro) {
            createStyle(localStorage.sourceSansPro);
        } else {
            var request = new XMLHttpRequest();
            request.open('GET', '/static/source-sans-pro.woff.css', true);

            request.onload = function() {
                if (request.status >= 200 && request.status < 400) {
                    localStorage.sourceSansPro = request.responseText;
                    createStyle(request.responseText);
                }
            }

            request.send();
        }
    } catch(ex) {}
}());