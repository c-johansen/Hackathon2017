import React, { Component } from "react"
import List from "../List"
import { Grid, StretchBox, StaticBox } from "../../app/markup"
import BackHeader from "../../app/BackHeader"

export default class Lists extends Component {
    render() {
        return (
            <Grid>
                <StaticBox>
                    <BackHeader title="Dine lister" />
                </StaticBox>
                <StretchBox>
                    <List showPrice={true} />
                    <List showPrice={true} />
                    <List showPrice={true} />
                    <List showPrice={true} />
                </StretchBox>
            </Grid>
        )
    }
}
