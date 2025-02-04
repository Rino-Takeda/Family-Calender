const calendarEl = document.getElementById('calendar');
const events = [];

// Secure user data with hashed passwords (using a simple simulation for this demo)
const validUsers = [];

function hashPassword(password) {
    return CryptoJS.MD5(password).toString();
}

function registerUser() {
    const username = document.getElementById('register-username').value.trim();
    const password = document.getElementById('register-password').value.trim();
    const secret = document.getElementById('register-secret').value.trim();

    if (!username || !password || !secret) {
        alert('All fields are required.');
        return;
    }

    if (validUsers.some(user => user.username === username)) {
        alert('Username already taken.');
        return;
    }

    validUsers.push({
        username,
        password: hashPassword(password),
        secret
    });

    alert('Registration successful! You can now log in.');
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const hashedPassword = hashPassword(password);
    const user = validUsers.find(user => user.username === username && user.password === hashedPassword);

    if (user) {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('calendar-container').style.display = 'block';
        renderCalendar();
    } else {
        alert('Invalid username or password');
    }
}

function renderCalendar() {
    calendarEl.innerHTML = '';
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDay.getDay();

    // Fill initial empty slots for the week
    for (let i = 0; i < firstDayOfWeek; i++) {
        const emptySlot = document.createElement('div');
        emptySlot.classList.add('day');
        calendarEl.appendChild(emptySlot);
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayEl = document.createElement('div');
        dayEl.classList.add('day');
        dayEl.innerHTML = `<span>${day}</span>`;

        const dayEvents = events.filter(event => event.date === dateStr);
        dayEvents.forEach(event => {
            const eventEl = document.createElement('div');
            eventEl.classList.add('event');
            eventEl.textContent = `${event.title} (${event.startTime} - ${event.endTime})`;
            dayEl.appendChild(eventEl);
        });

        calendarEl.appendChild(dayEl);
    }
}

function addEvent() {
    const dateInput = document.getElementById('event-date');
    const titleInput = document.getElementById('event-title');
    const startTimeInput = document.getElementById('event-start-time');
    const endTimeInput = document.getElementById('event-end-time');
    const date = dateInput.value;
    const title = titleInput.value.trim();
    const startTime = startTimeInput.value;
    const endTime = endTimeInput.value;

    if (date && title && startTime && endTime) {
        events.push({ date, title, startTime, endTime });
        renderCalendar();
        dateInput.value = '';
        titleInput.value = '';
        startTimeInput.value = '';
        endTimeInput.value = '';
    } else {
        alert('Please enter a valid date, event title, and time range.');
    }
}