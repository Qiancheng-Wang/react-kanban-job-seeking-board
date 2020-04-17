import React, { useEffect } from "react";

import history from "../../history";

const JobAdd = ({ session }) => {
  useEffect(() => {
    if (session === null || !sessionStorage.token) {
      history.push("/signin");
    }
  }, [session]);

  return (
    <div className="App">
      <h2>Job Add page</h2>
    </div>
  );
};

export default JobAdd;
