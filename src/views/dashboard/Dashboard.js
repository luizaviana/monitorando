import React, { Component, lazy } from 'react';
import { Link } from 'react-router-dom'
import { CBadge, CButton, CButtonGroup, CCard, CCardBody, CCardFooter, CCardHeader, CWidgetProgressIcon,
  CCol, CProgress, CRow, CCallout } from '@coreui/react';


import { BiBulb } from 'react-icons/bi';

import TheSidebar from '../../containers/TheSidebar';
import TheHeader from '../../containers/TheHeader';

import './styles/Dashboard.css'

const apiUrlHorarios = 'http://localhost:5000/api/horarios';
const stateHorarios = {
    horario: { horario: null, idMonitor: 0, idMateria: 0, idAluno: null },
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

export default class Dashboard extends Component {
  state = {...stateHorarios, ...stateMaterias, ...stateMonitores};


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
  
  render () {
    return (
      <>
        <TheHeader />
        <TheSidebar />
        <div className="content">
          <div className="wrapper"><br></br>
          <h2 id="monitorias">Próxima Monitoria:</h2>
            <div className="widgets" id="w-horarios">
              {
                this.state.dadosHorarios.map (
                  (horario) => {
                    if (horario.idHorario <= (Math.random() * (this.state.dadosHorarios.length)))
                      this.state.dadosHorarios.push(horario)
                  }
                )}

                {this.state.dadosHorarios.map (
                  (horario) => {
                    return (
                      <Link className="link" to={'/horario/' + horario.idHorario}>
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
                  }
                )
              }      
            </div>
          </div>
          
          <div className="wrapper">
            <h2 id="monitores">Monitor Disponível:</h2>
            <div className="widgets" id="w-monitores">
            {
              this.state.dadosMonitores.map (
                (monitor) => {
                  if (monitor.idMonitor <= (Math.random() * (this.state.dadosMonitores.length)))
                    this.state.dadosMonitores.push(monitor)
                }
              )}

             { this.state.dadosMonitores.map (
                (monitor) => {
                    return (
                      <Link className="link" to={'/monitor/' + monitor.idMonitor}>
                        <CWidgetProgressIcon
                          header={monitor.nome}
                          text={"Matéria: " + this.state.dadosMaterias.map (
                            (m) => {
                              if (m.idMateria == monitor.idMateria)
                                 return m.nome;
                            }
                          )}
                          color="gradient-info"
                          className="widget"
                          inverse
                        >
                          <BiBulb />
                        </CWidgetProgressIcon>
                      </Link>
                    )
                  }
                )
              } 
            </div>
          </div>
        </div>
      </>
    )
  }
}