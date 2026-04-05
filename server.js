require('dotenv').config();

const app = require('./src/app.js');
const PORT = process.env.PORT || 3000;
const connectDB = require("./config/db");

connectDB();

//app is listening on the specified port.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});