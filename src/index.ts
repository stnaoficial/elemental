import { Elemental } from "./instance/elemental/elemental";
import { ElementalEntity } from "./instance/elemental/elemental-entity";

/**
 * Provides global access to the main Elemental object
 * 
 * @constant { Elemental } elemental
 */
export const elemental = window.elemental = new Elemental();

/**
 * Alias
 * 
 * @param name The alias name
 * @param target The alias target
 * @returns { ElementalEntity } ElementalEntity
 */
export function alias(name: string, target?: ElementalEntity): ElementalEntity
{
    return elemental.alias(name, target);
}

/**
 * Meta
 * 
 * @param name The meta name
 * @param data The meta data
 * @returns { any } any
 */
export function meta(name: string, data?: any): any
{
    return elemental.meta(name, data);
}

/**
 * Local Storage
 * 
 * @param name The storage name
 * @param data The storage data
 * @returns { any } any
 */
export function storage(name: string, data?: any): any
{
    return elemental.storage(name, data);
}

/** 
 * Elemental Element
 * 
 * @param context Elemental callable context
 * @param attributes HTMLSuppot attributes
 * 
 * @returns { ElementalEntity } element
 */
export function element(context: Elemental.CallableContextType = null, attributes?: HTMLSupport.AttributesDeclarationType): ElementalEntity
{
    return elemental.entity(context, attributes);
}

/** 
 * Elemental Component
 * 
 * @param context Elemental callable context
 * @param attributes HTMLSuppot attributes
 * 
 * @returns { ElementalEntity } component
 */
export function component(context: Elemental.CallableContextType = null, attributes?: HTMLSupport.AttributesDeclarationType): ElementalEntity
{
    return elemental.entity(context, attributes);
}

/** 
 * Elemental Layout
 * 
 * @param context Elemental callable context
 * @param attributes HTMLSuppot attributes
 * 
 * @returns { ElementalEntity } layout
 */
export function layout(context: Elemental.CallableContextType = null, attributes?: HTMLSupport.AttributesDeclarationType): ElementalEntity
{
    return elemental.entity(context, attributes);
}