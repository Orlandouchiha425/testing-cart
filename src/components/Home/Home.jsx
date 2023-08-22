import { useEffect, useState } from "react";
import { findAllGames } from "../../utilities/apiRoutes/games-api";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import styles from "./Home.module.css";

export default function Home() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await findAllGames();
      setData(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const loading = () => {
    return <h1>No games to Display</h1>;
  };

  const loaded = () => {
    return (
      <div style={{ paddingBottom: "100px" }}>
        <div className={styles.flexContainer}>
          {data.map((element, index) => (
            <Card key={index} sx={{ width: 300 }} className={styles.shadow}>
              <CardActionArea>
                <a href={`/home/${element._id}`}>
                  <CardMedia
                    component="img"
                    height="350"
                    image={element.img}
                    alt="Game"
                  />
                </a>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {element.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: ${element.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  return data.length > 0 ? loaded() : loading();
}
