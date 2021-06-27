const express = require("express");
const app = express();
const userRoute = require("./src/routes/user.route");

app.use(express.json());


app.use(express.urlencoded({ extended: true }));

const db = require("./src/models");

db.sequelize.sync();


app.use('/user', userRoute)


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});