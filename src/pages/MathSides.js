import Header1 from "../components/Header";
import styled from "styled-components";
import CreateProject from "../components/CreateProjectForm"

export default function CreateProjectPage() {
  return (
    <>
      <Header1 />
      <Page>
        <CreateProject/>
      </Page>
    </>
  );
}

const Page = styled.div`
    width: 100%;
    height: calc(100vh);
    padding-top: 80px;
    padding-bottom: 50px;
    background: rgb(93,50,227);
    background: linear-gradient(173deg, rgba(93,50,227,1) 50%, rgba(237,251,139,1) 77%); 
    transition: ease all .5s;
    display:flex;
    flex-direction: column;
    align-items: center;
    &.open{
        display:flex;
        padding: 10px;
        height: 100%;
        background-color: #171717;
        border-radius: 0px 0px 0px 20px;
    }
`
