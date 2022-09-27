import {AppComponent} from './app.component'
import {render, screen, within} from '@testing-library/angular'
import {MatInputModule} from '@angular/material/input'
import {MatIconModule} from '@angular/material/icon'
import {MatChipsModule} from '@angular/material/chips'
import userEvent from '@testing-library/user-event'

describe('AppComponent', () => {
  it('renders heading', async () => {
    await renderComponent()

    expect(screen.getByRole('heading')).toHaveTextContent('Test for Chips Input')
  })

  it('displays the favorite fruits', async () => {
    await renderComponent()

    const chips = screen.getByRole('listbox')
    const fruits = within(chips).getAllByRole('option')
    expect(fruits).toHaveLength(3)
    expect(fruits[0]).toHaveTextContent('Lemon')
    expect(fruits[1]).toHaveTextContent('Lime')
    expect(fruits[2]).toHaveTextContent('Apple')
  })

  it('supports adding new chips', async () => {
    await renderComponent()
    const chipsInput = screen.getByLabelText('Favorite Fruits')

    await userEvent.type(chipsInput, 'Banana{Enter}')

    const fruits = screen.getAllByRole('option')
    expect(fruits).toHaveLength(4)
  })
})

const renderComponent = () => render(AppComponent, {
  imports: [
    MatInputModule,
    MatIconModule,
    MatChipsModule,
  ]
})
