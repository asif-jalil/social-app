import React, { useContext, useState } from "react";
import { Button, Card, Container, Form, Modal, Row } from "react-bootstrap";
import { mainContext } from "../App";
import Post from "../components/Post/Post";

const Newsfeed = () => {
   const { posts, currentUser, setPosts } = useContext(mainContext);
   const [visible, setVisible] = useState(10);
   const [show, setShow] = useState(false);
   const [postCreate, setPostCreate] = useState({});

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   const handleLoadMore = () => {
      setVisible((prev) => prev + 10);
   };

   const handleCreatePost = (e) => {
      e.preventDefault();

      const newPost = {...postCreate, userId: currentUser.id}

      if (postCreate.title && postCreate.body) {
         fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: JSON.stringify(newPost),
            headers: {
               "Content-type": "application/json; charset=UTF-8",
            },
         })
            .then((response) => response.json())
            .then((data) => {
               setPosts(prev => {
                  const allPost = [data, ...prev];
                  return allPost;
               });
               setShow(false)
            });
         
      }

   };

   const handleChange = (event) => {
      const newPost = { ...postCreate };
      newPost[event.target.name] = event.target.value;
      setPostCreate(newPost);
   };



   return (
      <Container className="py-5 post-container">
         <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
               <button className="btn post-btn w-100" onClick={handleShow}>
                  Whats On Your Mind?
               </button>
               <Modal show={show} onHide={handleClose} centered>
                  <Modal.Header closeButton>
                     <Modal.Title>Create Post</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                     <form onSubmit={handleCreatePost}>
                        <Form.Group controlId="createPostTitle">
                           <Form.Control
                              required
                              name="title"
                              onChange={handleChange}
                              className="create-post-input"
                              placeholder="Make A Title"
                           />
                        </Form.Group>
                        <Form.Group controlId="createPostBody">
                           <Form.Control
                              required
                              as="textarea"
                              name="body"
                              onChange={handleChange}
                              rows={7}
                              className="create-post-input"
                              placeholder="Whats On you mind?"
                           />
                        </Form.Group>
                        <Button
                           type="submit"
                           variant="primary"
                           className="w-100"
                        >
                           Post
                        </Button>
                     </form>
                  </Modal.Body>
               </Modal>
            </Card.Body>
         </Card>
         <Row>
            {posts.slice(0, visible).map((post) => (
               <Post key={post.id} post={post} col={12}></Post>
            ))}
         </Row>
         {visible < posts.length && (
            <Button
               variant="dark"
               size="lg"
               className="w-100 mt-4"
               onClick={handleLoadMore}
            >
               Load More
            </Button>
         )}
      </Container>
   );
};

export default Newsfeed;
