import { useEffect, useState } from "react";
import useLocalStorage  from "../hooks/useLocalStorage";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import FileUpload from "./CreateProjectFormtestes";

export default function CreateProject() {

    let navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [isCreated, setIsCreated] = useState(false);
    const [id, setID] = useState(-1);
    const userInfo = useLocalStorage("User", "")[0];
    const [User, setUser] = useLocalStorage("User","");
    const [image_file, setimage_file] = useState(null);
    const [image_preview, setimage_preview] = useState('');
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
      event.preventDefault();
      setIsLoading(true);
    
      const promise=axios.post(`http://localhost:5000/project`,projectInfo);
    
      promise.then((resposta) => {

        setIsCreated(true);
        setID(resposta.data.id); 
        console.log(resposta.data)  
      });
    }
    const handleImagePreview = (e) => {

      let image_as_base64 = URL.createObjectURL(e.target.files[0]);
      let image_as_files = e.target.files[0];
      setimage_preview(image_as_base64);
      setimage_file(image_as_files);
    }

    function SubmitFile(event){
      
      event.preventDefault();
      let formData = new FormData();
      formData.append('files',image_file);
 
      const promise=axios.post(
        `http://localhost:5000/upload/${id}`, formData,
        {headers: {
                "Authorization": "YOUR_API_AUTHORIZATION_KEY_SHOULD_GOES_HERE_IF_HAVE",
                "Content-type": "multipart/form-data",
            }})

      promise.then((resposta) => {

       setIsCreated(true);
       setID(resposta.data.id); 
       navigate(`/project/${id}`) 
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
          <textarea rows="20" wrap="soft"
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

          <button style={{background:'#aaaaaa'}} type="submit" disabled opacity={0.7}>
            Loading
          </button>
        </Form>
      ) : (
        <Form background={"#fafafa"} color={"#000000"}>
          <input
            required
            type="title"
            placeholder="title"
            id="title"
            value={projectInfo.title}
            name="title"
            onChange={handleChanges}
          />
          <textarea rows="14" cols="10" wrap="soft" 
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
            name="externalURL"
            onChange={handleChanges}
          />
           <input 
            type="youtube link"
            placeholder="youtube link"
            id="youtube link"
            value={projectInfo.youtubeLink}
            name="youtubeLink"
            onChange={handleChanges}
          />
          <button type="submit" onClick={Create}>Create</button>
        
        </Form>
      )}
        
        {!isCreated ? (
        <FormFile useRef='uploadForm' id='uploadForm' 
        background={"#fafafa"} 
        color={"#afafaf"}
        disabled>
        
        <FileInput disabled type="file" name="data" />

        <button style={{background:'#aaaaaa'}} type="submit" disabled opacity={0.7}>
          Create Your Project To Attach Files
        </button>
        </FormFile>
      ) : (
        <FormFile useRef='uploadForm' id='uploadForm' 
          background={"#fafafa"} 
          color={"#000000"}>

          <Row>
            <FileInput type="file" name="arquivo" onChange={handleImagePreview}></FileInput>
            <img src={image_preview} alt="Preview"/>
          </Row>
        
          <button onClick={SubmitFile} value='Upload!'>Attach Files</button>
          
        </FormFile>
      )}

      {
        isCreated ?
        <>
        <ReturnButton  onClick={()=>navigate(`/dashboard`)}>Go to Dashboard</ReturnButton>

        </>
        :
        <></>
      }
      </>
    )
};
const Row=styled.div `
  display: flex;
  flex-direction:row;
  align-items: space-between;
  justify-content: space-between;
`
const ReturnButton=styled.button `
  font-family: "Raleway";
  margin-bottom: 10px;
  padding: 10px;
  font-weight: 700;
  min-width: 100px;
  width: 40%;
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
`

const FileInput =styled.input`
  font-family: "Raleway";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  display: flex;
  flex-wrap: wrap;
  line-height: 40px;
  height: 300px;
  min-width: 100px;
  margin-bottom: 6px;
  border-radius: 5px;
  border: 1px solid #d4d4d4;
  padding-left: 11px;
  color: ${(props) => props.color};
  background-color: ${(props) => props.background};
`
const FormFile = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 90%;
  height: 50%;
  img{
    width: 100px;
    height:100px;
    border-radius: 5px;
    margin-left: 20px;
  }
  img::alt{
    color: darkgray;
    font-size: 20px;
    font-style: italic;
  }
  input {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    display: flex;
    flex-wrap: wrap;
    line-height: 23px;
    height: 100px;
    min-width: 80%;
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
    padding: 10px;
    width: 40%;
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
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
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
    min-width: 80%;
    margin-bottom: 6px;
    border-radius: 5px;
    border: 1px solid #d4d4d4;
    padding-left: 11px;
    color: ${(props) => props.color};
    background-color: ${(props) => props.background};
  }
  textarea{
    font-family: "Raleway";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    display: flex;
    flex-wrap: wrap;
    line-height: 23px;
    min-width: 80%;
    height: 150px;
    margin-bottom: 6px;
    border-radius: 5px;
    border: 1px solid #d4d4d4;
    padding-left: 11px;
    color: ${(props) => props.color};
    background-color: ${(props) => props.background};
  }
  textarea::placeholder {
    color: darkgray;
    font-size: 20px;
    font-style: italic;
  }
  input::placeholder {
    color: darkgray;
    font-size: 20px;
    font-style: italic;
  }
  button {
    font-family: "Raleway";
    font-weight: 700;
    width: 40%;
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
