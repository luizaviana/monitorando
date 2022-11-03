import React from 'react'
// import CIcon from '@coreui/icons-react'

import './styles/Sidebar.css';
import {FiHome, FiType, FiDivideCircle, FiThermometer, FiActivity, FiBook, FiMonitor} from 'react-icons/fi'
import {BiBulb} from 'react-icons/bi'
import {FaRobot} from 'react-icons/fa'
import {GiChemicalDrop} from 'react-icons/gi'
import {RiPlantLine} from 'react-icons/ri'
import {AiFillExperiment} from 'react-icons/ai'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Home',
    to: '/',
    icon: <FiHome className="nav-icon" />
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Monitores']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Português',
    to: '/monitores/portugues',
    icon: <FiType className="nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Matemática',
    to: '/monitores/matematica',
    icon: <FiDivideCircle className="nav-icon" />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Humanas',
    to: '/monitores/humanas',
    icon: <FiBook className="nav-icon" />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Física',
    to: '/monitores/fisica',
    icon: <FiThermometer className="nav-icon" />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Química',
    to: '/monitores/quimica',
    icon: <GiChemicalDrop className="nav-icon" />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Biologia',
    to: '/monitores/biologia',
    icon: <RiPlantLine className="nav-icon" />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Informática',
    to: '/monitores/informatica',
    icon: <FiMonitor className="nav-icon" />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Enfermagem',
    to: '/monitores/enfermagem',
    icon: <FiActivity className="nav-icon" />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Mecatrônica',
    to: '/monitores/mecatronica',
    icon: <FaRobot className="nav-icon" />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Eletroeletrônica',
    to: '/monitores/eletro',
    icon: <BiBulb className="nav-icon" />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Alimentos',
    to: '/monitores/alimentos',
    icon: <AiFillExperiment className="nav-icon" />,
  }
]

export default _nav
