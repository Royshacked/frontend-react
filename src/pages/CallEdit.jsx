import { useEffect, useState } from "react"
import { useParams } from "react-router"

import { addCall, loadCall } from "../store/actions/call.actions"
import { callService } from "../services/call"
import { CallEditParts } from "../cmps/CallEditParts.jsx"


export function CallEdit() {
    const [callToEdit, setCallToEdit] = useState(callService.getEmptyCall())
    const { id } = useParams()

    useEffect(() => {

        if (!id) return
        setCall()
    }, [])

    async function setCall() {
        try {
            const call = await loadCall()
            setCallToEdit(call)
        } catch (error) {
            console.log(error)
        }
    }

    function onChange({ target }) {
        let { type, name, value } = target

        switch (type) {
            case 'number':
                value = +value
                break
            default:
                value = value
                break
        }

        name = name.split(' ')

        setCallToEdit(prevCall => name.length === 1 ?
            ({ ...prevCall, [name[0]]: value }) :
            ({ ...prevCall, [name[0]]: { ...prevCall[name[0]], [name[1]]: value, } })
        )
    }

    function onSubmit(ev) {
        ev.preventDefault()

        try {
            addCall(callToEdit)
        } catch (error) {
            console.log(error)
        }
    }

    return <section className="call-edit">
        <h2>{id ? 'Edit call' : 'Add call'}</h2>
        <form onSubmit={onSubmit}>
            <label htmlFor="title">Title:
                <input id="title" name="title" type="text" value={callToEdit.title || ''} onChange={onChange} />
            </label>

            <label htmlFor="technician fullname">Technician name:
                <input id="technician fullname" name="technician fullname" type="text" value={callToEdit.technician.fullname || ''} onChange={onChange} />
            </label>

            <label htmlFor="client fullname">Client name:
                <input id="client fullname" name="client fullname" type="text" value={callToEdit.client.fullname || ''} onChange={onChange} />
            </label>

            <label htmlFor="client unitNum">Client unit number:
                <input id="client unitNum" name="client unitNum" type="number" value={callToEdit.client.unitNum || 0} onChange={onChange} />
            </label>

            <label htmlFor="description">Description:
                <textarea id="description" name="description" value={callToEdit.description || ''} onChange={onChange} />
            </label>

            <label htmlFor="date">Date:
                <input type="date" id="date" name="date" value={callToEdit.date || ''} onChange={onChange} />
            </label>

            <label htmlFor="arrivelTime">Arrivel time:
                <input type="time" id="arrivelTime" name="arrivelTime" value={callToEdit.arrivelTime || ''} onChange={onChange} />
            </label>

            <label htmlFor="departureTime">Departure time:
                <input type="time" id="departureTime" name="departureTime" value={callToEdit.departureTime || ''} onChange={onChange} />
            </label>

            <CallEditParts />
            <button>Save</button>
        </form>
    </section>

}