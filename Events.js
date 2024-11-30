async function fetchEvents() {
    const response = await fetch('/events');
    const events = await response.json();
    const eventList = document.getElementById("event-list");
    eventList.innerHTML = '';
    events.forEach(event => {
      const li = document.createElement("li");
      li.innerText = `${event.title}: ${event.description}`;
      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "Delete";
      deleteBtn.onclick = () => deleteEvent(event.id);
      li.appendChild(deleteBtn);
      eventList.appendChild(li);
    });
  }

  async function deleteEvent(eventId) {
    await fetch(`/events/${eventId}`, { method: "DELETE" });
    fetchEvents();
  }

  window.onload = fetchEvents;
