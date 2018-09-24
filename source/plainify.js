'use strict';

function reducer(prevKey, obj, resultObj) {
    const a = Object.entries(obj);
    return a.reduce((acc, value) => {
        const key = prevKey === '' ? `${prevKey}${value[0]}` : `${prevKey}.${value[0]}`;
    console.log(prevKey + value[0] + key);

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
