import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  root: {
    display: "flex",
    maxWidth: "100vw",
    overflowX: "hidden",
  },
  categorySelect : {
    width : '100%',
    margin: theme.spacing(1),
    minWidth: '150px',
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    width: `calc(100vw - 240px)`,
    minHeight: "100vh",
  },
  contentShift: {
    width: `calc(100vw - ${240 + theme.spacing(6)}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  },
  creatingButtonContainer: {
    marginTop: theme.spacing(2),
  },
  paddingImgLayout: {
    padding: "0px 20px",
  },
  paddingImg: {
    border: "solid 2px #fb6520",
    borderRadius: "5px",
    width: "100%"
  }
}));
