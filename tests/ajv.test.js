/* eslint-env jest */
/* eslint-disable no-unused-vars */

import ajv from 'ajv'
import schema from '../schema.json'
import noHomonym from '../mocks/item-no-homonym.json'
import withHomonym from '../mocks/item-complete.json'
import noUser from '../mocks/item-no-user.json'
import invalidUser from '../mocks/item-invalid-user.json'

describe('ajv.test.js', () => {

  let validate

  beforeAll(() => {
    let validator = new ajv()
    validate = validator.compile(schema)
  })
  it('validates without homonym', () => {
    let valid = validate(noHomonym)
    expect(valid).toBeTruthy()
  })

  it('validates with homonym', () => {
    let valid = validate(withHomonym)
    expect(valid).toBeTruthy()
  })

  it('fails with invalid user', () => {
    let valid = validate(invalidUser)
    expect(valid).toBeFalsy()
  })
})