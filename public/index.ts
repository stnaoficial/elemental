import { element, layout } from "../src/index";

const pkg = require('./../package.json');

const root = (
    layout("root").child(
        element("div").children([
            element("h1", { style: { fontWeight: "normal", margin: 0, fontSize: "3rem" } })
                .text(pkg.description),
            element("small")
                .text(`Using version ${ pkg.version }`)
        ])
    )
);

layout(document.body, {
    style: {
        fontFamily: "Helvetica",
        margin: 0,
        padding: 0,
        display: "grid",
        placeItems: "center",
        height: "100vh",
        backgroundColor: "#5E5CE6",
        color: "white"
    }
}).child(root)