const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function reviewDateFormatter(dateString) {
    const dateArray = dateString.split('-');

    return `${months[parseInt(dateArray[1] - 1)]} ${dateArray[0]}`;
};
