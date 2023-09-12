const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../authManagement/index')
const expect = chai.expect
const {describe, it} = require('mocha')
require("dotenv").config({ path: "./authManagement/config/.env" })

chai.use(chaiHttp)

describe('',()=>{
    describe('',()=>{
        it('',(done)=>{
            chai.request(app)
        })
    })
})