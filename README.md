# local-storage-sql
local-storage-sql is a basic SQL implementation using browser `localStorage` as a data store and javascript as a query executor and implementor. Most basic versions of query constructs are supported including `SELECT, INSERT, UPDATE, DELETE` as well as source operation contructs `JOIN` and `WHERE`. Data persistence and limits are driven by browser implementations of `localStoarage` and are 5 MB in most cases.

####Example Usage

```
<script src="dist/local-storage-sql.js"></script>
<script>
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
