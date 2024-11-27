import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export function useContent() {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get(`${BACKEND_URL}/content`, {
            headers : {
                "token" : localStorage.getItem("token")
            }
        }).then((response : any) => {
            setData(response.data?.contents)
        })
    }, []);
    return data;
}