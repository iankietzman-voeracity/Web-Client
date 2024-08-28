import { act, render, screen } from '@testing-library/react'
import App from './App'

beforeEach(() => {
    vi.mock('getAuth', () => {
        return {}
    })
    vi.mock('signOut', () => {
        return {}
    })
})

afterEach(() => {
    vi.restoreAllMocks()
    vi.clearAllMocks()
    vi.resetAllMocks()
})

describe('Layout - Logged out', () => {
    beforeEach(() => {
        act(() => {
            vi.mock('./AuthContext', async (importOriginal) => {
                const actual: object = await importOriginal()
                return {
                    ...actual,
                    useAuth: () => {
                        return {
                            user: false,
                        }
                    },
                }
            })
            render(<App></App>)
        })
    })
    it('renders the logged out out Layout component view', async () => {
        const nav = screen.getAllByRole('link')
        const navTextArray = nav.map((navItem) => {
            return navItem.innerText
        })

        expect(navTextArray.find((i) => i == 'Home')).toBeTruthy()
        expect(navTextArray.find((i) => i == 'Login')).toBeTruthy()
    })
})
