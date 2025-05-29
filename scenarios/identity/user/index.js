import http from 'k6/http';

export const options = {
    vus: 10,
    duration: '30s'
};

export default function loginUser() {
    const url = 'http://localhost:5113/user/login';
    const payload = JSON.stringify({
        email: "****",
        password: "****"
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    http.post(url, payload, params);
}