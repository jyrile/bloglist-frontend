import React from 'react'
import Blog from './Blog'

const ShowBlogs = ({ blogs, user, updateBlog, removeBlog }) => {
  if (!user) {
    return ''
  }

  //sort blogs by likes
  let sortedBlogs = blogs.sort((a,b)=> b.likes - a.likes);

  return sortedBlogs.map(blog => {
    return (<Blog key={blog._id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} />)
  })
}
export default ShowBlogs