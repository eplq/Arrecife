export default function addTime(seconds: number, date: Date = new Date()) {
    const dateMilliseconds = date.getTime();
    const newTime = dateMilliseconds + seconds * 1000;

    return new Date(newTime);
}
