import React, { useState, useEffect } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import ShowBlogs from './components/ShowBlogs'
import Togglable from './components/Togglable';

const App = () => {
        const [blogs, setBlogs] = useState([]);
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const [errorType, setErrorType] = useState('')
        const [errorMessage, setErrorMessage] = useState(null);
        const [user, setUser] = useState(null);        
        const [title, setTitle] = useState('');
        const [author, setAuthor] = useState('');
        const [url, setUrl] = useState('');

        useEffect(() => {
                blogService.getAll().then(b => setBlogs(b));
        }, []);

        useEffect(() => {
                const loggedUserJson = window.localStorage.getItem('loggedUser')
                if(loggedUserJson) {
                        const user = JSON.parse(loggedUserJson)
                        setUser(user)
                        blogService.setToken(user.token)                      
                }
        }, [])

        const handleLogin = async event => {
                event.preventDefault();
                try {
                        const userLogin = await loginService.login({
                                username,
                                password,
                        });

                        window.localStorage.setItem('loggedUser', JSON.stringify(userLogin))
                        
                        blogService.setToken(userLogin.token)
                        setUser(userLogin);

                        setErrorType('info')                        
                        setErrorMessage(`Login successful`)
                        setTimeout(() => {                                
                                setErrorMessage(null);
                        }, 5000);

                        setUsername('');
                        setPassword('');
                } catch (exception) {
                        setErrorType('error');
                        setErrorMessage('wrong credentials');
                        setTimeout(() => {                                
                                setErrorMessage(null);
                        }, 5000);
                }
        };       

        const handleLogout = event => {
                event.preventDefault();
                try {              
                window.localStorage.removeItem('loggedUser')
                setUser(null)

                setErrorType('info');
                        setErrorMessage('Logout succesful')
                        setTimeout(() => {
                                setErrorMessage(null)
                        }, 5000)

                } catch(exception) {
                        setErrorType('error');
                        setErrorMessage('something went wrong with logging out')
                        setTimeout(() => {
                                setErrorMessage(null)
                        }, 5000)
                }
        }

       

        const loginForm = () => (                 
                 
                                <form onSubmit={handleLogin}>
                                        <div>
                                                username
                                                <input
                                                        type="text"
                                                        value={username}
                                                        name="Username"
                                                        onChange={({ target }) => setUsername(target.value)}
                                                />
                                        </div>
                                        <div>
                                                password
                                                <input
                                                        type="text"
                                                        value={password}
                                                        name="Password"
                                                        onChange={({ target }) => setPassword(target.value)}
                                                />
                                        </div>
                                        <button type="submit">login</button>
                                </form>                             
                )

        
        return (
                <div>
                        <h2>Blogs</h2>
                        <Notification errorType={errorType} errorMessage={errorMessage} />
                        {user === null ? 
                        loginForm() :
                        <div>
                        <p>{user.name} is logged in. <button onClick={handleLogout}>logout</button></p>
                        </div>
                        }                       
                        <hr /> 
                        
                        <Togglable buttonLabel='create a new blog'>
                                <BlogForm
                                        user={user} 
                                        addBlog={addBlog} 
                                        handleBlogInputTitle={handleBlogInputTitle}
                                        handleBlogInputAuthor={handleBlogInputAuthor}
                                        handleBlogInputUrl={handleBlogInputUrl}
                                        title={title}
                                        author={author}
                                        url={url}
                                />
                        </Togglable>


                        
                        {/*
                        <BlogForm
                                user={user} 
                                addBlog={addBlog} 
                                handleBlogInputTitle={handleBlogInputTitle}
                                handleBlogInputAuthor={handleBlogInputAuthor}
                                handleBlogInputUrl={handleBlogInputUrl}
                                title={title}
                                author={author}
                                url={url}
                        />
                        */}
                        <ShowBlogs blogs={blogs} user={user} />
                </div>
        );
};

export default App;
