import types from '../actions/Types'
import { all, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

function* todoWatcher () {
    yield takeLatest(types.TODO_REQUEST, todoWorker)
}

function* todoWorker () {
    try {
        const response = yield axios.get('https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list')
        const data = response.data
        yield put({type: types.TODO_SUCCESS, payload: data})
    }
    catch(error){
        yield put({type: types.TODO_FAILED})
    }
}

function* rootSaga(){
    yield all([todoWatcher()])
}

export default rootSaga
