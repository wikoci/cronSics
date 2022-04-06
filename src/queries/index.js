const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function allCommands() {
    prisma.commandes
        .findMany()
        .then((e) => {
            log.info("Resultat ", e);
        })
        .catch((err) => {
            console.log(err);
        });

}

module.exports = {
    allCommands: allCommands
}