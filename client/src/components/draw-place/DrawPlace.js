import React, { useEffect, useState } from "react";
import Plus from "../../images/plus_icon.svg";
import HandDrawn from "../../images/hand_drawn.svg";
import Edit from "../../images/edit_icon2.svg";
import Save from "../../images/save_icon.svg";
import ImageMapper, { Mode } from "./image-mapper/ImageMapper";
import "../../draw-place.css";

export const DrawPlace = () => {
  const [img, setImg] = useState();
  const [shape, setShape] = useState(Mode.RECT);
  const [numOfRows, setNumOfRows] = useState(1);
  const [modal, setVisibility] = useState(false);
  const [zones, setZones] = useState([]);

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage);

      // Create an image element to calculate its dimensions
      const imgElement = new Image();

      // Set up the onload event handler
      imgElement.onload = () => {
        setImg({
          src: imageUrl,
          filename: selectedImage.name,
          width: imgElement.width,
          height: imgElement.height,
        });
      };

      // Set the src AFTER defining the onload handler
      imgElement.src = imageUrl;
    }
  };

  // Handle shape click
  function handleShapeClick(e) {
    const tagName = e.target.tagName.toLowerCase();

    if (tagName === "polygon" || tagName === "rect") {
      if (document.querySelector(".highlighted"))
        document.querySelector(".highlighted").classList.remove("highlighted");
      e.target.classList.add("highlighted");
      setVisibility(true);
    } else {
      if (document.querySelector(".highlighted") && tagName !== "circle")
        document.querySelector(".highlighted").classList.remove("highlighted");
    }
  }

  // Set active link
  function setActiveLink(e) {
    document.querySelector(".active-link").classList.remove("active-link");
    e.target.classList.add("active-link");
    if (document.querySelector(".highlighted"))
      document.querySelector(".highlighted").classList.remove("highlighted");
  }

  useEffect(() => {
    function handleDelete(event) {
      if (event.key === "Backspace" && document.querySelector(".highlighted")) {
        const highlighted = document.querySelector(".highlighted");

        document
          .querySelectorAll('circle[visibility="visible"]')
          .forEach((circle) => {
            circle.style.visibility = "hidden";
          });
        highlighted.remove();
      }
    }

    if (!modal) {
      document.addEventListener("keydown", handleDelete);
    } else {
      document.removeEventListener("keydown", handleDelete);
    }

    // Clean up the event listener when the component unmounts or when modal changes
    return () => {
      document.removeEventListener("keydown", handleDelete);
    };
  }, [modal]);

  // Add rows
  function addRows() {
    setNumOfRows((numOfRows) => numOfRows + 1);
  }
  // Save zone
  function saveZone() {
    const zone = document.querySelector(".highlighted");

    const rowElements = document.querySelectorAll(".rows-wrapper > div");

    let zonesData;

    if ("polygon" === zone.tagName) {
      const pointsString = zone.getAttribute("points");
      zonesData = {
        location: {
          points: pointsString,
          shape: zone.tagName,
        },
        rows: {},
      };
    } else {
      const x = zone.getAttribute("x");
      const y = zone.getAttribute("y");
      const w = zone.getAttribute("width");
      const h = zone.getAttribute("height");

      zonesData = {
        location: {
          position: { x, y },
          size: { width: w, height: h },
          shape: zone.tagName,
        },
        rows: {}, // Using an object to store row objects
      };
    }

    rowElements.forEach((rowElement, index) => {
      const rowNameInput = rowElement.querySelector("input[type='text']");
      const rowSeatsInput = rowElement.querySelector(".row-input");
      const rowName = rowNameInput.value;
      const numSeats = rowSeatsInput.value;

      const rowSeatsArray = Array.from({ length: numSeats }, (_, i) => i + 1);

      const rowObject = {
        seats: rowSeatsArray,
        total_seats: numSeats,
      };

      zonesData.rows[rowName] = rowObject; // Storing the row object using the rowName as the key
    });

    const seatPriceInput = document.querySelector(".seats-price-wrapper input");
    const seatPrice = seatPriceInput.value;

    zonesData.seatPrice = seatPrice;

    setZones([...zones, zonesData]);
    //
    //
    //
    //Warnings outlines
    let counter = 0;
    document.querySelectorAll(`.zone-input`).forEach((e, i) => {
      if (e.value === "") {
        e.style = "outline: 2px solid #f4cd46;";
        counter++;
      }
    });

    // Display different errors
    if (counter > 0) {
    } else {
      setVisibility(false);
      setNumOfRows(1);
      document.querySelector(".highlighted").classList.add("done");
      document.querySelector(".highlighted").classList.remove("highlighted");
      document
        .querySelectorAll('circle[visibility="visible"]')
        .forEach((circle) => {
          circle.style.visibility = "hidden";
        });
    }
  }

  function handleZoneClick(params) {
    console.log("clicked");
  }

  saveData();

  return (
    <div style={img && { height: "100vh" }} className="draw-place-container">
      {modal && (
        <>
          <div className="draw-modal">
            <h6 className="main-modal-heading">Zone Information</h6>
            <div>
              <p>Rows</p>
              <div className="rows-wrapper">
                {Array.from({ length: numOfRows }, (_, i) => (
                  <div key={i}>
                    <input
                      className="zone-input"
                      type="text"
                      placeholder="Row Name"
                      onInput={(e) => {
                        e.target.style = "outline: none;";
                        const inputValue = e.target.value;
                        const h6Element =
                          e.target.parentElement.querySelector(".row-name"); // Select the corresponding h6 element
                        h6Element.textContent = `Row: ${inputValue}`;
                      }}
                    />
                    <div className="row-wrapper">
                      <h6 className="row-name">Row:</h6>{" "}
                      {/* Use a class for selecting */}
                      <input
                        className="zone-input row-input"
                        type="number"
                        placeholder="Number of Seats"
                        onInput={(e) => {
                          e.target.style = "outline: none;";
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <img onClick={addRows} src={Plus} alt="Add" />
            </div>
            <div className="seats-price-wrapper">
              <p>Seat Price for this Zone</p>
              <input
                onInput={(e) => {
                  e.target.style = "outline: none;";
                }}
                className="zone-input"
                type="number"
                placeholder="BAM"
              />
            </div>
            <a
              onClick={() => {
                saveZone();
              }}
              className="save-zone"
              href="#"
            >
              Save
            </a>
          </div>
          <div
            onClick={() => {
              setVisibility(false);
              setNumOfRows(1);
            }}
            className="blur"
          ></div>
        </>
      )}
      {!img && (
        <>
          <h5 className="test">Unesite sliku za iscrtavanje</h5>
          <label className="add-image-label">
            <input
              style={{ display: "none" }}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
            <img className="plus-icon" src={Plus} alt="Dodaj" />
          </label>
        </>
      )}
      {img && (
        <>
          <div className="zone-inputs">
            <input
              className="zone-input"
              type="text"
              placeholder="Naziv objekta"
              onInput={(e) => {
                e.target.style = "outline: none;";
              }}
            />

            <input
              className="zone-input"
              type="text"
              placeholder="Lokacija objekta"
              onInput={(e) => {
                e.target.style = "outline: none;";
              }}
            />

            <select className="zone-input">
              <option value="hall">Hall</option>
              <option value="medium-hall">Medium Hall</option>
              <option value="big-hall">Big Hall</option>
              <option value="stadium">Stadium</option>
            </select>
          </div>
          <div className="buttons-wrapper">
            <a
              onClick={(e) => {
                setShape(Mode.RECT);
                setActiveLink(e);
              }}
              className="active-link"
              href="#"
            >
              Pravokutnik <div className="rectangle"></div>
            </a>
            <a
              onClick={(e) => {
                setShape(Mode.POLYGON);
                setActiveLink(e);
              }}
              href="#"
            >
              Ručno crtanje <img src={HandDrawn} alt="Rucno crtanje" />
            </a>
            <a
              onClick={(e) => {
                setShape(Mode.SELECT);
                setActiveLink(e);
              }}
              href="#"
            >
              Uređivanje <img src={Edit} alt="Uredjivanje" />
            </a>
          </div>
        </>
      )}
      {img && (
        <>
          <div className="img-container">
            <ImageMapper
              mode={shape}
              cb={(editor) => {
                editor.loadImage(img.src);
                editor.polygon();
              }}
              options={{ width: img.width, height: img.height }}
              handleShapeClick={handleShapeClick}
            />
          </div>
          <a className="save-map" onClick={() => saveData()} href="#">
            Spremi
            <img src={Save} alt="Spremi" />
          </a>
          <div className="img-container">
            <ImageMapper
              mode={shape}
              cb={(editor) => {
                editor.loadImage(img.src);
                editor.polygon();
              }}
              options={{ width: img.width, height: img.height }}
              handleShapeClick={handleZoneClick}
              preDrawnShapes={[
                {
                  type: "rectangle",
                  zoneName: "Tribina 1",
                  rows: [],
                  data: {
                    x: 255,
                    y: 87,
                    width: 164,
                    height: 87,
                  },
                },
                {
                  type: "polygon",
                  zoneName: "Tribina 1",
                  data: {
                    points: "56,86 7,129 7,174 75,173 76,88",
                  },
                },
              ]}
            />
          </div>
        </>
      )}
    </div>
  );
};
