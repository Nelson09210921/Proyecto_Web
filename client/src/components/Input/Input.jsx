import { createRef, FocusEvent, useEffect, useRef, useState } from 'react';
import './Input.Style.css'

export const InputPers = ({
    inputContClass,
    inputClass,
    titulo,
    type,
    campo,
    autoComplete,
    cols,
    rows,
    isFocused
  }) => {

    const [isActive, setIsActive] = useState('');
    const [value, setValue] = useState({});
    const [formData, setFormData] = useState({});
    const [focusValue, setFocusValue] = useState();      
   
   /*  const handleUsernameFocus = () => {
      inputRef.current.focus()
      inputRef.current.style.border = '5px solid blue';
        setIsActive(true);
        console.log('escribiendo');
    }; */

    
   /* 
    const onFocus = () => {
    }

    const handleChangeForm = (event) => {
        const data = event.target.value;
        setValor({
          ...valor,
          [event.target.name] : event.target.value
        })
        
        setValor(data);
        sendData(campo, data);
        console.log(campo, data);
    }
    */

      const handleChangeForm = (e) => {
    
        const campo = e.target.name;
        const value = e.target.value;
    
        console.log(campo);
        console.log(value);
        
        setFormData({
            ...formData,
            [ campo ] : value
        })

        setValue(e.target.value);
        console.log(value);
      };

      const handleFocus = (event) => {
        const focusValue = event.target.value;
        console.log("Should be focus value", focusValue);
        setFocusValue(focusValue);
      };
    
      const handleBlur = (event) => {
        const blurValue = event.target.value;
        console.log("Should be blur value", blurValue);
        if (focusValue !== blurValue) {
          console.log("Do something");
        }
      };
      

    const InputTxt = () => {

        return (
            <div className={`${inputContClass} inputBox`}>

                {/*
                <label className={`labelForm ${isActive ? 'active' : ''}`} htmlFor={campo}> {titulo}</label>
                */}

                <input 
                    className={inputClass}
                    type={type}
                    name={campo}
                    id={campo}
                    autoComplete={autoComplete}
                    value={value}
                    setValue={setValue}
                    onChange={handleChangeForm}                    
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    />

            {isFocused && <p>El input está enfocado</p>}
            </div>
        )
    }

    const InputDate = () => {
        return (
            <div className={`${inputContClass} inputBox`}>

                <label className="labelForm active" htmlFor={campo}> {titulo}</label>
                <input 
                    className={inputClass}
                    type={type}
                    name={campo}
                    id={campo}
                    autoComplete={autoComplete}
                    /* value={valor}
                       onChange={e => onChange(e.target.value)}
                    
                    onFocus={handleInputFocus}
                    /*
                    value={valor}
                    placeholder={titulo}
                    
                    /*
                    onBlur={handleInputBlur} */
                    />
            </div>
        )
    }

    const InputSelect = () => {
        return (
            <div className={`${inputContClass} inputBox`}>

                <label className="labelForm active" htmlFor={campo}> {titulo}</label>

                <select
                  className={inputClass}
                  name={campo}
                  id={campo}
                  /* onFocus={handleInputFocus} */
                  >
                  <option value="">{campo}</option>
                  <option value="opcion1">Opción 1</option>
                  <option value="opcion2">Opción 2</option>
                  <option value="opcion3">Opción 3</option>
                </select>
            </div>
        )
    }

    const InputTxtArea = () => {
        return (
            <div className={`${inputContClass} inputBox`}>
            <label className={isActive ? 'active' : ''} htmlFor={campo}> {titulo}</label>
            <textarea
                className={inputClass}
                type={type}
                name={campo}
                id={campo}
                autoComplete={autoComplete}
                cols={cols}
                rows={rows}                
                /*
                onChange={handleChange}
                placeholder={titulo}
                onFocus={handleInputFocus}
                */
                ></textarea>
            </div>
        )
    }

    const ComponentePadre = () => {
        if (type === 'text' || type === 'number' || type === 'email' || type === 'tel' || type === 'password' ) {
          return <InputTxt />;
        } else if (type === 'selec') {
          return <InputSelect />;
        } else if (type === 'date') {
          return <InputDate />;
        } else if (type === 'textArea') {
          return <InputTxtArea />;
        } else {
          return <h1>value inválido. No se encontró ningún componente correspondiente.</h1>;
        }
    };


  return (
    <>
        <ComponentePadre />
    </>
  )
}
