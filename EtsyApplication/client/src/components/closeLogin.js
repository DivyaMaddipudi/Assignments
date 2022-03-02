import React from "react";

function closeLogin({ setshowSignIn }) {
  const showHomePage = () => {
    setshowSignIn(false);
  };

  return (
    <>
      <div className="bg-modal1">
        <div className="modal-content1">
          <div className="signin_close">
            <p onClick={showHomePage}>X</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default closeLogin;
