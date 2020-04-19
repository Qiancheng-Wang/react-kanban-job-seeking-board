import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import { Draggable } from "react-beautiful-dnd";

const styles = {
  container: {
    userSelect: "none",
    width: "95%",
    height: "100px",
    borderStyle: "solid",
    borderWidth: "1px 1px 0 0",
    border: "#e6e600",
    borderRadius: 5,
    margin: "5px 2px 3px 2px",
    color: "#002222",
  },
};

const isDragingBackground = "#456c86";
const isDefaultBackground = "#ffffb3";

const JobCard = ({ classes, index, job }) => {
  const { _id, title } = job;
  return (
    <Draggable key={_id} draggableId={_id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            className={classes.container}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              backgroundColor: snapshot.isDragging
                ? isDragingBackground
                : isDefaultBackground,
              ...provided.draggableProps.style,
            }}
            ref={provided.innerRef}
          >
            {title}
          </div>
        );
      }}
    </Draggable>
  );
};

export default withStyles(styles)(JobCard);
