import React from 'react'
import "./styles.scss"
import getClassName from '../../utils/getClassName';

const Input = (props) => {
  const { placeholder, fluid, onChange=()=>{}, ...extra } = props;

  const inputClass = getClassName({
    base: "outline-input",
    "&--fluid": fluid
  })

  const handleChange = (e) => {
    onChange(e.target.value, props)
  }
  return <input className={inputClass} placeholder={placeholder} onChange={handleChange} {...extra}/>
}

export default Input;