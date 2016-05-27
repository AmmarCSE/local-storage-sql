//separate array into 'every other' or 'white' and 'black' stripes
export function dejuxtapose(array){
    let whites = []
    for(let i = 1; i < array.length; i+=2){
        whites.push(array[i])
    }

    return {
        whites,
        blacks : array
    }
}
