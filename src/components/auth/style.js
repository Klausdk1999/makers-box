import styled from "styled-components"

const Input = styled.input`
    width: 85%;
    height: 65px;
    background: #FFFFFF;
    border-radius: 6px;
    margin-bottom: 15px;
    border: none;
    text-indent:15px;
    color: black;
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 25px;
    color: #000000;
    &::placeholder{
        color: #9F9F9F;
    }
    &:focus {
        outline: none;
        border: 2px solid #05e3fc;
    }
`

const Button = styled.button`
    width: 85%;
    height: 65px;
    background: #5D32E3;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;

    font-family: 'Oswald';
    font-weight: 700;
    font-size: 27px;
    color: #FFFFFF;

    &:hover {
        background-color: #B9B6F4;
    }
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    &.disabled{
        a,
        ${Button},
        ${Input}{
            pointer-events: none;
            overflow:hidden;
            opacity: 0.6;
        }
        ${Input}{
            color: 9F9F9F;
        }
    }
`


const AvailableArea = styled.div`
    display: flex;
    min-height: 100vh;
    font-style: normal;
    color: #FFFFFF;
    font-weight: 700;
    h1{
        font-family: 'Silkscreen', cursive;
        letter-spacing: 0.05em;
        font-size: 106px;
        line-height: 117px;
    }

    h2{
        font-family: 'Oswald';       
        font-size: 43px;
        line-height: 64px;
        color: #FFFFFF;
        width: 450px;
    }

     div{
        //background: #151515;
        background: rgb(0,0,0);
        background: linear-gradient(32deg, rgba(0,0,0,1) 0%, rgba(93,50,227,1) 43%, rgba(216,116,233,1) 100%); 
        box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
        min-height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 144px;
        padding-right: 10%;
       
      
     }

     span{
        min-width: 550px;
       
        min-height: 100%;
        background-color: #333333;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
     }






     a{
        font-family: 'Lato';
        font-weight: 400;
        font-size: 20px;
        line-height: 24px;
        text-decoration-line: underline;
        color: #FFFFFF;
        margin-top: 15px;
        transition: font-size 0.4s;

        &:hover {
            font-size: 23px;
        }
     }

     @media(max-width: 1275px) {
        h2{
            width: 100%;
        }
     }


     @media(max-width: 1050px) {
        div{
            padding-left: 50px;
            padding-right: 50px;
        }
     }

     @media(max-width: 900px) {
        h2{
            font-size: 30px;
        }
        h1{
            font-size: 50px;
        }
     }

     @media(max-width: 810px) {
        display: block;
        div{
            min-height: 27vh;
            margin-bottom: 40px;
            display: flex;
            flex-direction: column;
            padding: 0;
            align-items: center;
        }
        span{
            min-width: 100%;
        }

        h1{
            font-size: 45px;
        }
        h2{
            font-family: 'Oswald';
            font-size: 23px;
            line-height: 34px;
            font-size: 23px;
            text-align: center;
            width: 70%;
        }
     }


`

export { AvailableArea, Button, Form, Input };