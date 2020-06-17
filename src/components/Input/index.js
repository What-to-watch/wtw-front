import React from 'react'
import "./styles.scss"

const Input = (props) => {
  const { placeholder, onChange=()=>{}, ...extra } = props;
  const handleChange = (e) => {
    onChange(e.target.value, props)
  }
  return <input className="outline-input" placeholder={placeholder} onChange={handleChange} {...extra}/>
}

export default Input;