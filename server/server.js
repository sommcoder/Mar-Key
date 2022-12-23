const express = require("express");
const app = express();
const PORT = 5000; // server is listening on PORT 5000
const pg = require("pg");

/*
 
Our PostgreSQL DB will store:
- letters, their size, their quantity in storage
- this gets passed to the client and the client can then manipulate this data
- they can also do a PUT request to update the quantities, should we add or lose marquee blocks


 
*/

// server is listening...
app.listen(PORT, () => console.log(`listening on PORT: ${PORT}`));
