import React from 'react'
import './Card.css'

const Card = ({ pokemon }) => {
  return (
    <div className='card'>
      <div className='cardImg'>
        <img src={pokemon.sprites.front_default} alt='' />
      </div>
      <h3 className='cardName'>{pokemon.name}</h3>
      <div className='cardTypes'>{pokemon.types.map((type) => {
        return (
          <p className='typeName' key={type.type.name}>{type.type.name}</p>
        );
      })}
      </div>
      <div className='cardInfo'>
        <div className='cardData'>
          <p className='titile'>重さ: {pokemon.weight}</p>
        </div>
        <div className='cardData'>
          <p className='titile'>高さ: {pokemon.height}</p>
        </div>
        <div className='cardData'>
          <p className='titile'>アビリティ: {pokemon.abilities[0].ability.name}</p>
        </div>
      </div>
    </div>
  )
}

export default Card
