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
        this.joinPredicate = predicate 
    }

    setFilter(conditions) {
        this.conditions = conditions
    }

    //use qsuedo private methods via _ for now since there is no official es6 way of doing it
    _fillTable(process = true) {
        //defualt to empty array if table is not found since we do not support(yet) CREATE TABLE statements
        this.table = JSON.parse(store.getItem(this.source)) || []

        //process=false indicates that raw, unfiltered table is desired
        if(process){
            this._processTable()
        }
    }

    _processTable() {
        this.joinPredicate && this._join()
        this.conditions && this._filter()
    }

    _join() {
        let joinTable = JSON.parse(store.getItem(this.joinPredicate.source)) || []
        
        this.table.forEach((row, index) => {
            let predicate = this.joinPredicate.predicate
            let leftColumn = predicate[this.source], rightColumn = predicate[this.joinPredicate.source]
            //stop at first find since we are not going to implement compound results from joins for now
            let candidate = joinTable.find(joinRow => row[leftColumn] == joinRow[rightColumn])

            if(candidate){
                Object.assign(row, candidate)
            }
            else{
                this.table.splice(index, 1)
            }
        })
    }

    _filter(mutateOriginal=true) {
        let conditions = this.conditions.conditions;
        //conditions = conditions.split(/(?<=^([^"]|"[^"]*")*)(and|or)/)
        conditions = conditions.split(/and|or/)

        let logicalOperators = this.conditions.logicalOperators;

        let filtered = this.table.filter(row => {
            //lets be optimistic initially 
            let passed = true 
            for(let i = 0; i < conditions.length; i++){
                // x > y => [x, >, y]
                let tokenized = conditions[i].split(/<|>|=|!/)

                let left = tokenized[0], right = tokenized[1] 
                let operator = conditions[i].replace(left, '').replace(right, '')
                let currentPassed = conditionMap[operator](row[left], right)

                //break early if currentPassed = false and the next logical operator is an 'and'
                if(!currentPassed && logicalOperators[i] != 'or'){
                    passed = false 
                    break;
                }
            }

            return passed
        })
        //TODO: please find a solution to this sin
        if(mutateOriginal){
            this.table = filtered
        }
        else{
            return filtered
        }
    }

    select(cols) {
        this._fillTable()

        this.innerResult = this.table.map(row => {
            let selectedRow = cols.reduce((selectedRow, current) => {
                selectedRow[current] = row[current]
                return selectedRow
            }, {})

            return selectedRow
        })
    }

    insert(newRows) {
        this._fillTable()

        let {columns, values} = newRows, row = {}
        for(let i = 0; i < columns.length; i++){
            row[columns[i]] = values[i]
        }

        this.table.push(row)

        this.commit()

        this.innerResult = true
    }

    update(units) {
        this._fillTable(false)

        let filtered = this._filter(false)

        filtered.forEach(row => {
            units.forEach(unit => {
                let key = Object.keys(unit)[0]
                row[key] = unit[key] 
            })
        })

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
    '>' : (left, right) => left > right,
    '<' : (left, right) => left < right,
    '=' : (left, right) => left == right,
    '!=' : (left, right) => left != right
}
