import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import List from '../components/List'
import helper from './test-hepler'
import React from 'react'

describe('List component', () => {
  const user = userEvent.setup()
  const { blogs, users, userLoged } = helper
  const FakeBlogFormRef = React.createRef()

  const mockOnDltClick = vi.fn()
  const mockOnUpdClick = vi.fn()
  const mockOnLikeClick = vi.fn()
  const mockConfigNoti = vi.fn()

  let container

  beforeEach(() => {
    container = render(
      <div className="list_container">
        <h2>Blog List</h2>
        <List
          blogs={blogs}
          users={users}
          userLoged={userLoged}
          onDltClick={mockOnDltClick}
          updatingBlog={mockOnUpdClick}
          likingBlog={mockOnLikeClick}
          blogFormRef={FakeBlogFormRef}
          configNoti={mockConfigNoti}
        />
      </div>,
    ).container
  })

  test('shows the blog title, but not the details', () => {
    const blogDetails = container.querySelector('.blog_details')

    // screen.debug()
    expect(blogDetails).toHaveStyle('display: none')
    screen.getByText('This is just an example')
    screen.getByText('This is another example')
  })

  test('shows the blog details when button is clicked', async () => {
    const blogDetails = container.querySelectorAll('.blog_details')
    const button = container.querySelector('.sdt_btn')

    await user.click(button)

    // screen.debug(blogDetails[0])
    expect(blogDetails[0]).not.toHaveStyle('display: none')
    expect(blogDetails[1]).toHaveStyle('display: none')
  })

  test('like button calls his event-handler', async () => {
    const button = container.querySelector('.lks_btn')

    await user.click(button)
    await user.click(button)

    // console.log(mockOnLikeClick.mock.calls)
    expect(mockOnLikeClick.mock.calls).toHaveLength(2)
  })
})
