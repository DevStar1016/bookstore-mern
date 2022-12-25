import React from "react";

const Message = ({ varian, children }) => {
  let alert = `alert ${varian}`;

  return <div className={alert}>{children}</div>;
};

Message.defaultProps = {
  varian: "alert-info",
};

export default Message;
