import { useContext, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Swal from "sweetalert2";
import UserContext from "../../contexts/UserContext";

import { Button, Form, Input } from "./style";

export default function SignInForm() {
    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const { url } = useContext(UserContext)
    const [isDisabled, setIsDisabled] = useState("enabled");
    // eslint-disable-next-line no-unused-vars
    const [User, setUser] = useLocalStorage("User","")

    const [userInfos, setUserInfos] = useState({
        email: "",
        password: ""
    })

    const handleChanges = (e) => { setUserInfos({ ...userInfos, [e.target.name]: e.target.value }) };
    const AlertObject = (icon, title, text) => {
        return {
            icon: icon,
            title: title,
            text: text,
            color: `#FFFFFF`,
            background: `#333333`,
            confirmButtonColor: `#5D32E3`,
            padding: `10px`,
            timer: 2000,
            timerProgressBar: true,
            timerProgressBar: `#ffffff`
        }
    }
    const AlertSucess = (result) => {
        if (result.isConfirmed === true || result.isDismissed === true) return navigate("/dashboard")
    }
    const AlertError = (result) => {
        if (result.isConfirmed === true || result.isDismissed === true) return setIsDisabled("enabled")
    }

    const handleIsEmpty = () => {
        if (userInfos.email === '' || userInfos.password === '') {
            Swal.fire(AlertObject(
                "warning",
                "Oops...",
                "Você deve preencher todos os campos!"
            )).then(AlertError);
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsDisabled("disabled");
        handleIsEmpty();
        
        const promise = axios.post(`https://api-artificer.herokuapp.com/sign-in`, userInfos);
        promise.then((res) => {
            setUser({
                token:res.data.token,
                id: res.data.id,
                username: res.data.username
            });
            Swal.fire(AlertObject(
                'success',
                'Login realizado com sucesso!',
                'Entrando em sua conta',
            )).then(AlertSucess);
        })
        promise.catch((e) => {
            Swal.fire(AlertObject(
                "error",
                "Oops...",
                "Email ou senha incorretos!"
            )).then(AlertError);
        });
    }

    return (
        <Form
            onSubmit={handleLogin}
            className={isDisabled}
        >
            <Input
                type="email"
                placeholder="e-mail"
                id="emailInput"
                value={userInfos.email}
                name="email"
                onChange={handleChanges}
            />
            <Input
                type="password"
                placeholder="password"
                id="passwordId"
                value={userInfos.password}
                name="password"
                onChange={handleChanges}
            />
            <Button type="submit">
                {
                    isDisabled === "disabled"
                        ? `Log in ...`
                        : `Log in `
                }
            </Button>
            <Link to='/sign-up'>
                First time? Create an account!
            </Link>
        </Form>

    )
}