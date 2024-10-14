import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../components/public/Login";
import NoFound from "../../components/public/NoFound";

export default function Public() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NoFound />} />
        </Routes>
    )
}

