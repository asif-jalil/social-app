import React from 'react';

const Comment = ({ comment }) => {
   const { email, body } = comment;
   return (
      <div className="mt-4">
         <h6>{email}</h6>
         <p>{body}</p>
         <hr />
      </div>
   );
};

export default Comment;