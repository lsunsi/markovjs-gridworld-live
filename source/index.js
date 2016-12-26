import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import store from './redux'
import App from './react'

const component = <Provider store={store}><App/></Provider>
const node = document.getElementById('app')
render(component, node)
