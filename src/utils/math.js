import { isNil } from "ramda";

export const getRandomInteger = (_min,_max) => {
    const max = Math.ceil(isNil(_max) ? _min : _max);
    const min = Math.floor(isNil(_max) ? 0 : _min)
    return Math.floor(Math.random() * (max - min) ) + min
}