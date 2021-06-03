import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Comment from "../components/Post/Comment";

const PostDetails = () => {
   const { postId } = useParams();
   const [currentPost, setCurrentPost] = useState({});
   const [postAuthor, setPostAuthor] = useState({});
   const [comments, setComments] = useState([])
   const { title, body, userId  } = currentPost;

   useEffect(() => {
      fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
         .then((res) => res.json())
         .then((data) => setCurrentPost(data));
   }, [postId]);


   useEffect(() => {
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
         .then((res) => res.json())
         .then((data) => setPostAuthor(data));
   }, [userId]);

   useEffect(() => {
      fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
         .then((res) => res.json())
         .then((data) => setComments(data));
   }, [postId]);


   return (
      <Container className="py-5 post-container">
         <Card className="border-0 shadow">
            <Card.Body>
               <h4>Posted By <Link to={`/profile/${postAuthor.username}`}>{ postAuthor.name }</Link></h4>
               <hr />
               <Card.Title>{title}</Card.Title>
               <Card.Text className="text-muted mb-5">{body}</Card.Text>
               <p><b>Comments </b></p>
               {
                  comments.map(c => <Comment comment={c}></Comment>)
               }
            </Card.Body>
         </Card>
      </Container>
   );
};

export default PostDetails;
