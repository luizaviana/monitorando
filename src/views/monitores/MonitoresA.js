import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {CCol, CWidgetProgressIcon, CRow} from '@coreui/react'

import {AiFillExperiment} from 'react-icons/ai'

import TheHeader from '../../containers/TheHeader'
import TheSidebar from '../../containers/TheSidebar'

import '../../containers/styles/TheHeader.css'

import './styles/style.css'

const apiUrlMonitores = 'http://localhost:5000/api/monitor';
const stateInicial = {
    monitor: { ra: '', nome: '', idMateria: 0 },
    dadosMonitores: []
}

const stateAlt = {
    monitorAlt: { idMonitor: 0, nome: '', idMateria: 0},
    dadosMonitoresAlt: []
}

export default class Monitores extends Component {
    state = {...stateInicial, ...stateAlt}

    componentDidMount() {
        fetch(apiUrlMonitores)
            .then (res => res.json())
            .then(
                (result => {
                    this.setState ({
                        dadosMonitores: result
                    })
                    console.log("Função didMount (monitores): " + result);
                }),
                (error) => {
                    this.setState({error});
                }
        )
    }

    render () {
        
        this.state.dadosMonitores.map (
            (monitor) => {
                if (monitor.idMateria == 12)
                    this.state.dadosMonitoresAlt.push(monitor)
            }
        )

        return (
            <>
                <TheSidebar />
                <TheHeader />
                <div className="content">
                    {
                        this.state.dadosMonitoresAlt.map(
                            (monitor) =>
                                <Link className="link" to={'/monitor/' + monitor.idMonitor}>
                                    <CWidgetProgressIcon
                                        header={monitor.nome}
                                        text="Monitor de Alimentos"
                                        color="gradient-info"
                                        className="widget"
                                        inverse
                                    >
                                        <AiFillExperiment />
                                    </CWidgetProgressIcon>
                                </Link>
                            )
                    }
                </div>
                
          </>
        )
    }
}