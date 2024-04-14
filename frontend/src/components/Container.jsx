import React from "react";
import "./styles/styles.css";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getFeatures } from "../services/api";
import ListaTerremotos from "./ListaTerremotos";
import FilterControls from "./FilterControls";
import Pagination from "./Pagination";
import FeatureCard from "./FeatureCard";
import CommentModal from "./CommentModal";
import AllComments from "./AllComments";

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
    const [modal, setModal] = useState(0);
    const handleClose = () => setModal(0);
    const handleShow = () => setModal(1);
    const handleShowForm = () => setModal(2);

    const queryFunction = () => {
        return getFeatures(filter);
    };

    function handlePerPageChange(event) {
        let { name, value } = event.target;

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
            <FeatureCard
                key={feature.id}
                feature={feature}
                showCommentsModal={handleShow}
                showFormCommentsModal={handleShowForm}
            />
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
            <CommentModal
                show={modal}
                handleClose={handleClose}
                body={
                    modal == 1 ? <AllComments comments={["1", "2", "3"]} /> : ""
                }
                title={"Comments"}
            />
        </>
    );
};

export default Container;
