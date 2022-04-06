const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const moment = require("moment");
const fs = require("fs");

async function getDate() {

    return new Promise(async(resolve, reject) => {
        try {

            var lastCron = fs.readFileSync(__dirname + "/lastCron.json");
            console.log(lastCron);
            resolve(lastCron)
        } catch (err) {
            reject(null)
        }

    })
}

async function setDate(rws) { // set last BC datetime

    return new Promise(async(resolve, reject) => {
        try {

            if (rws.length && rws[0].cbModification) {
                var jsonText = {
                    cbModification: rws[0].cbModification || null,
                };
                fs.writeFileSync(
                    __dirname + "/lastCron.json",
                    JSON.stringify(jsonText)
                );

                return resolve();
            }

            return null

        } catch (err) {

            return reject(err)
        }


    })


}



async function allCommands() {



    var lastCron = await getDate().then(e => e).catch(err => null) // Initialized start date in ./src/queries/lastCron.json

    console.log(lastCron)



    prisma.f_DOCLIGNE
        .findMany({
            orderBy: {
                cbModification: "desc",
            },
            where: {
                cbModification: {
                    gte: moment().subtract(1, "days").toISOString(),
                },
                DO_Type: { in: [1, 3] },
            },
            select: {
                CT_Num: true, // Code client
                cbModification: true, // Date de modification et date de mise à jour
                DO_Ref: true, //
                DO_Piece: true, //Code du BL - ID 1
                AR_Ref: true, // Code article,
                DL_Qte: true, // Quantité article
                DL_Ligne: true, // Ligne - ID 2
                DL_PoidsNet: true, //Poids
                DL_MontantHT: true, //
                DL_MontantTTC: true, //
                DL_Design: true, //
            },
        })
        .then((e) => {

            setDate(e)

        })
        .catch((err) => {
            console.log(err);
        });

}

module.exports = {
    allCommands: allCommands
}