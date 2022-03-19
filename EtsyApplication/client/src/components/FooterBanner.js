import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CurrencyModal from "./CurrencyModal";

function FooterBanner() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <FooterBannerContainer className="main-footer">
      <div className="container_currency">
        <div className="footer-middle">
          <div className="row">
            <div className="col-sm-6">
              <button
                className="button"
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                Currency
              </button>
            </div>
            <div className="col-sm-2">@2022 Etsy'Inc</div>
            <div className="col-sm-2">Terms of Use</div>
            <div className="col-sm-2">Privacy Settings</div>
          </div>
        </div>
      </div>
      {modalOpen && <CurrencyModal setOpenModal={setModalOpen} />}
    </FooterBannerContainer>
  );
}

export default FooterBanner;

const FooterBannerContainer = styled.footer`

.container {

}

.footer-middle{
    background : #1e2a4e;
    color : white;
    padding-left : 20px;
    padding-top: 15px;
    padding-bottom: 15px;
}
.button
{
    background-color: #1e2a4e;
    color : white;
    width : 30%;
    height : 20 %
    text-align: center;
    cursor: pointer;
    outline: none;
    border: none;
    border-radius: 15px;
}
.button:hover
{
    opacity: 0.3;
}
`;
