import axios from 'axios'
import {Flight} from "../Flight";

const baseUrl = 'localhost:3000'
const itemUrl = `http://${baseUrl}/flight`

interface ResponseProps<T> {
    data: T;
}

function withLogs<T>(promise: Promise<ResponseProps<T>>, fnName: string): Promise<T> {
    return promise
        .then(res => {
            return Promise.resolve(res.data);
        })
        .catch(err => {
            return Promise.reject(err);
        });
}

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

export const getItems: () => Promise<Flight[]> = () => {
    return withLogs(axios.get(itemUrl, config), 'getNames');
}

export const createItem: (item: Flight) => Promise<Flight[]> = item => {
    return withLogs(axios.post(itemUrl, item, config), 'save');
}

export const updateItem: (item: Flight) => Promise<Flight[]> = item => {
    return withLogs(axios.put(`${itemUrl}/${item.id}`, item, config), 'update')
}

interface MessageData {
    event: string,
    payload: {
        item: Flight
    }
}

//TODO add logs
export const newWebSocket = (onMessage: (data: MessageData) => void) => {
    const ws = new WebSocket(`ws://${baseUrl}`)
    ws.onopen = () => {
    };
    ws.onclose = () => {
    };
    ws.onerror = error => {
    };
    ws.onmessage = messageEvent => {
        onMessage(JSON.parse(messageEvent.data));
    };
    return () => {
        ws.close();
    }
}
