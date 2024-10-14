import { CallPreview } from "./CallPreview.jsx";


export function CallList({ calls }) {
    return <ul className="call-list">
        {calls.map(call =>
            <li key={call._id}>
                <CallPreview call={call} />
            </li>
        )}
    </ul>
}