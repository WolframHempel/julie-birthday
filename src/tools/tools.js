const debounceTimeouts = {};

export function getPromise() {
    var resolve, reject;
    const promise = new Promise((_resolve, _reject) => {
        resolve = _resolve;
        reject = _reject;
    })
    promise.resolve = resolve;
    promise.reject = reject;
    return promise;
}

export function debounce(key, timeout, callback) {
    if (debounceTimeouts[key]) {
        return;
    }

    debounceTimeouts[key] = setTimeout(() => {
        delete debounceTimeouts[key];
        callback();
    }, timeout);
}

export function roundToPlaces(value, places) {
    return +(Math.round(value + "e+" + places) + "e-" + places);
}

export function roundValues(values) {
    for (var key in values) {
        values[key] = roundToPlaces(values[key], 6)
    }

    return values;
}

export function deepClone(object) {
    return JSON.parse(JSON.stringify(object));
}

const TIMESPANS = [
    { span: 1000, unit: 'second' },
    { span: 1000 * 60, unit: 'minute' },
    { span: 1000 * 60 * 60, unit: 'hour' },
    { span: 1000 * 60 * 60 * 24, unit: 'day' },
    { span: 1000 * 60 * 60 * 24 * 31, unit: 'month' },
    { span: 1000 * 60 * 60 * 24 * 365, unit: 'year' },
];

export function formatDuration(duration) {
    var i, amount, output = '';
    for (i = 1; i < TIMESPANS.length; i++) {
        if (duration < TIMESPANS[i].span) {
            amount = Math.floor(duration / TIMESPANS[i - 1].span);
            output += amount + ' ' + TIMESPANS[i - 1].unit + (amount > 1 ? 's' : '')
            return output;
            // this adds the additional intervals, resulting in e.g.
            // 9 days 3 hours 34 minutes 30 seconds ago
            // instead, we just want to return the highest interval, e.g. 3 days ago
            if (i > 1) {
                output += ' ' + formatDuration(duration % TIMESPANS[i - 1].span);
            }
            return output;
        }
    }
}