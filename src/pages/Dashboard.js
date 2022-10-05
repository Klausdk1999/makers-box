//import Header from "../../components/Header/Header";
import Header1 from "../components/Header";
import {react,useContext,useEffect,useState} from "react";
//<Menu />
import Projects from "../components/Projects"


export default function Dashboard() {
  return (
    <>
      <Header1 />
      <Projects />
    </>
  );
}
