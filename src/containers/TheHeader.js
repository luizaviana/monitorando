import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import {CHeader, CToggler, CHeaderBrand, CHeaderNav, CHeaderNavItem,
  CHeaderNavLink, CSubheader, CBreadcrumbRouter, CLink} from '@coreui/react'
import CIcon from '@coreui/icons-react'

// CSS
import './styles/TheHeader.css';

import TheHeaderDropdown from './TheHeaderDropdown';

export default class TheHeader extends Component {
  render () {
    return (
      <CHeader withSubheader id="container">
        <CHeaderNav className="d-md-down-none mr-auto">
          <CHeaderNavItem className="px-3" >
            <Link className="link-header" to='/'>Home</Link>
          </CHeaderNavItem>
          <CHeaderNavItem  className="px-3">
            <Link className="link-header" to="/monitorias">Monitorias Disponíveis</Link>
          </CHeaderNavItem>
        </CHeaderNav>

        <CHeaderNav className="px-3">
          <TheHeaderDropdown/>
        </CHeaderNav>

        <CSubheader className="px-3 justify-content-between">
        </CSubheader>
      </CHeader>
    )
  }
}