

export function CallPreview({ call }) {
    return <article>
        <h3>{call.title}</h3>
        <pre>{JSON.stringify(call, null, 2)}</pre>
    </article>
}