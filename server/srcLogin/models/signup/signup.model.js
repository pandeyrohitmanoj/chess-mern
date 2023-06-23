const userScehma = require('./signup.mongo')

async function saveUser ( userName, email, password ) {
    const user = {
        userName, 
        email, 
        password
    }
    try{
        const { acknowledged, modifiedCount} = await userScehma.updateOne({ userName }, user, { upsert: true} )
        return {ok: true, acknowledged, modifiedCount}
    }
    catch ( error ) {
        throw new Error ( "Cannot add new Use " )
    }
    return
}


module.exports = {
    saveUser,
}
