import tokenize from '../parser/lexer'

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
                vars : varsMap[token.keyword](token)
            })
    
        },
    'action' : (token, asts) => {
            asts.push({
                type : 'action',
                value: token.keyword,
                vars : varsMap[token.keyword](token)
            })
        }
    }

//simplify by combining both source and action 'vars' map
const varsMap = {
    'where' : (token) => {
            [type.value]
        },
    'select' : (token) => {
            type.value.split(',')
        },
    'insert into' : (token) => {
            let columns = token.value.match(/\(([, \w]+)\)/)[1].split(',')
            let values = token.value.match(/VALUES\(([", \w]+)\)/i)[1].split(',')

            columns = columns.map(column => column.trim())
            //remove quotes for VALUES("jack",...
            values = values.map(value => value.replace(/['"]/g, '').trim())

            return {
                columns,
                values
            }
        }
   }

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
