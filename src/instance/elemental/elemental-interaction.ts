import { ElementalEntity } from "./elemental-entity";

/**
 * Elemental Interaction class
 * 
 * @class ElementalInteraction
 */
class ElementalInteraction
{
    public target: ElementalEntity;

    public constructor(target: ElementalEntity)
    {
        this.target = target;
    }

    static Genesis(target: ElementalEntity): ElementalInteraction
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

    public value(value?: string | number): any
    {
        if ("value" in this.target.context)
        {
            if (value !== undefined)
            {
                return this.target.context.value = value;
            }
            else
            {
                return this.target.context.value;
            }
        }

        return undefined;
    }

    public toggle(): void
    {
        if ("hidden" in this.target.context)
        {
            this.target.context.hidden = !this.target.context.hidden;
        }
    }

    public remove(target?: ElementalEntity): void
    {
        if (target instanceof ElementalEntity)
        {
            target.context.remove();
        }

        this.target.context.remove();
    }

}

export { ElementalInteraction };