import { describe, expect, test } from 'vitest';
import {
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import LetterNumber from './letterNumber';

describe("<LetterNumber/>",()=>{
    test("elements to be in the component",()=>{
        render(<LetterNumber/>)
        expect(screen.getByRole('button', { name: /find/i })).toBeInTheDocument()
        expect(screen.getByLabelText(/string/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/letter/i)).toBeInTheDocument()

    })
    test("functionality work",async ()=>{
      render(<LetterNumber/>)
      await userEvent.type(screen.getByLabelText(/string/i), 'abrar hussien');
      await userEvent.type(screen.getByLabelText(/letter/i), 'a');
      await userEvent.click(screen.getByRole('button', { name: /find/i }))

      expect(screen.getByText(/2/i)).toBeInTheDocument()
  })
  test("errors work",async ()=>{
    render(<LetterNumber/>)
    await userEvent.click(screen.getByRole('button', { name: /find/i }))
    expect(screen.getByText(/Please enter/i)).toBeInTheDocument()

    await userEvent.type(screen.getByLabelText(/string/i), 'abrar hussien');
    await userEvent.type(screen.getByLabelText(/letter/i), 'aff');
    await userEvent.click(screen.getByRole('button', { name: /find/i }))
    expect(screen.getByText(/Please enter/i)).toBeInTheDocument()
})
})