import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {tile, color} from '../redux/selectors'
import {goal, hazard} from '../redux/actions'

const Tile = ({robson, goal, hazard, values, color, togglegoal, togglehazard}) =>
  <div className="box has-text-centered" style={{backgroundColor: !goal && !hazard ? color : 'lightgray'}}>
    <p className="control has-addons">
      <a className="button is-small" onClick={togglegoal}>❤</a>
      <a className="button is-small" onClick={togglehazard}>💀</a>
    </p>
    <p className="title">{robson ? '🤖' : goal ? '❤' : hazard ? '💀' : '+'}</p>
    <small className="subtitle">{Object.keys(values).reduce((str, k) => `${str} ${k} ${values[k].toFixed(2)}`, '')}</small>
  </div>

Tile.propTypes = {
  robson: PropTypes.bool,
  goal: PropTypes.bool,
  hazard: PropTypes.bool,
  values: PropTypes.object,
  color: PropTypes.string,
  togglegoal: PropTypes.func,
  togglehazard: PropTypes.func
}

const states = (s, {tile: t}) => ({...tile(t)(s), color: color(t)(s)})
const actions = (dispatch, {tile}) => ({
  togglegoal: () => dispatch(goal(tile)),
  togglehazard: () => dispatch(hazard(tile))
})

export default connect(states, actions)(Tile)
