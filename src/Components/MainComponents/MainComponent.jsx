import React, { useState } from 'react'
import './MainComponent.css'
import { InputComponent } from './Input/InputComponent'
import { Todos } from './Todos/Todos'
import { Loader } from '../Loader/Loader';

// export const baseUrl = "http://localhost:4000";
export const baseUrl = "https://todo-server-pk18.herokuapp.com";

export const MainComponent = () => {
  const [flag, setFlag] = useState(false);

  return (
    <div className='main'>
      <Loader/>
        <InputComponent flag={flag} setFlag={setFlag}/>
        <Todos flag={flag} setFlag={setFlag}/>
    </div>
  )
}
