import React from "react";
import PropTypes from "prop-types";

const Button = ({ color, text, fun, margines, marginesTop, width_p }) => {
  return (
    <button
      style={{
        backgroundColor: color,
        display: "block",
        textAlign: "center",
        margin: margines,
        marginTop: marginesTop,
        padding: "0.5vh",
        fontSize: "30px",
        marginBottom: "auto",
        width: width_p,
        borderRadius: "12px",
      }}
      className="btn"
      onClick={fun}
    >
      {" "}
      {text}
    </button>
  );
};

Button.defaultProps = {
  color: "steelblue",
};

Button.defaultProps = {
  text: PropTypes.string,
  color: PropTypes.string,
};
export default Button;
