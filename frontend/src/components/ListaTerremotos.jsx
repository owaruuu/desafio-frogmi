import React from "react";
import { useState } from "react";
import Pagination from "./Pagination";

const ListaTerremotos = (props) => {
    const [currentPage, setCurrentPage] = useState(1); //sacar
    if (props.isLoading) {
        return (
            <>
                <span>Cargando...</span>
            </>
        );
    }

    if (props.isError) {
        console.log("🚀 ~ Features ~ error:", props.error);
        return <h4>Error con el servidor</h4>;
    }

    if (props.features.length === 0) {
        return <h4>No se encontraron Terremotos</h4>;
    }

    return (
        <>
            <div className="features">{props.features}</div>
        </>
    );
};

export default ListaTerremotos;
