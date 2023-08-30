import React, { useEffect, useState } from 'react';
import Plus from '../../images/plus_icon.svg';
import HandDrawn from '../../images/hand_drawn.svg';
import Edit from '../../images/edit_icon2.svg';
import Save from '../../images/save_icon.svg';
import ImageMapper, { Mode } from './image-mapper/ImageMapper';
import '../../draw-place.css';

export const DrawPlace = () => {
  const [img, setImg] = useState();
  const [shape, setShape] = useState(Mode.RECT);
  const [numOfRows, setNumOfRows] = useState(1);
  const [modal, setVisibility] = useState(false);
  const [zones, setZones] = useState({});
  const [objectName, setObjectName] = useState('');
  const [location, setLocation] = useState('');
  const [zoneName, setZoneName] = useState('');
  const [selectedType, setSelectedType] = useState('hall'); //
  const [data, setData] = useState({
    name: 'BNP',
    location: 'Zenica',
    type: 'theater',
    zones: {
      I: {
        location: {
          points:
            '1495,1240 1295,1157 1104,1123 856,1145 603,1253 582,1217 843,1102 1105,1077 1307,1110 1517,1197 1506,1221',
          shape: 'polygon',
        },
        rows: {
          I: {
            seats: [
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20, 21,
            ],
            total_seats: '21',
          },
        },
        seatPrice: 15,
      },
      II: {
        location: {
          points:
            '1566,1196 1310,1084 1104,1053 845,1074 533,1215 514,1180 837,1035 1108,1006 1321,1044 1585,1159',
          shape: 'polygon',
        },
        rows: {
          II: {
            seats: [
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20, 21, 22, 23,
            ],
            total_seats: '23',
          },
        },
        seatPrice: 15,
      },
      III: {
        location: {
          points:
            '1647,1165 1350,1028 1109,981 847,1002 472,1174 446,1135 847,957 1113,936 1366,988 1669,1127',
          shape: 'polygon',
        },
        rows: {
          III: {
            seats: [
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20, 21, 22, 23, 24, 25, 26, 27,
            ],
            total_seats: '27',
          },
        },
        seatPrice: 15,
      },
      IV: {
        location: {
          points:
            '1686,1103 1524,1023 1366,954 1115,907 1115,907 847,931 637,1010 426,1117 397,1081 616,967 840,888 1119,864 1371,912 1543,984 1709,1071',
          shape: 'polygon',
        },
        rows: {
          IV: {
            seats: [
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
            ],
            total_seats: '29',
          },
        },
        seatPrice: 15,
      },
      V: {
        location: {
          points:
            '1730,1048 1492,919 1312,863 1123,837 908,848 711,894 536,964 379,1063 351,1024 517,924 696,849 902,805 1125,791 1320,817 1506,874 1757,1012',
          shape: 'polygon',
        },
        rows: {
          V: {
            seats: [
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
            ],
            total_seats: '31',
          },
        },
        seatPrice: 15,
      },
      VI: {
        location: {
          points:
            '1778,994 1535,855 1311,785 1121,763 896,774 667,829 498,902 336,1003 312,964 469,866 650,789 889,729 1124,719 1318,741 1549,814 1806,957',
          shape: 'polygon',
        },
        rows: {
          VI: {
            seats: [
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
            ],
            total_seats: '33',
          },
        },
        seatPrice: 15,
      },
      VII: {
        location: {
          points:
            '1742,881 1447,745 1129,690 849,707 621,764 369,896 342,856 604,727 840,658 1126,644 1460,704 1765,846',
          shape: 'polygon',
        },
        rows: {
          VII: {
            seats: [
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
            ],
            total_seats: '31',
          },
        },
        seatPrice: 15,
      },
      VIII: {
        location: {
          points:
            '1750,800 1494,685 1128,615 848,631 576,706 368,807 345,770 559,662 841,586 1127,570 1504,641 1772,763',
          shape: 'polygon',
        },
        rows: {
          VIII: {
            seats: [
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
            ],
            total_seats: '31',
          },
        },
        seatPrice: 15,
      },
      IX: {
        location: {
          points:
            '1743,718 1490,609 1127,543 847,559 571,628 361,730 336,688 556,584 840,511 1125,494 1504,560 1767,671',
          shape: 'polygon',
        },
        rows: {
          IX: {
            seats: [
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
            ],
            total_seats: '31',
          },
        },
        seatPrice: 15,
      },
      X: {
        location: {
          points:
            '1745,632 1526,544 1127,468 843,482 571,549 358,647 338,604 561,507 839,440 1126,423 1543,499 1766,591',
          shape: 'polygon',
        },
        rows: {
          X: {
            seats: [
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
            ],
            total_seats: '31',
          },
        },
        seatPrice: 15,
      },
      XI: {
        location: {
          points:
            '1748,555 1530,468 1354,424 1127,392 845,407 573,476 356,567 333,521 560,429 838,363 1125,349 1361,379 1544,424 1771,510',
          shape: 'polygon',
        },
        rows: {
          XI: {
            seats: [
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
            ],
            total_seats: '31',
          },
        },
        seatPrice: 15,
      },
      XII: {
        location: {
          points:
            '1751,474 1448,370 1127,325 891,331 620,385 355,484 334,442 605,341 887,285 1126,280 1452,328 1766,432',
          shape: 'polygon',
        },
        rows: {
          XII: {
            seats: [
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
            ],
            total_seats: '31',
          },
        },
        seatPrice: 15,
      },
      XIII: {
        location: {
          points:
            '1744,394 1439,292 1128,253 891,260 616,308 440,370 428,326 608,265 887,212 1129,207 1447,248 1763,351',
          shape: 'polygon',
        },
        rows: {
          XIII: {
            seats: [
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
            ],
            total_seats: '29',
          },
        },
        seatPrice: 15,
      },
      XIV: {
        location: {
          points:
            '1714,296 1447,217 1121,176 871,178 616,230 392,304 378,263 606,186 860,133 1121,130 1453,169 1729,252',
          shape: 'polygon',
        },
        rows: {
          XIV: {
            seats: [
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
            ],
            total_seats: '29',
          },
        },
        seatPrice: 15,
      },
    },
  });
  const [rows, setRows] = useState();

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

    if (tagName === 'polygon' || tagName === 'rect') {
      if (document.querySelector('.highlighted'))
        document.querySelector('.highlighted').classList.remove('highlighted');
      e.target.classList.add('highlighted');
      setVisibility(true);
    } else {
      if (document.querySelector('.highlighted') && tagName !== 'circle')
        document.querySelector('.highlighted').classList.remove('highlighted');
    }
  }

  // Set active link
  function setActiveLink(e) {
    document.querySelector('.active-link').classList.remove('active-link');
    e.target.classList.add('active-link');
    if (document.querySelector('.highlighted'))
      document.querySelector('.highlighted').classList.remove('highlighted');
  }

  useEffect(() => {
    function handleDelete(event) {
      if (event.key === 'Backspace' && document.querySelector('.highlighted')) {
        const highlighted = document.querySelector('.highlighted');

        document
          .querySelectorAll('circle[visibility="visible"]')
          .forEach((circle) => {
            circle.style.visibility = 'hidden';
          });
        highlighted.remove();
      }
    }

    if (!modal) {
      document.addEventListener('keydown', handleDelete);
    } else {
      document.removeEventListener('keydown', handleDelete);
    }

    // Clean up the event listener when the component unmounts or when modal changes
    return () => {
      document.removeEventListener('keydown', handleDelete);
    };
  }, [modal]);

  // Add rows
  function addRows() {
    setNumOfRows((numOfRows) => numOfRows + 1);
  }

  // Save zone
  function saveZone() {
    const zone = document.querySelector('.highlighted');

    const rowElements = document.querySelectorAll('.rows-wrapper > div');
    const zoneName = document.querySelector('.zone-input').value;

    let zonesData;

    if ('polygon' === zone.tagName) {
      const pointsString = zone.getAttribute('points');
      zonesData = {
        location: {
          points: pointsString,
          shape: zone.tagName,
        },
        rows: {},
      };
    } else {
      const x = zone.getAttribute('x');
      const y = zone.getAttribute('y');
      const w = zone.getAttribute('width');
      const h = zone.getAttribute('height');

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
      const rowSeatsInput = rowElement.querySelector('.row-input');
      const rowName = rowNameInput.value;
      const numSeats = rowSeatsInput.value;

      const rowSeatsArray = Array.from({ length: numSeats }, (_, i) => i + 1);

      const rowObject = {
        seats: rowSeatsArray,
        total_seats: numSeats,
      };

      zonesData.rows[rowName] = rowObject; // Storing the row object using the rowName as the key
    });

    const seatPriceInput = document.querySelector('.seats-price-wrapper input');
    const seatPrice = seatPriceInput.value;

    zonesData.seatPrice = Number(seatPrice);

    setZones((prevZones) => ({
      ...prevZones,
      [zoneName]: zonesData, // Use the zone name as the key
    }));
    console.log(zones);
    //
    //
    //
    //Warnings outlines
    let counter = 0;
    document.querySelectorAll(`.zone-input`).forEach((e, i) => {
      if (e.value === '') {
        e.style = 'outline: 2px solid #f4cd46;';
        counter++;
      }
    });

    // Display different errors
    if (counter > 0) {
    } else {
      setVisibility(false);
      setNumOfRows(1);
      document.querySelector('.highlighted').classList.add('done');
      document.querySelector('.highlighted').classList.remove('highlighted');
      document
        .querySelectorAll('circle[visibility="visible"]')
        .forEach((circle) => {
          circle.style.visibility = 'hidden';
        });
    }
  }

  function handleZoneClick(e, data) {
    if (document.querySelector('.highlighted'))
      document.querySelector('.highlighted').classList.remove('highlighted');
    e.target.classList.add('highlighted');

    setRows(data[1].rows);
  }

  const saveData = () => {
    // Create the object with input values and selected type
    const newData = {
      name: objectName,
      location,
      type: selectedType,
      zones: zones,
    };

    console.log(newData);
  };
  return (
    <div style={img && { height: '100vh' }} className="draw-place-container">
      {modal && (
        <>
          <div className="draw-modal">
            <input
              className="zone-input"
              type="string"
              placeholder="Naziv zone"
              onInput={(e) => {
                e.target.style = 'outline: none;';
                setZoneName(e.target.value); // Update the state with input value
              }}
            />
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
                        e.target.style = 'outline: none;';
                        const inputValue = e.target.value;
                        const h6Element =
                          e.target.parentElement.querySelector('.row-name'); // Select the corresponding h6 element
                        h6Element.textContent = `Row: ${inputValue}`;
                      }}
                    />
                    <div className="row-wrapper">
                      <h6 className="row-name">Row:</h6>{' '}
                      {/* Use a class for selecting */}
                      <input
                        className="zone-input row-input"
                        type="number"
                        placeholder="Number of Seats"
                        onInput={(e) => {
                          e.target.style = 'outline: none;';
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
                  e.target.style = 'outline: none;';
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
              style={{ display: 'none' }}
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
              className="zone"
              type="text"
              placeholder="Naziv objekta"
              onInput={(e) => {
                e.target.style = 'outline: none;';
                setObjectName(e.target.value); // Update the state with input value
              }}
            />

            <input
              className="zone"
              type="text"
              placeholder="Lokacija objekta"
              onInput={(e) => {
                e.target.style = 'outline: none;';
                setLocation(e.target.value); // Update the state with input value
              }}
            />

            <select
              className="zone"
              onChange={(e) => setSelectedType(e.target.value)} // Update the state with selected value
              value={selectedType} // Controlled component value
            >
              <option value="hall">Mala Dvorana</option>
              <option value="medium-hall">Dvorana</option>
              <option value="theater">Kazalište</option>
              <option value="big-hall">Velika Dvorana</option>
              <option value="stadium">Stadion</option>
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
          <div className="img-container img-scnd-container">
            <ImageMapper
              mode={Mode.SELECT}
              cb={(editor) => {
                editor.loadImage(img.src);
                editor.polygon();
              }}
              options={{ width: img.width, height: img.height }}
              handleZoneClick={handleZoneClick}
              preDrawnShapes={data}
            />
            <div className="seats-container">
              <h5>{rows ? 'Odaberite sjedalo' : 'Niste odabrali zonu'}</h5>
              {rows &&
                Object.entries(rows).map(([key, value], i) => {
                  return (
                    <div key={i}>
                      <h6>Red {key}</h6>
                      {Array.from({ length: value.total_seats }, (_, index) => (
                        <div
                          className={`seat ${
                            !value.seats.includes(index + 1)
                              ? 'reserved-seat'
                              : ''
                          }`}
                          key={index}
                        >
                          Sjedalo {index + 1}
                        </div>
                      ))}
                    </div>
                  );
                })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
