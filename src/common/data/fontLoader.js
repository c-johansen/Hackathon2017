import FontFaceObserver from "fontfaceobserver"
import Logger from "./Logger"

export default async function fontLoader() {
    try {
        await Promise.all([
            new FontFaceObserver("FuturaPassata", { weight: "normal", style: "normal" }).load(),
            new FontFaceObserver("Gotham SSm A", { weight: 300, style: "normal" }).load(),
            new FontFaceObserver("Gotham SSm A", { weight: 400, style: "normal" }).load(),
            new FontFaceObserver("Gotham SSm A", { weight: 500, style: "normal" }).load(),
            new FontFaceObserver("Gotham SSm A", { weight: 600, style: "normal" }).load()
        ])
    } catch (e) {
        Logger.error("fontLoader", e)
    }
}
