import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {move, learn, reset, play, train, cancel, interval, alpha, gamma, epsilon, rows, cols} from '../redux/actions'
import {params, dimensions} from '../redux/selectors'

const Toolbar = ({move, learn, reset, play, train, cancel, interval, alpha, gamma, epsilon, params, rows, cols}) =>
  <div>
    <div className="level has-text-centered">
      <div className="level-item">
        <p className="control has-addons">
          <a className="button" onClick={move}>move</a>
          <a className="button" onClick={learn}>learn</a>
          <a className="button" onClick={reset}>reset</a>
        </p>
      </div>
      <div className="level-item">
        <p className="control has-addons">
          <a className="button" onClick={play}>play</a>
          <a className="button" onClick={train}>train</a>
          <a className="button" onClick={cancel}>cancel</a>
        </p>
      </div>
      <div className="level-item">
        <p className="control has-addons">
          <label className="title">rows</label>
          <a className="button" onClick={rows.handleDec}>-</a>
          <a className="button" onClick={rows.handleInc}>+</a>
        </p>
      </div>
      <div className="level-item">
        <p className="control has-addons">
          <label className="title">cols</label>
          <a className="button" onClick={cols.handleDec}>-</a>
          <a className="button" onClick={cols.handleInc}>+</a>
        </p>
      </div>
    </div>
    <div className="level has-text-centered">
      <div className="level-item">
        <p className="control has-addons">
          <label className="title">α</label>
          <input className="input" type="number" value={params.alpha} onChange={alpha}/>
        </p>
      </div>
      <div className="level-item">
        <p className="control has-addons">
          <label className="title">γ</label>
          <input className="input" type="number" value={params.gamma} onChange={gamma}/>
        </p>
      </div>
      <div className="level-item">
        <p className="control has-addons">
          <label className="title">ε</label>
          <input className="input" type="number" value={params.epsilon} onChange={epsilon}/>
        </p>
      </div>
      <div className="level-item">
        <p className="control has-addons">
          <label className="title">i</label>
          <input className="input" type="number" value={params.interval} onChange={interval}/>
        </p>
      </div>
    </div>
  </div>

Toolbar.propTypes = {
  move: PropTypes.func,
  learn: PropTypes.func,
  reset: PropTypes.func,
  play: PropTypes.func,
  train: PropTypes.func,
  cancel: PropTypes.func,
  interval: PropTypes.func,
  alpha: PropTypes.func,
  gamma: PropTypes.func,
  epsilon: PropTypes.func,
  params: PropTypes.object,
  rows: PropTypes.object,
  cols: PropTypes.object
}

const states = createStructuredSelector({dimensions, params})

const actions = dispatch => ({
  move: () => dispatch(move()),
  learn: () => dispatch(learn()),
  reset: () => dispatch(reset()),
  play: () => dispatch(play()),
  train: () => dispatch(train()),
  cancel: () => dispatch(cancel()),
  alpha: e => dispatch(alpha(e.target.value || 0)),
  gamma: e => dispatch(gamma(e.target.value || 0)),
  epsilon: e => dispatch(epsilon(e.target.value || 0)),
  interval: e => dispatch(interval(e.target.value || 0)),
  rows: rs => ({
    handleInc: () => dispatch(rows(rs + 1)),
    handleDec: () => dispatch(rows(rs - 1))
  }),
  cols: cs => ({
    handleInc: () => dispatch(cols(cs + 1)),
    handleDec: () => dispatch(cols(cs - 1))
  })
})

const merge = (states, {rows, cols, ...actions}) => ({
  ...states, ...actions,
  rows: rows(states.dimensions.rows),
  cols: cols(states.dimensions.cols)
})

export default connect(states, actions, merge)(Toolbar)
