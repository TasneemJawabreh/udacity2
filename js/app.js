/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const navMenu = document.getElementById('navbar__list');
const sections = document.querySelectorAll('main section');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
// Scroll to anchor ID using scrollTO event
const scroll = (event) => {
    event.preventDefault();
    const targetID = event.currentTarget.getAttribute('href');
    document.querySelector(targetID).scrollIntoView({
        behavior: 'smooth'
    });
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const createNav = () => {
    sections.forEach(section => {
        const id = section.id;
        const header = section.querySelector('h2').innerText;
        const nav_li = document.createElement('li');
        const nav_a = document.createElement('a');

        nav_a.href = `#${id}`;
        nav_a.innerText = header;
        nav_li.appendChild(nav_a);
        navMenu.appendChild(nav_li);
    });
};

// Add class 'active' to section when near top of viewport
function makeActive(){
    for (const section of sections) {
        const box = section.getBoundingClientRect();
        let navLink;
        document.querySelectorAll('nav a').forEach(anchor => {
          if (anchor.getAttribute('href') === `#${section.id}`) {
            navLink = anchor;
        }
     });
        //Find a value that works best, but 150 seems to be a good start.
        const value = 150; 
        if (box.top <= value && box.bottom >= value) {
        //apply active state on current section and corresponding Nav link
        section.classList.add('active');
        navLink.classList.add('active');
        } else {
        //Remove active state from other section and corresponding Nav link
        section.classList.remove('active');
        navLink.classList.remove('active');
        }
     }
}



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// Build the nav
createNav();

// Add class 'active' to section when near top of viewport
document.addEventListener("scroll", function() { makeActive();});

/**
 * End Main Functions
 * Begin Events
 * 
*/




// Scroll to section on link click
const clickedSection = document.querySelectorAll('nav a');
for (let i = 0; i < clickedSection.length; i++) {
    clickedSection[i].addEventListener('click', scroll);
}

// Set sections as active
document.addEventListener('scroll', makeActive);
