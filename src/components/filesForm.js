import { useEffect, useState } from "react";
import useLocalStorage  from "../hooks/useLocalStorage";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Navigate} from "react-router-dom";

export default function FilesForm(route) {

    let navigate = useNavigate();
    const {id,title} = route.params;
    const [isLoading, setIsLoading] = useState(false);
    const userInfo = useLocalStorage("User", "")[0];

    useEffect(() => {
        
    },[])
    
    let url=`http://localhost:5000/upload/${id}`

    return (
        <>
        {isLoading ? (
        <Form ref='uploadForm' id='uploadForm' 
        action={url}
        method='post' 
        encType="multipart/form-data"
        background={"#fafafa"} 
        color={"#afafaf"}
        disabled>
        
        <input type="file" name="data" />

        <button type="submit" disabled opacity={0.7}>
          Loading
        </button>
        </Form>
      ) : (
        <Form ref='uploadForm' id='uploadForm' 
        action='http://localhost:5000/upload' 
        method='post' 
        encType="multipart/form-data"
        background={"#fafafa"} 
        color={"#000000"}>

        <input type="file" name="sampleFile" />
        
        <button type="submit"  value='Upload!'>Attach Files</button>
        </Form>
      )}
      </>
    )
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 90%;
  height: 100%;
  input {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    display: flex;
    flex-wrap: wrap;
    line-height: 23px;
    height: 45px;
    min-width: 100px;
    margin-bottom: 6px;
    border-radius: 5px;
    border: 1px solid #d4d4d4;
    padding-left: 11px;
    color: ${(props) => props.color};
    background-color: ${(props) => props.background};
  }
  
  input::placeholder {
    color: darkgray;
    font-size: 20px;
    font-style: italic;
  }
  button {
    font-family: "Raleway";
    font-weight: 700;
    min-width: 100px;
    height: 45px;
    text-align: center;
    background-color: black;
    color: #ffffff;
    font-size: 21px;
    border: none;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      text-decoration: none;
    }
  }
`;
