import React from "react"
import { useState } from "react"
import "./Slider.css"

import ReactSlider from "react-slider"

const Slider = () => {
  const [currentValue, setCurrentValue] = useState(0)

  return (
    <ReactSlider
      className="customSlider"
      thumbClassName="customSlider-thumb"
      trackClassName="customSlider-track"
      markClassName="customSlider-mark"
      marks={20}
      min={8}
      max={20}
      valueLabelDisplay="on"
      defaultValue={0}
      value={currentValue}
      onChange={(value) => {
        setCurrentValue(value)
        console.log(value)
      }}
      renderMark={(props) => {
        if (props.key < currentValue) {
          props.className = "customSlider-mark customSlider-mark-before"
        } else if (props.key === currentValue) {
          props.className = "customSlider-mark customSlider-mark-active"
        }
        return <span {...props} />
      }}
    />
  )
}

export default Slider
