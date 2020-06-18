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

const getClassName = (obj) => Object.entries(preProcess(obj)).map(([className,pred]) => {
    const shouldConcat = typeof(pred) === "function" ? pred() : pred;
    return shouldConcat ? className : undefined
}).filter(Boolean).join(" ")

export default getClassName