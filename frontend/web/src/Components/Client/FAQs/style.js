// style.js
export const styles = {
  container: {
    width: "100%",
    minHeight: "calc(100vh - 150px)",
    overflowY: "auto",
  },
  innerContainer: {
    width: "80%",
    margin: "auto",
    marginTop: "8px",
    padding: "4px",
    overflowY: "hidden",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "4px",
    color: "#396E8D",
  },
  searchInput: {
    marginBottom: "4px",
    padding: "8px",
    borderRadius: "8px",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
    width: "60%",
    transition: "transform 0.3s",
    "&:focus": {
      transform: "scale(1.05)",
    },
  },
  list: {},
  listItem: {
    marginBottom: "4px",
  },
  button: {
    width: "100%",
    textAlign: "left",
    color: "#192655",
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "#16C2D5",
    },
    padding: "8px",
    borderRadius: "8px",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s",
  },
  answer: {
    padding: "8px",
    textAlign: "left",
    marginTop: "8px",
    backgroundColor: "#F0F4F8",
    borderRadius: "8px",
    transition: "opacity 0.3s",
    opacity: 1,
  },
  notFoundItem: {
    marginBottom: "4px",
    fontWeight: "bold",
    opacity: 0.3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  notFoundText: {
    textAlign: "center",
    fontSize: "1.2rem",
    marginBottom: "16px",
  },
  suggestionsBox: {
    textAlign: "start",
  },
  suggestionsText: {
    textAlign: "center",
    fontSize: "1.5rem",
    marginBottom: "16px",
    fontWeight: "bold",
  },
  suggestionsList: {
    fontSize: "1.2rem",
    listStyleType: "disc",
    listStylePosition: "inside",
  },
};
