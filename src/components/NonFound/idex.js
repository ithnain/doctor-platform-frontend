import React from "react";
import Lottie from "react-lottie";
import animationData from "../../utils/json/notFound.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    // preserveAspectRatio: "xMidYMid slice"
  },
};

export default () => {
  return (
    <div>
      <Lottie options={defaultOptions} height={400} width={400} />
      <h3
        style={{
          textAlign: "center",
          margin: 0,
          padding: 0,
          position: "absolute",
          top: "300px",
          right: "45%",
        }}
      >
        there is no any data{" "}
      </h3>
    </div>
  );
};
