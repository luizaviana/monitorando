import React from 'react';
import { useParams } from 'react-router-dom';

import Horario from './Horario.js';

function GetId () {

    const id = useParams();
    console.log("GET ID: " + id.id);

    return (
        <div>
            <Horario idHorario={id.id}/>
        </div>
    );
}

export default GetId;