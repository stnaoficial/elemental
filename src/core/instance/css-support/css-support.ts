import { HTMLSupport } from "../html-support/html-support";

/**
 * CSS Support
 * 
 * @brief Provides an simple support to manipulate CSS
 * 
 * @package Elemental
 * @class CSSSupport
 */
class CSSSupport
{
    static ParseFromJSON(style: CSSSupport.StyleDeclarationType): string
    {
        let cssText: string = "";
        
        const element: Element = HTMLSupport.CreateElementByTagName("template");

        if (element instanceof HTMLTemplateElement)
        {
            for (const [styleName, styleValue] of Object.entries(style))
            {
                element.style[styleName as any] = styleValue;
            }
            
            cssText = element.style.cssText;            
        }

        return cssText;
    }
}

export { CSSSupport };