export default function getRandomHue() {
    const min = Math.ceil(0);
    const max = Math.floor(360);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}