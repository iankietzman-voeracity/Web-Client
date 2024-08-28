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

describe('Layout - Logged in', () => {
    beforeEach(() => {
        act(() => {
            vi.mock('./AuthContext', async (importOriginal) => {
                const actual: object = await importOriginal()
                return {
                    ...actual,
                    useAuth: () => {
                        return {
                            user: true,
                        }
                    },
                }
            })
            render(<App></App>)
        })
    })
    it('renders the logged in Layout component view', async () => {
        const nav = screen.getAllByRole('link')
        const navTextArray = nav.map((navItem) => {
            return (navItem as HTMLAnchorElement).text
        })

        expect(navTextArray.find((i) => i == 'Home')).toBeTruthy()
        expect(navTextArray.find((i) => i == 'Account')).toBeTruthy()
        expect(navTextArray.find((i) => i == 'Logout')).toBeTruthy()
    })
})
