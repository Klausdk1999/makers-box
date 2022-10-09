//import Header from "../../components/Header/Header";
import Header1 from "../components/Header";
import Projects from "../components/Projects"
import styled from "styled-components";

export default function Dashboard() {
  return (
    <>
      <Header1 />
      <Page>
        <Projects />
      </Page>
      
    </>
  );
}

const Page = styled.div`
    padding-top: 80px;
    padding-bottom: 50px;
    background: rgb(0,0,0);
    background: linear-gradient(32deg, rgba(0,0,0,1) 0%, rgba(93,50,227,1) 43%, rgba(216,116,233,1) 100%); 
    transition: ease all .5s;
    display:flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    &.open{
        display:flex;
        padding: 10px;
        height: auto;
        background-color: #171717;
        border-radius: 0px 0px 0px 20px;
    }
`
