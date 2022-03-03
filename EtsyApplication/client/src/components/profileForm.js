import React from "react";
import Hoverbar from "./Hoverbar";
import Navbar from "./Navbar";

function profileForm() {
  return (
    <div>
      <Navbar />
      <Hoverbar />
      <hr />
      <div className="update_profile_page">
        <div className="edit_icons"></div>
        <div className="profile_bio">
          <div className="profile_page_header">
            <b>Your public profile</b>
            <p>Everything on this page can be seen by anyone</p>
            <button className="view_profile">View Profile</button>
          </div>
          <div className="edit_profile"></div>
        </div>
      </div>
    </div>
  );
}

export default profileForm;
