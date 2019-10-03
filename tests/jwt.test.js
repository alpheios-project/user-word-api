/* eslint-env jest */
/* eslint-disable no-unused-vars */

import jwt from 'jsonwebtoken'

describe('jwt.test.js', () => {

  it('validates unexpired token', () => {
    //expect.assertions(0)
    let token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      data: 'foobar'
    }, 'secret');
    try {
      jwt.verify(token,'secret',(err,decoded) => {
        console.log(decoded)
        expect(err).not.toBeDefined()
      })
    } catch (err) {
    }
  })
  it('fails expired token', () => {
    //expect.assertions(1)
    let token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) - (60 * 60),
      data: 'foobar'
    }, 'secret');
    try {
      jwt.verify(token,'secret',(err,decoded) => {
        expect(err).toBeDefined()
        console.log(err)
      })
    } catch (err) {
        console.log(err)
        expect(err).toBeDefined()
    }
  })
})