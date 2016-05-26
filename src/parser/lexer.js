let tokens = []

//make compound tokens with operator(keyword) -> operand(value) differentiating
function extractTokens(type, matches){
    tokens.push({type: type, keyword: matches[1].toLowerCase(), value: matches[2]}) 
}

export default function tokenize(input){
    
    //first, lets get the data source
    extractTokens('source', input.match(/(FROM|INTO|UPDATE) ([\w]+)/i))

    //check if there are any source operations (where, order by, limit, etc...)
    extractTokens('source-operation', input.match(/(WHERE) ([\w]+)/i))

    //now do any actions (select, insert, delete, update)
    extractTokens('action', input.match(/(SELECT|INSERT|DELETE|UPDATE) ([\w]+)/i))

    //return implicitly ordered tokens
    return tokens
}
