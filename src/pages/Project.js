//import Header from "../../components/Header/Header";
import Header1 from "../components/Header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

export default function Project() {

  useEffect(() => {
    getProject();
  },[])

  const { id } = useParams();
  
  const [project, setProject] = useState({title:"loading",description:null,date:null});
  const [isLoading, setIsLoading] = useState(true);

  function getProject(){
      let promise = axios.get(`http://localhost:5000/project/${id}`);
      promise.then((res) => {
        setProject(res.data)
        console.log(res.data)
        setIsLoading(false)
    }).catch((error) => console.log("get Error", error));
  }
  
  return (
    <>
      <Header1 />
      <Page>
        {
          isLoading ? 
            <ProjectContainer>
              <h1>Loading . . .</h1>
              <h2>Loading . . .</h2>
              <h2>Loading . . .</h2>
              <h2>Loading . . .</h2>
            </ProjectContainer>
          :
          <ProjectContainer>
            <h1>{project.title}</h1>
            <h2>{project.description}</h2>
            <h2>{project.date}</h2>
            <h2>{project.externalURL}</h2>
            <h2>{project.youtubeLink}</h2>
            <img src={`http://localhost:5000/project/file/${id}`} alt="project img"></img>
          </ProjectContainer>
        }
          
      </Page>   
    </>
  );
}

const ProjectContainer = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    height: 90%;
    background: #000000;
    margin-top:10px;
    margin-bottom: 10px;
    border-radius: 10px;
    padding: 30px;
    

    img{
      width: 200px;
      height: 200px;
      border-radius: 10px;
      margin:10px;
    }
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
const Page = styled.div`
    padding-top: 80px;
    padding-bottom: 50px;
    height: 100vh;
    background: rgb(0,0,0);
    background: linear-gradient(32deg, rgba(0,0,0,1) 0%, rgba(93,50,227,1) 43%, rgba(216,116,233,1) 100%); 
    transition: ease all .5s;
    display:flex;
    flex-direction: column;
    align-items: center;
    &.open{
        display:flex;
        padding: 10px;
        
        background-color: #171717;
        border-radius: 0px 0px 0px 20px;
    }
`
