export default function generateDefaultEndDate() {
    const date = new Date().toISOString().slice(0,10);
    const day = date.slice(8,10);
    const updatedDay = parseInt(day) + 1 % 12;
    const newDate = date.slice(0,8) + (updatedDay < 10 ? '0' + updatedDay : updatedDay);

    return newDate;
};
