
export function validateString(value: string, pattern : RegExp): boolean{
    return pattern.test(value);
}