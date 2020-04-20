import React from "react";
import { v4 as uuidv4 } from "uuid";

import withStyles from "@material-ui/core/styles/withStyles";

import { Droppable } from "react-beautiful-dnd";

import JobCard from "../JobCard/JobCard";

import {
  defaultColumnBackground,
  draggingColumnBackground,
} from "../../../constants/style";

const styles = {
  container: {
    width: "100%",
    height: "calc(100vh - 210px)",
    minHeight: 500,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};

const ColumnContent = ({ classes, column, jobs }) => {
  return (
    <Droppable droppableId={column.id}>
      {(provided, snapshot) => {
        return (
          <div
            className={classes.container}
            {...provided.droppableProps}
            style={{
              backgroundColor: snapshot.isDraggingOver
                ? draggingColumnBackground
                : defaultColumnBackground,
            }}
            ref={provided.innerRef}
            key={uuidv4()}
          >
            {jobs.map((job, index) => (
              <JobCard job={job} index={index} />
            ))}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};

export default withStyles(styles)(ColumnContent);
