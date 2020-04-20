import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";

import {
  defaultColumnBackground,
  columnHeaderTextBackground,
} from "../../../constants/style";

const styles = {
  container: {
    backgroundColor: defaultColumnBackground,
    borderRadius: 5,
    width: "100%",
    minHeight: 50,
    marginBottom: 5,
    display: "flex",
    alignItems: "center",
  },
  text: { fontSize: 16, marginLeft: 5, color: columnHeaderTextBackground },
};

const ColumnHeader = ({ classes, title }) => {
  return (
    <div className={classes.container}>
      <Typography variant="subtitle2" display="block" className={classes.text}>
        {title}
      </Typography>
    </div>
  );
};

export default withStyles(styles)(ColumnHeader);
