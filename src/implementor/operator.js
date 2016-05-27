import parse from '../parser/parser'
import execute from '../interpreter'
import store from 'store'

export function processQuery(query) {
    let asts = parse(query)
    return execute(asts)
}
