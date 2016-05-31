export default function tokenize(input){
    let tokens = []
    
    //first, lets get the data source
    extractTokens('source', input.match(/(FROM|INSERT INTO|UPDATE) ([\w]+)/i), tokens)

    //check if there are any source operations (where, order by, limit, etc...)
    extractTokens('source-operation', input.match(/(JOIN) ([\w]+ ON [\w]+ = [\w]+)|(WHERE) ([\w]+)/i), tokens)

    //now do any actions (select, insert, delete, update)
    extractTokens('action', input.match(actionRegexMap[tokens[0].keyword]), tokens)
    //extractTokens('action', input.match(/(SELECT) ([\w]+)|(SELECT|INSERT|DELETE|UPDATE) ([\w]+)/i))

    //return implicitly ordered tokens
    return tokens
}

//use regex by action to avoid one big /..exp..|..exp..|...../
const actionRegexMap = {
    'from' : /(SELECT) ([\w]+)/i,
    'insert into' : /(INSERT INTO) [\w]+ (\([, \w]+\) VALUES\([", \w]+\))/i
}

//make compound tokens with operator(keyword) -> operand(value) differentiating
function extractTokens(type, matches, tokens){
    matches && tokens.push({type: type, keyword: matches[1].toLowerCase(), value: matches[2]}) 
}
