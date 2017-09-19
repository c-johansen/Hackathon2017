import React from "react"
import { Switch, withRouter } from "react-router-dom"
import Nav from "../../common/modules/app/Nav"
import { CSSTransitionGroup as TransitionGroup }  from "react-transition-group"
import routeDefinitions from "./route-definitions"

export function Routes(props) {
    let { location, history } = props
    let skipAnimation = location.state && location.state.isImmediate
    let isBack = history.action === "POP" || (location.state && location.state.isBack)
    const animationDuration = 400

    return (
        <TransitionGroup
            component="div"
            className="app"
            transitionName={isBack ? "slide-left" : "slide-right"}
            transitionEnter={skipAnimation && !isBack ? false : true}
            transitionLeave={skipAnimation && !isBack ? false : true}
            transitionEnterTimeout={animationDuration}
            transitionLeaveTimeout={animationDuration}>
            <Switch key={location.key} location={location} >
                {routeDefinitions}
            </Switch>
            <div className="app__footer">
                <Nav location={location} />
            </div>
        </TransitionGroup>
    )
}

export default withRouter(Routes)
