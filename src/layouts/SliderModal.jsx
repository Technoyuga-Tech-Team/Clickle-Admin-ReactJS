import React, { useMemo } from "react";
import { Modal } from "react-bootstrap";
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { concatImageURL } from "../constants/globalConst";

const settings = {
  dots: true,
  arrows: false,
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const SliderModal = ({ activeModal, setActiveModal, img, flag }) => {
  return (
    <Modal
      className="modal fade wt-confirm-modal"
      id="confirmGuestModal"
      show={activeModal}
      onHide={() => setActiveModal(false)}
      backdrop="static"
      keyboard={false}
      size="sm"
    >
      <Modal.Body>
        <div className="wt-confirm-pay-modal-content">
          <div className="wt-confirm-pay-guest-area d-flex flex-column">
            <div className="d-flex justify-content-between align-items-center w-100">
              <h3>{flag}</h3>
              <button
                type="button"
                className="btn-close"
                onClick={() => setActiveModal(false)}
              ></button>
            </div>
            <hr style={{ color: "#989898", marginTop: "-1px" }} />
            <div className="mb-4">
              {img && img?.length > 1 ? (
                <Slider {...settings}>
                  {img &&
                    img?.map((d, index) => {
                      return (
                        <div key={index}>
                          <img
                            // src={concatImageURL(d)}
                            alt=""
                            style={{
                              padding: "5px",
                              maxWidth: "100%",
                              maxHeight: "300px",
                              objectFit: "contain",
                              borderBottomLeftRadius: "0px",
                              borderBottomRightRadius: "0px",
                              margin: "auto",
                              background: "#fff",
                            }}
                          />
                        </div>
                      );
                    })}
                </Slider>
              ) : (
                <>
                  {
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img
                        // src={concatImageURL(img[0])}
                        style={{
                          maxHeight: "300px",
                          maxWidth: "100%",
                          objectFit: "contain",
                        }}
                        alt="img"
                      />
                    </div>
                  }
                </>
              )}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SliderModal;
