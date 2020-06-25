import React, { useState } from 'react'
import getClassName from '../../utils/getClassName'
import "./styles.scss"

const ButtonLoader = () => {
  return <div className="outline-button__loader">
    <div className="outline-button__loader__dot"/>
    <div className="outline-button__loader__dot"/>
    <div className="outline-button__loader__dot"/>
  </div>
}

const OutlineButton = ({ label, loading , onClick, children, ...extra }) => {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const handleClick = (e) => {
    e.preventDefault()
    !loading && onClick && onClick(extra)
  }

  const buttonClass = getClassName({
    base: "outline-button",
    "&--hover": hover && !loading,
    "&--active": active && !loading,
    "&--loading": loading
  })

  const buttonLabelClass = getClassName({
    "outline-button__label--loading": loading,
  })

  return(
    <button 
      className={buttonClass}
      onClick={handleClick}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...extra}
    >
      <p className={buttonLabelClass}>{label || children}</p>
      {loading && <ButtonLoader />}
    </button>
  )
}

export default OutlineButton;