import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe('<Blog />', () => {
  let component

  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 5
  }

  const mockHandler = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog blog={blog} updateBlog={mockHandler} />
    )
  })

  test('initially render blog with title, author and button', () => {
    const button = component.getByText('show details')

    expect(component.container).toHaveTextContent(
      'title'
    )
    expect(component.container).toHaveTextContent(
      'author'
    )
    expect(component.container).not.toHaveTextContent(
      'url'
    )
    expect(component.container).not.toHaveValue(
      5
    )
    expect(button)
  })

  test('blog render after button click', async () => {
    const button = component.getByText('show details')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'title'
    )
    expect(component.container).toHaveTextContent(
      'author'
    )
    expect(component.container).toHaveTextContent(
      'url'
    )
    expect(component.container).toHaveTextContent(
      '5'
    )

  })

  test('like button to work as excpected', async () => {
    const button = component.getByText('show details')
    fireEvent.click(button)


    const button2 = component.getByText('like')
    fireEvent.click(button2)
    expect(mockHandler.mock.calls).toHaveLength(1)
    fireEvent.click(button2)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})


