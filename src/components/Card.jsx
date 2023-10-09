import React from 'react'
import './Card.css'

export const Card = ({img}) => {
  return (
    <div className='card'>
        <img src={img} alt="" loading='lazy'/>
    </div>
  )
}
