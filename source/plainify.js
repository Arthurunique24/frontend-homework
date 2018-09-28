'use strict';

function reducer(prevKey, obj, resultObj) {
    if (!(obj instanceof Object)) {
        return {}
    }
    const objEntries = Object.entries(obj);
    return objEntries.reduce((acc, value) => {
        const key = prevKey === '' ? `${prevKey}${value[0]}` : `${prevKey}.${value[0]}`;

        if (value[1].constructor !== Object) {
            resultObj[key] = value[1];
            return acc;
        }
        acc[key] = reducer(key, value[1], resultObj);
        return acc;
    }, {});
}

function plainify(obj) {
    const result = {};

    reducer('', obj, result);

    return result;
}

function newPlainify(obj) {
    const result = {};

    if (!(obj instanceof Object)) {
        return {}
    }
    const objEntries = Object.entries(obj);
    let prevKey = '';

    return objEntries.reduce((acc, value) => {
        const key = prevKey === '' ? `${prevKey}${value[0]}` : `${prevKey}.${value[0]}`;

        if (value[1].constructor !== Object) {
            result[key] = value[1];
            return acc;
        }
        acc[key] = reducer(key, value[1], result);
        return acc;
    }, {});
}
