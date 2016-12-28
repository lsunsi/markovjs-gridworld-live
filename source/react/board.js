import React, {PropTypes} from 'react'
import {createStructuredSelector} from 'reselect'
import {connect} from 'react-redux'
import {board} from '../redux/selectors'
import Tile from './tile'

const Board = ({board}) =>
  <div>
    {board.map((row, i) =>
      <div key={i} className="columns">
        {row.map((tile, j) =>
          <div key={j} className="column">
            <Tile tile={tile}/>
          </div>
        )}
      </div>
    )}
  </div>

Board.propTypes = {board: PropTypes.object}

const states = createStructuredSelector({board})

export default connect(states)(Board)
