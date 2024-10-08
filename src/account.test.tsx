import { render, screen } from '@testing-library/react'
import Account from './account'

it('renders the Account component', async () => {
    render(<Account />)
    const title = screen.getByText(/account/i)
    expect(title).toBeDefined()
    expect(title).toBeVisible()
})
