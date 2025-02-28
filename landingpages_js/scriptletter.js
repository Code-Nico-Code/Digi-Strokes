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
document.getElementById("menu-icon").addEventListener("click", function () {
    if (document.body.classList.contains("panel-open")) {
        closeNav();
    } else {
        openNav();
    }
});
document.getElementById("menu-text").addEventListener("click", function () {
    if (document.body.classList.contains("panel-open")) {
        closeNav();
    } else {
        openNav();
    }
});
// Function to handle button click for running a project
let checkStatusInterval;

function runProject(endpoint) {
    // Notify that the request has started
    document.getElementById('output').textContent = "Request started...";

    // Use setTimeout to delay the fetch slightly and allow DOM update
    setTimeout(() => {
        // Update the output to show that the program is running
        document.getElementById('output').textContent = "Program is running...";

        fetch(endpoint)
            .then(response => {
                console.log(response);  // Log the response for debugging
                return response.json();
            })
            .then(data => {
                // Once the response is received, show request completed
                document.getElementById('output').textContent = data.message;  // Update with the message from server
                
                // Start checking the status of the running project
                checkStatusInterval = setInterval(checkStatus, 1000); // Check status every second
            })
            .catch(error => {
                // Handle errors if the request fails
                document.getElementById('output').textContent = 'Error: ' + error;
            });
    }, 1000);  // Small timeout to allow "Program is running..." to be updated
}

function checkStatus() {
    fetch('/check-status')
        .then(response => response.json())
        .then(data => {
            if (data.is_running) {
                // If the project is still running, update the output
                document.getElementById('output').textContent = "AIRCANVAS script is still running...";
            } else {
                // If the project has finished running, clear the interval and update the output
                clearInterval(checkStatusInterval);
                document.getElementById('output').textContent = "AIRCANVAS script has finished running.";
            }
        })
        .catch(error => {
            console.error('Error checking status:', error);
        });
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('runProject4Btn').addEventListener('click', function () {
        runProject('http://127.0.0.1:5000/run-project4'); // Corrected endpoint
    });
});