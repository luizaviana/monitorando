import React, { Component } from 'react';
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CImg} from '@coreui/react'

// import CIcon from '@coreui/icons-react'
import {FiLogOut, FiSettings, FiUser} from 'react-icons/fi'

import PFP from '../images/profile.png'
import './styles/TheHeader.css'

export default class TheHeaderDropdown extends Component {
  render () {
    return (
      <CDropdown
        inNav
        className="c-header-nav-items mx-2"
        direction="down"
      >
        <CDropdownToggle className="c-header-nav-link" caret={false}>
          <div className="c-avatar">
            <CImg
              src={PFP}
              className="c-avatar-img"
              alt="foto de perfil"
            />
          </div>
        </CDropdownToggle>
      </CDropdown>
    )
  }
}