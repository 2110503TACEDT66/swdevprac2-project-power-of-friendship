import '@testing-library/jest-dom';
import userLogIn from '@/libs/userLogIn';
import getUserProfile from '@/libs/getUserProfile';

describe('Remote User Log-In', () => {
  var logInPromise:Promise<Object>
  var logInJsonResult:Object
  var token:string
  var profilePromise:Promise<Object>
  var profileJsonResult:Object

  beforeAll(async () => {
    const email = "ratchapolkunthong@gmail.com"
    const password = "123456"
    logInPromise = userLogIn(email, password)
    logInJsonResult = await logInPromise
    console.log(logInJsonResult);

    token = logInJsonResult.token
    profilePromise = getUserProfile(token)
    profileJsonResult = await profilePromise
  })

  it('userLogIn must return correct results', () => {
    expect(logInJsonResult.name).toMatch(/Wan/i)
    expect(logInJsonResult.email).toMatch(/ratchapolkunthong@gmail.com/i) 
  })

  it('getUserProfile must return correct results', () => {
    var profileData = profileJsonResult.data
    expect(profileData.email).toMatch(/ratchapolkunthong@gmail/i)
    expect(profileData.role).toMatch(/admin/i)
  })
})