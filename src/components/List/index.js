import React from 'react';
import PropTypes from 'prop-types';

import "./styles.scss";

const mapToItems = (data,props) => 
    data
    .map(x => typeof x === "string" ? { label: x, value: x } : x )
    .map(({label, value, ...meta},index) => <Item 
        index={index} 
        key={index} 
        label={label}
        value={value}
        {...meta}
        {...props} 
    />
    )


const mapToHighlights = (str,keyword) => {
    const keywordRegExp = new RegExp(keyword,"gi")
    if( keyword && keyword.trim() && keywordRegExp.test(str) ){
        return <span>{str.replace(keywordRegExp, str => `|${str}|`)
                .split("|")
                .map((str,idx) => {
                    if(str.toLowerCase() === keyword.trim().toLowerCase()){
                        return <strong key={`highlight-${idx}`}>{str}</strong>
                    } else {
                        return str
                    }
                })}</span>
    } else {
        return str
    }
}

const overrideItemProps = (children,props) => React.Children.map(children,(child) => {
    return React.cloneElement(child,{
        ...child.props,
        ...props,
    })
})

export const Item = (props) => {
    const { label, value, keyword, children, onClick = x => x } = props;
    const text = label || children || value;

    const handleClick = () => {
        onClick(value,props)
    }

    return <li className="list__item" onClick={handleClick}>
        {mapToHighlights(text,keyword)}
    </li>
}

const List = (props) => {
    const { 
        content, 
        keyword, 
        children, 
        onItemClick = x => x
    } = props;

    const itemProps = {
        keyword,
        onClick: onItemClick
    }

    return <ul className="list" >
        {content ? mapToItems(content,itemProps) : overrideItemProps(children,itemProps)}
    </ul>
}

List.Item = Item;

Item.propTypes = {
    value: PropTypes.node,
    keyword: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func,
}

List.propTypes = {
    keyword: PropTypes.string,
    content: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.shape({
            label: PropTypes.node.isRequired,
            value: PropTypes.any.isRequired
        }),
        PropTypes.node
    ])),
    children: (props) => {
        if( props.children ){
            if(props.content){
                throw new Error("List should have either content or children. Not both.")
            }
            if(props.children.some(p => p.type !== Item)){
                const others = props.children.filter(p => p.type !== Item).map(x => x.type)
                throw new Error(`List may only contain Item children. Found: ${others}`)
            }
        }
    },
    onItemClick: PropTypes.func,
}

export default List;