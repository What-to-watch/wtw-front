import React from 'react'
import "./styles.scss"

const OutlineButton = ({ label , onClick, children, ...extra }) => {
  
  const handleClick = (e) => {
    e.preventDefault()
    onClick && onClick(extra)
  }

  return(
    <button className="outline-button" onClick={handleClick}>
      {label || children}
    </button>
  )
}

export default OutlineButton;