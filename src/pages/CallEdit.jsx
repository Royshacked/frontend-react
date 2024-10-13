import { useEffect, useState } from "react"
import { useParams } from "react-router"

import { loadCall } from "../store/actions/call.actions"
import { callService } from "../services/call"


export function CallEdit() {
    const [callToEdit, setCallToEdit] = useState(callService.getEmptyCall())
    const { id } = useParams()
    const parts = callService.getParts()

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
            case 'select-multiple':
                value = Array.from(target.selectedOptions, option => parts[option.value])
                break
            default:
                value = ''
                break
        }

        value = type === 'number' ? +value : value
        name = name.split(' ')

        setCallToEdit(prevCall => name.length === 1 ?
            ({ ...prevCall, [name[0]]: value }) :
            ({ ...prevCall, [name[0]]: { ...prevCall[name[0]], [name[1]]: value, } })
        )
    }

    function onChangePartsSerial({ target }) {
        let { name, value } = target

        setCallToEdit(prevCall => ({ ...prevCall, parts: [{ ...prevCall.parts[+name], serialNum: value }] }))
    }

    console.log(callToEdit)

    return <section className="call-edit">
        <h2>{id ? 'Edit call' : 'Add call'}</h2>
        <form>
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

            <label htmlFor="parts">Parts:
                <select multiple={true} name="parts" id="parts" onChange={onChange}>
                    {parts.map((part, idx) =>
                        <option key={part.partNum} value={idx}>{part.name}</option>
                    )}
                </select>
            </label>

            {callToEdit.parts.map((part, idx) => part.isSerial && <label key={part.name} htmlFor={part.name}>{part.name} serial number:
                <input type="text" name={`${[idx]}`} id={part.name} value={part.serialNum} onChange={onChangePartsSerial} />
            </label>)}
        </form>
    </section>

}