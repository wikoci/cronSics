const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: __dirname + "/db.sqlite",
});

const Crons = sequelize.define("Crons", {
    libelle: DataTypes.STRING,
    task_date: DataTypes.DATE,

}, {
    timestamps: true
});

async function connection() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });
        log.success("Connection has been established successfully.");
    } catch (error) {
        log.error("Unable to connect to the database:", error);
    }
}

module.exports = {
    recentCrons: Crons,
    connection,
    sequelize
}