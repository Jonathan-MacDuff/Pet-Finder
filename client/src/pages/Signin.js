import {React, useState} from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function Signin() {

    const [message, setMessage] = useState('');

    const formSchema = yup.object().shape({
        username: yup.string().required('Username required').max(20),
        password: yup.string().required('Password required').max(20)
    });

    const formik = useFormik({
        initialValues: {
        username: '',
        password: '',
        },
        validationSchema:formSchema,
        onSubmit: (values) => {
            fetch('/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values, null, 2),
            })
            .then((r) => r.json())
            .then((data) => {
                if (data.username) {
                    setMessage(`Successfully logged in as ${data.username}`)
                } else {
                    setMessage('Login failed, please try again')
                }
            }) 
        },
    })


    return (
        <form onSubmit = {formik.handleSubmit}>
            <label>Username
                <input type='text' id='username' name='username' value={formik.values.username}
                    onChange={formik.handleChange}/>
                <p style={{color:'red'}}>{formik.errors.username}</p>
            </label>
            <label>Password
                <input type='text' id='password' name='password' value={formik.values.password}
                    onChange={formik.handleChange}/>
                <p style={{color:'red'}}>{formik.errors.password}</p>
            </label>
            <button type='submit'>Submit</button>
            <p>{message}</p>
        </form>
    );
};
export default Signin