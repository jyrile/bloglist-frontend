import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import ShowBlogs from './components/ShowBlogs'
import Togglable from './components/Togglable'
import _ from 'lodash'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorType, setErrorType] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(b => setBlogs(b))
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const userLogin = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(userLogin))

      blogService.setToken(userLogin.token)
      setUser(userLogin)

      setErrorType('info')
      setErrorMessage('Login successful')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorType('error')
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = event => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedUser')
      setUser(null)

      setErrorType('info')
      setErrorMessage('Logout succesful')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorType('error')
      setErrorMessage('something went wrong with logging out')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const createBlog = blogObject => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setErrorType('info')
        setErrorMessage(`New blog entry ${blogObject.title} added`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorType('error')
        setErrorMessage(`Error adding new blog entry. ${error}`)

        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const updateBlog = blogObject => {
    const blogId= blogObject._id

    blogService
      .update(blogId, blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.map(blog => blog._id !== blogId ? blog : blogObject))
        setErrorType('info')
        setErrorMessage(`${returnedBlog.title} updated`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorType('info')
        setErrorMessage(`'Problem updating blog: ${error}'`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const removeBlog = id => {
    blogService
      .remove(id)
      .then(() => {
        setBlogs(_.remove(blogs, (blog) => blog._id !== id))
      })
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
                                username
        <input
          type="text"
          value={username}
          id="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
                                password
        <input
          type="text"
          value={password}
          id="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id="login-button">login</button>
    </form>
  )

  const blogFormRef = React.createRef()

  const blogForm = () => (
    <Togglable buttonLabel="create a new blog" ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  )

  return (
    <div>
      <h2>Blogs</h2>
      <Notification errorType={errorType} errorMessage={errorMessage} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} is logged in. <button onClick={handleLogout} id="logout-button">logout</button>
          </p>
          {blogForm()}
        </div>
      )}

      <ShowBlogs blogs={blogs} user={user} updateBlog={updateBlog} removeBlog={removeBlog}/>
    </div>
  )
}

export default App
