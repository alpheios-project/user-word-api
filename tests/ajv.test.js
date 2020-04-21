/* eslint-env jest */
/* eslint-disable no-unused-vars */

import ajv from 'ajv'
import schema from '../schema.json'
import noHomonym from '../mocks/item-no-homonym.json'
import withHomonym from '../mocks/item-complete.json'
import noUser from '../mocks/item-no-user.json'
import invalidUser from '../mocks/item-invalid-user.json'
import invalidList from '../mocks/item-invalid-list.json'
import noList from '../mocks/item-no-list.json'
import invalidId from '../mocks/item-invalid-id.json'
import noId from '../mocks/item-no-id.json'
import invalidLanguage from '../mocks/item-invalid-language.json'
import noWord from '../mocks/item-no-word.json'
import emptyWord from '../mocks/item-empty-word.json'
import emptyLemmasList from '../mocks/item-empty-lemmalist.json'
import emptyContext from '../mocks/item-empty-context.json'
import emptyExact from '../mocks/item-empty-exact.json'
import emptyPrefix from '../mocks/item-empty-prefix.json'
import emptySuffix from '../mocks/item-empty-suffix.json'
import ut from '../mocks/item-ut.json'
import newFields from '../mocks/item-new-fields.json'

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

  it('fails with no user', () => {
    let valid = validate(noUser)
    expect(valid).toBeFalsy()
  })

  it('fails with invalid list', () => {
    let valid = validate(invalidList)
    expect(valid).toBeFalsy()
  })

  it('fails with no list', () => {
    let valid = validate(noList)
    expect(valid).toBeFalsy()
  })

  it('fails with invalid id', () => {
    let valid = validate(invalidId)
    expect(valid).toBeFalsy()
  })

  it('fails with no id', () => {
    let valid = validate(noId)
    expect(valid).toBeFalsy()
  })

  it('fails with invalid language', () => {
    let valid = validate(invalidLanguage)
    expect(valid).toBeFalsy()
  })

  it('fails with no word', () => {
    let valid = validate(noWord)
    expect(valid).toBeFalsy()
  })

  it('fails with empty word', () => {
    let valid = validate(emptyWord)
    expect(valid).toBeFalsy()
  })

  it('allows empty lemmas list', () => {
    let valid = validate(emptyLemmasList)
    expect(valid).toBeTruthy()
  })

  it('allows empty context', () => {
    let valid = validate(emptyContext)
    expect(valid).toBeTruthy()
  })

  it('allows empty prefix', () => {
    let valid = validate(emptyPrefix)
    expect(valid).toBeTruthy()
  })

  it('allows empty suffix', () => {
    let valid = validate(emptySuffix)
    expect(valid).toBeTruthy()
  })

  it('fails empty exact', () => {
    let valid = validate(emptyExact)
    expect(valid).toBeFalsy()
  })

  it('allows ut', () => {
    let valid = validate(ut)
    expect(valid).toBeTruthy()
  })

  it('allows updatedDT and frequency', () => {
    let valid = validate(newFields)
    expect(valid).toBeTruthy()
  })


})