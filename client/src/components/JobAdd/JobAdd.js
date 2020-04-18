import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { debounce } from "@material-ui/core";

import withStyles from "@material-ui/core/styles/withStyles";
import { green, red } from "@material-ui/core/colors";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import Tooltip from "@material-ui/core/Tooltip";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

import history from "../../history";

import { useMutation } from "react-apollo";
import { ADD_JOB } from "../../mutations";

const styles = (theme) => ({
  container: {
    width: "70%",
    minWidth: 800,
    maxWidth: 900,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    width: "100%",
  },
  skillSetContainer: {
    position: "relative",
  },
  skillSetHelpIcon: {
    position: "absolute",
    right: -20,
  },
  successSnackBar: {
    backgroundColor: green[600],
  },
  errorSnackBar: {
    backgroundColor: red[500],
  },
});

const roleLevelOptions = [
  "GRADUATE",
  "ASSOCIATE",
  "JUNIOR",
  "MID_LEVEL",
  "SENIOR",
  "PRINCIPLE",
];
const JobAdd = ({ classes, session }) => {
  const [isDisabledField, setIsDisabledField] = useState(false);
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const [jobTitle, setJobTitle] = useState("");
  const [roleLevel, setRoleLevel] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [skillSetString, setSkillSetString] = React.useState("");
  const [skillSetArray, setSkillSetArray] = React.useState([]);
  const [jobDescription, setJobDescription] = React.useState("");

  const [addJob] = useMutation(ADD_JOB);

  useEffect(() => {
    if (session === null || !sessionStorage.token) {
      history.push("/signin");
    }
  }, [session]);

  const handleSkillSetString = (skillSetString) => {
    setSkillSetString(skillSetString);
    debounce(handleSetSkillSetArray(skillSetString), 1000);
  };

  const handleSetSkillSetArray = (string) => {
    setSkillSetArray(string.split(",").filter((skill) => skill));
  };

  const handleAddJob = () => {
    addJob({
      variables: {
        title: jobTitle,
        role_level: roleLevel,
        company: company,
        skill_set: skillSetArray,
        job_description: jobDescription,
        created_id: session._id,
      },
    })
      .then(async ({ data }) => {
        setIsDisabledField(true);
        setSnackMessage("Add job success.");
        setIsSnackBarOpen(true);
      })
      .catch((err) => {
        setIsDisabledField(false);
        setSnackMessage("Add job fail.");
        setIsSnackBarOpen(true);
      });
  };

  const isSubmitDisabled =
    !jobTitle ||
    !roleLevel ||
    !company ||
    skillSetArray.length === 0 ||
    !jobDescription;

  return (
    <Container component="main" className={classes.container}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add Job
        </Typography>
        <div className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={jobTitle}
                autoComplete="JobTitle"
                name="JobTitle"
                variant="outlined"
                required
                fullWidth
                id="JobTitle"
                label="Job Title"
                autoFocus
                onChange={(e) => setJobTitle(e.target.value)}
                disabled={isDisabledField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                disabled={isDisabledField}
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel id="role-level-select-outlined-label">
                  Role Level *
                </InputLabel>
                <Select
                  labelId="role-level-select-outlined-label"
                  id="RoleLevel"
                  value={roleLevel}
                  onChange={(e) => setRoleLevel(e.target.value)}
                  label="Age"
                >
                  {roleLevelOptions.map((rl) => (
                    <MenuItem value={rl} key={uuidv4()}>
                      {rl}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={company}
                autoComplete="Company"
                name="Company"
                variant="outlined"
                required
                fullWidth
                id="Company"
                label="Company"
                autoFocus
                onChange={(e) => setCompany(e.target.value)}
                disabled={isDisabledField}
              />
            </Grid>
            <Grid item xs={12} className={classes.skillSetContainer}>
              <TextField
                value={skillSetString}
                autoComplete="SkillSet"
                name="SkillSet"
                variant="outlined"
                required
                fullWidth
                id="SkillSet"
                label="Skill Set"
                autoFocus
                onChange={(e) => handleSkillSetString(e.target.value)}
                disabled={isDisabledField}
              />
              <Tooltip
                title={"Please split your skills with a comma."}
                placement="right"
                className={classes.skillSetHelpIcon}
              >
                <HelpOutlineIcon color="secondary" />
              </Tooltip>
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                name="JobDescription"
                variant="outlined"
                required
                fullWidth
                id="JobDescription"
                label="Job Description"
                multiline
                rows="6"
                disabled={isDisabledField}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isSubmitDisabled || isDisabledField}
            onClick={handleAddJob}
          >
            Create Job
          </Button>
        </div>
      </div>
      <Snackbar
        key={uuidv4()}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={isSnackBarOpen}
        autoHideDuration={4000}
        message={snackMessage}
        TransitionComponent={(props) => (
          <Slide
            className={
              isDisabledField ? classes.successSnackBar : classes.errorSnackBar
            }
            {...props}
            direction="down"
          />
        )}
        onClose={() => setIsSnackBarOpen(false)}
      />
    </Container>
  );
};

export default withStyles(styles)(JobAdd);
