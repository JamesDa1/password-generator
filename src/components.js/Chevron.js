import React from "react"

const Chevron = ({ color }) => {
  return (
    <svg width="10" height="28" className="chevron">
      <rect
        width="10"
        height="28"
        style={{
          fill: color,
          strokeWidth: "3",
          stroke: "black",
        }}
      />
    </svg>
  )
}

export default Chevron
