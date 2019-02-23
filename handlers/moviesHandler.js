const Joi = require('joi')
const plugin = {
    name:'moviesHandler',
    version: '1.0.0',
    register: (server,options)=>{
        server.route([

            {
                method: 'GET',
                path: '/movie',
                handler: getAll
                
            },
            {
                method: 'GET',
                path: '/movie/{title}',
                handler: getByTitle,
                // validate:{

                //     payload: {
                //         username: Joi.string().min(3).max(30).require(),
                //         password: Joi.string().min(3).max(50).require()
                //     }

                // }
            }

        ])

    }
}

async function getAll(req,h) {
    return await h.act({role:'movies',cmd:'getAll'})
}

async function getByTitle(req,h) {
    const payload = {args: req.params}
    return await h.act({role:'movies',cmd:'getByTitle'},payload)
}

async function auth(req,h) {
    const payload = {args: req.payload}
    
    
}

module.exports = plugin