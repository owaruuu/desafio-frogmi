import React from "react";
import Form from "react-bootstrap/Form";

const FilterControls = (props) => {
    const filterArray = Object.keys(props.filter.types);
    const checkboxes = filterArray.map((type) => {
        return (
            <Form.Check // prettier-ignore
                type={"checkbox"}
                key={type}
                id={type}
                label={type}
                checked={props.filter.types[type]}
                onChange={() =>
                    props.setFilter((prev) => ({
                        ...prev,
                        types: {
                            ...prev.types,
                            [type]: !prev.types[type],
                        },
                    }))
                }
            />
        );
    });

    return (
        <div>
            Filtros
            <Form className="filterContainer">
                <div className="filterCheckboxes">{checkboxes}</div>{" "}
                <div className="perPage">
                    <label htmlFor="features">Terremoto por pagina: </label>
                    <select
                        name="perPage"
                        id="features"
                        value={props.filter.perPage}
                        onChange={props.perPageChange}
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                    </select>
                </div>
            </Form>
            <div className="filterControls">
                {props.features.length > 0 && (
                    <span className="found">
                        {props.query?.data.pagination.total} encontrados
                    </span>
                )}
                <button onClick={props.onClick}>Filtrar</button>
            </div>
        </div>
    );
};

export default FilterControls;
