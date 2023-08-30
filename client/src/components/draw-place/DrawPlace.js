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
  const [data, setData] = useState({
    _id: { $oid: '64ef2f9bfeca31881df8edbc' },
    zones: {
      Tribina: {
        amount: 1512,
        max_amount: 1512,
        price: 10,
        name: 'Regular',
        location: {
          position: {
            x: '72',
            y: '88',
          },
          size: {
            width: '147',
            height: '75',
          },
          shape: 'rect',
        },
        rows: {
          III: {
            seats: [1, 4, 5, 6, 7, 8, 9, 13, 14, 15, 16, 17, 18, 19],
            total_seats: '19',
          },
          IV: {
            seats: [
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 16, 17, 18, 19, 20, 21, 22, 23,
            ],
            total_seats: '23',
          },
        },
        seatPrice: '15',
      },
      Tribina2: {
        amount: 1512,
        max_amount: 1512,
        price: 10,
        name: 'Regular',
        location: {
          position: {
            x: '362',
            y: '88',
          },
          size: {
            width: '147',
            height: '75',
          },
          shape: 'rect',
        },
        rows: {
          I: {
            seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 13, 14, 15, 16, 17, 18, 19],
            total_seats: '19',
          },
          II: {
            seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 20, 21, 22, 23],
            total_seats: '23',
          },
        },
        seatPrice: '15',
      },
      Tribina3: {
        amount: 1512,
        max_amount: 1512,
        price: 10,
        name: 'Regular',
        location: {
          points: '73,169 72,238 215,241 214,169',
          shape: 'polygon',
        },
        rows: {
          C: {
            seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            total_seats: '15',
          },
          D: {
            seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            total_seats: '12',
          },
          F: {
            seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            total_seats: '12',
          },
        },
        seatPrice: '10',
      },
    },
    name: 'Zetra',
    location: 'Test',
    type: 'hall',
    __v: 0,
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
    let counter = 0;
    console.log(document.querySelector('.highlighted'));
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

  return (
    <div style={img && { height: '100vh' }} className="draw-place-container">
      {modal && (
        <>
          <div className="draw-modal">
            <h6 className="main-modal-heading">Podatci o zoni</h6>
            <div>
              <p>Redovi</p>
              <div className="row-wrapper">
                {Array.from({ length: numOfRows }, (_, i) => (
                  <div key={i}>
                    <h6>Red {i + 1}</h6>
                    <input
                      className="zone-input"
                      type="number"
                      placeholder="Broj sjedala"
                      onInput={(e) => {
                        e.target.style = 'outline: none;';
                      }}
                    />
                  </div>
                ))}
              </div>
              <img onClick={addRows} src={Plus} alt="Dodaj" />
            </div>
            <div className="seats-price-wrapper">
              <p>Cijena sjedala za ovu zonu</p>
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
              Spremi
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
          <a className="save-map" href="#">
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
