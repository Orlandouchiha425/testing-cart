import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { platform, genre } from "../../utilities/list-items/list-items";

import { createGames } from "../../utilities/apiRoutes/games-api";
import { useEffect } from "react";
export default function CreateGameForm({ setUser }) {
  const [data, setData] = useState({
    title: "",
    price: 0,
    description: "",
    genre: "",
    releaseDate: "",
    error: "",
    successful: "",
    clearance: "",
    img: "",
    pokemon: "",
    quantity: 0,
  });
  const navigate = useNavigate();
  // const [imageData,  setImageData ] = useState('')
  // const navigate = Navigate()
  useEffect(() => {
    handleChange();
  }, []);
  const handleChange = async (event) => {
    const { name, value, type, checked } = event.target;

    // Handle checkboxes
    if (type === "checkbox") {
      setData({ ...data, [name]: checked });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      await createGames(data);
      setData({ successful: "Game created successfully", error: "" });
    } catch (error) {
      setData({ error: "Something went wrong. Please complete the form." });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Game Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          id="exampleFormControlInput1"
          required="true"
          placeholder="Game Title"
          value={data.title}
          onChange={handleChange}
        />
      </div>
      url: <input name="img" type="text" onChange={handleChange} /> <br />
      <div className="form-group">
        <label type="text">Genre</label>
        <select
          className="form-control"
          id="exampleFormControlSelect1"
          required="true"
          name="genre"
          value={data.genre}
          onChange={handleChange}
        >
          {genre.map((type, index) => (
            <option value={type.value} key={index}>
              {type.label}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label type="text">Platform</label>
        <select
          className="form-control"
          id="exampleFormControlSelect1"
          required="true"
          value={data.platform}
          name="platform"
          onChange={handleChange}
        >
          {platform.map((type, idx) => (
            <option value={type.value} key={idx}>
              {type.label}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label for="exampleFormControlTextarea1">Descripton</label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          required="true"
          onChange={handleChange}
          name="description"
          value={data.description}
        ></textarea>
      </div>
      <div className="form-group">
        <label for="exampleFormControlInput1">Release Date</label>
        <input
          type="date"
          className="form-control"
          id="exampleFormControlInput1"
          onChange={handleChange}
          name="releaseDate"
          value={data.releaseDate}
        />
      </div>
      <div className="form-group">
        <label type="text">Price</label>
        <input
          className="form-control"
          type="number"
          id="exampleFormControlSelect1"
          required="true"
          name="price"
          value={data.price}
          onChange={handleChange}
        >
          {/* { prices.map((result,idx) => (
    <option value={result.value} key={idx}>{result.label}</option>
  ))} */}
        </input>
        <div className="form-group">
          <label>Clearance</label>
          <input
            type="text"
            name="clearance"
            className="form-control"
            id="exampleFormControlInput1"
            required="true"
            placeholder="clearance"
            value={data.clearance}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label for="exampleFormControlInput1">Quantity</label>
          <input
            type="number"
            className="form-control"
            id="exampleFormControlInput1"
            onChange={handleChange}
            name="quantity"
            value={data.quantity}
          />
        </div>
        <div className="form-group">
          <label>Pokemon</label>
          <input
            type="text"
            name="pokemon"
            className="form-control"
            id="exampleFormControlInput1"
            required="true"
            placeholder="pokemon"
            value={data.pokemon}
            onChange={handleChange}
          />
        </div>

        <fieldset>
          {" "}
          <br></br>{" "}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </fieldset>

        <p className="successful-message">&nbsp;{data.successful}</p>
      </div>
    </form>
  );
}
