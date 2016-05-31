import dejuxtapose from 'utils/utils'
import {store} from 'implementor/store'

export default class {
    constructor() {
    }

    //implement a 'deferred' methodology where date operations are executed at the very last step
    //therefore, 'set' your operations(setSource, setJoin, setFilter,....) beforehand
    setSource(sourceName) {
        this.source = sourceName
    }

    //only support one join for now
    setJoin(predicate) {
        this.predicate = predicate 
    }

    setFilter(conditions) {
        this.conditions = conditions
    }

    //use qsuedo private methods via _ for now since there is no official es6 way of doing it
    _fillTable() {
        //defualt to empty array if table is not found since we do not support(yet) CREATE TABLE statements
        this.table = JSON.parse(store.getItem(this.source)) || []

        this.join && _join()
    }

    _join() {
        let joinTable = JSON.parse(store.getItem(this.predicate.source)) || []
        
        this.table.forEach((row, index) => {
            //stop at first find since we are not going to implement compound results from joins for now
            let candidate = joinTable.find(joinRow => row[this.predicate.predicate[this.source]] == joinRow[this.predicate.predicate[predicate.source]])

            if(candidate){
                Object.assign(row, candidate)
            }
            else{
                this.table.splice(index, 1)
            }
        })
    }

    _filter() {
        let conditions = this.conditions.conditions;
        let logicalOperators = this.conditions.logicalOperators;

        data.filter(row => {
            //lets be optimistic initially 
            let passed = true 
            for(let i = 0; i < conditions; i++){
                // x > y => [x, >, y]
                let tokenized = conditions[i].split(' ')
                let left = tokenized[0], right = tokenized[2], operator = tokenized[1]
                let currentPassed = conditionMap[operator](left, right)

                //ultimately fails if currentPassed = false and the next logical operator is an 'and'
                if(!currentPassed && logicalOperators[i] != 'or'){
                    passed = false 
                    break;
                }
            }

            return passed
        })

        return data 
    }

    select(cols) {
        this._fillTable(this.source)

        this.innerResult = this.table.map(row => {
            let selectedRow = cols.reduce((selectedRow, current) => {
                selectedRow[current] = row[current]
                return selectedRow
            }, {})

            return selectedRow
        })
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
