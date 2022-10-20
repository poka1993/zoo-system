import React, {useState, useEffect} from 'react';
import StandardDate from '../StandardDate/StandardDate';

function FeedRecords(props) {
   let food = props.food;
  return (

  <tr>
    <th scope="row">{props.lp}</th>
    <td><StandardDate date={props.feeding_time}/></td>
    <td>
      {Object.keys(props.food).map((key, index) => {
         return (
           <div key={index}>
              {props.food[key].filter(item => item.feeding_id == props.feeding_id).map((dataItem, index) => {
                return (
                 <span key={index}>{dataItem.name_of_food}<span className="badge bg-secondary m-1 me-2">{dataItem.portions}</span></span>
                )
               })}
           </div>
         )
       })}
     </td>
    {/* {props.food.map(product => (<td><span className="badge bg-secondary"></span></td> */}
  </tr>
  
  );
}

export default FeedRecords;