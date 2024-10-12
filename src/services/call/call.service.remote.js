import { httpService } from '../http.service'

export const callService = {
    query,
    getById,
    save,
    remove,
    addCallMsg
}

async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get(`call`, filterBy)
}

function getById(callId) {
    return httpService.get(`call/${callId}`)
}

async function remove(callId) {
    return httpService.delete(`call/${callId}`)
}
async function save(call) {
    var savedCall
    if (call._id) {
        savedCall = await httpService.put(`call/${call._id}`, call)
    } else {
        savedCall = await httpService.post('call', call)
    }
    return savedCall
}

async function addCallMsg(callId, txt) {
    const savedMsg = await httpService.post(`call/${callId}/msg`, { txt })
    return savedMsg
}