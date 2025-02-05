const calendarEl = document.getElementById('calendar');
const events = [];

// Pre-registered valid users
const validUsers = [
    { username: 'りの', password: CryptoJS.MD5('0803').toString(), secretAnswer: 'ももんが' },
    { username: 'たかこ', password: CryptoJS.MD5('2403').toString(), secretAnswer: 'ももんが' }
];

function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const secretAnswer = document.getElementById('secret-question').value.trim().toLowerCase();
    const hashedPassword = CryptoJS.MD5(password).toString();

    const user = validUsers.find(user => user.username === username && user.password === hashedPassword && user.secretAnswer === secretAnswer);

    if (user) {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('calendar-container').style.display = 'block';
        Object.defineProperty(window, NAME, {
            value: user.name,
            writable: false
        });
        renderCalendar();
    } else {
        alert('Invalid login credentials or secret answer');
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
            if (NAME == 'りの'){
                eventEl.classList.add('green');
            }else if (NAME == 'たかこ'){
                eventEl.classList.add('orange');
            }
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