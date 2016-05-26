import parse from '../parser/parser'
import evaluate from '../interpreter'

export function processQuery(query) {
    let ast = parse(query)
    return evaluate(ast)
}
