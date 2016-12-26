import {call, cancel, fork, put, select, take} from 'redux-saga/effects'
import {delay} from 'redux-saga'
import {move, learn, reset, GAME, TASKS} from './actions'
import {done, interval} from './selectors'

export default function * () {
  yield [
    fork(function * () {
      for (;;) {
        yield take(TASKS.PLAY)

        const task = yield fork(function * () {
          for (;;) {
            yield call(delay, yield select(interval))
            yield put((yield select(done)) ? reset() : move())
          }
        })

        yield take(TASKS.CANCEL)
        yield cancel(task)
      }
    }),
    fork(function * () {
      for (;;) {
        yield take(TASKS.TRAIN)

        const task = yield fork(function * () {
          for (;;) {
            yield take(GAME.MOVE)
            yield put(learn())
          }
        })

        yield take(TASKS.CANCEL)
        yield cancel(task)
      }
    })
  ]
}
