import parse from '../parser/parser'
import execute from '../interpreter'

export function processQuery(query) {
    let asts = parse(query)
    return execute(asts)
}
