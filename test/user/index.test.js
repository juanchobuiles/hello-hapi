const chai = require('chai')
chai.use(require('chai-http'))
const {expect} = chai
const URL = 'http://localhost:8080'
const enviromment={
    auth: {
        username: 'juanchobuiles',
        password: '123'
    },
    token: ''
}

describe('User', function(){
    describe('POST /auth', function(){
        it('Los usuarios invalidos no pueden obtener un Token', function(done){
            chai.request(URL)
                .post('/auth')
                .send({...enviromment.auth , ...{password:'abc'}})
                .end((err,res)=>{
                    if(err) return done(err)
                    expect(res).to.have.status(401)
                    expect(res.body).to.not.have.property('token')
                    expect(res.body.token).to.be.undefined
                    done()
                })
        })

        it('Los usuario puede autenticarse y obtener un Token', function(done){
            chai.request(URL)
                .post('/auth')
                .send({...enviromment.auth })
                .end((err,res)=>{
                    if(err) return done(err)
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('token')
                    expect(res.body.token).to.not.be.undefined
                    enviromment.token = `Bearer ${res.body.token}`
                    done()
                })
        })
    })

    describe('GET /user', function(){
        it('el endpoint esta protegido mediante JWT',function(done){
            chai.request(URL)
                .get('/user')
                .end((err,res)=>{
                    if(err) return done(err)
                    expect(res).to.have.status(401)
                    done()
                })
        })
        it('Obtiene todos los usuarios cuando se envia el token JWT',function(done){
            chai.request(URL)
                .get('/user')
                .set('Authorization',enviromment.token)
                .end((err,res)=>{
                    if(err) return done(err)
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('arry').that.is.not.empty
                    done()
                })
        })

    })
})