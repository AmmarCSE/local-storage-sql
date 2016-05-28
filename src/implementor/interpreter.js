import * as implementor from 'implementor/implementor'

//evaluate, execute similar terms, yet completely different meanings
//not going to waste time on naming this one
export default function evaluate(asts) {
    accumulatedResult = false
    source = ''
    //accumulate results successively since our asts are in the correct order
    for(let ast of asts){
        evaluateMap[ast.type](ast, accumulatedResult)
    }

    return accumulatedResult
}

let accumulatedResult = false, source = ''

const evaluateMap = {
    //do both source and source operations in same parent iteration
    'source' : (ast) => {
            source = ast.value
            accumulatedResult = implementor.retrieve(source)
            ast.operations.forEach(operation => {
                evaluateOperationSourceMap[operation.type](operation)
            })
        },
    'action' : (ast) => {
            evaluateActionMap[ast.value](ast)
        }
   }

const evaluateOperationSourceMap = {
    'where' : (ast) => {
            implementor.filter(ast.vars, accumulatedResult)
        } 
  }

const evaluateActionMap = {
    'select' : (ast) => {
        implementor.select(ast.vars, accumulatedResult)
      },
    'insert into' : (ast) => {
        implementor.insert(ast.vars, source)
      }
  }
