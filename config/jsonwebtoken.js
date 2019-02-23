const secretOrPrivateKey = 'juanchobuies.com'

module.exports = {
    secretOrPrivateKey,
    validate: async (request, payload, h)=>{
        let credentials = {}
        if(payload.email){
            credentials.email = payload.email
            return {
                isValid: true,
                credentials
            }
        }
        return {isValid: false,
            credentials
        }

    }
}