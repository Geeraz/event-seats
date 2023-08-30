import { editor } from '@overlapmedia/imagemapper';
import React from 'react';

function ImageMapper({
  options = {},
  style = {},
  cb,
  mode,
  handleShapeClick,
  preDrawnShapes,
  handleZoneClick,
}) {
  const elementRef = React.useRef(null);
  const editorRef = React.useRef(null);

  React.useEffect(() => {
    if (!editorRef.current) {
      const editorInstance = editor(elementRef.current, options, style);
      editorRef.current = editorInstance;
      cb && cb(editorInstance);
    }
  }, [options, style, cb]);

  // Listening to property "mode"
  React.useEffect(() => {
    if (mode) {
      switch (mode) {
        case Mode.RECT:
          editorRef.current.rect();
          break;
        case Mode.CIRCLE:
          editorRef.current.circle();
          break;
        case Mode.ELLIPSE:
          editorRef.current.ellipse();
          break;
        case Mode.POLYGON:
          editorRef.current.polygon();
          break;
        case Mode.SELECT:
          editorRef.current.selectMode();
          break;
        default:
      }
    }
  }, [mode]);

  return (
    <svg
      className="image-map-svg"
      ref={elementRef}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width={options.width}
      height={options.height}
      viewBox={`0, 0, ${options.width}, ${options.height}`}
      preserveAspectRatio="xMinYMin"
      onClick={(e) => {
        if (!preDrawnShapes) {
          handleShapeClick(e);
        }
      }}
    >
      {preDrawnShapes &&
        Object.entries(preDrawnShapes.zones).map(
          ([zoneName, zoneData], index) => {
            let centerX, centerY;

            if (zoneData.location.shape === 'rect') {
              // Calculate center for rectangle
              centerX =
                Number(zoneData.location.position.x) +
                Number(zoneData.location.size.width) / 2;
              centerY =
                Number(zoneData.location.position.y) +
                Number(zoneData.location.size.height) / 2;
            } else if (zoneData.location.shape === 'polygon') {
              // Calculate center for polygon
              const pointsArray = zoneData.location.points
                .split(' ')
                .map((point) =>
                  point.split(',').map((coord) => parseInt(coord))
                );
              const xSum = pointsArray.reduce(
                (sum, point) => sum + point[0],
                0
              );
              const ySum = pointsArray.reduce(
                (sum, point) => sum + point[1],
                0
              );
              centerX = xSum / pointsArray.length;
              centerY = ySum / pointsArray.length;
            }

            if (zoneData.location.shape === 'rect') {
              return (
                <g key={`rect_${index}`}>
                  <rect
                    fill="rgb(102, 102, 102)"
                    stroke="rgb(51, 51, 51)"
                    cursor="pointer"
                    strokeWidth="1"
                    opacity="0.5"
                    strokeDasharray="none"
                    strokeLinejoin="miter"
                    id={zoneName}
                    width={zoneData.location.size.width}
                    x={zoneData.location.position.x}
                    height={zoneData.location.size.height}
                    y={zoneData.location.position.y}
                    onClick={(e) => {
                      handleZoneClick(e, [zoneName, zoneData]);
                    }}
                  ></rect>
                  <text
                    x={centerX}
                    y={centerY}
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fontSize="12"
                    fill="black"
                    style={{
                      pointerEvents: 'none',
                      fill: '#455cd9',
                      fontWeight: '600',
                    }}
                  >
                    {zoneName}
                  </text>
                </g>
              );
            } else if (zoneData.location.shape === 'polygon') {
              // Similar modification for polygons
              return (
                <g key={`pol_${index}`}>
                  <polygon
                    points={zoneData.location.points}
                    fill="rgb(102, 102, 102)"
                    stroke="rgb(51, 51, 51)"
                    cursor="pointer"
                    strokeWidth="1"
                    opacity="0.5"
                    strokeDasharray="none"
                    strokeLinejoin="miter"
                    id={zoneName}
                    onClick={(e) => {
                      handleZoneClick(e, [zoneName, zoneData]);
                    }}
                  ></polygon>
                  <text
                    x={centerX}
                    y={centerY}
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fontSize="12"
                    fill="black"
                    style={{
                      pointerEvents: 'none',
                      fill: '#455cd9',
                      fontWeight: '600',
                    }}
                  >
                    {zoneName}
                  </text>
                </g>
              );
            }
            return null;
          }
        )}
    </svg>
  );
}

export const Mode = Object.freeze({
  RECT: 'rect',
  CIRCLE: 'circle',
  ELLIPSE: 'ellipse',
  POLYGON: 'polygon',
  SELECT: 'selectMode',
});

export default ImageMapper;
