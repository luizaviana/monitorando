import React, { Component } from 'react'
import { CCol, CContainer, CRow } from '@coreui/react'

export default class Page404 extends Component {
  render () {
    return (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="6">
              <div className="clearfix">
                <h1 className="float-left display-3 mr-4">404</h1>
                <h4 className="pt-3">Oops! Você está{'\n'} perdido</h4>
                <p className="text-muted float-left">A página que está procurando não foi encontrada.</p>
              </div>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    )
  }
}
