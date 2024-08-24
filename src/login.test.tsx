import { render, screen } from '@testing-library/react'
import Login from './login'

beforeEach(() => {
    vi.mock('firebase/compat/app', async () => {
        return {
            default: {
                auth: {
                    EmailAuthProvider: {
                        PROVIDER_ID: 0,
                    },
                    PhoneAuthProvider: {
                        PROVIDER_ID: 2,
                    },
                    GoogleAuthProvider: {
                        PROVIDER_ID: 3,
                    },
                },
            },
        }
    })
    vi.mock('firebaseui', async () => {
        return {
            auth: {
                AuthUI: {
                    getInstance: () => {
                        return {
                            start: () => {
                                return
                            },
                        }
                    },
                },
            },
        }
    })
})
afterEach(() => {
    vi.clearAllMocks()
})

it('renders the Login component', () => {
    render(<Login />)
    const title = screen.getByText(/login/i)
    expect(title).toBeDefined()
    expect(title).toBeVisible()
})
