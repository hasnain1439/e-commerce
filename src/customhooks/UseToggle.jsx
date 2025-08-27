import React, { useCallback, useState } from 'react'

function UseToggle(initalValue = false) {
    const [showHide, setShowHide] = useState(initalValue)
    const toggleFunction = useCallback(()=>{
        setShowHide((prev)=> !prev)
    })
  return {showHide, toggleFunction}
}

export default UseToggle