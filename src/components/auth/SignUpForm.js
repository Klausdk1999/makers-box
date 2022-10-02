import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Swal from "sweetalert2";
import UserContext from "../../contexts/UserContext";

import { Button, Form, Input } from "./style";

export default function SignUpForm() {
    const navigate = useNavigate();
    const { url } = useContext(UserContext)
    const [isDisabled, setIsDisabled] = useState("enabled");

    const [userInfos, setUserInfos] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
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
        if (result.isConfirmed === true || result.isDismissed === true) return navigate("/")
    }
    const AlertError = (result) => {
        if (result.isConfirmed === true || result.isDismissed === true) return setIsDisabled("enabled")
    }

    const handleIsEmpty = () => {
        if ( userInfos.email === "" || userInfos.username === "" || userInfos.password === "" || userInfos.pictureUrl === "" ) {
            Swal.fire(AlertObject(
                "warning",
                "Oops...",
                "You need to fill all the fields!"
            )).then(AlertError);
        }
    }

    const handleRegistration = async (e) => {
        e.preventDefault();
        setIsDisabled("disabled");
        handleIsEmpty();

        const promise = axios.post(`${url}/sign-up`, userInfos);
        promise.then((res) => {
            Swal.fire(AlertObject(
                'success',
                'Good job!',
                'Cadastro realizado com sucesso!'
            )).then(AlertSucess);
        })
        promise.catch((e) => {
            Swal.fire(AlertObject(
                "error",
                "Oops...",
                e.response.status == 409 ? 'Este usuário já existe, tente novamente!' : 'Falha ao realizar cadastro!'
            )).then(AlertError);
        })
    }



    return (
        <Form 
            onSubmit={handleRegistration}
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
                type="username"
                placeholder="username"
                id="usernameId"
                value={userInfos.username}
                name="username"
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
            <Input
                type="password"
                placeholder="confirm password"
                id="passwordConfirmlId"
                value={userInfos.confirmPassword}
                name="confirmPassword"
                onChange={handleChanges}
            />
            <Button type="submit">
                {
                    isDisabled === "disabled"
                        ? `SignUp ...`
                        : `SignUp `
                }
            </Button>
            <Link to='/'>
                Switch back to log in
            </Link>
        </Form>
    )
}