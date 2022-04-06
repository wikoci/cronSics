const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const moment = require("moment");

function allCommands() {

    console.log("Fetch commands");
    prisma.f_DOCLIGNE.findMany({
        where: {
            cbModification: {
                gte: moment().subtract(1, 'days').toISOString()
            }

        }

    }).then(e => {

        console.log(e)
    }).catch(err => {

        console.log(err)
    })

}

module.exports = {
    allCommands: allCommands
}