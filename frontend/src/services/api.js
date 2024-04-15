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

    let params_text = constructURL(params);

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
    let magTypes = params.mag_type;

    url = `page=${params.page}&per_page=${params.per_page}`;

    //check for mw types
    //mw can be mww, mwc, mwb, mwr
    //solo hago esto por la discrepancia entre lo que pide el ejercicio y la informacion que tiene la api de features
    if (magTypes["mw"]) {
        magTypes = {
            ...magTypes,
            mw: false, //elimino el basico y agrego las variaciones
            mww: true,
            mwc: true,
            mwb: true,
            mwr: true,
        };
    }

    for (const type in magTypes) {
        if (magTypes[type]) url += `&mag_type[]=${type}`;
    }

    return url;
}
