import React from 'react'
import Button from './Button'


const Nav = (props) => {
  return (
    <div className='buttons' >
        <h1 style={{ color: 'lightGray' }}>{props.tytul}</h1>
        <Button
          marginesTop={'2vh'}
          margines={'0 auto'}
          color={'white'}
          text={'Konto'}
          fun={() => props.changeBoardState('account')}
        />
        <Button
          marginesTop={'2vh'}
          margines={'0 auto'}
          color={'white'}
          text={'Grupy'}
          fun={() => props.changeBoardState('groups')}
        />
        <Button
          marginesTop={'2vh'}
          margines={'0 auto'}
          color={'white'}
          text={'Dodaj notatkę'}
          fun={() => props.changeBoardState('addTask')}
        />
        <Button
          marginesTop={'2vh'}
          margines={'0 auto'}
          color={'white'}
          text={'Zmień tablicę'}
          fun={() => props.changeBoardState('boardSet')}
        />
    </div>
  )
}

export default Nav