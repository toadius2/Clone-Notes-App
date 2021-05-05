import React from "react";
import { useHistory } from "react-router-dom";

export default function () {
  let history = useHistory();
  setTimeout(() => {
    history.push("/home");
  }, 2000);
  return <div>qq</div>;
}
