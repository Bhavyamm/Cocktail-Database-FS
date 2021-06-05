import React, { useState } from "react";
import { createDrink } from "../actions/cocktailActions";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const CreateDrinkScreen = () => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    category: "",
    instructions: "",
    ingredients: "",
    price: 0,
  });

  const { name, image, category, instructions, ingredients, price } = formData;

  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createDrink(formData));

    setFormData({
      name: "",
      image: "",
      category: "",
      instructions: "",
      ingredients: "",
      price: 0,
    });
  };

  // console.log(image, "image");

  const Button = styled.button`
    display: inline-block;
    color: #39a6a3;
    font-size: 1em;
    padding: 0.25em 1em;
    border: 2px solid #39a6a3;
    border-radius: 3px;
    display: block;
  `;

  return (
    <div>
      <div
        className="container mt-4 p-4"
        style={{
          maxWidth: "600px",
          backgroundColor: "#343A40",
          borderRadius: "15px",
          boxShadow: "-6px 5px 5px 0px rgba(0,0,0,0.85)",
        }}
      >
        <h1 className="text-center mb-3 text-light">Create a Drink</h1>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <label htmlFor="name" className="text-light">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              aria-describedby="name"
              value={name}
              name="name"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="image" className="text-light">
              Image
            </label>
            <input
              type="text"
              className="form-control"
              id="file"
              aria-describedby="file"
              value={image}
              name="image"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="category" className="text-light">
              Category
            </label>
            <input
              type="text"
              className="form-control"
              id="category"
              value={category}
              name="category"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price" className="text-light">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              value={price}
              name="price"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="instructions" className="text-light">
              Instructions
            </label>
            <input
              type="text"
              className="form-control"
              id="instructions"
              value={instructions}
              name="instructions"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="ingredients" className="text-light">
              Ingredients
            </label>
            <input
              type="text"
              className="form-control"
              id="ingredients"
              value={ingredients}
              name="ingredients"
              onChange={(e) => onChange(e)}
            />
            <small className="form-text text-light">
              Please use comma separated values (eg. Water,Milk,Sugar)
            </small>
          </div>
          <Button type="submit" className="btn btn-block search-btn">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateDrinkScreen;
