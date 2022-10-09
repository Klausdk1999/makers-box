import { useEffect, useState, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Header() {

    let navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [User, setUser] = useLocalStorage("User","");
    
    useEffect(() => {
        getProjects();
    },[])

    function getProjects(){
        let promise = axios.get(`http://localhost:5000/projects/${User.id}`);
        promise.then((res) => {
        
        setProjects([]);
        setProjects([...res.data]);
        
      }).catch((error) => console.log("get Error", error));
    }
   
    return (
        <>
            {
                projects.length>0
                    ?  
                    <>
                    <Container>
                        <h1>My Projects</h1>
                    </Container>
                    { projects.map((e) => 
                   
                    <ProjectContainer key={e.id}  onClick={() =>navigate(`/project/${e.id}`)}>
                        <h1>{e.title}</h1>
                        <h2>{e.date}</h2>
                    </ProjectContainer>
                    )}
                    </>
                    :
                    <>
                    <ProjectContainer>
                        <h1>Loading . . . </h1>  
                    </ProjectContainer> 
                    <ProjectContainer onClick={() =>navigate(`/create-project`)}>
                        <h1>First Time?</h1>
                        <h1>Create a project</h1>
                    </ProjectContainer>
                    </>
            }   
            </>
    )
};

const ProjectContainer = styled.div`
    cursor: pointer;
    display:flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    height: 100px;
    background: #000000;
    margin-top:10px;
    margin-bottom: 10px;
    border-radius: 10px;
    padding: 10px;
    h1{
        font-family: 'Silkscreen', cursive;
        font-style: normal;
        font-weight: 400;
        font-size: 40px;
        line-height: 45px;
        color: #ffffff;
        /* identical to box height */
    }
    h2{
        //font-family: 'Silkscreen', cursive;
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        color: #ffffff;
        /* identical to box height */
    }
`

const Container = styled.div`
    border-radius: 10px;
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width:40%;
    height: 80px;
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