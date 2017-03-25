import api from './api'

let user

beforeAll(async () => {
  const TESTER_NAME = `Odi ${Date.now()}`
  user = await api.createUser({name: TESTER_NAME})
})

it('can create a new user', async () => {
  const name = 'tester'
  const newUser = await api.createUser({name})
  expect(newUser).toBeDefined()
  expect(newUser.name).toBe(name)
  expect(newUser.id).toBeDefined()
  expect(newUser.created_at).toBeDefined()
  expect(newUser.updated_at).toBeDefined()
})

it('can report RASH', async () => {
  const {id: userId} = user
  const rashData = {
    rash: 42,
    status: 'accelerate',
    latitude: -6.2191701,
    longitude: 106.8129082
  }
  const rashResponse = await api.reportRASH(Object.assign({}, rashData, {userId}))
  expect(rashResponse).toBeDefined()
})
