//import Header from "../../components/Header/Header";
import Header1 from "../components/Header";
import Projects from "../components/Projects"
import styled from "styled-components";
import OtimizationForms from "../components/OtimizationForms"

export default function Dashboard() {
  return (
    <>
      <Header1 />
      <Page>
        {/* <CreateProject/> */}
        <OtimizationForms />
      </Page>
      
    </>
  );
}

const Page = styled.div`
    padding-top: 80px;
    padding-bottom: 50px;
    background: rgb(0,0,0);
    background: linear-gradient(32deg, rgba(0,0,0,1) 0%, rgba(185,182,244,1) 49%, rgba(237,251,139,1) 87%); 
    transition: ease all .5s;
    display:flex;
    flex-direction: column;
    align-items: center;
    &.open{
        display:flex;
        padding: 10px;
        height: auto;
        background-color: #171717;
        border-radius: 0px 0px 0px 20px;
    }
`
