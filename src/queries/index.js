const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const moment = require("moment");
const fetch = require("node-fetch")

const fs = require("fs");
const { conforms } = require("lodash");



async function deployToServer(items) {

    if (!items.length) return;

    return new Promise(async(resolve, reject) => {


        var response = await fetch("https://api.savoo.com/automates/sics", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    items: items || [],
                }),
            })
            .then((e) => e.json())
            .then((e) => e)
            .catch((err) => reject(err));


        console.log(response);

        if (response) {

            resolve()

        } else {

            reject(response);
        }


    })
}

async function getDate() {

    return new Promise(async(resolve, reject) => {
        try {

            var lastCron = fs.readFileSync(__dirname + "/lastCron.json", "utf8");
            lastCron = JSON.parse(lastCron)
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





    var Cron_ = await getDate().then(e => e).catch(err => null) // Initialized start date in ./src/queries/lastCron.json

    try {
        if (!Cron_.cbModification) {
            log.error(":::: cbModification must be define in ./src/queries/lastCron.json :::")
            return false
        }
    } catch (err) {
        log.error(
            "::: cbModification must be define in ./src/queries/lastCron.json :::"
        );
        return false

    }

    console.log(chalk.green('Latest cron did on ' + Cron_.cbModification))

    prisma.f_DOCLIGNE
      .findMany({
        orderBy: {
          cbModification: "desc",
        },
        where: {
          cbModification: {
            gt: Cron_.cbModification,
          },
          DO_Type: { in: [3] },
          CO_No: {
            gte: 42,
            notIn: [46, 47],
          },
        },
        select: {
          CO_No: true, //
          CT_Num: true, // Code client
          cbModification: true, // Date de modification et date de mise à jour
          DO_Ref: true, // Code du BL - ID 1
          DO_Piece: true, //
          AR_Ref: true, // Code article,
          DL_Qte: true, // Quantité article
          DL_Ligne: true, // Ligne - ID 2
          DL_PoidsNet: true, //Poids
          DL_MontantHT: true, //
            DL_MontantTTC: true, //
          DL_PUTTC: true, // Prix unitaire
          DL_Design: true, // Nom de l'article
          Calcul_Poids: true, //
        },
      })
      .then(async (e) => {
        console.log(`\nThere are/is ${e.length} item(s) to push  \n`);
          await deployToServer(e).then(() => {

               setDate(e);
            
        }).catch();
       
      })
      .catch((err) => {
        console.log(err);
      });

}

module.exports = {
    allCommands: allCommands
}