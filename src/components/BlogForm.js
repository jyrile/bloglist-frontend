import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogBlockStyle = {
    border: 'solid',
    borderColor: 'gray',
    padding: 5,
    marginBottom: 10,
    maxWidth: 400
  }

  const handleBlogInputTitle = event => {
    setTitle(event.target.value)
  }
  const handleBlogInputAuthor = event => {
    setAuthor(event.target.value)
  }
  const handleBlogInputUrl = event => {
    setUrl(event.target.value)
  }

  const addBlog = event => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div style={blogBlockStyle}>
      <h2>Create a new blog entry</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input type="text" value={title} onChange={handleBlogInputTitle} id="title" />
          <br />
          author:
          <input type="text" value={author} onChange={handleBlogInputAuthor} id="author" />
          <br />
          url:
          <input type="text" value={url} onChange={handleBlogInputUrl} id="url" />
        </div>
        <button type="submit" id="add-button" >add blog</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  handleBlogInputAuthor: PropTypes.func.isRequired,
  handleBlogInputTitle: PropTypes.func.isRequired,
}

export default BlogForm
