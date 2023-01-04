const { mockRequest, mockResponse } = require('../interceptor')
const { signUp, signIn } = require('../../controllers/auth.controller')
const User = require('../../models/user.model')
const bcrypt = require('bcryptjs')
const db = require('../db')
const { JsonWebTokenError } = require('jsonwebtoken')

beforeAll(async () => await db.connect())
afterEach(async () => await db.clearDatabase())
afterAll(async () => await db.closeDatabase())

const testPayload = {
    userType:"CUSTOMER",
    password:"12345678",
    name: "Test",
    userId: 1,
    email: "test@relevel.com",
    userStatus: "APPROVED",
    ticketsCreated: [],
    ticketsAssigned: []
}

describe('SignUp', () => {
    it('should pass', async () => {
        const req = mockRequest()
        const res = mockResponse()
        req.body = testPayload

        await signUp(req, res)
        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                email : "test@relevel.com",
                name : "Test",
                userId : "1",
                userStatus : "APPROVED",
                userType : "CUSTOMER"
            })
        )
    })
    
    it('should return error', async () => {
        jest.spyOn(User, 'create').mockImplementation(
            cb => {
                cb(new Error("This is an Error"), null)
            }
        )
        const req = mockRequest(), res = mockResponse()
        testPayload.userType = "ENGINEER"
        req.body = testPayload

        await signUp(req, res)
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.send).toHaveBeenCalledWith({
            message : "Some internal error while inserting the element"
        })
    })
})

describe('SignIn', () => {
    it('should fail due to invalid credentials', async () => {
        testPayload.userStatus = "APPROVED"
        const userSpy = jest.spyOn(User, 'findOne').mockReturnValue(
            Promise.resolve(testPayload)
        )

        const bcryptSpy = jest.spyOn(bcrypt, 'compareSync').mockReturnValue(false)
        const req = mockRequest()
        const res = mockResponse()
        req.body = testPayload

        await signIn(req, res)
        expect(userSpy).toHaveBeenCalled()
        expect(bcryptSpy).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.send).toHaveBeenCalledWith({
            accessToken : null,
            message: 'Invalid Credentials!'
        })
    })
})