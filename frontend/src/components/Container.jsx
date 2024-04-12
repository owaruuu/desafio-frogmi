import React from "react";
import "./styles/styles.css";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getFeatures } from "../services/api";
import Card from "react-bootstrap/Card";
import ListaTerremotos from "./ListaTerremotos";
import FilterControls from "./FilterControls";
import Pagination from "./Pagination";

const MAG_TYPES = {
    md: "duration",
    ml: "local",
    ms: "20 sec surface wave",
    mw: "W phase",
    me: "energy",
    mi: "integrated p-wave",
    mb: "short-period body wave",
    mlg: "short-period surface wave",
};

const Container = () => {
    const [filter, setFilter] = useState({
        page: 1,
        perPage: 10,
        types: {
            md: false,
            ml: false,
            ms: false,
            mw: false,
            me: false,
            mi: false,
            mb: false,
            mlg: false,
        },
    });

    const queryFunction = () => {
        return getFeatures(filter);
    };

    function handlePerPageChange(event) {
        console.log("se llama");
        let { name, value } = event.target;
        console.log("🚀 ~ handlePerPageChange ~ name, value:", name, value);

        if (value > 1000) {
            value = 1000;
        }

        if (value < 0) {
            value = 0;
        }

        setFilter((prev) => ({
            ...prev,
            [name]: Number(value),
        }));
    }

    const {
        data: query,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: "features",
        queryFn: queryFunction,
        retry: 0,
        manual: true,
    });

    useEffect(() => {
        refetch();
    }, [filter.page]);

    let features = "";
    if (isSuccess) {
        features = query.data.data.map((feature) => (
            <Card key={feature.id}>
                <Card.Body>
                    <Card.Title>{feature.attributes.title}</Card.Title>
                    <div className="atributos">
                        <p>-temp- id: {feature.id}</p>
                        <p>Magnitud: {feature.attributes.magnitude}</p>
                        <p>
                            Tipo magnitud: {feature.attributes.mag_type}
                            {" - "}
                            {feature.attributes.mag_type.includes("mw")
                                ? MAG_TYPES["mw"]
                                : MAG_TYPES[feature.attributes.mag_type]}
                        </p>
                        <p>Lugar: {feature.attributes.place}</p>
                        <p>
                            Fecha:{" "}
                            {new Date(
                                Number(feature.attributes.time)
                            ).toString()}
                        </p>
                        <p>
                            Tsunami:{" "}
                            {feature["attributes"]["tsunami"] ? "si" : "no"}
                        </p>
                        <p>
                            Longitud: {feature.attributes.coordinates.longitude}
                        </p>
                        <p>
                            Latitud: {feature.attributes.coordinates.latitude}
                        </p>
                        <p>
                            Mas informacion:{" "}
                            <a
                                href={feature.links.external_url}
                                target="_blank"
                            >
                                link
                            </a>
                        </p>
                    </div>
                </Card.Body>
            </Card>
        ));
    }

    return (
        <>
            <FilterControls
                features={features}
                query={query}
                onClick={refetch}
                setFilter={setFilter}
                filter={filter}
                perPageChange={handlePerPageChange}
            />
            <Pagination
                className="pagination-bar"
                currentPage={query?.data.pagination.current_page}
                totalCount={query?.data.pagination.total}
                pageSize={query?.data.pagination.per_page}
                onPageChange={(page) => setFilter({ ...filter, page: page })}
            />
            <ListaTerremotos
                features={features}
                filter={filter}
                query={query}
                isLoading={isLoading}
                isError={isError}
                error={error}
            />
        </>
    );
};

export default Container;
