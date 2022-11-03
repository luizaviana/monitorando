import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';

import { TheHeader, TheSidebar } from 'src/containers';
import './style/style.css'

const apiUrlHorarios = 'http://localhost:5000/api/horarios';
const stateHorarios = {
    horario: { horario: null, idMonitor: 0, idMateria: 0, raAluno: '' },
    dadosHorarios: []
}

const apiUrlMaterias = 'http://localhost:5000/api/materia';
const stateMaterias = {
    materia: { idMateria: 0, nome: ''},
    dadosMaterias: []
}

const apiUrlMonitores = 'http://localhost:5000/api/monitor'
const stateMonitores = {
  monitor: { idMonitor: 0, nome: '', idMateria: 0},
  dadosMonitores: []
}

export default class Horario extends Component {
    state = {...stateHorarios, ...stateMaterias, ...stateMonitores};
    h;
    horario = new Date();
    monitor = '';
    materia = '';
    idMateria = 0;
    idMonitor = 0;
    raAluno = '';

    componentDidMount() {
        fetch(apiUrlHorarios)
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
    
        fetch(apiUrlMaterias)
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

    agendarMonitoria () {
        const horario = this.state.horario;
        horario.raAluno = this.raAluno;
        const metodo = 'post';
        const url = horario.idHorario ? `${apiUrlHorarios}/${horario.idHorario}` : apiUrlHorarios;

        fetch(url, {
            method: metodo,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(horario)
        })
            .then (
                resp => {
                    resp.json().then((data) => {
                        this.setState({
                            horario: stateHorarios.horario, dadosHorarios: this.state.dadosHorarios
                        })
                    })
                }
            )
    }

    atualizaCampo(event) {
        this.raAluno = event.target.value;
    }

    render () {
        this.state.dadosHorarios.map (
            (h) => {
                if (h.idHorario == this.props.idHorario) {
                    this.h = h;
                    this.horario = h.horario;
                    this.idMonitor = h.idMonitor;
                    this.idMateria = h.idMateria;
                }
            }
        )

        this.state.dadosMonitores.map (
            (m) => {
                if (m.idMonitor == this.idMonitor)
                    this.monitor = m.nome;
            }
        )

        this.state.dadosMaterias.map (
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
                    <form method="post" className="horario" contentEditable={false}>
                        <fieldset >
                            <legend>Detalhes do Horário:</legend>
                            <div className="input-block">
                                <label htmlFor="horario">Horário:</label>
                                <input contentEditable={false} type="number" name="horario" id="horario" placeholder={ new Date(this.horario).toUTCString()} />
                            </div>
                            <div className="input-block">
                                <label htmlFor="monitor">Monitor:</label>
                                <input contentEditable={false} type="text" name="monitor" id="monitor" placeholder={this.monitor} />
                            </div>
                            <div className="input-block">
                                <label htmlFor="materia">Matéria:</label>
                                <input  type="text" name="materia" id="materia" placeholder={this.materia} />
                            </div>
                            <div className="input-block">
                                <label htmlFor="raAluno">O seu RA:</label>
                                <input contentEditable={true} type="text" name="raAluno" id="raAluno" onChange={e => this.atualizaCampo(e)}/>
                            </div>
                        </fieldset>
                        
                        <button className="confirm-button" onClick={this.agendarMonitoria()}>
                            Agendar Monitoria
                        </button>
                    </form>
                </div>
            </>
        );
    }
}