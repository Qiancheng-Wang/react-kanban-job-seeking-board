import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import withSession from "./components/withSession";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "http://localhost:4444/graphql",
  fetchOptions: {
    credentials: "include",
  },
  request: (operation) => {
    const token = sessionStorage.getItem("token");

    operation.setContext({
      headers: { authorization: token },
    });
  },
  onError: (netWorkError) => {
    if (netWorkError) {
      console.log("Network Error: ", netWorkError);
      sessionStorage.removeItem("token");
    }
  },
});

const WithSessionApp = withSession(App);

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <WithSessionApp />
    </ApolloProvider>
    ,
  </React.StrictMode>,
  document.getElementById("root")
);
