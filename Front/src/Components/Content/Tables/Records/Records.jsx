import React, {useState, useEffect} from 'react';
import StandardDate from '../../StandardDate/StandardDate';

function Records(props) {
  return (


<>
  <tr>
    <th scope="row">{props.lp}</th>
    <td>{props.name_of_species}</td>
    <td>{props.name_of_animal}</td>
    <td><StandardDate date={props.register} /></td>
    <td><StandardDate date={props.last_feeding} /></td>
    <td><button type="button" className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={props.feedingSelected.bind(null, props.id)}>Karmienie</button></td>
    <td><button type="button" className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={props.animalSelected.bind(null, props.id)}>Edycja</button></td>
    <td><button type="button" className="btn btn-primary btn-sm cancel-button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={props.deleteSelected.bind(null, props.id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
  </svg></button></td>
  </tr>
  </>


  );
}

export default Records;