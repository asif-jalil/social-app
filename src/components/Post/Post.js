import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Card, Col, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { mainContext } from "../../App";
import editImg from "../../images/edit.png";
import deleteImg from "../../images/trash.png";

const Post = (props) => {
   const { id, title, body, userId } = props.post;
   const postColumn = props.col;
   const { setPosts, users, currentUser } = useContext(mainContext);
   const [author, setAuthor] = useState({});
   const [show, setShow] = useState(false);
   const titleRef = useRef();
   const bodyRef = useRef();

   useEffect(() => {
      setAuthor(users.filter((user) => user.id === userId)[0]);
   }, [userId, users]);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   const handlePostEdit = () => {
      const newTitle = titleRef.current.value;
      const newBody = bodyRef.current.value;

      const updatedPost = {
         title: newTitle,
         body: newBody,
         id: id,
         userId: currentUser.id
      }

      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
         method: "PATCH",
         body: JSON.stringify(updatedPost),
         headers: {
            "Content-type": "application/json; charset=UTF-8",
         },
      })
         .then((response) => response.json())
         .then((data) => {
            setPosts(prev => {
               const clonePosts = [].concat(prev);
               const currentPost = clonePosts.find((post) => post.id === id);
               currentPost.title = data.title;
               currentPost.body = data.body;
               return clonePosts;
            });
            setShow(false);
            props.handleToast("updated");
         });
   };

   const handlePostDelete = () => {
      setPosts((prev) => prev.filter((post) => post.id !== id));
      props.handleToast("deleted");
   };

   return (
      <Col md={postColumn} className="mb-4">
         <Card className="border-0 shadow-sm h-100">
            <Card.Body>
               <Card.Title>{title} </Card.Title>
               <Card.Subtitle className="mb-4">
                  Posted By{" "}
                  <Link to={`/profile/${author?.username}`}>{author?.name}</Link>
               </Card.Subtitle>
               <Card.Text>{body}</Card.Text>
               <div className="d-flex justify-content-between align-items-center">
                  <Link to={`/post/${id}`}>See More</Link>
                  {author?.id === currentUser?.id && (
                     <div>
                        <Button variant="link" onClick={handleShow}>
                           <img width="15" src={editImg} alt="" />
                        </Button>
                        <Modal show={show} onHide={handleClose}>
                           <Modal.Header closeButton>
                              <Modal.Title>Edit</Modal.Title>
                           </Modal.Header>
                           <Modal.Body>
                              <form>
                                 <Form.Group controlId="formTitle">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                       type="text"
                                       placeholder="Title"
                                       defaultValue={title}
                                       ref={titleRef}
                                    />
                                    <Form.Group controlId="formBody">
                                       <Form.Label>Body</Form.Label>
                                       <Form.Control
                                          as="textarea"
                                          rows={3}
                                          defaultValue={body}
                                          ref={bodyRef}
                                       />
                                    </Form.Group>
                                 </Form.Group>
                              </form>
                           </Modal.Body>
                           <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                 Close
                              </Button>
                              <Button
                                 variant="primary"
                                 onClick={handlePostEdit}
                              >
                                 Save Changes
                              </Button>
                           </Modal.Footer>
                        </Modal>
                        <Button onClick={handlePostDelete} variant="link">
                           <img width="15" src={deleteImg} alt="" />
                        </Button>
                     </div>
                  )}
               </div>
            </Card.Body>
         </Card>
      </Col>
   );
};

export default Post;
