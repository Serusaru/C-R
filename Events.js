
const loginSection = document.getElementById('login-section');
const crudSection = document.getElementById('crud-section');
const loginButton = document.getElementById('login-button');
const usernameInput = document.getElementById('username');
const addEventForm = document.getElementById('add-event-form');
const eventsList = document.getElementById('events-list');


let isLoggedIn = false;


let events = [];


loginButton.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    if (username) {
        isLoggedIn = true;
        loginSection.classList.add('hidden');
        crudSection.classList.remove('hidden');
        alert(`Welcome, ${username}!`);
    } else {
        alert('Please enter a username.');
    }
});


addEventForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const eventName = document.getElementById('event-name').value.trim();
    if (eventName) {
        const eventId = Date.now(); 
        events.push({ id: eventId, name: eventName });
        document.getElementById('event-name').value = '';
        renderEvents();
    } else {
        alert('Event name cannot be empty.');
    }
});


function renderEvents() {
    eventsList.innerHTML = '';
    events.forEach(event => {
        const li = document.createElement('li');
        li.textContent = event.name;

        
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editEvent(event.id));

        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteEvent(event.id));

        li.appendChild(editButton);
        li.appendChild(deleteButton);
        eventsList.appendChild(li);
    });
}


function editEvent(id) {
    const newName = prompt('Enter new event name:');
    if (newName) {
        const event = events.find(event => event.id === id);
        if (event) {
            event.name = newName;
            renderEvents();
        }
    }
}

function deleteEvent(id) {
    events = events.filter(event => event.id !== id);
    renderEvents();
}
