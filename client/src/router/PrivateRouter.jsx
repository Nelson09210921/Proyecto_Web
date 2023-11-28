import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom"
import { counterContext } from "../context/counterContex";

export const PrivateRouter = ({children}) => {
    const { state } = useContext(counterContext);

    /* return state[0]?.logged ? children : <Navigate to='/login'/>; */
    /* return state[0]?.logged ? <Navigate to='/productos'/> : <Navigate to='/login'/>; */
}