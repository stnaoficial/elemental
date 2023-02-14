import { alias, storage } from "../../src/core/instance/elemental/elemental-global";
import { component, element, Elemental, layout } from "../../src/core/instance/elemental/elemental";
import { ElementalInteraction } from "../../src/core/instance/elemental/elemental-interaction";

function loadMessages()
{
    const messager =  alias("messager");

    messager.do(function(this: ElementalInteraction) {
        this.clearValue();
    })

    const datas = storage("messages")

    if (datas instanceof Array && datas.length > 0)
    {
        for(const data of datas)
        {
            messager.child(
                Message(data.message, data.date)
            )
        }
    }
    else
    {
        messager.child(
            Message("Empty", "No message found")
        )
    }
}

function sendMessage()
{
    const input = alias("input");

    input.do(function(this: ElementalInteraction)
    {
        if (this.hasValue())
        {
            const messages = storage("messages");

            const data = {
                message: this.value(),
                date: new Date().toUTCString()
            }

            messages.unshift(data);

            storage("messages", messages);

            loadMessages();
        }

        this.clearValue();
    })
}

function Message(message: string, date: string): Elemental
{
    return component("div", { style: { margin: "1rem 1rem" } }).children([
        element("p", { style: { margin: 0 } }).html(message),
        element("small", { style: { color: "#aaa", fontSize: ".75rem" } }).text(date)
    ]);
}

export default function Chat()
{
    return component("div", { style: { backgroundColor: "#fff", display: "flex", width: "500px", flexDirection: "column", overflow: "hidden", borderRadius: ".25rem", border: "1px solid #ccc", margin: "1rem" } }).children([
        element("div", { style: { height: "750px", borderBottom: "1px solid #ccc", overflowY: "scroll", display: "flex", flexDirection: "column-reverse" } })
            .do(function(this: ElementalInteraction)
            {
                alias("messager", this.target);

                loadMessages();
            }),
        element("div", { style: { display: "flex", backgroundColor: "#ddd" } }).children([
            element("input", { type: "text", style: { border: 0, outline: 0, padding: ".75rem", width: "100%" } })
                .do(function(this: ElementalInteraction)
                {
                    alias("input", this.target);
                }),
            element("button", { style: { borderRadius: 0, background: "#5E5CE6", color: "#fff", border: 0, padding: ".75rem", cursor: "pointer", minWidth: "max-content" } })
                .text("Send")
                .do(function(this: ElementalInteraction)
                {
                    this.on("click", function(this: ElementalInteraction)
                    {
                        sendMessage();
                    })

                    layout(document.body).do(function(this: ElementalInteraction) {
                        this.on("keypress", function(this: ElementalInteraction, event: Event) {
                            if (event instanceof KeyboardEvent && event.key === "Enter")
                            {
                                sendMessage();
                            }
                        })
                    })
                }),
            element("button", { style: { background: "none", borderRadius: 0, border: 0, padding: ".75rem", cursor: "pointer", minWidth: "max-content", backgroundColor: "#333", color: "#fff" } })
                .text("Clear")    
                .do(function(this: ElementalInteraction)
                {
                    this.on("click", function(this: ElementalInteraction)
                    {
                        storage("messages", []);

                        loadMessages();
                    })
                }),
        ])
    ])
}