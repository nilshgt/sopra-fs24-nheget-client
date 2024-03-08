import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "helpers/api";
import BaseContainer from "components/ui/BaseContainer";
import { Button } from "components/ui/Button";


const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/user/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleEditClick = () => {
    const loggedInUserId = localStorage.getItem("id");
    if (loggedInUserId === id) { // Ensure IDs match
      navigate("/edit-profile");
    }
  };

  let content = <div>Loading...</div>;

  
  if (user) {
    content = <div>
      <h2>{user.username}</h2>
      <p>Status: {user.status}</p>
      <p>Creation Date: {user.creationDate}</p>
      <p>Birth Date: {user.birthday || "Not set"}</p>
      {localStorage.getItem("id") === id && <Button width="100%" onClick={handleEditClick}>Edit Profile</Button>}
      <Button width="100%" onClick={() => navigate("/game")}>
        Back
      </Button>
    </div> 
  } 

  return (
    <BaseContainer className="game container">
      {content}
    </BaseContainer>
  );
};

export default UserProfile;