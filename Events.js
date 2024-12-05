document.addEventListener("DOMContentLoaded", () => {
    const isEventsPage = window.location.pathname.includes("events.html");
    const username = sessionStorage.getItem("loggedInUser");

    if (isEventsPage) {
        const eventsApp = document.getElementById("events-app");

        if (!username) {
            alert("Please log in to access this page.");
            window.location.href = "Login.html";
        } else {
            eventsApp.classList.remove("hidden"); 
            setupEventsPage(username);
        }
    }
});

function setupEventsPage(username) {
    document.getElementById("username-display").textContent = username;
    loadEvents();
}

function logout() {
    sessionStorage.removeItem("loggedInUser");
    window.location.href = "Login.html";
}

function loadEvents() {
    const events = JSON.parse(localStorage.getItem("events")) || [];
    const eventList = document.getElementById("event-list");
    eventList.innerHTML = "";

    events.forEach((event, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span>${event}</span>
            <button onclick="editEvent(${index})">Edit</button>
            <button onclick="deleteEvent(${index})">Delete</button>
        `;
        eventList.appendChild(listItem);
    });
}

function addEvent() {
    const eventName = document.getElementById("event-name").value;
    if (!eventName) {
        alert("Event name cannot be empty.");
        return;
    }

    const events = JSON.parse(localStorage.getItem("events")) || [];
    events.push(eventName);
    localStorage.setItem("events", JSON.stringify(events));
    loadEvents();
    document.getElementById("event-name").value = "";
}

function editEvent(index) {
    const events = JSON.parse(localStorage.getItem("events")) || [];
    const newName = prompt("Edit event name:", events[index]);
    if (newName) {
        events[index] = newName;
        localStorage.setItem("events", JSON.stringify(events));
        loadEvents();
    }
}

function deleteEvent(index) {
    const events = JSON.parse(localStorage.getItem("events")) || [];
    events.splice(index, 1);
    localStorage.setItem("events", JSON.stringify(events));
    loadEvents();
}
