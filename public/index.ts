import { layout } from "../src/core/instance/elemental/elemental";
import Chat from "./components/Chat";

layout(document.body, {
    style: {
        backgroundColor: "#eee",
        height: "100vh",
        margin: 0,
        padding: "0",
        boxSizing: "border-box",
        fontFamily: "Arial",
        display: "grid",
        placeItems: "center"
    }
})
.child(
    Chat()
)