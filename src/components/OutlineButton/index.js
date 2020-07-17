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

const OutlineButton = ({ label, loading , onClick, children, white, fluid, danger, ...extra }) => {
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
    "&--loading": loading,
    "&--white": white,
    "&--fluid": fluid,
    "&--danger": danger
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
      <div className={buttonLabelClass}>{label || children}</div>
      {loading && <ButtonLoader />}
    </button>
  )
}

export default OutlineButton;