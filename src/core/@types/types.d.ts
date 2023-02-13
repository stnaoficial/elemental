declare namespace CSSSupport
{
    type StyleDeclarationType = CSSStyleDeclaration | {}
}

declare namespace HTMLSupport
{
    type MimeTypes = "application/json" | "application/octet-stream" | "application/pdf" | "application/xml" | "application/zip" | "image/gif" | "image/jpeg" | "image/png" | "text/css" | "text/csv" | "text/html" | "text/javascript" | "text/plain" | "text/xml";

    type InputTypes = "button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week";

    type TagNameTypes = "html" | "head" | "title" | "base" | "link" | "meta" | "style" | "script" | "noscript" | "body" | "article" | "section" | "nav" | "aside" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "header" | "main" | "footer" | "address" | "p" | "hr" | "pre" | "blockquote" | "ol" | "ul" | "li" | "dl" | "dt" | "dd" | "figure" | "figcaption" | "div" | "a" | "em" | "strong" | "small" | "s" | "cite" | "q" | "dfn" | "abbr" | "data" | "time" | "code" | "var" | "samp" | "kbd" | "sub" | "sup" | "i" | "b" | "u" | "mark" | "ruby" | "rt" | "rp" | "bdi" | "bdo" | "span" | "br" | "wbr" | "ins" | "del" | "img" | "iframe" | "embed" | "object" | "param" | "video" | "audio" | "source" | "track" | "canvas" | "map" | "area" | "table" | "caption" | "colgroup" | "col" | "tbody" | "thead" | "tfoot" | "tr" | "td" | "th" | "form" | "fieldset" | "legend" | "label" | "input" | "button" | "select" | "datalist" | "optgroup" | "option" | "textarea" | "keygen" | "output" | "progress" | "meter" | "details" | "summary" | "menuitem" | "menu" | {};

    interface AttributesDeclaration
    {
        id?: string;
        class?: string;
        style?: CSSSupport.StyleDeclarationType;
        src?: string;
        alt?: string;
        width?: number;
        height?: number;
        href?: string;
        target?: string;
        colspan?: number;
        rowspan?: number;
        disabled?: boolean;
        checked?: boolean;
        selected?: boolean;
        type?: InputTypes | MimeTypes;
        for?: string;
        min?: number;
        max?: number;
        pattern?: string;
        value?: string;
        placeholder?: string;
        name?: string;
        autofocus?: boolean;
        required?: boolean;
        readonly?: boolean;
        rows?: number;
        cols?: number;
        wrap?: string;
    }

    type AttributesDeclarationType = AttributesDeclaration | {};
}

declare namespace Elementals
{
    type CallableContextType = HTMLSupport.TagNameTypes | Element | null;
}
