import React, {PropTypes} from 'react'
import {createStructuredSelector} from 'reselect'
import {connect} from 'react-redux'
import {game, task} from '../redux/actions'
import {initial, final, running} from '../redux/selectors'

const Controls = ({initial, final, running, move, reset, start, stop}) =>
  <div className="container">
    <div className="level">
      <div className="level-item">
        <p className="control">
          {running ?
            <a className="button is-medium is-danger" onClick={stop}>Stop</a> :
            <a className="button is-medium is-info" onClick={start}>Start</a>}
        </p>
      </div>
      <div className="level-item">
        <p className="control has-addons">
          <a className="button" onClick={move} disabled={final || running}>Move</a>
          <a className="button" onClick={reset} disabled={initial || running}>Reset</a>
        </p>
      </div>
    </div>
  </div>

Controls.propTypes = {
  initial: PropTypes.bool,
  final: PropTypes.bool,
  running: PropTypes.bool,
  move: PropTypes.func,
  reset: PropTypes.func,
  start: PropTypes.func,
  stop: PropTypes.func
}

const states = createStructuredSelector({initial, final, running})

const actions = {...game, ...task}

export default connect(states, actions)(Controls)
