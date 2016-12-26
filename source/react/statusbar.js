import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {action, done, reward} from '../redux/selectors'

const Statusbar = ({action, done, reward}) =>
  <div className="level has-text-centered">
    <div className="level-item">
      <div className="heading">Action</div>
      <div className="title">{action === null ? '-' : action}</div>
    </div>
    <div className="level-item">
      <div className="heading">Reward</div>
      <div className="title">{reward === null ? '-' : reward}</div>
    </div>
    <div className="level-item">
      <div className="heading">Final</div>
      <div className="title">{done.toString()}</div>
    </div>
  </div>

Statusbar.propTypes = {
  action: PropTypes.string,
  done: PropTypes.bool,
  reward: PropTypes.number
}

const states = createStructuredSelector({action, done, reward})

export default connect(states)(Statusbar)
