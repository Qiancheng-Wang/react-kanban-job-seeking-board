import React, { useState, useEffect } from "react";
import isUndefined from "lodash/isUndefined";
import { DragDropContext } from "react-beautiful-dnd";

import withStyles from "@material-ui/core/styles/withStyles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

import history from "../../history";

import { useQuery } from "react-apollo";
import { GET_JOBS_BY_USER_ID } from "../../queries";

import { columns } from "../../constants";

import ColumnHeader from "./ColumnHeader/ColumnHeader";
import ColumnContent from "./ColumnContent/ColumnContent";

const styles = {
  outerContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
  },
  container: {
    width: "100%",
    height: "calc(100vh - 72px)",
    overflow: "auto",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  cardContainer: {
    margin: "20px 0 20px 0",
    width: "100%",
    minWidth: 1000,
    minHeight: 600,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  columnContainer: {
    minWidth: 160,
    height: "calc(100vh - 150px)",
    margin: "0 3px 0 3px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  },
};

const Kanban = ({ classes, session }) => {
  const { loading, error, data } = useQuery(GET_JOBS_BY_USER_ID, {
    variables: { _id: session ? session._id : null },
  });

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (!isUndefined(data)) {
      setJobs(data.getJobsByUserId);
    }
  }, [data]);

  useEffect(() => {
    if (session === null || !sessionStorage.token) {
      history.push("/signin");
    }
  }, [session]);

  if (loading) {
    return (
      <div className="App">
        <h2>Loading Page</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <h2>Sevice Error Page</h2>
      </div>
    );
  }

  const filterColumnJobs = (columnName) => {
    return jobs.filter((job) => job.status === columnName);
  };

  return (
    <Container className={classes.outerContainer}>
      <CssBaseline />
      <div className={classes.container}>
        <div className={classes.cardContainer}>
          <DragDropContext onDragEnd={(result) => console.log(result)}>
            {columns.map((column) => (
              <div className={classes.columnContainer} key={column.id}>
                <ColumnHeader title={column.name} />
                <ColumnContent
                  column={column}
                  jobs={filterColumnJobs(column.value)}
                />
              </div>
            ))}
          </DragDropContext>
        </div>
      </div>
    </Container>
  );
};

export default withStyles(styles)(Kanban);
