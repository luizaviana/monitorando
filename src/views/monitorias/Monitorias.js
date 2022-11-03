import React, {Component} from 'react';
import {CCol, CWidgetProgressIcon, CRow} from '@coreui/react'
import {Link} from 'react-router-dom';

import {BiBulb} from 'react-icons/bi'

import TheHeader from '../../containers/TheHeader'
import TheSidebar from '../../containers/TheSidebar'

import '../../containers/styles/TheHeader.css'

import './styles/style.css'

const apiUrlHorarios = 'http://localhost:5000/api/horarios';
const stateHorarios = {
    horario: { horario: null, idMonitor: 0, idMateria: 0 },
    dadosHorarios: []
}

const apiUrlMateria = 'http://localhost:5000/api/materia';
const stateMaterias = {
    materia: { idMateria: 0, nome: "" },
    dadosMaterias: []
}

export default class Monitorias extends Component {
    state = { ...stateHorarios, ...stateMaterias }
    arr = []
    horarios;

    componentDidMount() {
        fetch (apiUrlHorarios)
            .then (res => res.json())
            .then(
                (result => {
                    this.setState ({
                        dadosHorarios: result
                    })
                    console.log("Função didMount (horarios): " + result);
                }),
                (error) => {
                    this.setState({error});
                }
            )

        fetch (apiUrlMateria)
            .then (res => res.json())
            .then(
                (result => {
                    this.setState ({
                        dadosMaterias: result
                    })
                    console.log("Função didMount (materias): " + result);
                }),
                (error) => {
                    this.setState({error});
                }
            )
    }
    
    render () {
        return (
            <>
                <TheSidebar />
                <TheHeader />
                <div className="content">  
                    <div className="wrapper">
                        <h1 id="monitorias">Monitorias Disponíveis:</h1>
                        <div className="widgets" id="w-horarios">
                            {
                                this.state.dadosHorarios.map (
                                    (horario, index) => {(
                                        this.arr.push(
                                            <Link key = {index} className="link" to={'/horario/' + horario.idHorario}>
                                                <CWidgetProgressIcon
                                                    header={ new Date(horario.horario).toUTCString()}
                                                    text={"Matéria: " + this.state.dadosMaterias.map (
                                                        (m) => {
                                                        if (m.idMateria == horario.idMateria)
                                                            return m.nome;
                                                        }
                                                    )}
                                                    color="gradient-warning"
                                                    className="widget"
                                                    inverse
                                                    >
                                                    <BiBulb />
                                                </CWidgetProgressIcon>
                                            </Link>
                                        )
                                        )}
                                ), 
                                this.arr
                            }   
                        </div>
                    </div>
                </div>*/
          </>
        )
    }
}