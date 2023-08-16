import React from 'react';

interface PersonProps {
  name: string;
  hairColor: string;
  eyeColor: string;
}

const Person: React.FC<PersonProps | null> = (props) => {
  if(!props) {
    return <div>Data is Empty!!</div>
  }
  return (
    <div>
        <h2>{props.name}</h2>
        <p>hair: {props.hairColor}</p>
        <p>eyes: {props.eyeColor}</p>
    </div>
  )
}




export default Person;