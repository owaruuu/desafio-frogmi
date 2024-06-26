import React from "react";
import Card from "react-bootstrap/Card";

const MAG_TYPES = {
    md: "duration",
    ml: "local",
    ms: "20 sec surface wave",
    mw: "W phase",
    mww: "Moment W-phase",
    mwc: "Centroid W-phase",
    mwb: "Body wave W-phase",
    mwr: "Regional W-phase",
    me: "energy",
    mi: "integrated p-wave",
    mb: "short-period body wave",
    mlg: "short-period surface wave",
};

const FeatureCard = ({ feature, showCommentsModal }) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>{feature.attributes.title}</Card.Title>
                <div className="atributos">
                    <p>-temp- id: {feature.id}</p>
                    <p>Magnitud: {feature.attributes.magnitude}</p>
                    <p>
                        Tipo magnitud: {feature.attributes.mag_type}
                        {" - "}
                        {MAG_TYPES[feature.attributes.mag_type]}
                    </p>
                    <p>Lugar: {feature.attributes.place}</p>
                    <p>
                        Fecha:{" "}
                        {new Date(Number(feature.attributes.time)).toString()}
                    </p>
                    <p>
                        Tsunami:{" "}
                        {feature["attributes"]["tsunami"] ? "si" : "no"}
                    </p>
                    <p>Longitud: {feature.attributes.coordinates.longitude}</p>
                    <p>Latitud: {feature.attributes.coordinates.latitude}</p>
                    <p>
                        Mas informacion:{" "}
                        <a href={feature.links.external_url} target="_blank">
                            link
                        </a>
                    </p>
                </div>
                <div className="divider"></div>
                <div className="comments">
                    <button
                        className="newButton"
                        onClick={() =>
                            showCommentsModal({
                                show: true,
                                type: 2,
                                featureId: feature.id,
                                featureTitle: feature.attributes.title,
                                comments: [],
                            })
                        }
                    >
                        crear comentario
                    </button>
                    {feature.comments.length > 0 && (
                        <button
                            className="showButton"
                            onClick={() =>
                                showCommentsModal({
                                    show: true,
                                    type: 1,
                                    featureId: feature.id,
                                    featureTitle: feature.attributes.title,
                                    comments: feature.comments,
                                })
                            }
                        >
                            ver comentarios
                        </button>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
};

export default FeatureCard;
