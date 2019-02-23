let seneca;
const plugin = {
    name: 'seneca',
    version: '1.0.0',
    register: (server,options) => {
        const {options: config ,clients} = options
        seneca = require('seneca')(config)
        clients.forEach(client => seneca.client(client));
        // seneca.clients.client({host:'localhost', port:3000,pin:'role:movies'})
        server.decorate('toolkit','act',act)
    }
}

function act(...args) {
    return new Promise((resolve,reject)=>{
        seneca.act(...args,(err,result)=>{
            if(err) reject(err)
            else resolve(result)
        })
    })
}

module.exports = plugin