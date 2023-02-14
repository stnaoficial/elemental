import { elemental } from "./elemental-global";

import { toKebabCase } from "../../utils/utils";

import { CSSSupport } from "../css-support/css-support";
import { HTMLSupport } from "../html-support/html-support";

import { ElementalInteraction } from "./elemental-interaction";

/**
 * Elemental class
 * 
 * @class Elemental
 */
class Elemental
{
    readonly DEFAULT_TAG_NAME: string = "div";
    
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

    static Genesis(context: Elemental.CallableContextType, attributes?: HTMLSupport.AttributesDeclarationType): Elemental
    {
        if (context instanceof Element)
        {
            const target = elemental.getOccurrenceByContext(context);

            if (target instanceof Elemental)
            {
                return target;
            }
        }

        return elemental.setOccurrence(new this(context, attributes));
    }
    
    public children(children: (Elemental | string)[]): Elemental
    {
        for (const child of children)
        {
            this.child(child);
        }

        return this;
    }

    public child(child: Elemental | string): Elemental
    {
        if (child instanceof Elemental)
        {
            this.context.append(child.context);
        }
        else if (typeof child === "string")
        {
            this.context.append(child);
        }

        return this;
    }
    
    public text(text: string): Elemental
    {
        this.context.textContent = text;

        return this;
    }
    
    public html(html: string): Elemental
    {
        this.context.innerHTML = html;

        return this;
    }

    public do(callback: (this: ElementalInteraction) => void): Elemental
    {
        callback.call(ElementalInteraction.Genesis(this));

        return this;
    }
}

export { Elemental };

/** 
 * Elemental element implementation
 * 
 * @param context Elemental callable context
 * @param attributes HTMLSuppot attributes
 * @returns Elemental
 */
export function element(context: Elemental.CallableContextType = null, attributes?: HTMLSupport.AttributesDeclarationType): Elemental
{
    return Elemental.Genesis(context, attributes);
}

/** 
 * Elemental element implementation
 * 
 * @param context Elemental callable context
 * @param attributes HTMLSuppot attributes
 * @returns Elemental
 */
export function component(context: Elemental.CallableContextType = null, attributes?: HTMLSupport.AttributesDeclarationType): Elemental
{
    return Elemental.Genesis(context, attributes);
}

/** 
 * Elemental element implementation
 * 
 * @param context Elemental callable context
 * @param attributes HTMLSuppot attributes
 * @returns Elemental
 */
export function layout(context: Elemental.CallableContextType = null, attributes?: HTMLSupport.AttributesDeclarationType): Elemental
{
    return Elemental.Genesis(context, attributes);
}