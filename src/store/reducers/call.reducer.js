export const SET_CALLS = 'SET_CALLS'
export const SET_CALL = 'SET_CALL'
export const REMOVE_CALL = 'REMOVE_CALL'
export const ADD_CALL = 'ADD_CALL'
export const UPDATE_CALL = 'UPDATE_CALL'
export const ADD_CALL_MSG = 'ADD_CALL_MSG'

const initialState = {
    calls: [],
    call: null
}

export function callReducer(state = initialState, action) {
    var newState = state
    var calls
    switch (action.type) {
        case SET_CALLS:
            newState = { ...state, calls: action.calls }
            break
        case SET_CALL:
            newState = { ...state, call: action.call }
            break
        case REMOVE_CALL:
            const lastRemovedCall = state.calls.find(call => call._id === action.callId)
            calls = state.calls.filter(call => call._id !== action.callId)
            newState = { ...state, calls, lastRemovedCall }
            break
        case ADD_CALL:
            newState = { ...state, calls: [...state.calls, action.call] }
            break
        case UPDATE_CALL:
            calls = state.calls.map(call => (call._id === action.call._id) ? action.call : call)
            newState = { ...state, calls }
            break
        case ADD_CALL_MSG:
            newState = { ...state, call: { ...state.call, msgs: [...state.call.msgs || [], action.msg] } }
            break
        default:
    }
    return newState
}

// unitTestReducer()

function unitTestReducer() {
    var state = initialState
    const call1 = { _id: 'b101', vendor: 'Call ' + parseInt(Math.random() * 10), msgs: [] }
    const call2 = { _id: 'b102', vendor: 'Call ' + parseInt(Math.random() * 10), msgs: [] }

    state = callReducer(state, { type: SET_CALLS, calls: [call1] })
    console.log('After SET_CALLS:', state)

    state = callReducer(state, { type: ADD_CALL, call: call2 })
    console.log('After ADD_CALL:', state)

    state = callReducer(state, { type: UPDATE_CALL, call: { ...call2, vendor: 'Good' } })
    console.log('After UPDATE_CALL:', state)

    state = callReducer(state, { type: REMOVE_CALL, callId: call2._id })
    console.log('After REMOVE_CALL:', state)

    const msg = { id: 'm' + parseInt(Math.random() * 100), txt: 'Some msg' }
    state = callReducer(state, { type: ADD_CALL_MSG, callId: call1._id, msg })
    console.log('After ADD_CALL_MSG:', state)

    state = callReducer(state, { type: REMOVE_CALL, callId: call1._id })
    console.log('After REMOVE_CALL:', state)
}

