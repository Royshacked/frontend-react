
import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'call'

export const callService = {
    query,
    getById,
    save,
    remove,
}
window.cs = callService


async function query(filterBy = { title: '' }) {
    var calls = await storageService.query(STORAGE_KEY)
    const { title } = filterBy

    if (title) {
        const regex = new RegExp(filterBy.title, 'i')
        calls = calls.filter(call => regex.test(call.title))
    }

    return calls
}

function getById(callId) {
    return storageService.get(STORAGE_KEY, callId)
}

async function remove(callId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, callId)
}

async function save(call) {
    var savedCall
    if (call._id) {
        const callToSave = {
            _id: call._id,
            title: call.title,
            technician: {
                id: call.technician.id,
                fullname: call.technician.fullname,
            },
            client: {
                id: call.client.id,
                fullname: call.client.fullname,
                unitNum: call.client.unitNum,
            },
            description: call.description,
            parts: call.parts,
            date: call.date,
            arrivelTime: call.arrivelTime,
            departureTime: call.departureTime,
        }
        savedCall = await storageService.put(STORAGE_KEY, callToSave)
    } else {
        const callToSave = {
            _id: call._id,
            title: call.title,
            technician: {
                id: call.technician.id,
                fullname: call.technician.fullname,
            },
            client: {
                id: call.client.id,
                fullname: call.client.fullname,
                unitNum: call.client.unitNum,
            },
            description: call.description,
            parts: call.parts,
            date: call.date,
            arrivelTime: call.arrivelTime,
            departureTime: call.departureTime,
        }
        savedCall = await storageService.post(STORAGE_KEY, callToSave)
    }
    return savedCall
}

const calls = [
    {
        _id: makeId(),
        title: '',
        technician: {
            id: '',
            fullname: '',
        },
        client: {
            id: '',
            fullname: '',
            unitNum: '',
        },
        description: '',
        parts: [],
        date: '',
        arrivelTime: '',
        departureTime: '',
    }
]

const clients = [
    {
        fullname: '',
        units: [1]
    }
]

const parts = [
    {
        name: '',
        partNum: 0,
        serialNum: 0
    }
]



