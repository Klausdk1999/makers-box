import { useEffect, useState } from "react";
import useLocalStorage  from "../hooks/useLocalStorage";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateProject() {

    let navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const userInfo = useLocalStorage("User", "")[0];
    
    const [projectInfo, setProjectInfo] = useState({
        title: "",
        description: "",
        userId: userInfo.id,
        youtubeLink: "",
        externalURL: ""
    })

    useEffect(() => {
        
    },[])

    function Create(event) {
        console.log("posted: "+projectInfo)
        event.preventDefault();
        setIsLoading(true);
    
        const promise=axios.post(`http://localhost:5000/project`,projectInfo);
    
        promise.then((resposta) => {
          
          console.log(resposta);
          navigate("/dashboard");
        });
      }
   
    const handleChanges = (e) => { setProjectInfo({ ...projectInfo, [e.target.name]: e.target.value }) };

    return (
        <>
        {isLoading ? (
        <Form background={"#fafafa"} color={"#afafaf"}>
          <input
            required
            type="title"
            placeholder="title"
            id="title"
            value={projectInfo.title}
            name="title"
            onChange={handleChanges}
            disabled
          />
          <input
            disabled
            type="description"
            id="description"
            value={projectInfo.description}
            placeholder="description"
            required
            onChange={handleChanges}
          />
          <input
            disabled
            type="externalURL"
            id="externalURL"
            value={projectInfo.externalURL}
            placeholder="external URL"
            onChange={handleChanges}
          />
           <input
            disabled
            type="youtube link"
            placeholder="youtube link"
            id="youtube link"
            value={projectInfo.youtubeLink}
            name="youtube link"
            onChange={handleChanges}
          />
          <button type="submit" disabled opacity={0.7}>
            Loading
          </button>
        </Form>
      ) : (
        <Form background={"#fafafa"} color={"#000000"} onSubmit={Create}>
            <input
            required
            type="title"
            placeholder="title"
            id="title"
            value={projectInfo.title}
            name="title"
            onChange={handleChanges}
          />
          <input
            required
            type="description"
            placeholder="description"
            id="description"
            value={projectInfo.description}
            name="description"
            onChange={handleChanges}
          />
          <input
            type="externalURL"
            id="externalURL"
            value={projectInfo.externalURL}
            placeholder="external URL"
            required
            name="externalURL"
            onChange={handleChanges}
          />
           <input
            required
            type="youtube link"
            placeholder="youtube link"
            id="youtube link"
            value={projectInfo.youtubeLink}
            name="youtubeLink"
            onChange={handleChanges}
          />
          <button type="submit">Criar</button>
        </Form>
      )}
        </>
    )
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 90%;

  input {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
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


const ProjectContainer = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width:90%;
    height: 150px;
    background: #000000;
    margin-top:10px;
    margin-bottom: 10px;
    h1{
        margin: 10px;
        margin-left: 20px;
        font-family: 'Silkscreen', cursive;
        font-style: normal;
        font-weight: 400;
        font-size: 40px;
        line-height: 50px;
        color: #ffffff;
        /* identical to box height */
    }
    h2{
        //font-family: 'Silkscreen', cursive;
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 25px;
        color: #ffffff;
        /* identical to box height */
    }
`

const Container = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width:90%;
    height: 100px;
    background: #000000;
    margin-top:10px;
    margin-bottom: 10px;
    h1{
        margin: 10px;
        margin-left: 20px;
        font-family: 'Silkscreen', cursive;
        font-style: normal;
        font-weight: 400;
        font-size: 40px;
        line-height: 50px;
        color: #ffffff;
        /* identical to box height */
    }
    h2{
        //font-family: 'Silkscreen', cursive;
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 25px;
        color: #ffffff;
        /* identical to box height */
    }
`