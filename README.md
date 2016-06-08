# local-storage-sql
local-storage-sql is a basic SQL implementation using browser `localStorage` as a data store and javascript as a query executor and implementor. Most basic versions of query constructs are supported including `SELECT, INSERT, UPDATE, DELETE` as well as source operation contructs `JOIN` and `WHERE`. Data persistence and limits are limited by browser implementations of `localStoarage` and are 5 MB in most cases.

Getting Set Up
--------------


1 - Include a script reference to the bundled javascript file found in `dist`:
```    
<script src="dist/local-storage-sql.js"></script>
```


2 - Use the exposed `browserSqlAgent` object to execute queries:
```     
var sqlAgent = browserSqlAgent();
var data = 
  sqlAgent.query('SELECT product_id, category_name, name, stocked, price FROM products JOIN categories ON products.category_id = categories.category_id');
/*
data => 
[
  {
    product_id: 1, 
    category_name: 'Electronics', 
    name: 'iPhone', 
    stocked: false, 
    price: '$399'
  }, 
  {....
]
*/     
```
