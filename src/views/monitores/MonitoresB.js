import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {CCol, CWidgetProgressIcon} from '@coreui/react'

import {RiPlantLine} from 'react-icons/ri'

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
                if (monitor.idMateria == 7)
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
                                        text="Monitor de Biologia"
                                        color="gradient-success"
                                        className="widget"
                                        inverse
                                    >
                                        <RiPlantLine />
                                    </CWidgetProgressIcon>
                            </Link>
                            )
                    }
                </div>
                
          </>
        )
    }
}