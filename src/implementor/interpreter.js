import TableAdapter from 'implementor/implementor'

//evaluate, execute similar terms, yet completely different meanings
//not going to waste time on naming this one
export default function evaluate(asts) {
    tableAdapter = new TableAdapter()

    //do operations successively since our asts are in the correct order
    for(let ast of asts){
        evaluateMap[ast.type](ast)
    }

    return tableAdapter.result 
}

let tableAdapter

const evaluateMap = {
    //do both source and source operations in same parent iteration
    'source' : (ast) => {
            tableAdapter.setSource(ast.value)
            ast.operations.forEach(operation => {
                evaluateOperationMap[operation.value](operation)
            })
        },
    'action' : (ast) => {
            evaluateActionMap[ast.value](ast)
        },
    'result-operation' : (ast) => {
            evaluateOperationMap[ast.value](ast)
        }
   }

const evaluateOperationMap = {
    'where' : (ast) => {
            tableAdapter.setFilter(ast.vars)
        },
    'join' : (ast) => {
            tableAdapter.setJoin(ast.vars)
        }, 
    'limit' : (ast) => {
            tableAdapter.limit(ast.vars)
        },
    'distinct' : (ast) => {
            tableAdapter.uniqueify()
        },
    'order by' : (ast) => {
            tableAdapter.orderby(ast.vars)
        }
  }

const evaluateActionMap = {
    'select' : (ast) => {
        tableAdapter.select(ast.vars)
      },
    'insert into' : (ast) => {
        tableAdapter.insert(ast.vars)
      },
    'update' : (ast) => {
        tableAdapter.update(ast.vars.units)
      },
    'delete' : (ast) => {
        tableAdapter.delete()
      }

  }
