const executeMap = {
    'source' : (ast, accumulatedResult) => {
            let source = []
            ast.operations.forEach(operation => {
                executeOperationSourceMap(operation.type)
            }

            return source
        },
    'action' : (token) => {
            type.value.split(',')
        }
   }

const executeOperationSourceMap = {
    'where' : (ast, accumulatedResult) => {


        } 
  }

const executeActionMap = {
    'select' : (ast, accumulatedResult) => {


        } 
  }

export function execute(asts, accumulatedResult = false) {
    for(let ast of asts){
        accumulatedResult = executeMap[ast.type](ast, accumulatedResult))
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
