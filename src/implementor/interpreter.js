import * from 'implementor'

const evaluateMap = {
    'source' : (ast, accumulatedResult) => {
            accumulatedResult = implementor.retrieve(ast.value)
            ast.operations.forEach(operation => {
                evaluateOperationSourceMap[operation.type](operation, accumulatedResult)
            }
        },
    'action' : (token) => {
            type.value.split(',')
        }
   }

const evaluateOperationSourceMap = {
    'where' : (ast, accumulatedResult) => {
            accumulatedResult = implementor.filter(ast.vars, accumulatedResult)
        } 
  }

const evaluateActionMap = {
    'select' : (ast, accumulatedResult) => {
        accumulatedResult = implementor.select(ast.vars, accumulatedResult)
  }

export function evaluate(asts, accumulatedResult = false) {
    for(let ast of asts){
        evaluateMap[ast.type](ast, accumulatedResult))
    }

    return accumulatedResult
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
