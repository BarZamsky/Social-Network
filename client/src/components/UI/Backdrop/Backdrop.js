import React from "react"
import "./Backdrop.scss"

const backdrop = (props) => (
    props.show? <div className="Backdrop" onClick={props.onClick}/> : null
)

export default backdrop;