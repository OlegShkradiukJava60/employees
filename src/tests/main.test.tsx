import { it, expect, describe, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest';
test('render with screen', () => {
  render(<div role='code'>hello Yuri</div>);
  screen.debug();
  expect(screen.queryByRole('code')).toBeInTheDocument();
  expect(screen.getByRole('code')).toHaveTextContent(/HELLO/i)
})