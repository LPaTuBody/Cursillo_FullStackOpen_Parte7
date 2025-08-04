import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from '../components/BlogForm'
import React from 'react'

describe('BlogForm component', () => {
  const user = userEvent.setup()
  const fakeRef = React.createRef()

  const mockHandleSubmit = vi.fn()
  const mockRstUpd = vi.fn()
  const mockConfigNoti = vi.fn()

  test('throws an error when handleSubmit does not receive a function', () => {
    expect(() =>
      render(
        <BlogForm
          handleSubmit={'mockHandleSubmit'}
          rstUpd={mockRstUpd}
          configNoti={mockConfigNoti}
          blogFormRef={fakeRef}
        />,
      ),
    ).toThrowError('handleSubmit must be a function')
  })

  test('handleSubmit is executed when call', async () => {
    const { container } = render(
      <BlogForm
        handleSubmit={mockHandleSubmit}
        rstUpd={mockRstUpd}
        configNoti={mockConfigNoti}
        blogFormRef={fakeRef}
      />,
    )

    await user.type(
      container.querySelector('#title'),
      'La vez que un .html me salvó de mi crisis existencial',
    )
    await user.type(
      container.querySelector('#url'),
      'https://techwhispersdaily.net',
    )
    await user.click(screen.getByTestId('submit_btn'))

    // console.log(mockHandleSubmit.mock.calls[0][0])
    expect(mockHandleSubmit.mock.calls).toHaveLength(1)
    expect(mockHandleSubmit.mock.calls[0][0].title).toBe(
      'La vez que un .html me salvó de mi crisis existencial',
    )
    expect(mockHandleSubmit.mock.calls[0][0].url).toBe(
      'https://techwhispersdaily.net',
    )
  })
})
