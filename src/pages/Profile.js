import React, { useContext, useEffect, useState } from "react";
import {
   Button,
   ButtonGroup,
   Card,
   Col,
   Container,
   Row
} from "react-bootstrap";
import { useParams } from "react-router";
import { mainContext } from "../App";
import Post from "../components/Post/Post";
import UserInfo from "../components/UserProfile/UserInfo";

const Profile = () => {
   const { uname } = useParams();
   const { users, posts } = useContext(mainContext);
   const [user, setUser] = useState({});
   const [userPost, setUserPost] = useState([]);

   // get current posts
   const [postPerPage] = useState(2);
   const [currentPage, setCurrentPage] = useState(1);
   const postEndIndex = currentPage * postPerPage;
   const postStartIndex = postEndIndex - postPerPage;
   const pages = [];

   useEffect(() => {
      setUser(users.filter((user) => user.username === uname)[0]);
   }, [uname, users]);

   useEffect(() => {
      setUserPost(posts.filter((post) => post.userId === user?.id));
   }, [user?.id, posts]);

   const handleNext = () => {
      if (postEndIndex < userPost.length) {
         setCurrentPage(prev => prev + 1)
      }
   };

   const handlePrev = () => {
      if (postStartIndex > 1) {
         setCurrentPage(prev => prev - 1)
      }
   };

   for (let i = 1; i <= Math.ceil(userPost.length / postPerPage); i++) {
      pages.push(i);
   }

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
                     <UserInfo user={ user } />
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
                  {userPost.slice(postStartIndex, postEndIndex).map((post) => (
                     <Post
                        key={post.id}
                        post={post}
                        setUserPost={setUserPost}
                        col={6}
                     ></Post>
                  ))}
               </Row>

               <div className="d-flex justify-content-between">
                  <Button variant="secondary" onClick={handlePrev}>
                     Prev
                  </Button>
                  <ButtonGroup className="mx-2" aria-label="First group">
                     {
                        pages.map((page) => (
                           <Button variant="secondary" className={page === currentPage ? "active" : ""} onClick={()=> setCurrentPage(page)}>
                              {page}
                           </Button>
                        ))
                     }
                  </ButtonGroup>
                  <Button variant="secondary" onClick={handleNext}>
                     Next
                  </Button>
               </div>
            </Col>
         </Row>
      </Container>
   );
};

export default Profile;
