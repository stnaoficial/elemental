import { elementals } from "./elementals-global";

import { toKebabCase } from "../../utils/utils";

import { CSSSupport } from "../css-support/css-support";
import { HTMLSupport } from "../html-support/html-support";

import { ElementalsInteraction } from "./elementals-interaction";

/**
 * Elementals class
 * 
 * @class Elementals
 */
class Elementals
{
    readonly DEFAULT_TAG_NAME: string = "div";
    
    public context: Element;

    constructor(context: Elementals.CallableContextType, attributes?: HTMLSupport.AttributesDeclarationType)
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

    static Genesis(context: Elementals.CallableContextType, attributes?: HTMLSupport.AttributesDeclarationType): Elementals
    {
        if (context instanceof Element)
        {
            const target = elementals.getOccurrenceByContext(context);

            if (target instanceof Elementals)
            {
                return target;
            }
        }

        return elementals.setOccurrence(new this(context, attributes));
    }
    
    public children(children: (Elementals | string)[]): Elementals
    {
        for (const child of children)
        {
            this.child(child);
        }

        return this;
    }

    public child(child: Elementals | string): Elementals
    {
        if (child instanceof Elementals)
        {
            this.context.append(child.context);
        }
        else if (typeof child === "string")
        {
            this.context.append(child);
        }

        return this;
    }
    
    public text(text: string): Elementals
    {
        this.context.textContent = text;

        return this;
    }
    
    public html(html: string): Elementals
    {
        this.context.innerHTML = html;

        return this;
    }

    public do(callback: (this: ElementalsInteraction) => void): Elementals
    {
        callback.call(ElementalsInteraction.Genesis(this));

        return this;
    }
}

export { Elementals };

/** 
 * Elementals element implementation
 * 
 * @param context Elementals callable context
 * @param attributes HTMLSuppot attributes
 * @returns Elementals
 */
export function element(context: Elementals.CallableContextType = null, attributes?: HTMLSupport.AttributesDeclarationType): Elementals
{
    return Elementals.Genesis(context, attributes);
}

/** 
 * Elementals element implementation
 * 
 * @param context Elementals callable context
 * @param attributes HTMLSuppot attributes
 * @returns Elementals
 */
export function component(context: Elementals.CallableContextType = null, attributes?: HTMLSupport.AttributesDeclarationType): Elementals
{
    return Elementals.Genesis(context, attributes);
}

/** 
 * Elementals element implementation
 * 
 * @param context Elementals callable context
 * @param attributes HTMLSuppot attributes
 * @returns Elementals
 */
export function layout(context: Elementals.CallableContextType = null, attributes?: HTMLSupport.AttributesDeclarationType): Elementals
{
    return Elementals.Genesis(context, attributes);
}