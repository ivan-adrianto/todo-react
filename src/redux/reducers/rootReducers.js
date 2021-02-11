import types from '../actions/Types'

const initialState = {
    isLoading: false,
    isError: false,
    data: ''
}


const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.TODO_REQUEST: {
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        }
        case types.TODO_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }
        }
        case types.TODO_FAILED: {
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
        }
        case types.WRITE_TODO: {
            return {
                ...state,
                data: [...state.data, action.payload]
            }
        }
        case types.DELETE_TODO: {
            return {
                ...state,
                data: state.data.filter(after => after.id !== action.payload[0].id)
            }
        }
        case types.UPDATE_TODO: {
            return {
                ...state,
                data: state.data.map(fresh => action.payload.find(wanted => wanted.id === fresh.id ) || fresh)
            }
        }
        default:
            return {
                ...state,
            }
    }
}

export default rootReducer