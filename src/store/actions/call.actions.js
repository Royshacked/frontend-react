import { callService } from '../../services/call'
import { store } from '../store'
import { ADD_CALL, REMOVE_CALL, SET_CALLS, SET_CALL, UPDATE_CALL, ADD_CALL_MSG } from '../reducers/call.reducer'

export async function loadCalls(filterBy) {
    try {
        const calls = await callService.query(filterBy)
        store.dispatch(getCmdSetCalls(calls))
    } catch (err) {
        console.log('Cannot load calls', err)
        throw err
    }
}

export async function loadCall(callId) {
    try {
        const call = await callService.getById(callId)
        store.dispatch(getCmdSetCall(call))
    } catch (err) {
        console.log('Cannot load call', err)
        throw err
    }
}


export async function removeCall(callId) {
    try {
        await callService.remove(callId)
        store.dispatch(getCmdRemoveCall(callId))
    } catch (err) {
        console.log('Cannot remove call', err)
        throw err
    }
}

export async function addCall(call) {
    try {
        const savedCall = await callService.save(call)
        store.dispatch(getCmdAddCall(savedCall))
        return savedCall
    } catch (err) {
        console.log('Cannot add call', err)
        throw err
    }
}

export async function updateCall(call) {
    try {
        const savedCall = await callService.save(call)
        store.dispatch(getCmdUpdateCall(savedCall))
        return savedCall
    } catch (err) {
        console.log('Cannot save call', err)
        throw err
    }
}

export async function addCallMsg(callId, txt) {
    try {
        const msg = await callService.addCallMsg(callId, txt)
        store.dispatch(getCmdAddCallMsg(msg))
        return msg
    } catch (err) {
        console.log('Cannot add call msg', err)
        throw err
    }
}

// Command Creators:
function getCmdSetCalls(calls) {
    return {
        type: SET_CALLS,
        calls
    }
}
function getCmdSetCall(call) {
    return {
        type: SET_CALL,
        call
    }
}
function getCmdRemoveCall(callId) {
    return {
        type: REMOVE_CALL,
        callId
    }
}
function getCmdAddCall(call) {
    return {
        type: ADD_CALL,
        call
    }
}
function getCmdUpdateCall(call) {
    return {
        type: UPDATE_CALL,
        call
    }
}
function getCmdAddCallMsg(msg) {
    return {
        type: ADD_CALL_MSG,
        msg
    }
}

// unitTestActions()
async function unitTestActions() {
    await loadCalls()
    await addCall(callService.getEmptyCall())
    await updateCall({
        _id: 'm1oC7',
        title: 'Call-Good',
    })
    await removeCall('m1oC7')
    // TODO unit test addCallMsg
}
