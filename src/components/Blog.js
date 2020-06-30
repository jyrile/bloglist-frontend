import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderColor: 'grey',
    borderWidth: 2,
    marginBottom: 5
  }

  if(showDetails === false) {
    return (
      <div style={blogStyle} className='blog'>
        {blog.title}, {blog.author}
        <button onClick={() => setShowDetails(true)} id="details-button">show details</button>
      </div>
    )}

  const handleUpdate = () => {

    const updatedLikes = blog.likes + 1

    updateBlog({
      _id: blog._id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: updatedLikes
    })
  }

  const handleRemove = id => {
    if(window.confirm(`Remove blog ${blog.title}`)) removeBlog(id)
  }

  return (
    <div style={blogStyle}>
      <b>{blog.title}</b><br />
    Author: {blog.author}<br />
    Url: {blog.url}<br />
    Likes: {blog.likes} <button onClick={() => handleUpdate()} id="like-button">like</button><br />
      <button onClick={() => handleRemove(blog._id)} id="delete-button">remove blog</button>
      <button onClick={() => setShowDetails(false)}>hide details</button>
    </div>
  )
}

export default Blog
