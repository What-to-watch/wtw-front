const preProcess = obj => {
    if(obj.base){
        const { base, token="&", ...rest } = obj
        if(rest[token] === undefined){
            rest[token] = true
        };
        return Object.fromEntries(Object.entries(rest).map(([ key, val ]) => [ key.replace(token,base), val]))
    } else {
        return obj
    }
}


const _getClassName = (obj) => Object.entries(preProcess(obj)).map(([className,pred]) => {
    const shouldConcat = typeof(pred) === "function" ? pred() : pred;
    return shouldConcat ? className : undefined
}).filter(Boolean).join(" ")

const getClassName = (obj) => {
    const res = new String(_getClassName(obj));
    res.extend = (sub) => sub.replace(obj?.token || "&", obj?.base || "")
    res.base = obj?.base;
    res.token = obj?.token || "&";
    return res;
}

export default getClassName