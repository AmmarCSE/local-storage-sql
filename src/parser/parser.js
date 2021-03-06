import tokenize from '../parser/lexer'
import {dejuxtapose} from '../utils/utils'

export default function parse(query) {
    let tokens = tokenize(query)

    //for now, no need to have an overall parent 'prog' type node
    //make array of asts which compose overall query
    let asts = []
    tokens.forEach((token) => {
        typeMap[token.type](token, asts)
    })

    return asts
}

//use maps to facilitate data-driven approach and avoid swith-case statements
const typeMap = {
    'source' : (token, asts) => {
            asts.push({
                type : 'source',
                value: token.value,
                operations: []
            })
        },
    'source-operation' : (token, asts) => {
            let ast = asts[asts.length - 1]
            ast.operations.push({
                type : token.type,
                value: token.keyword,
                vars : varsMap[token.keyword](token)
            })
        },
    'action' : (token, asts) => {
            asts.push({
                type : 'action',
                value: token.keyword,
                vars : varsMap[token.keyword](token)
            })
        },
    'result-operation' : (token, asts) => {
            asts.push({
                type : token.type,
                value: token.keyword,
                vars : varsMap[token.keyword](token)
            })
        },
    }

//simplify by combining both source and action 'vars' map
const varsMap = {
    'where' : (token) => {
            //separate conditions from operands
            let sifted = dejuxtapose(token.value)

            return {
                conditions : sifted.blacks,
                logicalOperators : sifted.whites
            }
        },
    'order by' : (token) => token.value,
    //do basic joins for now in which the only predicate operator is =
    //and predicate columns must be 'namespaced'
    'join' : (token) => {
            let matches = token.value.match(/([\w]+) ON ([.\w]+)=([.\w]+)/i)
            let leftPredicate = matches[2].split('.'), rightPredicate = matches[3].split('.')
            let predicate = [leftPredicate, rightPredicate].reduce((predicate, current) =>{
                predicate[current[0]] = current[1]
                return predicate
            }, {})

            return {
                source: matches[1],
                predicate 
           }
        },
    'limit' : (token) => {
            let splat = token.value.split(',')

            return {
                skip: +splat[0],
                take: +splat[1]
           }
        },
    'select' : token => token.value.split(','),
    'insert into' : (token) => {
            let columns = token.value.match(/\(([, \w]+)\)/)[1].split(',')
            let values = token.value.match(/VALUES\((.+)\)/i)[1].split(',')

            columns = columns.map(column => column.trim())
            //remove quotes for VALUES("jack",...
            values = values.map(value => deQuote(value))

            return {
                columns,
                values
            }
        },
    'update' : (token) => {
            //col1=val1,col2=val2 => [{col1:val1},{col2:val2}]
            let units = token.value
                .split(',')
                .map(unit => { 
                    let keyValuePairParts = unit.split('=')
                    return { [keyValuePairParts[0]] : deQuote(keyValuePairParts[1]) }
                })
    
            return {
                units
            }
        },
    'delete' : (token) => {
            return null
        },
    'distinct' : (token) => {
            return null
        }

   }

function deQuote(input){
    return input.replace(/['"]/g, '')
}
