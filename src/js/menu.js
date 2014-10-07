module.exports = {
    setup: function() {
        var hidden = true;
        var menu = document.getElementById('menu');
        var menuIcon = document.querySelector('.menu-icon');
        menuIcon.addEventListener('click', function(e) {
            if (hidden) {
                menu.style.display = 'block';
                menuIcon.children[0].textContent = 'close';
                hidden = false;
            } else {
                menu.style.display = 'none';
                menuIcon.children[0].textContent = 'menu';
                hidden = true;
            }

            e.preventDefault();
        });
    }
};