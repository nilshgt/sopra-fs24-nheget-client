import React, { useState } from "react";
import { api, handleError } from "helpers/api";
import { useNavigate } from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Login.scss";
import BaseContainer from "components/ui/BaseContainer";
import FormField from "components/ui/FormField"; // Assuming you have a generic FormField component

const EditProfile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");

  const doSave = async () => {
    try {
      const requestBody = JSON.stringify({ username, birthday });
      const id = localStorage.getItem("id"); // Or however you store this information
      await api.put(`/user/${id}`, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate(`/user/${id}`); // Assuming you have a route for the profile view
    } catch (error) {
      alert(`Something went wrong during the profile update, make sure the birthdate format is yyyy-mm-dd: \n${handleError(error)}`);
    }
  };

  return (
    <BaseContainer>
      <div className="login container">
        <div className="login form">
          <FormField
            label="Username"
            value={username}
            onChange={(un: string) => setUsername(un)}
          />
          <FormField
            label="Birthday"
            value={birthday}
            onChange={(b: string) => setBirthday(b)}
            type="date"
          />
          <Button width="100%" onClick={() => doSave()}>
            Save
          </Button>
          <Button width="100%" onClick={() => navigate("/game")}>
            Back
          </Button>
        </div>
      </div>
    </BaseContainer>
  );
};

export default EditProfile;