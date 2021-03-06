import dejuxtapose from 'utils/utils'
import {store} from 'implementor/store'

export default class {
    constructor() {
    }

    //implement a 'deferred' methodology where data operations are executed at the very last step
    //therefore, 'set' your operations(setSource, setJoin, setFilter,....) beforehand
    setSource(sourceName) {
        this.source = sourceName
    }

    setJoin(predicate) {
        this.joinPredicates = this.joinPredicates || []
        this.joinPredicates.push(predicate) 
    }

    setFilter(conditions) {
        this.conditions = conditions
    }

    //use psuedo private methods via _ for now since there is no official es6 way of doing it
    _fillTable(process = false) {
        //defualt to empty array if table is not found since we do not support(yet) CREATE TABLE statements
        this.table = JSON.parse(store.getItem(this.source)) || []

        //process=false indicates that raw, unfiltered table is desired
        if(process){
            this._processTable()
        }
    }

    _processTable() {
        this.joinPredicates && this.joinPredicates.length && this._join()
        this.conditions && this._filter()
    }

    _join() { 
        this.joinPredicates.forEach(joinPredicate => {
            let joinTable = JSON.parse(store.getItem(joinPredicate.source)) || []
            
            this.table = this.table.reduce((aggregated, current) => {
                let predicate = joinPredicate.predicate
                let leftColumn = predicate[this.source], rightColumn = predicate[joinPredicate.source]

                let candidates = 
                    joinTable
                        .filter(joinRow => current[leftColumn] == joinRow[rightColumn])
                        .map(joinRow => Object.assign({}, current, joinRow))

                return aggregated.concat(candidates)
            }, [])
        })
    }

    _filter(mutateOriginal=true) {
        let conditions = this.conditions.conditions;
        //conditions = conditions.split(/(?<=^([^"]|"[^"]*")*)(and|or)/)
        conditions = conditions.split(/ and | or /)

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
        this._fillTable(true)
        this.innerResult = this.table.map(row => {
            let selectedRow = cols.reduce((selectedRow, current) => {
                selectedRow[current] = row[current]
                return selectedRow
            }, {})

            return selectedRow
        })
    }

    uniqueify() {
        let serialized = this.innerResult.map(row => JSON.stringify(row))
        this.innerResult = 
            serialized
                .filter((serializedRow, index) => serialized.indexOf(serializedRow) == index)
                .map(serializedRow => JSON.parse(serializedRow))
    }

    limit(limit) {
        const { skip, take } = limit
        let targetIndices = []
        for(let i = skip; i < skip + take; i++){
            targetIndices.push(i)
        }

        this.innerResult = this.innerResult.filter((row, index) => ~targetIndices.indexOf(index))
    }

    orderby(orderby) {
        this.innerResult = this.innerResult.sort((a, b) => {
            if(a[orderby] < b[orderby]) return -1;
            if(a[orderby] > b[orderby]) return 1;

            return 0;
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

        this.innerResult = row
    }

    update(units) {
        this._fillTable()

        this.joinPredicates && this.joinPredicates.length && this._join()

        let filtered = this._filter(false)

        filtered.forEach(row => {
            units.forEach(unit => {
                let key = Object.keys(unit)[0]
                row[key] = unit[key] 
            })
        })

        this.commit()

        this.innerResult = filtered 
    }

    //the way this is done disgusts me and makes me want to redo the whole architecture :-(
    delete() {
        this._fillTable()
        let filteredSerialized = this._filter(false).map(filteredRow => JSON.stringify(filteredRow))

        this.table = this.table.filter(row => !~filteredSerialized.indexOf(JSON.stringify(row)))

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
