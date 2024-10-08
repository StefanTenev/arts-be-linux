export const isStringErr = (column: string) => {
    return `${column} must be a string`
}

export const isNotEmptyErr = (column: string) => {
    return `${column} requires a value`
}

export const maxErr = (column: string) => {
    return `${column} upper limit reached`
}

export const minErr = (column: string) => {
    return `${column} lower limit reached`
}
export const isNumberErr = (column: string) => {
    return `${column} must be a number`
}
export const isEnumErr = (column: string) => {
    return `${column} is of incorrect enum type`
}