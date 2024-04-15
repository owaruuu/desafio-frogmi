import React from "react";
import "./styles/styles.css";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getFeatures, postComment } from "../services/api";
import ListaTerremotos from "./ListaTerremotos";
import FilterControls from "./FilterControls";
import Pagination from "./Pagination";
import FeatureCard from "./FeatureCard";
import CommentModal from "./CommentModal";
import AllComments from "./AllComments";
import NewCommentForm from "./NewCommentForm";

const Container = () => {
    const [filter, setFilter] = useState({
        page: 1,
        perPage: 10,
        types: {
            md: false,
            ml: false,
            ms: false,
            mw: false, // can be mww, mwc, mwb, mwr
            me: false,
            mi: false,
            mb: false,
            mlg: false,
        },
    });
    const [modalState, setModalState] = useState({
        show: false,
        type: 0,
        featureId: null,
        featureTitle: "",
        comments: [],
    });
    const handleModalState = (state) => {
        setModalState(state);
    };
    const handleCloseModal = () => {
        setNewCommentMessage("");
        setModalState({ ...modalState, show: false });
    };

    const handleNewComment = async (event) => {
        event.preventDefault();
        setThinking(true);
        setNewCommentMessage("");
        try {
            const response = await postComment(
                event.target.comment.value,
                modalState.featureId
            );
            setThinking(false);
            setNewCommentMessage("Comentario creado.");
            refetch();
        } catch (error) {
            setThinking(false);
            setNewCommentMessage("Hubo un error creando el comentario.");
        }
    };

    //New comment form
    const [thinking, setThinking] = useState(false);
    const [newCommentMessage, setNewCommentMessage] = useState("");

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
                modalState={modalState}
                showCommentsModal={handleModalState}
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
                show={modalState.show}
                title={modalState.featureTitle}
                type={modalState.type}
                comments={modalState.comments}
                handleClose={handleCloseModal}
                body={
                    modalState.type == 1 ? (
                        <AllComments comments={modalState.comments} />
                    ) : (
                        <NewCommentForm
                            onSubmit={handleNewComment}
                            thinking={thinking}
                            message={newCommentMessage}
                        />
                    )
                }
            />
        </>
    );
};

export default Container;
