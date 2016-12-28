import 'bulma/css/bulma.css' // eslint-disable-line import/no-unassigned-import
import React from 'react'
import Controls from './controls'
import Sliders from './sliders'
import Header from './header'
import Board from './board'

export default () =>
  <div>
    <Header/>
    <Controls/>
    <Sliders/>
    <Board/>
  </div>
