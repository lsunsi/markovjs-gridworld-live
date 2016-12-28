import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {alpha, gamma, epsilon, interval, rows, cols} from '../redux/selectors'
import {board, params} from '../redux/actions'

const Sliders = ({
  alpha, gamma, epsilon, interval, rows, cols,
  setAlpha, setGamma, setEpsilon, setInterval, setRows, setCols
}) =>
  <div className="container">
    <div className="columns">
      <div className="column">
        <p className="control">
          <span className="title">α={alpha.toFixed(1)}</span>
          <input type="range" min={0} max={1} step={0.1} value={alpha} onChange={setAlpha}/>
        </p>
      </div>
      <div className="column">
        <p className="control">
          <span className="title">γ={gamma.toFixed(1)}</span>
          <input type="range" min={0} max={1} step={0.1} value={gamma} onChange={setGamma}/>
        </p>
      </div>
      <div className="column">
        <p className="control">
          <span className="title">ε={epsilon.toFixed(1)}</span>
          <input type="range" min={0} max={1} step={0.1} value={epsilon} onChange={setEpsilon}/>
        </p>
      </div>
    </div>
    <div className="columns">
      <div className="column">
        <p className="control">
          <span className="title">interval={interval}</span>
          <input type="range" min={100} max={1000} step={100} value={interval} onChange={setInterval}/>
        </p>
      </div>
      <div className="column">
        <p className="control">
          <span className="title">rows={rows}</span>
          <input type="range" min={1} max={5} step={1} value={rows} onChange={setRows}/>
        </p>
      </div>
      <div className="column">
        <p className="control">
          <span className="title">cols={cols}</span>
          <input type="range" min={1} max={5} step={1} value={cols} onChange={setCols}/>
        </p>
      </div>
    </div>
  </div>

Sliders.propTypes = {
  alpha: PropTypes.number,
  gamma: PropTypes.number,
  epsilon: PropTypes.number,
  interval: PropTypes.number,
  rows: PropTypes.number,
  cols: PropTypes.number,
  setAlpha: PropTypes.func,
  setGamma: PropTypes.func,
  setEpsilon: PropTypes.func,
  setInterval: PropTypes.func,
  setRows: PropTypes.func,
  setCols: PropTypes.func
}

const states = createStructuredSelector({
  alpha, gamma, epsilon, interval, rows, cols
})

const handler = fn => e => fn(Number(e.target.value))
const actions = d => ({
  setAlpha: handler(v => d(params.alpha(v))),
  setGamma: handler(v => d(params.gamma(v))),
  setEpsilon: handler(v => d(params.epsilon(v))),
  setInterval: handler(v => d(params.interval(v))),
  setRows: handler(v => d(board.rows(v))),
  setCols: handler(v => d(board.cols(v)))
})

export default connect(states, actions)(Sliders)
