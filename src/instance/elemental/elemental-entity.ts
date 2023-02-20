import { toKebabCase } from "../../@utils/utils";

import { CSSSupport } from "../css-support/css-support";
import { HTMLSupport } from "../html-support/html-support";

import { ElementalInteraction } from "./elemental-interaction";

/**
 * Elemental Entity class
 * 
 * @class ElementalEntity
 */
class ElementalEntity
{
    readonly DEFAULT_TAG_NAME: string = "entity";
    
    public context: Element;

    constructor(context: Elemental.CallableContextType, attributes?: HTMLSupport.AttributesDeclarationType)
    {
        if (context instanceof Element)
        {
            this.context = context;
        }
        else if (typeof context === "string")
        {
            this.context = HTMLSupport.CreateElementByTagName(context);
        }
        else
        {
            this.context = HTMLSupport.CreateElementByTagName(this.DEFAULT_TAG_NAME);
        }
        
        if (attributes instanceof Object)
        {            
            for(const [attributeName, attributeValue] of Object.entries(attributes))
            {
                if (attributeName === "style")
                {
                    this.context.setAttribute(attributeName, CSSSupport.ParseFromJSON(attributeValue));
                }
                else
                {
                    this.context.setAttribute(toKebabCase(attributeName), attributeValue);
                }
            }
        }
    }

    static Genesis(context: Elemental.CallableContextType, attributes?: HTMLSupport.AttributesDeclarationType): ElementalEntity
    {
        return new this(context, attributes);
    }
    
    public children(children: (ElementalEntity | string)[]): ElementalEntity
    {
        for (const child of children)
        {
            this.child(child);
        }

        return this;
    }

    public child(child: ElementalEntity | string): ElementalEntity
    {
        if (child instanceof ElementalEntity)
        {
            this.context.append(child.context);
        }
        else if (typeof child === "string")
        {
            this.context.append(child);
        }

        return this;
    }
    
    public text(text: string): ElementalEntity
    {
        this.context.textContent = text;

        return this;
    }
    
    public html(html: string): ElementalEntity
    {
        this.context.innerHTML = html;

        return this;
    }

    public do(callback: (this: ElementalInteraction) => void): ElementalEntity
    {
        callback.call(ElementalInteraction.Genesis(this));

        return this;
    }


    public anim(name: string, options: any): ElementalEntity
    {
        return this;
    }
}

export { ElementalEntity };