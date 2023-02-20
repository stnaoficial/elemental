export function toKebabCase(string: string): string
{
    return string
        .replace(/\ /gm, "")
        .split('')
        .map(
            (letter, index): string =>
                letter.toUpperCase() === letter? `${ index !== 0? '-' : '' }${ letter.toLowerCase() }` : letter
        )
        .join('');
}

export function toCamelCase(string: string): string
{
    return string
        .replace(/\ /gm, "")
        .replace(/(-[a-z])/,
            (char) =>
                char.replace("-", "").toUpperCase()
        );
}

export function JSONformat(value: any): any
{
    return JSON.parse(JSON.stringify(value));
}
