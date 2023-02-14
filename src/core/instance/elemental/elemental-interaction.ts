import { Elemental } from "./elemental";

/**
 * Elemental Interaction class
 * 
 * @class ElementalInteraction
 */
class ElementalInteraction
{
    public target: Elemental;

    public constructor(target: Elemental)
    {
        this.target = target;
    }

    static Genesis(target: Elemental): ElementalInteraction
    {
        return new this(target);
    }

    public on(type: string, callback: (this: ElementalInteraction, event: Event) => void): void
    {
        this.target.context.addEventListener(type, callback.bind(this));
    }

    public emit(type: string, eventInitDict?: CustomEventInit<unknown>): void
    {
        const event: Event = new CustomEvent(type, eventInitDict);

        document.dispatchEvent(event);

        event.stopPropagation();
        event.stopImmediatePropagation();
    }

    public value(value?: string | number): string
    {
        if (
            this.target.context instanceof HTMLInputElement ||
            this.target.context instanceof HTMLOptionElement ||
            this.target.context instanceof HTMLButtonElement ||
            this.target.context instanceof HTMLMeterElement ||
            this.target.context instanceof HTMLLIElement ||
            this.target.context instanceof HTMLProgressElement ||
            this.target.context instanceof HTMLParamElement
        )
        {
            if (value !== undefined)
            {
                this.target.context.value = value;
            }

            return this.target.context.value.toString();
        }
        else
        {
            if (value !== undefined)
            {
                this.target.html(value.toString());
            
                return value.toString();
            }
        }

        return "";
    }

    public hasValue(): boolean
    {
        return this.value().toString().trim().length > 0;
    }

    public clearValue(): boolean
    {
        return this.value("")? true : false;
    }

    public remove(): void
    {
        this.target.context.remove();
    }
}

export { ElementalInteraction };