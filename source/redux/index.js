import {createStore, applyMiddleware, compose} from 'redux'
import createSagas from 'redux-saga'
import reducer from './reducer'
import saga from './saga'

const sagas = createSagas()
const wrap = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export default createStore(reducer, wrap(applyMiddleware(sagas)))
sagas.run(saga)
