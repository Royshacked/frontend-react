import { useEffect } from "react"
import { loadCalls } from "../store/actions/call.actions"
import { useSelector } from "react-redux"

import { CallList } from "../cmps/CallList"


export function CallIndex() {
    const calls = useSelector(state => state.callModule.calls)
    useEffect(() => {
        setCalls()
    }, [])

    function setCalls() {
        loadCalls()
    }
    return <section className="call-index">
        <CallList calls={calls} />
    </section>
}