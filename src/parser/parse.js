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
                vars : operationVarsMap[token.type](token)
            })
    
        },
    'action' : (token, asts) => {
            asts.push({
                type : 'action',
                value: token.value,
                vars : operationVarsMap[token.type](token)
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
   }

export function parse(query) {
    let tokens = tokenize(query)

    //for now, no need to have an overall parent 'prog' type node
    //make array of asts which compose overall query
    let asts = []
    tokens.forEach((token) => {
        typeMap[token.type](token, asts)
    })
}
/*[
    {
        "type": "source",
        "value": "users",
        "operations": [
            { 
                "type": "where",
                "vars": [
                    "age > 30"
                ]
            },
            { 
                "type": "orderby",
                "vars": [
                    "last_name",
                    "asc"
                ]
            }
        ]
    },
    {
        "type": "action",
        "value": "select",
        "vars": {
            [ 
                first_name,
                last_name             
            ],
        }
    }
]
}*/
