import rootSaga from './middleware/sagas'
import rootReducer from './reducers/rootReducers'
import createSagaMiddleware from 'redux-saga'
import { applyMiddleware, createStore } from 'redux'

const sagaMiddleware = createSagaMiddleware()
function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('state', serializedState)
    }
    catch (e) {
        console.log(e)
    }
}

function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem('state')
        if (serializedState === null) return undefined
        return JSON.parse(serializedState)
    }
    catch (e) {
        console.log(e)
        return undefined
    }
}

const persistedStore = loadFromLocalStorage()

const globalStore = createStore(rootReducer, persistedStore, applyMiddleware(sagaMiddleware))

globalStore.subscribe(() => saveToLocalStorage(globalStore.getState()))

sagaMiddleware.run(rootSaga)

export default globalStore