import React, { useState, useEffect } from "react";
import ReactMapGL, { Popup, Marker, FullscreenControl } from "react-map-gl";
import { getLogs } from "./Api";
import NewEntryForm from "./NewEntryForm";

function App() {
  const [logs, setLogs] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [newEntry, setNewEntry] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 39.394845,
    longitude: 33.066552,
    zoom: 6,
  });

  useEffect(() => {
    getEntries();
  }, []);

  const getEntries = async () => {
    const entries = await getLogs();
    setLogs(entries);
  };

  const createNewEntry = (e) => {
    const [long, lat] = e.lngLat;
    setNewEntry({ long, lat });
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactMapGL
        {...viewport}
        width="100%"
        height="100%"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={setViewport}
        mapStyle="mapbox://styles/emirmatik1/ckd0czwhv0wl01imq7tvkulch"
        onDblClick={createNewEntry}
        doubleClickZoom={false}
      >
        <div className="fullscreen-control">
          <FullscreenControl />
        </div>
        {logs
          ? logs.map((entry) => (
              <React.Fragment key={entry._id}>
                <Marker latitude={entry.lat} longitude={entry.long}>
                  <svg
                    style={{
                      width: `calc(${5 * viewport.zoom}px)`,
                      height: `calc(${5 * viewport.zoom}px)`,
                    }}
                    className="marker purple"
                    version="1.1"
                    id="Capa_1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 512 512"
                    onClick={() => setShowPopup({ [entry._id]: true })}
                  >
                    <g>
                      <g>
                        <path
                          d="M256,103.278c-39.429,0-71.505,32.077-71.505,71.505c0,39.429,32.077,71.505,71.505,71.505
			c39.428,0,71.505-32.077,71.505-71.505C327.505,135.355,295.429,103.278,256,103.278z"
                        />
                      </g>
                    </g>
                    <g>
                      <g>
                        <path
                          d="M256,0C158.107,0,78.465,79.642,78.465,177.535c0,40.042,28.089,106.034,83.486,196.143
			c40.502,65.88,81.577,121.48,81.987,122.033L256,512l12.062-16.289c0.41-0.553,41.485-56.153,81.987-122.033
			c55.397-90.109,83.486-156.101,83.486-196.143C433.535,79.642,353.893,0,256,0z M256,276.306
			c-55.98,0-101.522-45.543-101.522-101.522c0-55.98,45.543-101.522,101.522-101.522s101.522,45.543,101.522,101.522
			C357.522,230.763,311.98,276.306,256,276.306z"
                        />
                      </g>
                    </g>
                  </svg>
                </Marker>
                {showPopup[entry._id] && (
                  <Popup
                    latitude={entry.lat}
                    longitude={entry.long}
                    closeButton={true}
                    closeOnClick={false}
                    onClose={() =>
                      setShowPopup({ ...showPopup, [entry._id]: false })
                    }
                    anchor="top"
                  >
                    <div className="popup">
                      <h3>{entry.title}</h3>
                      <p>{entry.comments}</p>
                      {entry.rating ? (
                        <p>
                          <i>Rating: {entry.rating}/10</i>
                        </p>
                      ) : (
                        <p>
                          <i>Not rated</i>
                        </p>
                      )}
                      {entry.image && (
                        <img
                          className="image"
                          src={entry.image}
                          alt={entry.title}
                        />
                      )}
                      <small>
                        Visited on:{" "}
                        {new Date(entry.visited).toLocaleDateString()}
                      </small>
                    </div>
                  </Popup>
                )}
              </React.Fragment>
            ))
          : null}
        <>
          {newEntry ? (
            <>
              <Marker latitude={newEntry.lat} longitude={newEntry.long}>
                <svg
                  style={{
                    width: `calc(${5 * viewport.zoom}px)`,
                    height: `calc(${5 * viewport.zoom}px)`,
                  }}
                  className="marker red"
                  version="1.1"
                  id="Capa_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <g>
                      <path
                        d="M256,103.278c-39.429,0-71.505,32.077-71.505,71.505c0,39.429,32.077,71.505,71.505,71.505
			c39.428,0,71.505-32.077,71.505-71.505C327.505,135.355,295.429,103.278,256,103.278z"
                      />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        d="M256,0C158.107,0,78.465,79.642,78.465,177.535c0,40.042,28.089,106.034,83.486,196.143
			c40.502,65.88,81.577,121.48,81.987,122.033L256,512l12.062-16.289c0.41-0.553,41.485-56.153,81.987-122.033
			c55.397-90.109,83.486-156.101,83.486-196.143C433.535,79.642,353.893,0,256,0z M256,276.306
			c-55.98,0-101.522-45.543-101.522-101.522c0-55.98,45.543-101.522,101.522-101.522s101.522,45.543,101.522,101.522
			C357.522,230.763,311.98,276.306,256,276.306z"
                      />
                    </g>
                  </g>
                </svg>
              </Marker>
              <Popup
                latitude={newEntry.lat}
                longitude={newEntry.long}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setNewEntry(null)}
                anchor="top"
              >
                <NewEntryForm
                  onClose={() => setNewEntry(null)}
                  getEntries={getEntries}
                  location={newEntry}
                />
              </Popup>
            </>
          ) : null}
        </>
      </ReactMapGL>
    </div>
  );
}

export default App;
