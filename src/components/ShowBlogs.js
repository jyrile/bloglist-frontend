import React from 'react'
import Blog from './Blog'

const ShowBlogs = ({blogs,user}) => {

  if(!user){return ''}

  return (blogs.map(blog => (
          <Blog key={blog._id} blog={blog} />
  )))
  }

export default ShowBlogs;