import parse from 'parser/parser'
import evaluate from 'implementor/interpreter'
import store from 'implementor/store'

export default function processQuery(query) {
    let asts = parse(query)
    return evaluate(asts)
}
