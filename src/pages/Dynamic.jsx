import React from 'react'
import { useParams } from 'react-router-dom'


function Dynamic() {
    const params = useParams()
  return (
    <div>
        i am a Dynamic {params.username} page
    </div>
  )
}


export default Dynamic