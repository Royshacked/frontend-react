const { DEV, VITE_LOCAL } = import.meta.env

import { getRandomIntInclusive, makeId } from '../util.service'

import { callService as local } from './call.service.local'
import { callService as remote } from './call.service.remote'

function getEmptyCall() {
    return {
        _id: makeId(),
        title: '',
        technician: {
            id: makeId(),
            fullname: '',
        },
        client: {
            id: makeId(),
            fullname: '',
            unitNum: 0,
        },
        description: '',
        parts: [],
        date: '',
        arrivelTime: '',
        departureTime: '',
    }
}

function getDefaultFilter() {
    return {
        title: '',
        sortField: '',
        sortDir: '',
    }
}

function getParts() {
    return [
        {
            name: 'pump',
            partNum: makeId(),
            isSerial: false,
            serialNum: '',
        },
        {
            name: 'motor',
            partNum: makeId(),
            isSerial: false,
            serialNum: '',
        },
        {
            name: 'rubber',
            partNum: makeId(),
            isSerial: false,
            serialNum: '',
        },
        {
            name: 'arm',
            partNum: makeId(),
            isSerial: true,
            serialNum: '',
        },
    ]
}


// const service = VITE_LOCAL === 'true' ? local : remote
const service = local
export const callService = { getEmptyCall, getDefaultFilter, getParts, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.callService = callService
