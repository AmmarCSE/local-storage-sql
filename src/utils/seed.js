import browserSqlAgent from 'agent'

export default function seed(){

    let agent = browserSqlAgent()
    if(agent.storeIsEmpty()){
        const querys = [
            'INSERT INTO categories (category_id, category_name) VALUES(1, "Sporting Goods")',
            'INSERT INTO categories (category_id, category_name) VALUES(2, "Electronics")',
            'INSERT INTO categories (category_id, category_name) VALUES(3, "Food")',

            'INSERT INTO brands (brand_id, brand_name) VALUES(1, "Apple")',
            'INSERT INTO brands (brand_id, brand_name) VALUES(2, "Google")',
            'INSERT INTO brands (brand_id, brand_name) VALUES(3, "Microsoft")',
            'INSERT INTO brands (brand_id, brand_name) VALUES(4, "Spalding")',
            'INSERT INTO brands (brand_id, brand_name) VALUES(5, "Wilson")',
            'INSERT INTO brands (brand_id, brand_name) VALUES(6, "Nestle")',

            'INSERT INTO suppliers (supplier_id, supplier_name) VALUES(1, "Best Buy")',
            'INSERT INTO suppliers (supplier_id, supplier_name) VALUES(2, "Dicks Sporting Goods")',
            'INSERT INTO suppliers (supplier_id, supplier_name) VALUES(3, "Walmart")',

            'INSERT INTO products (product_id, category_id, brand_id, supplier_id, name, quantity, price) VALUES(1, 1, 5, 2, "Football", 39, "$49.99")',
            'INSERT INTO products (product_id, category_id, brand_id, supplier_id, name, quantity, price) VALUES(2, 1, 4, 2, "BaseBall", 15, "$9.99")',
            'INSERT INTO products (product_id, category_id, brand_id, supplier_id, name, quantity, price) VALUES(3, 1, 4, 3, "Basketball", 2, "$29.99")',
            'INSERT INTO products (product_id, category_id, brand_id, supplier_id, name, quantity, price) VALUES(4, 2, 1, 1, "iPod Touch", 33, "$99.99")',
            'INSERT INTO products (product_id, category_id, brand_id, supplier_id, name, quantity, price) VALUES(5, 2, 1, 1, "iPhone 5", 12, "$399.99")',

            'INSERT INTO products (product_id, category_id, brand_id, supplier_id, name, quantity, price) VALUES(6, 2, 2, 3, "Nexus 7", 34, "$199.99")',
            'INSERT INTO products (product_id, category_id, brand_id, supplier_id, name, quantity, price) VALUES(7, 2, 1, 1, "iPod Mini", 3, "$99.99")',
            'INSERT INTO products (product_id, category_id, brand_id, supplier_id, name, quantity, price) VALUES(8, 2, 1, 3, "iPhone 3", 13, "$299.99")',
            'INSERT INTO products (product_id, category_id, brand_id, supplier_id, name, quantity, price) VALUES(9, 1, 4, 2, "Foosball Table", 9, "$449.99")',
            'INSERT INTO products (product_id, category_id, brand_id, supplier_id, name, quantity, price) VALUES(10, 1, 4, 2, "Golf Balls", 25, "$29.99")',

            'INSERT INTO products (product_id, category_id, brand_id, supplier_id, name, quantity, price) VALUES(11, 1, 4, 3, "Cricket", 2, "$59.99")',
            'INSERT INTO products (product_id, category_id, brand_id, supplier_id, name, quantity, price) VALUES(12, 2, 3, 1, "Zune", 24, "$99.99")',
            'INSERT INTO products (product_id, category_id, brand_id, supplier_id, name, quantity, price) VALUES(13, 3, 6, 3, "Twix", 49, "$0.99")',
            'INSERT INTO products (product_id, category_id, brand_id, supplier_id, name, quantity, price) VALUES(14, 3, 6, 3, "Hersheys", 49, "$0.99")',
            'INSERT INTO products (product_id, category_id, brand_id, supplier_id, name, quantity, price) VALUES(15, 1, 5, 2, "Diving Board", 2, "$249.99")',

            'INSERT INTO products (product_id, category_id, brand_id, supplier_id, name, quantity, price) VALUES(16, 1, 5, 2, "Bike", 5, "$199.99")',
            'INSERT INTO products (product_id, category_id, brand_id, supplier_id, name, quantity, price) VALUES(17, 3, 6, 3, "Oreo", 200, "$1.99")',
            'INSERT INTO products (product_id, category_id, brand_id, supplier_id, name, quantity, price) VALUES(18, 2, 1, 1, "iMac", 4, "$999.99")',
            'INSERT INTO products (product_id, category_id, brand_id, supplier_id, name, quantity, price) VALUES(19, 1, 4, 2, "Tennis Balls", 5, "$9.99")',
            'INSERT INTO products (product_id, category_id, brand_id, supplier_id, name, quantity, price) VALUES(20, 2, 3, 1, "Gateway", 4, "$899.99")',

            'INSERT INTO products (product_id, category_id, brand_id, supplier_id, name, quantity, price) VALUES(21, 3, 6, 3, "M&Ms", 100, "$1.59")',
            'INSERT INTO products (product_id, category_id, brand_id, supplier_id, name, quantity, price) VALUES(22, 2, 1, 1, "iPad", 15, "$799.99")',
            'INSERT INTO products (product_id, category_id, brand_id, supplier_id, name, quantity, price) VALUES(23, 1, 4, 2, "Ping Pong Balls", 55, "$9.99")',

            'SELECT DISTINCT category_id, category_name FROM categories JOIN products ON products.category_id = categories.category_id ORDER BY category_name'
            //'SELECT DISTINCT supplier_id, supplier_name FROM suppliers JOIN products ON suppliers.supplier_id = products.supplier_id WHERE category_id = 3'
        ]
        querys.forEach(query => console.log(agent.query(query)))
    }
}
