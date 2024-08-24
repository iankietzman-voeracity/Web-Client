import { render, screen } from '@testing-library/react'
import App from './App'

it('renders the top level Layout component', async () => {
    render(<App />)
    const layout = screen.getByRole('navigation')
    expect(layout).toBeVisible()
})
