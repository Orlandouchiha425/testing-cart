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
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import WorkHistorySharpIcon from "@mui/icons-material/WorkHistorySharp";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { Link } from "react-router-dom";

export default function SideBar({ setUser }) {
  const [state, setState] = React.useState({
    right: false,
  });

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
            text: "Clearance",
            link: "/clearance",
            icon: <SportsEsportsIcon />,
          },
          {
            text: "Pokemon",
            link: "/pokemon",

            icon: <CatchingPokemonIcon />,
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
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* <List>
        {[
          {
            text: "Profile",
            link: "/about",
            icon: <AccountCircleIcon />,
          },
          {
            text: "Portfolio",
            link: "https://orlandouchiha425.github.io/portfolio-rebuilt/",
            target: "_blank",
            icon: <WorkHistorySharpIcon />,
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
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="currentColor"
              className="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
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
