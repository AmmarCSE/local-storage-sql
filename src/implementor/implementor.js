import dejuxtapose from 'utils/utils'
import {store} from 'implementor/store'

export function retrieve(table) {
    //defualt to empty array if table is not found since we do not support(yet) CREATE TABLE statements
    table = JSON.parse(store.getItem(table)) || []
    return table
}

export function setSource(sourceName) {
    source = sourceName
}

export function filter(conditions, data) {
    //separate conditions from operands
    let sifted = utils.dejuxtapose(conditions)
    conditions = sifted.blacks;
    logicalOperators = sifted.whites;

    data.filter(row => {
        //lets be optimistic initially 
        let passed = true 
        for(let i = 0; i < conditions; i++){
            // x > y => [x, >, y]
            let tokenized = conditions[i].split(' ')
            let left = tokenized[0], right = tokenized[2], operator = tokenized[1]
            let currentPassed = conditionMap[operator](left, right)

            //ultimately fails if the next logical operator is an 'and'
            if(!currentPassed && logicalOperators[i] != 'or'){
                passed = false 
                break;
            }
        }

        return passed
    })

    return data 
}

export function select(cols, data) {
    data = data.map(row => {
        let selectedRow = {}
        row.keys.forEach(key => selectedRow[key] = row[key])
        
        return selectedRow
    })

    return data 
}

export function insert(vars, table) {
    let row = {}
    for(let i = 0; i < vars.columns; i++){
        row[columns[i]] = values[i]
    }

    table.push(row)
}

let source = ''

//just use a map to avoid switch-case 
const conditionMap = {
    '>' : (left, right) => (left > right),
    '<' : (left, right) => (left < right),
    '=' : (left, right) => (left = right),
    '!=' : (left, right) => (left = right)
}
