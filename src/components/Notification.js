import React from 'react'

const Notification = ({errorType,errorMessage}) => {
  if(errorMessage === null){
    return null
  }

  return (
    <div className={errorType}>
      {errorMessage}
    </div>
  )
}

export default Notification;