import http from 'k6/http';

export default function () {
    http.get('http://localhost:7005/denomination/');
}