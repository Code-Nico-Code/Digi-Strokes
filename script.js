window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  const heroSection = document.getElementById('page1'); // Assuming 'page1' is your hero section
  const heroHeight = heroSection.offsetHeight;

  if (window.scrollY > heroHeight) {
      navbar.classList.add('scrolled');
  } else {
      navbar.classList.remove('scrolled');
  }
});

function openNav() {
    // Open the side panel
    document.getElementById("sidePanel").style.width = "250px";

    // Rotate the menu icon by adding the "rotate" class
    document.getElementById("menu-icon").classList.add("rotate");

    // Add a class to the body to indicate the panel is open
    document.body.classList.add("panel-open");
}

// Close the side panel
function closeNav() {
    // Close the side panel
    document.getElementById("sidePanel").style.width = "0";
    // Remove the rotation of the menu icon
    document.getElementById("menu-icon").classList.remove("rotate");

    // Remove the class from the body indicating the panel is open
    document.body.classList.remove("panel-open");
}

// Toggle the side panel by clicking on the menu icon
document.getElementById("menu-icon").addEventListener("click", function() {
    if (document.body.classList.contains("panel-open")) {
        closeNav();
    } else {
        openNav();
    }
});

document.getElementById("menu-text").addEventListener("click", function() {
  if (document.body.classList.contains("panel-open")) {
      closeNav();
  } else {
      openNav();
  }
});

const prevArrow = document.querySelector('.prev-arrow');
const nextArrow = document.querySelector('.next-arrow');
const projectsWrapper = document.querySelector('.projects-wrapper');
const projectCards = document.querySelectorAll('.project-card');

let currentIndex = 0; // Start by showing the first project
const totalProjects = projectCards.length;

// Function to show the project based on index
function showProject(index) {
  const translateValue = -index * 100; // Moves the wrapper by 100% for each project
  projectsWrapper.style.transform = `translateX(${translateValue}vw)`; // Move to the project based on index
  projectsWrapper.style.transition = 'transform 0.5s ease-in-out'; // Adding transition for smooth effect
}

// Initial display: Show the first project
showProject(currentIndex);  // Shows project one on load

// Event listener for next button
nextArrow.addEventListener('click', () => {
  if (currentIndex < totalProjects - 1) {
    currentIndex++; // Move to the next project
  } else {
    currentIndex = 0; // Loop back to the first project if at the end
  }
  showProject(currentIndex); // Show the project based on updated index
});

// Event listener for previous button
prevArrow.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--; // Move to the previous project
  } else {
    currentIndex = totalProjects - 1; // Loop back to the last project if at the beginning
  }
  showProject(currentIndex); // Show the project based on updated index
});

const teamCards = document.querySelectorAll('.team-card');
const lineControls = document.querySelectorAll('.line-control');
let currentTeamMember = 0;

// Function to update the active team member
function updateTeamMember(index) {
    teamCards[currentTeamMember].classList.remove('active');
    lineControls[currentTeamMember].classList.remove('active');
    currentTeamMember = index;
    teamCards[currentTeamMember].classList.add('active');
    lineControls[currentTeamMember].classList.add('active');
}

// Auto-slide every 5 seconds
setInterval(() => {
    const nextMember = (currentTeamMember + 1) % teamCards.length;
    updateTeamMember(nextMember);
}, 5000);

// Manual click on the line controls
lineControls.forEach((control, index) => {
    control.addEventListener('click', () => {
        updateTeamMember(index);
    });
});

document.querySelectorAll('.faq-item').forEach(item => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    if (item.classList.contains('active')) {
      item.classList.remove('active');
      item.classList.add('close');
    } else {
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('close', 'active')); // Close others
      item.classList.remove('close');
      item.classList.add('active');
    }
  });
});
