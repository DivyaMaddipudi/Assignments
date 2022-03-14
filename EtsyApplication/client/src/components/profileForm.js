import React from "react";
import Navbar from "./Navbar";
import Hoverbar from "./Hoverbar";

function profileForm() {
  return (
    <div>
      <Navbar />
      <Hoverbar />
      <div className="text-center text-info">Let's Shop</div>
      <div className="container-fluid mx-2">
        <div className="row mt-5 mx-2">
          <div className="col-md-9">
            <div className="row"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default profileForm;
