import React, { useContext, useState } from "react";
import { Button, ButtonGroup, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { mainContext } from "../App";
import downIcon from "../images/down-arrow.png";
import upIcon from "../images/up-arrow.png";

const Users = () => {
   const { users } = useContext(mainContext);
   const [visible, setVisible] = useState({ start: 0, end: 3 });
   const [perPage, setPerPage] = useState(3);
   const [searchTerm, setSearchTerm] = useState("");
   const [sortType, setSortType] = useState("asc");
   const [sortMethod, setSortMethod] = useState("name");

   const handleNameSort = (type) => {
      setSortMethod("name");
      setSortType(type);
   };

   const handleEmailSort = (type) => {
      setSortMethod("email");
      setSortType(type);
   };

   const sortedByName = () =>
      users.sort((a, b) => {
         const isReversed = sortType === "asc" ? 1 : -1;
         return isReversed * a.name.localeCompare(b.name);
      });

   const sortedByEmail = () =>
      users.sort((a, b) => {
         const isReversed = sortType === "asc" ? 1 : -1;
         return isReversed * a.email.localeCompare(b.email);
      });

   const handlePerPage = (e) => {
      setPerPage(parseInt(e.target.value));
      setVisible((prev) => {
         const clonedVisible = { ...prev };
         clonedVisible.start = 0;
         clonedVisible.end = parseInt(e.target.value);
         return clonedVisible;
      });
   };

   const handleNext = () => {
      // eslint-disable-next-line array-callback-return
      const filteredUsers = users.filter((u) => {
         if (searchTerm === "") {
            return u;
         } else if (
            u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.website.toLowerCase().includes(searchTerm.toLowerCase())
         ) {
            return u;
         }
      });

      if (visible.end < filteredUsers.length) {
         setVisible((prev) => {
            const load = { ...prev };
            load.start = prev.end;
            load.end = load.start + perPage;
            return load;
         });
      }
   };

   const handlePrev = () => {
      if (visible.start > 1) {
         setVisible((prev) => {
            const load = { ...prev };
            load.end = prev.start;
            load.start = load.end - perPage;
            return load;
         });
      }
   };

   return (
      <Container className="py-5 post-container">
         <div>
            <Form.Group>
               <Form.Control
                  type="text"
                  name="search"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search User with name or email or website..."
               />
            </Form.Group>
         </div>
         <table className="table table-bordered">
            <thead className="table-dark">
               <tr>
                  <th className="">
                     <div className="d-flex justify-content-between align-items-center">
                        <span>Name</span>{" "}
                        {sortType === "asc" && sortMethod === "name" ? (
                           <img
                              src={downIcon}
                              onClick={() => handleNameSort("desc")}
                              alt=""
                              width="14"
                           />
                        ) : (
                           <img
                              src={upIcon}
                              onClick={() => handleNameSort("asc")}
                              alt=""
                              width="14"
                           />
                        )}
                     </div>
                  </th>
                  <th className="">
                     <div className="d-flex justify-content-between align-items-center">
                        <span>Email</span>{" "}
                        {sortType === "asc" && sortMethod === "email" ? (
                           <img
                              src={downIcon}
                              onClick={() => handleEmailSort("desc")}
                              alt=""
                              width="14"
                           />
                        ) : (
                           <img
                              src={upIcon}
                              onClick={() => handleEmailSort("asc")}
                              alt=""
                              width="14"
                           />
                        )}
                     </div>
                  </th>
                  <th>Website</th>
               </tr>
            </thead>
            <tbody>
               {(sortMethod === "name" ? sortedByName() : sortedByEmail())
                  // eslint-disable-next-line array-callback-return
                  .filter((u) => {
                     if (searchTerm === "") {
                        return u;
                     } else if (
                        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        u.website.toLowerCase().includes(searchTerm.toLowerCase())
                     ) {
                        return u;
                     }
                  })
                  .slice(visible.start, visible.end)
                  .map((user) => (
                     <tr key={user.id}>
                        <td>
                           {" "}
                           <Link to={`/profile/${user.username}`}>
                              {user.name}
                           </Link>{" "}
                        </td>
                        <td>{user.email}</td>
                        <td>
                           <a
                              href={`https://${user.website}`}
                              target="_blank"
                              rel="noreferrer"
                           >
                              {user.website}
                           </a>
                        </td>
                     </tr>
                  ))}
            </tbody>
            <tfoot className="table-dark">
               <tr>
                  <td colSpan="2">
                     <ButtonGroup>
                        <Button
                           variant="primary"
                           size="sm"
                           onClick={handlePrev}
                        >
                           Prev
                        </Button>
                        <Button
                           variant="primary"
                           size="sm"
                           onClick={handleNext}
                        >
                           Next
                        </Button>
                     </ButtonGroup>
                  </td>
                  <td align="right">
                     <select
                        className="form-control-sm"
                        onChange={handlePerPage}
                     >
                        <option value="3">3</option>
                        <option value="5">5</option>
                        <option value={users.length}>All</option>
                     </select>
                  </td>
               </tr>
            </tfoot>
         </table>
      </Container>
   );
};

export default Users;
