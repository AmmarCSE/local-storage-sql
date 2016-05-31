import browserSqlAgent from 'agent'

export default function seed(){
    const querys = [
        'INSERT INTO categories (category_id, category_name) VALUES(1, "Sporting Good")',
        'INSERT INTO categories (category_id, category_name) VALUES(2, "Electronics")',
        'INSERT INTO products (product_id, category_id, name, stocked, price) VALUES(1, 1, "Football", true, "$49.99")',
        'INSERT INTO products (product_id, category_id, name, stocked, price) VALUES(2, 1, "BaseBall", true, "$9.99")',
        'INSERT INTO products (product_id, category_id, name, stocked, price) VALUES(3, 1, "Basketball", false, "$29.99")',
        'INSERT INTO products (product_id, category_id, name, stocked, price) VALUES(4, 2, "iPod Touch", true, "$99.99")',
        'INSERT INTO products (product_id, category_id, name, stocked, price) VALUES(5, 2, "iPhone 5", false, "$399.99")',
        'INSERT INTO products (product_id, category_id, name, stocked, price) VALUES(6, 2, "Nexus 7", true, "$199.99")',
    ]

    let agent = browserSqlAgent()
    agent.clear()
    querys.forEach(query => agent.query(query))
}
