import {call, put, select, race, take} from 'redux-saga/effects'
import {delay} from 'redux-saga'
import {task, game} from './actions'
import {final, interval} from './selectors'

export default function * () {
  for (;;) {
    yield take(task.START)

    yield race([
      take(task.STOP),
      call(function * () {
        for (;;) {
          yield call(delay, yield select(interval))
          if (yield select(final)) {
            yield put(game.reset())
          } else {
            yield put(game.move())
            yield put(game.learn())
          }
        }
      })
    ])
  }
}
