import { CallPreview } from "./CallPreview.jsx";


export function CallList({ calls }) {
    return <ul className="call-list">
        {calls.map(call =>
            <li>
                <CallPreview call={call} />
            </li>
        )}
    </ul>
}