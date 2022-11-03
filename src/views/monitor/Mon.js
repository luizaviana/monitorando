import React, { Component, useState } from 'react';
import { Link, useParams, withRouter } from 'react-router-dom';
import {CCol, CWidgetProgress} from '@coreui/react'

import { TheHeader, TheSidebar } from 'src/containers';

import './styles/style.css'

const apiUrlMonitores = 'http://localhost:5000/api/monitor';
const stateMonitores = {
    monitor: { idMonitor: 0, nome: '', idMateria: 0},
    dadosMonitores: []
}

const apiUrlMaterias = 'http://localhost:5000/api/materia';
const stateMaterias = {
    materia: { idMateria: 0, nome: ''},
    dadosMaterias: []
}

class Monitor extends Component {
    state = {...stateMonitores, ...stateMaterias}
    nome = '';
    curso = '';
    idMateria = 0;
    materia = '';

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
        fetch(apiUrlMaterias)
            .then (res => res.json())
            .then(
                (result => {
                    this.setState ({
                        dadosMaterias: result
                    })
                    console.log("Função didMount (matérias): " + result);
                }),
                (error) => {
                    this.setState({error});
                }
            )
    }
    render () {        
        this.state.dadosMonitores.map(
            (m) => {
                if (m.idMonitor == this.props.idMonitor) {
                    this.nome = m.nome;
                    this.curso = m.curso;
                    this.idMateria = m.idMateria;
                }
            }
        )

        this.state.dadosMaterias.map(
            (m) => {
                if (m.idMateria == this.idMateria)
                    this.materia = m.nome;
            }
        )
        return (
            <>
                <TheHeader />
                <TheSidebar />
                <div className="content">
                <form method="post" className="horario">
                    <fieldset>
                        <legend>Detalhes do Monitor:</legend>
                        <div className="input-block">
                            <label for="horario">Nome:</label>
                            <input contentEditable={false} type="number" name="horario" id="horario" placeholder={this.nome} />
                        </div>
                        <div className="input-block">
                            <label for="curso">Curso:</label>
                            <input contentEditable={false} type="text" name="monitor" id="monitor" placeholder={this.curso} />
                        </div>
                        <div className="input-block">
                            <label for="materia">Matéria:</label>
                            <input contentEditable={false} type="text" name="materia" id="materia" placeholder={this.materia} />
                        </div>
                    </fieldset>
                </form>
                </div>
            </>
        )
    }
}

export default withRouter(Monitor)