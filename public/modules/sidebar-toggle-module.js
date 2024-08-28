/**
 * This module is responsible for toggling the sidebar for all the windows
 */

const menuIcon = document.querySelector(".menu-Icon");
const closeIcon = document.querySelector(".close-Icon");

menuIcon.addEventListener("click", toggleMenu);
closeIcon.addEventListener("click", toggleMenu);

function toggleMenu() {

    let menuDisplayProperty = window.getComputedStyle(menuIcon).display;
    let closeDisplayProperty = window.getComputedStyle(closeIcon).display;

    menuIcon.style.display = closeDisplayProperty;
    closeIcon.style.display = menuDisplayProperty;
    document.querySelector(".sidebar").style.display = menuDisplayProperty;
};