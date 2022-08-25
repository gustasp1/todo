import React, { useEffect } from "react";

const Notification = ({ notification }) => {
  const { color, msg } = notification;
  return <div style={{ color }}>{msg}</div>;
};

export default Notification;
