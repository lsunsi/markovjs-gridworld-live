import 'bulma/css/bulma.css' // eslint-disable-line import/no-unassigned-import
import React from 'react'
import Header from './header'
import Toolbar from './toolbar'
import Statusbar from './statusbar'
import Board from './board'

export default () =>
  <div>
    <div className="container">
      <Header/>
      <Toolbar/>
      <Statusbar/>
    </div>
    <Board/>
  </div>
