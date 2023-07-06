const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function reviewDateFormatter(dateString) {
    const dateArray = dateString.split('-');

    return `${months[parseInt(dateArray[1] - 1)]} ${dateArray[0]}`;
};

export function bookingDateFormatter(dateString) {
    const dateArray = dateString.split('-');

    return `${months[parseInt(dateArray[1] - 1)]} ${dateArray[2]}, ${dateArray[0]}`
}
