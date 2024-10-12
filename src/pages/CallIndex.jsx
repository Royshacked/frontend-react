import { useEffect } from "react"
import { loadCalls } from "../store/actions/call.actions"
import { useSelector } from "react-redux"

import { CallList } from "../cmps/CallList"
import { Link } from "react-router-dom"


export function CallIndex() {
    const calls = useSelector(state => state.callModule.calls)
    useEffect(() => {
        setCalls()
    }, [])

    function setCalls() {
        loadCalls()
    }
    return <section className="call-index">
        <h2>List</h2>
        <Link to='/edit'>Add</Link>
        <CallList calls={calls} />
    </section>
}