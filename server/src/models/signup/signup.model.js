const userScehma = require('./signup.mongo')

async function saveUser ( userName, email, password, country, city, phone ) {
    const user = {
        userName, 
        email, 
        password, 
        country, 
        city, 
        phone 
    }
    // console.log(user)
    try{        
        const response = await userScehma.findOne({email,},{password:1})
        
        if(response==null){
            const { acknowledged, matchedCount } = await userScehma.updateOne({email,},user,{upsert:true})
            return {ok: true, acknowledged, matchedCount }
        }
        return {ok:false}
    }
    catch ( error ) {
        throw new Error ( `Cannot add new User ${error.message}` )
    }
    
}


module.exports = {
    saveUser,
}
