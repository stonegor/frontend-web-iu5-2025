import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthorsAction } from "./slices/authorsSlice";
import { getAuthors } from "./api/authors";

export function GetData() {
    const dispatch = useDispatch();
    
    async function fetchData() {
        const data = await getAuthors();
        dispatch(setAuthorsAction(data));
    }

    useEffect(() => {
        fetchData();
    }, []);
}
