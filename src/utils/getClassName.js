const getClassName = (obj) => Object.entries(obj).map(([className,pred]) => {
    const shouldConcat = typeof(pred) === "function" ? pred() : pred;
    return shouldConcat ? className : undefined
}).filter(Boolean).join(" ")

export default getClassName