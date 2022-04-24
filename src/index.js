var cron = require("node-cron");
const { allCommands } = require("./queries"); // List of commands
const { connection, recentCrons, sequelize } = require("./db");

(async() => {
    // await connection()
    allCommands(); // cmd for get all commands

    var task = cron.schedule("*/3 * * * *", () => {
        console.log("running a task [All commands /Order] every two minutes ");
        allCommands(); // cmd for get all commands
    }, {
        scheduled: true
    });

    task.start();
})();