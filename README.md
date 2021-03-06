# local-storage-sql
`local-storage-sql` is a basic SQL implementation using browser `localStorage` as a data store and javascript as a query parser and implementer. Most basic versions of query constructs are supported including `SELECT, INSERT, UPDATE, DELETE` as well as source operation contructs `JOIN` and `WHERE`. Data persistence and limits are limited by browser implementations of `localStoarage` and are 5 MB in most cases.

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

Inspiration
--------------
This plugin is not meant to be used in production environments and was built primarily to scratch an itch. This plugin can be useful in demos or prototypes where a quick data store needs to be simulated in the browser. `local-storage-sql` is a great compliment to [browser-endpoints](https://github.com/AmmarCSE/browser-endpoints) and both can be used to simulate a virtual server and database server on a web-page, no extra plugins or technologies needed.
