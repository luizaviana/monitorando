import React, {Component} from 'react';
import {Switch, Route, Redirect, useParams} from 'react-router';

import Dashboard from './views/dashboard/Dashboard';

import MonitoresA from './views/monitores/MonitoresA'
import MonitoresB from './views/monitores/MonitoresB'
import MonitoresEle from './views/monitores/MonitoresEle'
import MonitoresEnf from './views/monitores/MonitoresEnf'
import MonitoresF from './views/monitores/MonitoresF'
import MonitoresH from './views/monitores/MonitoresH'
import MonitoresInfo from './views/monitores/MonitoresInfo'
import MonitoresMat from './views/monitores/MonitoresMat'
import MonitoresMec from './views/monitores/MonitoresMec'
import MonitoresP from './views/monitores/MonitoresP'
import MonitoresQ from './views/monitores/MonitoresQ'
import Monitorias from './views/monitorias/Monitorias.js';

import GetIdMonitor from './views/monitor/GetId.js';
import GetIdHorario from './views/horarios/GetId.js'

import Page404 from './views/pages/page404/Page404';

export default class Routes extends Component {
    render() {
      return (
        <Switch>
          <Route exact path= '/' component={Dashboard} />
          <Route exact path='/404notfound' component={Page404} />
          <Route exact path='/monitorias' component={Monitorias} />
          <Route exact path='/horario/:id' component={GetIdHorario} />
          <Route exact path='/monitor/:id' component={GetIdMonitor} />
          <Route exact path='/monitores/alimentos' component={MonitoresA} />
          <Route exact path='/monitores/biologia' component={MonitoresB} />
          <Route exact path='/monitores/eletro' component={MonitoresEle} />
          <Route exact path='/monitores/enfermagem' component={MonitoresEnf} />
          <Route exact path='/monitores/fisica' component={MonitoresF} />
          <Route exact path='/monitores/humanas' component={MonitoresH} />
          <Route exact path='/monitores/informatica' component={MonitoresInfo} />
          <Route exact path='/monitores/matematica' component={MonitoresMat} />
          <Route exact path='/monitores/mecatronica' component={MonitoresMec} />
          <Route exact path='/monitores/portugues' component={MonitoresP} />
          <Route exact path='/monitores/quimica' component={MonitoresQ} />
          
          <Redirect from='*' to ='/404notfound' />
        </Switch>
      )
    }
}