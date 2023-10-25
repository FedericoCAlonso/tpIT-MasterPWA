var toggle = document.querySelector(".toggle");
var menu = document.querySelector(".menu");
const menuButton = document.getElementById("navbutton");

menuButton.addEventListener("click", function() {
    toggle.classList.toggle("active");
    menu.classList.toggle("active");
    console.log(toggle.classList);
    console.log(menu.classList);

    
});

