import { logout } from "../../utilities/users-service";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import GitHubIcon from "@mui/icons-material/GitHub";
function CustomTabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ setUser, user }) {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function handleLogOut() {
    try {
      logout();
    } catch (error) {
      console.log(error);
    } finally {
      setUser(null);
      navigate("/");
    }
  }

  // function SimplePaper(params) {
  //   return (
  //     <Box
  //       sx={{
  //         display: "flex",
  //         flexWrap: "wrap",
  //         "& > :not(style)": {
  //           m: 1,
  //           width: 128,
  //           height: 128,
  //         },
  //       }}
  //     >
  //       <Paper elevation={3}>
  //         As a skilled software engineer, I have a comprehensive understanding
  //         of various languages and frameworks, including HTML, CSS, JavaScript,
  //         React, Node.js, and Express. My experience extends to working with
  //         databases such as MongoDB, SQL, and PostgreSQL, enabling me to design
  //         and implement robust back-end solutions. I have successfully applied
  //         object-oriented programming principles and the MVC pattern to develop
  //         responsive websites that prioritize user experience. Currently, I am
  //         involved in several projects that showcase my expertise in web
  //         development. "Gamestop" is an ongoing project that demonstrates my
  //         proficiency in React, Node.js, Express.js, and MongoDB. This website
  //         provides users with a seamless platform to purchase video games,
  //         featuring login and signup forms, user reviews, comments, and advanced
  //         search functionalities. Additionally, "Project Connect" reflects my
  //         ability to collaborate effectively in a team environment while
  //         creating visually appealing and accessible portfolio websites for
  //         artists.
  //       </Paper>
  //     </Box>
  //   );
  // }
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label=" Logout" {...a11yProps(0)} />
          <Tab label="About Me " {...a11yProps(1)} />
          <Tab label="Contact" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <h3> Hello, {user.name}</h3>
        <p>Email: {user.email}</p>

        <Button variant="contained" onClick={handleLogOut}>
          Logout
        </Button>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 800,
              height: 900,
            },
          }}
        >
          <Paper elevation={3}>
            <em>Orlando Valadez </em>
            <br />
            Kokomo,Indiana 46901 <br />
            Valadez425@gmail.com
            <br />
            <br />
            As a skilled software engineer, I have a comprehensive understanding
            of various languages and frameworks, including HTML, CSS,
            JavaScript, React, Node.js, and Express. My experience extends to
            working with databases such as MongoDB, SQL, and PostgreSQL,
            enabling me to design and implement robust back-end solutions. I
            have successfully applied object-oriented programming principles and
            the MVC pattern to develop responsive websites that prioritize user
            experience. Currently, I am involved in several personal projects
            that showcase my expertise in web development. "Gamestop" is an
            ongoing project that demonstrates my proficiency in React, Node.js,
            Express.js, and MongoDB. This website provides users with a seamless
            platform to purchase video games, featuring login and signup forms,
            and user reviews. Additionally, "Project Connect" reflects my
            ability to collaborate effectively in a team environment while
            creating visually appealing and accessible portfolio websites for
            artists.
          </Paper>
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 250,
              height: 250,
            },
          }}
        >
          <Paper elevation={3}>
            <h3>Orlando Valadez</h3>
            <a
              href="https://github.com/Orlandouchiha425?tab=repositories"
              target="_blank"
              color="black"
              className=".text-white .bg-white"
            >
              GitHub <GitHubIcon />
            </a>
            <p>Phone #: 317-220-5368</p>
            <p>Kokomo Indiana , 46901</p>
            <a href="mailto:valadez425@gmail.com">Valadez425@gmail.com</a>
          </Paper>
        </Box>
      </CustomTabPanel>
    </Box>
  );
}
