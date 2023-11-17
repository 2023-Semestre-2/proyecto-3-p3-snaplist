function updateCurrentDateTime() {
    const currentDateTimeElement = document.getElementById('DateTime');
    const now = new Date();

    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed, so we add 1
    const year = now.getFullYear().toString().slice(-2); // Get the last 2 digits of the year
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    const dateTimeString = `Hoy es ${day}/${month}/${year} | ${formattedHours}:${formattedMinutes} ${ampm}`;

    currentDateTimeElement.textContent = dateTimeString;
}

// Update the date and time immediately when the page loads
updateCurrentDateTime();

// Update the date and time every minute (you can adjust the interval)
setInterval(updateCurrentDateTime, 60000);
