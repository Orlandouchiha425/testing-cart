import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import DownloadIcon from "@mui/icons-material/Download";
import WorkHistorySharpIcon from "@mui/icons-material/WorkHistorySharp";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate, Link } from "react-router-dom";

export default function SideBar({ setUser }) {
  const [state, setState] = React.useState({
    right: false,
  });
  const navigate = useNavigate();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[
          {
            text: "Email Me",
            link: "mailto:valadez425@gmail.com",
            target: "_blank",
          },
          {
            text: "Resume",
            link: "https://docs.google.com/document/d/1QfFMl11ydzrJ28eoK8awNVes_aBP3EcT/edit?usp=drive_link",
            target: "_blank",
          },
        ].map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component="a"
              href={item.link}
              target={item.target}
              rel="noopener noreferrer"
            >
              <ListItemIcon>
                {index % 2 === 0 ? <MailIcon /> : <DownloadIcon />}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {/* Profile and test */}
        {[
          {
            text: "Profile",
            link: "/about",
          },
          {
            text: "portfolio",
            link: "https://orlandouchiha425.github.io/portfolio-rebuilt/",
            target: "_blank",
          },
        ].map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={item.link.startsWith("/") ? Link : "a"}
              to={item.link}
              href={item.link}
              target={item.target}
              rel={item.target === "_blank" ? "noopener noreferrer" : null}
            >
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <AccountCircleIcon />
                ) : (
                  <div>
                    <WorkHistorySharpIcon />
                  </div>
                )}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="currentColor"
              class="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg> */}
            <InfoIcon />
            About Orlando
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
