import http from 'k6/http';

export const options = {
    vus: 10,
    duration: '30s'
};

export default function GetAllComponents() {
    http.get('http://localhost:7005/component/');
}