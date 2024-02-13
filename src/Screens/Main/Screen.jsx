import { useState } from "react";
import Main from "./Main";

export default function CreateUserScreen() {
    const [key, setKey] = useState(0);

    function resetHandler() {
        setKey((prevKey) => prevKey + 1);
    }

    return <Main key={key} resetHandler={resetHandler} />;
}
