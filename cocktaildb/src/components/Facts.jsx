import React from "react";
import "../css/Facts.css";

const Facts = () => {
  return (
    <div className="facts">
      <div className="facts__heading">
        <h1 className="facts__title">As a matter of fact !</h1>
        <hr className="facts__underline" />
      </div>
      <div className="facts__wrapper">
        <div
          className="facts__col"
          ontouchstart="this.classList.toggle('hover');"
        >
          <div className="facts__container">
            <div
              className="facts__front"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1596097092487-5cced74300e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60")',
              }}
            >
              <div className="facts__inner">
                <p>Fact #1</p>
              </div>
            </div>
            <div className="facts__back">
              <div className="facts__inner">
                <p>
                  There is a cocktail known as a “Sully,” named after the pilot
                  of US Airways Flight 1549, which consists of two shots of Grey
                  Goose and a splash of water
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="facts__col"
          ontouchstart="this.classList.toggle('hover');"
        >
          <div className="facts__container">
            <div
              className="facts__front"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1517620114540-4f6a4c43f8ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60")',
              }}
            >
              <div className="facts__inner">
                <p>Fact #2</p>
              </div>
            </div>
            <div className="facts__back">
              <div className="facts__inner">
                <p>
                  Did you know that in Texas, USA, there is a state law that
                  prohibits you from having more than three sips of beer whilst
                  standing?!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="facts__col"
          ontouchstart="this.classList.toggle('hover');"
        >
          <div className="facts__container">
            <div
              className="facts__front"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1594401333633-598ef7c1e801?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60")',
              }}
            >
              <div className="facts__inner">
                <p>Fact #3</p>
              </div>
            </div>
            <div className="facts__back">
              <div className="facts__inner">
                <p>
                  How many Margaritas could you drink in an hour? We’d say two
                  or three max, but did you know that 185,000 Margaritas are
                  drunk every single hour in the USA, making it the most popular
                  cocktail in the States!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Facts;
