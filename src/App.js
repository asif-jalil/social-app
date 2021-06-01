import { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Newsfeed from "./pages/Newsfeed";
import PostDetails from "./pages/PostDetails";
import Profile from "./pages/Profile";

export const mainContext = createContext();

function App() {
   const [posts, setPosts] = useState([]);
   const [users, setUsers] = useState([]);
   const currentUser = {id: 2, username: "Antonette",}

   useEffect(() => {
      fetch("https://jsonplaceholder.typicode.com/posts")
         .then((res) => res.json())
         .then((data) => setPosts(data));
   }, []);

   useEffect(() => {
      fetch("https://jsonplaceholder.typicode.com/users")
         .then((res) => res.json())
         .then((data) => setUsers(data));
   }, []);

   const contextValue = {
      posts,
      setPosts,
      users,
      currentUser
   };

   return (
      <mainContext.Provider value={contextValue}>
         <Router>
            <Header></Header>
            <Switch>
               <Route exact path="/">
                  <Newsfeed></Newsfeed>
               </Route>
               <Route path="/post/:postId">
                  <PostDetails></PostDetails>
               </Route>
               <Route path="/:uname">
                  <Profile></Profile>
               </Route>
            </Switch>
         </Router>
      </mainContext.Provider>
   );
}

export default App;
