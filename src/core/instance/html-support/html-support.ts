/**
 * HTML Support
 * 
 * @brief Provides an simple support to manipulate HTML
 * 
 * @package Elemental
 * @class HTMLSupport
 */
class HTMLSupport
{
    static CreateElementByString(elementTemplateString: string): Element | null
    {
        const element: HTMLTemplateElement = document.createElement("template");

        element.innerHTML = elementTemplateString;

        return element.content.firstElementChild;
    }

    static CreateElementByTagName(tagName: string): Element
    {
        return document.createElement(tagName);
    }
}

export { HTMLSupport }