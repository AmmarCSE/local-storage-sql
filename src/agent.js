import processQuery from 'implementor/operator'
import {store} from 'implementor/store'

function storeIsEmpty(){
    return store.isEmpty()
}

function query(query){
    return processQuery(query)
}

function clear(){
    store.clear()
}

export default function browserSqlAgent() {
        return {
            storeIsEmpty,
            query,
            clear
        }
    }
