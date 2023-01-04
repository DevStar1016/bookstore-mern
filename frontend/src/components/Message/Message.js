import React from "react";

const Message = ({ variant, children }) => {
  let alert = `alert ${variant}`;

  return <div className={alert}>{children}</div>;
};

Message.defaultProps = {
  variant: "alert-info",
};

export default Message;
