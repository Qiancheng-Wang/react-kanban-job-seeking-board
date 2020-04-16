import React, { useEffect } from "react";

import history from "../../history";

const Kanban = ({ session }) => {
  useEffect(() => {
    if (session === null || !sessionStorage.token) {
      history.push("/signin");
    }
  }, [session]);

  return (
    <div className="App">
      <h2>Kanban page</h2>
    </div>
  );
};

export default Kanban;
