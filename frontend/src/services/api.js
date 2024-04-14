import axios from "axios";

const URL = "http://localhost:3000/api";

const axiosOptions = {};

const api = axios.create(axiosOptions);

export async function getFeatures({ page, perPage, types }) {
    const params = {
        page: page,
        per_page: perPage,
        mag_type: types,
    };
    console.log("🚀 ~ getFeatures ~ params:", params);

    let params_text = constructURL(params);
    console.log("🚀 ~ getFeatures ~ params_text:", params_text);

    try {
        const response = await api.get(`${URL}/features?${params_text}`);
        console.log("🚀 ~ getFeatures ~ response:", response);
        return response;
    } catch (error) {
        console.log("there was an error with the request:", error);
        throw error;
    }
}

export async function postComment(content, featureId) {
    if (content.trim().length == 0) {
        throw new Error("el comentario debe tener contenido");
    }

    try {
        const response = await api.post(
            `${URL}/features/${featureId}/comments`,
            { content }
        );
        console.log("🚀 ~ postCommnet ~ response:", response);
        return response;
    } catch (error) {
        console.log("🚀 ~ postCommnet ~ error:", error);
        throw error;
    }
}

function constructURL(params) {
    let url = "";

    url = `page=${params.page}&per_page=${params.per_page}`;

    for (const type in params.mag_type) {
        if (params.mag_type[type]) url += `&mag_type[]=${type}`;
    }

    return url;
}
