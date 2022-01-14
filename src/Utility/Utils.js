/* eslint-disable radix */
function createProgressBar(value, maxValue, size) {
    const percentage = value / maxValue;
    const progress = Math.round(size * percentage);
    const emptyProgress = size - progress;

    const progressText = "▇".repeat(progress);
    const emptyProgressText = "—".repeat(emptyProgress);
    const percentageText = `${Math.round(percentage * 100)}%`;

    const Bar = progressText + emptyProgressText;
    return { Bar, percentageText };
}

function format(millis) {
    const h = Math.floor(millis / 3600000);
    const m = Math.floor(millis / 60000);
    const s = ((millis % 60000) / 1000).toFixed(0);

    if (h < 1) {
        return `${(m < 10 ? "0" : "") + m}:${s < 10 ? "0" : ""}${s} | ${Math.floor(millis / 1000)} Seconds`;
    }
    return `${(h < 10 ? "0" : "") + h}:${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s} | ${Math.floor(millis / 1000)} Seconds`;
}

function convertTime(duration) {
    let seconds = parseInt((duration / 1000) % 60);
    let minutes = parseInt((duration / (1000 * 60)) % 60);
    let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? `0${hours}` : hours;
    minutes = (minutes < 10) ? `0${minutes}` : minutes;
    seconds = (seconds < 10) ? `0${seconds}` : seconds;

    if (duration < 3600000) {
        return `${minutes}:${seconds}`;
    }
    return `${hours}:${minutes}:${seconds}`;
}

module.exports = { createProgressBar, format, convertTime };
