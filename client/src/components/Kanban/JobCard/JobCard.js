import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Tooltip from "@material-ui/core/Tooltip";

import { Draggable } from "react-beautiful-dnd";

import {
  defaultCardBackground,
  draggingCardBackground,
  defaultJobCardBorder,
  draggingJobCardBorder,
  defaultJobCardText,
  draggingJobCardText,
} from "../../../constants/style";

const styles = {
  container: {
    userSelect: "none",
    width: "95%",
    minHeight: "150px",
    borderStyle: "solid",
    borderWidth: "1px 1px 0 0",
    borderRadius: "15px 5px 15px 5px",
    margin: "5px 2px 3px 2px",
    position: "relative",
  },
  moreButton: { position: "absolute", bottom: 0, right: 0 },
  title: { fontSize: 12, marginLeft: 5, marginTop: 5 },
};

const JobCard = ({ classes, index, job }) => {
  const { _id, title, company, role_level, updateDate } = job;

  const date = Date(Number(updateDate)); //.slice(4, 24);

  return (
    <Draggable key={_id} draggableId={_id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            className={classes.container}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              color: snapshot.isDragging
                ? draggingJobCardText
                : defaultJobCardText,
              border: snapshot.isDragging
                ? draggingJobCardBorder
                : defaultJobCardBorder,
              backgroundColor: snapshot.isDragging
                ? draggingCardBackground
                : defaultCardBackground,
              ...provided.draggableProps.style,
            }}
            ref={provided.innerRef}
          >
            <Typography
              variant="button"
              display="block"
              className={classes.title}
            >
              {title}
            </Typography>
            <Grid container>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle2"
                  display="block"
                  className={classes.title}
                >
                  {company}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle2"
                  display="block"
                  className={classes.title}
                >
                  {role_level}
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={4}>
                <Typography
                  variant="h6"
                  display="block"
                  className={classes.title}
                >
                  Update:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography
                  variant="p"
                  display="block"
                  className={classes.title}
                >
                  {date.slice(4, 16)}
                </Typography>
              </Grid>
            </Grid>

            <IconButton
              className={classes.moreButton}
              style={{
                color: snapshot.isDragging
                  ? draggingJobCardText
                  : defaultJobCardText,
              }}
            >
              <Tooltip
                title={"Click to see more details about this job"}
                placement="right"
              >
                <MoreHorizIcon />
              </Tooltip>
            </IconButton>
          </div>
        );
      }}
    </Draggable>
  );
};

export default withStyles(styles)(JobCard);
