import api from './api'

it('can create a new user', async () => {
  const name = 'tester'
  const newUser = await api.createUser({name})
  expect(newUser).toBeDefined()
  expect(newUser.name).toBe(name)
  expect(newUser.created_at).toBeDefined()
  expect(newUser.updated_at).toBeDefined()
})
