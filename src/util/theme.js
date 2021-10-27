export default {
  palette: {
    primary: {
      light: "#33CD9C",
      main: "#00BCD4",
      dark: "#008394",
      contrastText: "#FFFFFF",
    },

    secondary: {
      light: "#FF6333",
      main: "#FF3D00",
      dark: "#B22A00",
      contrastText: "#FFFFFF ",
    },
  },

  spreadThis: {
    typography: {
      useNextVariants: true,
    },

    form: {
      textAlign: "center",
      backgroundColor: "transparent",

      "& .button": {
        margin: "25px !important",
        padding: "5px 15px !important",
        position: "relative",
      },
    },

    formpart: {
      backgroundColor: "white",
      padding: "30px 40px",
      borderRadius: "20px",
      boxShadow: "0 0 15px 3px rgba(0,0,0, .5)",
    },

    image: {
      margin: "20px auto 20px auto",
      width: "200px",
    },

    groupomaniaBrand: {
      width: "200px",
    },

    imagePost: {
      width: "100%",
      height: "100%",
      maxWidth: "450px",
    },

    pageTitle: {
      margin: "10px auto 10px auto",
    },

    textField: {
      margin: "10px auto 10px auto",
    },

    customError: {
      color: "red",
      fontSize: "0.8rem",
      marginTop: 10,
    },

    progress: {
      position: "absolute",
    },

    invisibleSeparator: {
      border: "none",
      margin: 4,
    },

    visibleSeparator: {
      width: "100%",
      borderBottom: "1px solid rgba(0,0,0,.1)",
      maginBottom: 20,
    },
  },
};
