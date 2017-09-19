import React from "react"
import JSONTree from "react-pretty-json"

export default function(props) {
    return (
        <pre className={"json-output " + (props.error ? "json-output--error" : "")}>
            <JSONTree json={props.data} />
        </pre>
    )
}
