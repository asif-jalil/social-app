import React from "react";

const UserInfo = ({ user }) => {
   return (
      <>
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
            <b>Address</b> {user?.address?.suite}, {user?.address?.street},{" "}
            {user?.address?.city}
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
      </>
   );
};

export default UserInfo;
