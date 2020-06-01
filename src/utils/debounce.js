export default function debounce(fn,timer){
    let id = null;
    return (...args) => {
        if( id !== null ){
            clearTimeout(id)
        }
        id = setTimeout(() => fn(...args),timer);
    }
}