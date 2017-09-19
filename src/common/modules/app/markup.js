import React from "react"
import css from "classnames"

export const App = {
    Top(props) {
        return (
            <main className="app__top">
                {props.children}
            </main>
        )
    },
    Header(props) {
        return (
            <div className={css("app__top__header ", { "app__top__header--extended": props.extended })}>
                {props.children}
            </div>
        )
    },
    Main(props) {
        return (
            <div className={css("app__top__main " , { "app__top__main--restricted": props.restricted, "app__top__main--extended": props.extended })}>
                {props.children}
            </div>
        )
    },
    Footer(props) {
        return (
            <div className="app__footer">
                {props.children}
            </div>
        )
    }
}

// THESE SHOULD GO
export function Grid(props) {
    return (
        <div {...props} className={"grid " + (props.className || "")} >
            {props.children}
        </div>
    )
}

export function StretchBox(props) {
    return (
        <div {...props} className={"box " + (props.className || "")}>
            {props.children}
        </div>
    )
}

export function StaticBox(props) {
    return (
        <div {...props} className={"box box--unflex " + (props.className || "")}>
            {props.children}
        </div>
    )
}
