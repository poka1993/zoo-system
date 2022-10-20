import React from 'react';

function StandardDate(props) {

    let standardDate;

    if (props.date) {
        const date = new Date(props.date).toLocaleDateString('pl-PL', {day: '2-digit', month: '2-digit', year: 'numeric'});    
        const hours = new Date(props.date).getHours();
        const minutes = new Date(props.date).getMinutes();
        const seconds = new Date(props.date).getSeconds();
        const time = (hours<10?'0':'')+hours+":"+(minutes<10?'0':'')+minutes+":"+(seconds<10?'0':'')+seconds;
        standardDate = date + ", " + time;
    } else {
        standardDate = "Jeszcze niekarmiony"
    }


    return (
        <>
        {standardDate}
        </>
    );
}

export default StandardDate;