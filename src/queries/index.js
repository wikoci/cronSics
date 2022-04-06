const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const moment = require("moment");

function allCommands() {

    console.log("Fetch commands");
    prisma.f_DOCLIGNE.findMany({
        where: {
            cbModification: {
                gte: moment().subtract(1, 'days').toISOString()
            },
            DO_Type: { in: [1, 3]
            },
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