import parse from '../parser/parser'
import evaluate from '../interpreter'

export function processQuery(query) {
    let asts = parse(query)
    return evaluate(asts)
}
