import { useState } from "react";

export const useForm = ( inicialForm = {}) => {

    const [formState, setFormState ] = useState(inicialForm);

    const onInputChage = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        })
    }

    const onResetForm = () => {
        setFormState( inicialForm );
    }

    return { 
        ...formState,
        formState,
        onInputChage,
        onResetForm,
    }

}