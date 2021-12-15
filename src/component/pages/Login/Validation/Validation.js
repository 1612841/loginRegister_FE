import React, { useState } from "react";

const Validation = () => {
    //
    const [touched, setTouched] = useState({
        email: false,
        password: false
    });

    const handleBlur = (field) => (e) => {
        setTouched({...touched, [field]: true})
    };

    function Validate(email, password) {
        const errors = {
            email: '',
            password: ''
        }
        //
        if (touched.password && password.length < 6 )
            errors.password = 'Password must be over 5 symbol';
        else if (touched.password && password.length > 8)
            errors.password = 'Password must be under 9 symbol';
        
        const reg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (touched.email && !reg.test(email))
            errors.email = 'Email Format is wrong';
        return errors
    }
    return {handleBlur, Validate}
}

export default Validation;