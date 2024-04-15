import React from "react";

const ListaTerremotos = (props) => {
    if (props.isLoading) {
        return <span>Cargando...</span>;
    }

    if (props.isError) {
        return <h4>Error con el servidor</h4>;
    }

    if (props.features.length === 0) {
        return <h4>No se encontraron Terremotos</h4>;
    }

    return <div className="features">{props.features}</div>;
};

export default ListaTerremotos;
