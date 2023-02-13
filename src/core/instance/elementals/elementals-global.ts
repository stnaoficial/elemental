import { Elementals } from "./elementals";

declare global
{
    interface Window
    {
        elementals: any
    }
}

/**
 * Elementals Global Instance
 * 
 * Responsible for storing and distributing information during
 * several Elementals instances
 * 
 * @const { object } elementals
 */
export const elementals = window.elementals = new class
{
    public occurrences: Elementals[] = [];

    public aliases: { [key: string]: Elementals } = {};

    public metadata: { [key: string]: any } = {};
    
    setOccurrence(target: Elementals): Elementals
    {
        this.occurrences.push(target);
    
        return target;
    }
    
    getOccurrenceByContext(context: Element): Elementals | null
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
    
    getAlias(name: string): Elementals
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
    
    setAlias(name: string, target?: Elementals): Elementals
    {
        if (target instanceof Elementals)
        {
            return this.aliases[name] = target;
        }
        else
        {
            throw new Error("Target alias is not an instance of Elementals");
        }
    }
    
    getOrSetAlias(name: string, target?: Elementals): Elementals
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

export function alias(name: string, target?: Elementals): Elementals
{
    return elementals.getOrSetAlias(name, target);
}

export function meta(name: string, data?: any): any
{
    return elementals.getOrSetMeta(name, data);
}

export function storage(name: string, data?: any)
{
    return elementals.storage(name, data);
}
