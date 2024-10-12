

export function CallPreview({ call }) {
    return <article>
        <pre>{JSON.stringify(call)}</pre>
    </article>
}