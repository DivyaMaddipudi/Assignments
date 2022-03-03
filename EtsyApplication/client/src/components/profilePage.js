import React from "react";
import Hoverbar from "./Hoverbar";
import Navbar from "./Navbar";
import ProfileDashboard from "./profileDashboard";

function profilePage() {
  return (
    <div>
      <Navbar />
      <Hoverbar />
      <hr></hr>
      <ProfileDashboard />
    </div>
  );
}

export default profilePage;
