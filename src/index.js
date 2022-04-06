const { allCommands } = require("./queries"); // List of commands
const { connection, recentCrons, sequelize } = require("./db");


(async() => {


    await connection()
    allCommands(); // cmd for get all commands
})();