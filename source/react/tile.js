import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import Color from 'color'
import {robson, goal, hazard, greedy, color} from '../redux/selectors'
import {board} from '../redux/actions'
import {ENTITIES} from '../game'

const BUTTON_CLASSES = {[false]: 'button', [true]: 'button is-info is-outlined'}

const Tile = ({robson, goal, hazard, greedy, color, setRobson, setGoal, setHazard, setEmpty}) =>
  <div className="box">
    <div className="level">
      <div className="level-left">
        <div className="level-item">
          <a
            className={BUTTON_CLASSES[robson.base]}
            onClick={!robson.base && setRobson}
            >{ENTITIES.ROBSON}</a>
        </div>
      </div>
      <div className="level-right">
        <div className="level-item">
          <p className="control has-addons">
            <a
              className={BUTTON_CLASSES[goal.base]}
              onClick={!goal.base && setGoal}
              >{ENTITIES.GOAL}</a>
            <a
              className={BUTTON_CLASSES[hazard.base]}
              onClick={!hazard.base && setHazard}
              >{ENTITIES.HAZARD}</a>
            <a
              className={BUTTON_CLASSES[!(goal.base || hazard.base)]}
              onClick={(goal.base || hazard.base) && setEmpty}
              >&nbsp;&nbsp;&nbsp;</a>
          </p>
        </div>
      </div>
    </div>
    <p className="title has-text-centered">
      &nbsp;
      {robson.curr && ENTITIES.ROBSON}
      {goal.curr && ENTITIES.GOAL}
      {hazard.curr && ENTITIES.HAZARD}
      &nbsp;
    </p>
    <div className="level has-text-centered">
      <div className="level-item">
        <span className="tag is-medium" style={{backgroundColor: new Color(color).string()}}>
          <span className="subtitle">{greedy.action}</span>
          {greedy.value.toFixed(4)}
        </span>
      </div>
    </div>
  </div>

Tile.propTypes = {
  robson: PropTypes.object,
  goal: PropTypes.object,
  hazard: PropTypes.object,
  greedy: PropTypes.object,
  color: PropTypes.object,
  setRobson: PropTypes.func,
  setGoal: PropTypes.func,
  setHazard: PropTypes.func,
  setEmpty: PropTypes.func
}

const states = (s, {tile}) => ({
  robson: robson(tile)(s),
  goal: goal(tile)(s),
  hazard: hazard(tile)(s),
  greedy: greedy(tile)(s),
  color: color(tile)(s)
})

const actions = (d, {tile}) => ({
  setRobson: () => d(board.robson(tile)),
  setGoal: () => [
    board.goal(tile, true),
    board.hazard(tile, false)
  ].forEach(d),
  setHazard: () => [
    board.goal(tile, false),
    board.hazard(tile, true)
  ].forEach(d),
  setEmpty: () => [
    board.goal(tile, false),
    board.hazard(tile, false)
  ].forEach(d)
})

export default connect(states, actions)(Tile)
