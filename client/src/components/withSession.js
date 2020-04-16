import React from "react";

import { useQuery } from "react-apollo";

import { GET_CURRENT_USER } from "../queries";

const withSession = (Component) => (props) => {
  const { loading, error, data, refetch } = useQuery(GET_CURRENT_USER);

  if (loading) return <div>loading</div>;
  if (error) return <div>error</div>;

  return (
    <Component {...props} refetch={refetch} session={data.getCurrentUser} />
  );
};

export default withSession;
