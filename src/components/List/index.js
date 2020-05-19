import React from 'react';
import "./styles.scss";

const getClassName = (obj) => Object.entries(obj).map(([className,pred]) => {
    const shouldConcat = typeof(pred) === "function" ? pred() : pred;
    return shouldConcat ? className : undefined
}).join(" ")

const mapToItems = (data,search) => data.map((value,index) => <Item value={value} key={index} search={search} />)

const mapToHighlights = (str,search) => {
    const keyword = new RegExp(search,"gi")
    if( search && search.trim() && keyword.test(str) ){
        return <span>{str.replace(keyword, str => `|${str}|`)
                .split("|")
                .map((str,idx) => {
                    return str.toLowerCase() === search.trim().toLowerCase() ? 
                        <strong key={`highlight-${idx}`}>{str}</strong> : str
                })}</span>
    } else {
        return str
    }
}

const setSearchProp = (search,children) => React.Children.map(children,(child) => {
    return React.cloneElement(child,{
        ...child.props,
        search,
    })
})

export const Item = (props) => {
    const { value, search, children } = props;
    const text = value || children;
    const cl = getClassName({
        "list__item": true
    })

    return <li className={cl} role="listitem">
        {mapToHighlights(text,search)}
    </li>
}

const List = (props) => {
    const { content, search, children } = props;
    return <ul className="list" role="list">
        {content ? mapToItems(content,search) : setSearchProp(search,children)}
    </ul>
}

List.Item = Item;

export default List;