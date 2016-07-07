export default function tokenize(input){
    let tokens = []

    input = cleanse(input)
    
    //first, lets get the data source
    extractTokens('source', input.match(/(DELETE FROM|FROM|INSERT INTO|UPDATE) ([\w]+)/i), tokens)

    //check if there are any source operations (where, order by, limit, etc...)
    let cloned = input
    let joinExp = /(JOIN) ([\w]+ ON [.\w]+=[.\w]+)/i
    while(joinExp.test(cloned)){
        extractTokens('source-operation', cloned.match(joinExp), tokens)
        cloned = cloned.replace(joinExp, '')
    }

    extractTokens('source-operation', input.match(/(WHERE) (([.\w]+(<|>|=|!=|<=|>=)[.\w]+(?: and | or )?)*)/i), tokens)

    //now do any actions (select, insert, delete, update)
    extractTokens('action', input.match(actionRegexMap[tokens[0].keyword]), tokens)

    extractTokens('result-operation', input.match(/(LIMIT) (\d+,\d+)/i), tokens)
    extractTokens('result-operation', input.match(/SELECT ((DISTINCT)) [\w,]+/i), tokens)
    extractTokens('result-operation', input.match(/(ORDER BY) ([\w]+)/i), tokens)

    //return implicitly ordered tokens
    return tokens
}

//use regex by action to avoid one big /..exp..|..exp..|...../
const actionRegexMap = {
    'from' : /(SELECT)(?: DISTINCT)? ([\w,]+)/i,
    'delete from' : /(DELETE)/i,
    'insert into' : /(INSERT INTO) [\w]+ (\([, \w]+\) VALUES\(.+\))/i,
    'update' : /(UPDATE) [\w]+(?: JOIN [\w]+ ON [.\w]+=[.\w]+)* SET ([\w]+=\S+)+/i
}

//cleanse by performing unobtrusive operations that will make lexing easier
function cleanse(input){
    input = input
        .replace(/ ?(,|=|>|<|>=|<=|!=) ?/g, '$1')
        .replace(/[ ]+/g, ' ')
        //.replace(/['"]/g, '')

    return input
}

//make compound tokens with operator(keyword) -> operand(value) differentiating
function extractTokens(type, matches, tokens){
    matches && tokens.push({type, keyword: matches[1].toLowerCase(), value: matches[2]}) 
}

