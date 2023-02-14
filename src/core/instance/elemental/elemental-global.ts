import { Elemental } from "./elemental";

declare global
{
    interface Window
    {
        elemental: any
    }
}

/**
 * Elemental Global Instance
 * 
 * Responsible for storing and distributing information during
 * several Elemental instances
 * 
 * @const { object } elemental
 */
export const elemental = window.elemental = new class
{
    public occurrences: Elemental[] = [];

    public aliases: { [key: string]: Elemental } = {};

    public metadata: { [key: string]: any } = {};
    
    setOccurrence(target: Elemental): Elemental
    {
        this.occurrences.push(target);
    
        return target;
    }
    
    getOccurrenceByContext(context: Element): Elemental | null
    {
        for (const target of this.occurrences)
        {
            if (target.context === context)
            {
                return target;
            }
        }
    
        return null;
    }
    







    hasAlias(name: string): boolean
    {
        return this.aliases[name] === undefined? false : true;
    }
    
    getAlias(name: string): Elemental
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
    
    setAlias(name: string, target?: Elemental): Elemental
    {
        if (target instanceof Elemental)
        {
            return this.aliases[name] = target;
        }
        else
        {
            throw new Error("Target alias is not an instance of Elemental");
        }
    }
    
    getOrSetAlias(name: string, target?: Elemental): Elemental
    {
        if (target === undefined)
        {
            return this.getAlias(name);
        }
    
        return this.setAlias(name, target);        
    }






    hasMeta(name: string): boolean
    {
        return this.metadata[name] === undefined? false : true;
    }
    
    getMeta(name: string): any
    {
        if (this.hasMeta(name))
        {
            return this.metadata[name];
        }
        else
        {
            throw new Error("Trying to get an undefined metadata");
        }
    }
    
    setMeta(name: string, data?: any): any
    {
        return this.metadata[name] = data;
    }
    
    getOrSetMeta(name: string, data?: any): any
    {
        if (data === undefined)
        {
            return this.getMeta(name);
        }
    
        return this.setMeta(name, data);        
    }




    readonly DEFAULT_STORAGE_VALUE: any[] = [];

    storage(name: string, value?: any): any
    {
        if (value !== undefined)
        {
            return localStorage.setItem(name, JSON.stringify(value));
        }
        else
        {
            let data = localStorage.getItem(name);

            if (data !== null)
            {
                return JSON.parse(data);
            }
            else
            {
                localStorage.setItem(name, JSON.stringify(this.DEFAULT_STORAGE_VALUE));
            
                data = localStorage.getItem(name);

                if (data !== null)
                {
                    return JSON.parse(data);
                }
            }
        }
    }
}

export function alias(name: string, target?: Elemental): Elemental
{
    return elemental.getOrSetAlias(name, target);
}

export function meta(name: string, data?: any): any
{
    return elemental.getOrSetMeta(name, data);
}

export function storage(name: string, data?: any)
{
    return elemental.storage(name, data);
}
