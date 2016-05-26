//very simple 'two-step' lexer
let tokens = []

//push two-steps as separate tokens
function extractTokens(matches){
    tokens.push({type: 'keyword', value: matches[1]}) 
    tokens.push({type: 'acquire', value: matches[2]}) 
}

export default function lexer(input){
    
    //first, lets get the data source
    extractTokens(input.match(/(FROM|INTO|UPDATE) ([\w]+)/i))

    //check if there are any source operations (where, order by, limit, etc...)
    extractTokens(input.match(/(WHERE) ([\w]+)/i))

    //now do any actions (select, insert, delete, update)
    extractTokens(input.match(/(SELECT|INSERT|DELETE|UPDATE) ([\w]+)/i))

    return tokens
}
