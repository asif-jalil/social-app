import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { mainContext } from "../App";
import Post from '../components/Post/Post';
import { shuffle } from '../utilities/random';

const Newsfeed = () => {

   const { posts } = useContext(mainContext);
   const [visible, setVisible] = useState(10);

   const handleLoadMore = () => {
      setVisible(prev => prev + 10);
   }

   useEffect(()=>{shuffle(posts)},[posts])

   return (
      <Container className="py-5 post-container">
         <Row>
            {
              posts.slice(0, visible).map(post => <Post post={post} col={12}></Post>)
            }
         </Row>
         { visible < posts.length  && <Button variant="dark" size="lg" className="w-100 mt-4" onClick={handleLoadMore}>Load More</Button>}
      </Container>
   );
};

export default Newsfeed;