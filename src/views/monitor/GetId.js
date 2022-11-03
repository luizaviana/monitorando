import React from 'react';
import {useParams} from "react-router-dom";

import Monitor from './Mon.js';

function GetId () {

    const id = useParams();
    console.log("GET ID:" + id.id);

    return (
        <div>
            <Monitor idMonitor={id.id} />
        </div>
    );
}

export default GetId;