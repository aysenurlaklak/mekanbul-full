const getToken = () => localStorage.getItem("session_token");

const setToken = (token) => {
    localStorage.setItem("session_token", token);
};

const clearToken = () => {
    localStorage.removeItem("session_token");
};

const decodeBase64 = (value) => {
    const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
    return atob(padded);
};

const getPayload = () => {
    const token = getToken();
    if (!token) {
        return null;
    }
    try {
        const payload = token.split(".")[1];
        return JSON.parse(decodeBase64(payload));
    } catch (error) {
        return null;
    }
};

const isAuthenticated = () => Boolean(getToken());

const isAdmin = () => {
    const payload = getPayload();
    return payload?.role === "admin";
};

export {
    getToken,
    setToken,
    clearToken,
    getPayload,
    isAuthenticated,
    isAdmin,
};