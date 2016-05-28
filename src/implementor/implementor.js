import dejuxtapose from 'utils/utils'
import {store} from 'implementor/store'

export default class {
    constructor() {
    }

    setSource(sourceName) {
        this.source = sourceName
    }

    setFilter(conditions) {
        this.conditions = conditions
    }

    fillTable() {
        //defualt to empty array if table is not found since we do not support(yet) CREATE TABLE statements
        this.table = JSON.parse(store.getItem(this.source)) || []
    }

    filter() {
        //separate conditions from operands
        let sifted = utils.dejuxtapose(this.conditions)
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

    select(cols, data) {
        data = data.map(row => {
            let selectedRow = {}
            row.keys.forEach(key => selectedRow[key] = row[key])
            
            return selectedRow
        })

        return data 
    }

    insert(vars) {
        this.fillTable(this.source)

        let {columns, values} = vars, row = {}
        for(let i = 0; i < columns.length; i++){
            row[columns[i]] = values[i]
        }

        this.table.push(row)

        this.commit()

        this.innerResult = true
    }

    commit(){
        //this is unoptimized but will not be a bottle-neck for now considering the 5 - 10 MB limit in the first place
        store.setItem(this.source, JSON.stringify(this.table))
    }

    get result(){
        return this.innerResult
    }
}

//just use a map to avoid switch-case 
const conditionMap = {
    '>' : (left, right) => (left > right),
    '<' : (left, right) => (left < right),
    '=' : (left, right) => (left = right),
    '!=' : (left, right) => (left = right)
}
