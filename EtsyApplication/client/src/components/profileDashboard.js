import React from "react";
import { PhotoCameraOutlined, EditOutlined } from "@material-ui/icons";
import cookie from "react-cookies";
import { useNavigate } from "react-router-dom";

function profileDashboard() {
  const navigate = useNavigate();
  const editProfile = () => {
    navigate("/updateProfile");
  };
  return (
    <div>
      <div className="profile_dashboard">
        <div className="profile_image">
          <span className="profile_imageIcon">
            <PhotoCameraOutlined />
          </span>
        </div>
        <div className="profile_name">{cookie.load("user")}</div>
        <div className="edit_profileIcon">
          <span onClick={editProfile} className="edit_icon">
            <EditOutlined />
          </span>
        </div>
      </div>
    </div>
  );
}

export default profileDashboard;
