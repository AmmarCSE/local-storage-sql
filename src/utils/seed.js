import {agent} from 'agent'

export default function seed(){
    const querys = [
        'INSERT INTO users (first_name, last_name, age, sex) VALUES("Jack", "Black", 25, "Male")',
        'INSERT INTO users (first_name, last_name, age, sex) VALUES("Even", "Steven", 40, "Male")',
        'INSERT INTO users (first_name, last_name, age, sex) VALUES("Sandy", "Randy", 37, "Female")',
        'INSERT INTO users (first_name, last_name, age, sex) VALUES("Jane", "Smith", 35, "Female")',
        'INSERT INTO users (first_name, last_name, age, sex) VALUES("Bob", "Dole", 21, "Male")',
        'INSERT INTO users (first_name, last_name, age, sex) VALUES("Becky", "Anderson", 50, "Female")'
    ]

    querys.forEach(query => agent.query(query))
}
