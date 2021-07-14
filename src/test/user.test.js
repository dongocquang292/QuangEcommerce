const app = require('../../server')
const userRoute = require("../routes/user.route");
app.use('/user', userRoute)
const request = require('supertest')

describe('Login', () => {
    it('Login', async () => {
        const res = await request(app)
            .post('/user/login').send({
                "email": "quangdo123@gmail.com",
                "password": "12345"
            })
            .set('Accept', 'Application/json')
            .expect(200)
    })

})

describe('Register', () => {
    it('Register', async () => {
        const res = await request(app)
            .post('/user/register').send({
                "username": "quang1334",
                "email": "tranHa12346@gmail.com",
                "password": "12345",
                "phonenumber": 123456789,
                "address": "Hanoi"
            })
            .set('Accept', 'Application/json')
            .expect(200)
    })
})

describe('getUser', () => {
    it('getUser', async () => {
        const res = await request(app)
            .get('/user/getAllUser')
            .set('Accept', 'Application/json')
            .expect(200)

    })
})

describe('getUserId', () => {
    it('getUserId', async () => {
        const res = await request(app)
            .get('/user/4')
            .set('Accept', 'Application/json')
            .expect(200)
    })
})

describe('updateUser', () => {
    it('updateUser', async () => {
        const res1 = await request(app)
            .post('/user/login').send({
                "email": "tranHa1234@gmail.com",
                "password": "12345"
            })
            .set('Accept', 'Application/json')
        const res2 = await request(app)

            .put('/user/4').send({
                "username": "do123",
                "email": "doquang123@gmamil.com",
                "password": "1234",
                "phonenumber": "1234454",
                "address": "HanfdN"
            })
            .set('token', res1.body.accessToken)
            .set('Accept', 'Application/json')
            .expect(200)
    })
})

