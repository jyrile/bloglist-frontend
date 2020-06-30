describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    // create user
    const user = {
      name: 'Jyri',
      username: 'jyrkka',
      password: 'salazana'
    }

    cy.request('POST', 'http://localhost:3001/api/users', user)

    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.contains('Blogs')    
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function() {
    it('succesfull with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('jyrkka')
      cy.get('#password').type('salazana')
      cy.get('#login-button').click()

      cy.contains('Jyri is logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      
      cy.get('#username').type('jyrkka')
      cy.get('#password').type('vääräsalasana')
      cy.get('#login-button').click()    
      cy.get('#login-button').click()
      
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type('jyrkka')
      cy.get('#password').type('salazana')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('create a new blog').click()
      cy.get('#title').type('titteli')
      cy.get('#author').type('kirjoittaja')
      cy.get('#url').type('urli')
      cy.get('#add-button').click()

      cy.contains('titteli, kirjoittaja')
      cy.contains('show details')
    })

    it('A blog entry can be "liked"', function() {
      cy.contains('create a new blog').click()
      cy.get('#title').type('testtitle')
      cy.get('#author').type('testauthor')
      cy.get('#url').type('testurl')
      cy.get('#add-button').click()

      cy.get('#details-button').click()

      cy.get('#like-button').click()
      cy.contains('Likes: 1')
    })

  it('A blog entry can be removed', function() {
    cy.contains('create a new blog').click()
      cy.get('#title').type('testtitle')
      cy.get('#author').type('testauthor')
      cy.get('#url').type('testurl')
      cy.get('#add-button').click()

      cy.get('#details-button').click()

      cy.get('#delete-button').click()
  })

  it('blogs are arranged by amount of likes', function() {
        // create a few blogs
      //blog 1
      cy.contains('create a new blog').click()
      cy.get('#title').type('blog1')
      cy.get('#author').type('testauthor')
      cy.get('#url').type('testurl')
      cy.get('#add-button').click()

      //add one like to blog1
      cy.contains('show details').click()
      cy.contains('like').click()      

      //blog 2
      cy.contains('create a new blog').click()
      cy.get('#title').type('blog2')
      cy.get('#author').type('testauthor')
      cy.get('#url').type('i should be on the top')
      cy.get('#add-button').click()

      //open details of blog2 and close blog1
      cy.contains('show details').click()
      cy.contains('hide details').click()
      
      //add 2 likes to blog2 and hide details
      cy.contains('like').click()
      cy.contains('like').click()
      cy.contains('hide details').click()

      //check if blog2 is presented before blog1
      //logic being, that clicking the first show details should open
      //blog2 and url: "i should be on top" is visible

      cy.contains('show details').click()
      cy.contains('Url: i should be on the top')

  })

  })  
})