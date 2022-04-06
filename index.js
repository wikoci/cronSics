require('dotenv').config()
global._ = require("lodash");
global.chalk = require("chalk");
global.log = require('consola')
const express = require('express');
const app = express();


require("./src") // Entry App



app.listen(process.env.PORT, () => {
    log.success(chalk.green("Cron Sics is running on port : ") + process.env.PORT)
})