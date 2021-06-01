import React, { useContext, useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { mainContext } from "../App";
import Post from "../components/Post/Post";

const Profile = () => {
   const { uname } = useParams();
   const { users, posts } = useContext(mainContext);
   const [user, setUser] = useState({});
   const [userPost, setUserPost] = useState([]);

   useEffect(() => {
      setUser(users.filter((user) => user.username === uname)[0]);
   }, [uname, users]);

   useEffect(() => {
      setUserPost(posts.filter((post) => post.userId === user?.id));
   }, [user?.id, posts]);

   return (
      <Container className="py-5">
         <Card className="text-center shadow-sm border-0 mb-4">
            <Card.Body>
               <h2>
                  Showing <span className="text-primary">{user?.name}</span>'s
                  Profile
               </h2>
               <Card.Title>
                  Working at{" "}
                  <span className="text-secondary">{user?.company?.name}</span>
               </Card.Title>
            </Card.Body>
         </Card>
         <Row>
            <Col lg={5}>
               <Card className="shadow-sm border-0 mb-4">
                  <Card.Body>
                     <Card.Title className="mb-4">Intro</Card.Title>
                     <p className="mb-1">
                        <b>Name:</b> {user?.name}
                     </p>
                     <p className="mb-1">
                        <b>Company:</b> {user?.company?.name}
                     </p>
                     <p className="mb-1">
                        <b>Email</b> {user?.email}
                     </p>
                     <p className="mb-1">
                        <b>Phone</b> {user?.phone}
                     </p>
                     <p className="mb-1">
                        <b>Address</b> {user?.address?.suite},{" "}
                        {user?.address?.street}, {user?.address?.city}
                     </p>
                     <p className="mb-1">
                        <b>Zip Code</b> {user?.address?.zipcode}
                     </p>
                     <p className="mb-1">
                        <b>Website</b>{" "}
                        <a
                           href={`https://${user?.website}`}
                           target="_blank"
                           rel="noreferrer"
                        >
                           {user?.website}
                        </a>
                     </p>
                  </Card.Body>
               </Card>
            </Col>
            <Col lg={7}>
               <Card className="shadow-sm border-0 mb-4">
                  <Card.Body>
                     <h3 className="mb-0">
                        All Post From{" "}
                        <span className="text-primary">{user?.name}</span>
                     </h3>
                  </Card.Body>
               </Card>

               <Row>
                  {userPost.map((post) => (
                     <Post
                        key={post.id}
                        post={post}
                        setUserPost={setUserPost}
                        col={6}
                     ></Post>
                  ))}
               </Row>
            </Col>
         </Row>
      </Container>
   );
};

export default Profile;
