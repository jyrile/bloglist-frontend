import React, {useState} from 'react'

const BlogForm = ({
        addBlog,
        handleBlogInputAuthor,
        handleBlogInputTitle,
        handleBlogInputUrl,
        title,
        author,
        url,
        user
}) => {
        const [newBlogEntry, setNewBlogEntry] = useState('')

        const handleChange = event => {
                setNewBlogEntry(event.target.value)
        }

        const addBlog = event => {
                event.preventDefault();        
               
                createBlog({
                        content: newBlogEntry
                })

                setNewBlogEntry('')
        }
                

        /* eikö tarvita
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
                event.preventDefault();        
               
                const newBlog = {
                        title: title,                        
                        author: author,
                        url: url
                };

                blogService
                .create(newBlog)
                .then(returnedBlog => {                        
                        setBlogs(blogs.concat(returnedBlog))                                              
                        setErrorType('info')
                        setErrorMessage(`New blog entry ${newBlog.title} added`)
                        setTimeout(() => {
                                setErrorMessage(null)
                        }, 5000)
                        setTitle('')
                        setAuthor('')
                        setUrl('')                        
                })

                .catch((error)=>{                        
                        setErrorType('error');
                        setErrorMessage(`Error adding new blog entry. ${error}`)
                        console.log(error)
                        setTimeout(() => {
                                setErrorMessage(null)
                        }, 5000)
                })

        }
        */

        if(!user){return ""}

  return (
  <div>
        <h2>Create a new blog entry</h2>
        <form onSubmit={addBlog}>
          <div>
                  title:
                  <input 
                  type="text"
                  value={title}
                  onChange={handleBlogInputTitle}                                
                  />
                  <br />
                  author:
                  <input
                  type="text"
                  value={author}
                  onChange={handleBlogInputAuthor}                                
                  />
                  <br />
                  url:
                  <input 
                  type="text"
                  value={url} 
                  onChange={handleBlogInputUrl}                                
                  />
          </div>
          <button type="submit">add blog</button>                        
  </form>               
  </div>
  )
}

export default BlogForm;