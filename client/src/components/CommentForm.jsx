import React, { useState } from 'react'

import { postComment } from '../services/comments'

export default function CommentForm(props) {
  
  const { postData } = props

  const [commentFormData, setCommentFormData] = useState({
    post: postData.id,
    author_name: "",
    author_email: "",
    content: ""
  })

  const [error, setError] = useState(null)

  const [validateName, setValidateName] = useState(false)
  const [validateEmail, setValidateEmail] = useState(false)
  const [validateContent, setValidateContent] = useState(false)

  const handlePostComment = async (commentData) => {
    console.log(commentData)
    const comment = await postComment(commentData)
    if (comment.error) {
      setError(comment.error.message)
    } else {
      setError("Your comment is subbmited and awaiting approval!")
    }
  } 

  const handleChange = (e) => {
    let { name, value } = e.target;
      setCommentFormData(prevState => ({
        ...prevState,
        [name]: value
      }))
  }
  
const validateForm = (e) => {
      
  e.preventDefault()

  if (!commentFormData.author_name) {
    //CHANGE CLASSNAME TO INVALID
    setValidateName(true);
    alert(`Please enter a valid name.`);
    return false;
  }

  if (!commentFormData.author_email) {
    //CHANGE CLASSNAME TO INVALID
    setValidateEmail(false)
    setValidateName(true);
    alert(`Please enter a valid email.`);
    return false;
  }

  if (!commentFormData.content) {
    //CHANGE CLASSNAME TO INVALID
    setValidateContent(false)
    setValidateEmail(true);
    alert(`Please enter a valid comment.`);
    return false;
  }

  if (commentFormData.author_name && commentFormData.author_email && commentFormData.content && commentFormData.author_email.includes("@") && commentFormData.author_email.includes(".") && !commentFormData.author_email.includes("@.")) {
    setValidateContent(false);
    handlePostComment(commentFormData)
  }
}


  return (
    <form className="comment-form" onSubmit={(e)=>{
      validateForm(e)
    }}>
      
      <p className="register-form-title">LEAVE A COMMENT</p>
        {
          error &&
          <p className="register-error-message">{error}</p>
        }
      
      <label className="register-form-label">
          Name:
        <input
          className={validateName ? "register-form-input invalid" : "register-form-input"}
          type="text"
         value={commentFormData.author_name}
        name="author_name"
        onChange={handleChange}
        />
      </label>

      <label className="login-form-label">
          Email:
        <input
          className={validateEmail ? "register-form-input invalid" : "register-form-input"}
          type="text"
          value={commentFormData.author_email}
          name="author_email"
          onChange={handleChange}
        />
      </label>

      <label className="login-form-label">
          Comment:
        <input
          className={validateContent ? "register-form-input invalid" : "register-form-input"}
          type="text"
          value={commentFormData.content}
          name="content"
          onChange={handleChange}
        />
      </label>
      
      <button className="register-button">Submit</button>


    </form>
  )
}