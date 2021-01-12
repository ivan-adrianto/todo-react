import types from './Types'

export const updateAction = payload => {
    return {type: types.UPDATE_TODO, payload}
}

export const deleteAction = payload => {
    return {type: types.DELETE_TODO, payload}
}

export const addAction = payload => {
    return {type: types.WRITE_TODO, payload}
}