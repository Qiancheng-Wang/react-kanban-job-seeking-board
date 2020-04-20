import React, { useState, useEffect } from "react";
import isUndefined from "lodash/isUndefined";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

import withStyles from "@material-ui/core/styles/withStyles";
import { green, red } from "@material-ui/core/colors";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

import Snackbar from "@material-ui/core/Snackbar";
import history from "../../history";

import { useQuery, useMutation } from "react-apollo";
import { GET_JOBS_BY_USER_ID } from "../../queries";
import { MOVE_JOB } from "../../mutations";

import { columns } from "../../constants/data";

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
    maxWidth: 165,
    minWidth: 165,
    height: "calc(100vh - 150px)",
    margin: "0 2px 0 2px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  successSnackBar: {
    backgroundColor: green[600],
  },
  errorSnackBar: {
    backgroundColor: red[500],
  },
};

const Kanban = ({ classes, session }) => {
  const { loading, error, data, refetch } = useQuery(GET_JOBS_BY_USER_ID, {
    variables: { _id: session ? session._id : null },
    //notifyOnNetworkStatusChange: true,
  });

  const [moveJob] = useMutation(MOVE_JOB);

  const [jobs, setJobs] = useState([]);
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [isSnackBarError, setIsSnackBarError] = useState(false);

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

  const onDragEnd = (result) => {
    const { draggableId, source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const targetStatus = columns.find(
        (column) => column.id === destination.droppableId
      ).value;

      moveJob({
        variables: {
          _id: draggableId,
          status: targetStatus,
        },
      })
        .then(async ({ data }) => {
          refetch();

          setSnackMessage("Move job success.");
          setIsSnackBarError(false);
          setIsSnackBarOpen(true);
        })
        .catch((err) => {
          console.log(err);
          setSnackMessage("Move job fail.");
          setIsSnackBarError(true);
          setIsSnackBarOpen(true);
        });
    }
  };

  return (
    <div style={{ background: "#ffffff" }}>
      <Container className={classes.outerContainer}>
        <CssBaseline />
        <div className={classes.container}>
          <div className={classes.cardContainer}>
            <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
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
      <Snackbar
        key={uuidv4()}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={isSnackBarOpen}
        autoHideDuration={4000}
        message={snackMessage}
        className={
          !isSnackBarError ? classes.successSnackBar : classes.errorSnackBar
        }
        onClose={() => setIsSnackBarOpen(false)}
      />
    </div>
  );
};

export default withStyles(styles)(Kanban);
