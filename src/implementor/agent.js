import operator from 'operator'

export function query(query){
    return operator.processQuery(query)
}
