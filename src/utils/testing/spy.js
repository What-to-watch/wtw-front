import { equals, prop } from "ramda";

export const Spy = (fn = x => x) => {
    let _spy = (...args) => {
        const res = fn(...args);
        _spy.calls.push({ 
            args, 
            result: res, 
            returned: equals(res),
            reached: true
        })
        return res;
    }
    _spy.calls = [];
    _spy.calledWith = (...args) => _spy.calls.map(prop("args")).some(equals(args))
    _spy.appliedWith = (args) => _spy.calls.map(prop("args")).some(equals(args))
    _spy.returned = x => _spy.calls.map(prop("result")).some(equals(x));
    _spy.reset = () => {
        _spy.calls = [];
        return fn
    }

    const maybeCall = index => {
        if(_spy.calls.length > index){
            return _spy.calls[index];
        } else {
            return {
                args: [],
                result: undefined,
                returned: () => false,
                reached: false
            }
        }
    }

    Object.defineProperty(_spy,"called",{
        get: () => _spy.calls.length > 0
    })
    Object.defineProperty(_spy,"callCount",{
        get: () => _spy.calls.length
    })
    Object.defineProperty(_spy,"firstCall",{
        get: () => maybeCall(0)
    })
    Object.defineProperty(_spy,"secondCall",{
        get: () => maybeCall(1)
    })
    Object.defineProperty(_spy,"thirdCall",{
        get: () => maybeCall(2)
    })
    Object.defineProperty(_spy,"fourthCall",{
        get: () => maybeCall(3)
    })

    return _spy
}