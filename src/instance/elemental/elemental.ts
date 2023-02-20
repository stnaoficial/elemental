import { ElementalEntity } from "./elemental-entity";

declare global
{
    interface Window
    {
        elemental: any
    }
}

/**
 * Elemental Instance
 * 
 * Responsible for storing and distributing information during
 * several Elemental instances
 * 
 * @const { object } elemental
 */
class Elemental
{
    protected occurrences: ElementalEntity[] = [];

    protected aliases: { [key: string]: ElementalEntity } = {};

    protected metas: { [key: string]: any } = {};

    public entity(context: Elemental.CallableContextType, attributes?: HTMLSupport.AttributesDeclarationType): ElementalEntity
    {
        if (context instanceof Element)
        {
            for (const target of this.occurrences)
            {
                if (target.context === context)
                {
                    return target;
                }
            }
        }

        const target = ElementalEntity.Genesis(context, attributes);

        this.occurrences.push(target);

        return target;
    }

    public hasAlias(name: string): boolean
    {
        return this.aliases[name] === undefined? false : true;
    }
    
    public getAlias(name: string): ElementalEntity
    {
        if (this.hasAlias(name))
        {
            return this.aliases[name];
        }
        else
        {
            throw new Error("Trying to get an undefined alias");
        }
    }
    
    public setAlias(name: string, target?: ElementalEntity): ElementalEntity
    {
        if (target instanceof ElementalEntity)
        {
            return this.aliases[name] = target;
        }
        else
        {
            throw new Error("Target alias is not an instance of ElementalEntity");
        }
    }
    
    public alias(name: string, target?: ElementalEntity): ElementalEntity
    {
        if (target === undefined)
        {
            return this.getAlias(name);
        }
    
        return this.setAlias(name, target);        
    }

    public hasMeta(name: string): boolean
    {
        return this.metas[name] === undefined? false : true;
    }
    
    public getMeta(name: string): any
    {
        if (this.hasMeta(name))
        {
            return this.metas[name];
        }
        else
        {
            throw new Error("Trying to get an undefined meta");
        }
    }
    
    public setMeta(name: string, data?: any): any
    {
        return this.metas[name] = data;
    }
    
    public  meta(name: string, data?: any): any
    {
        if (data === undefined)
        {
            return this.getMeta(name);
        }
    
        return this.setMeta(name, data);        
    }

    readonly DEFAULT_STORAGE_VALUE: any[] = [];

    public hasStore(name: string): boolean
    {
        return this.getStore(name) !== null? true : false;
    }

    public getStore(name: string): any[] | null
    {
        const data = localStorage.getItem(name);

        if (typeof data === "string")
        {
            return JSON.parse(data);
        }

        return data;
    }

    public setStore(name: string, value: any): any
    {
        if (typeof value !== "string")
        {
            value = JSON.stringify(value);
        }

        return localStorage.setItem(name, value);
    }

    public clearStore(): void
    {
        localStorage.clear();
    }

    public storage(name: string, value?: any): any
    {
        if (value !== undefined)
        {
            return this.setStore(name, value);
        }
        else if (this.hasStore(name))
        {
            return this.getStore(name);
        }

        return this.setStore(name, this.DEFAULT_STORAGE_VALUE);
    }
}

export { Elemental }