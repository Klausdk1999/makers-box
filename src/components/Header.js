import { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import useComponentVisible from "../hooks/useComponentVisible";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowUp } from "react-icons/io";
import {FiLogOut} from "react-icons/fi"
export default function Header({ isPageLoaded }) {

    let navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [ cleanOpen, setCleanOpen ] = useState(false);
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(true, setCleanOpen);
    
    function logout() {
        localStorage.setItem("linkrUser", JSON.stringify(" - "));
        navigate("/", { replace: true });
    }

    useEffect(() => {
        setIsOpen(false);
        setIsComponentVisible(true);
    }, [])

    const handleOpenDropdown = () => {
        setIsOpen(!isOpen);
    }

    return (
        <> 
                    <HeaderContainer>
                        <Link to={`/dashboard`}>
                            <h1>Makers.box</h1>
                        </Link>
                        <Link to={`/create-project`}>
                            <Box1><h2>New Project</h2></Box1>
                        </Link>
                        <Link to={`/`}>
                            <Box2><h2>Math</h2></Box2>
                        </Link>
                        <Dropdown ref={ref}>
                            <IoIosArrowUp className={ isOpen ? "open" : ""} onClick={handleOpenDropdown}/>
                            {
                               
                            <DropdownMenu className={isOpen ? "open" : ""}>
                                <DropdownOption onClick={logout}>
                                    <h4>Logout</h4> 
                                    <FiLogOut />
                                </DropdownOption>
                            </DropdownMenu>
                    
                            }
                        </Dropdown>
                    </HeaderContainer>
        </>
    )
};

const DropdownOption = styled.div`
    display:flex;
    align-items:center;
    width: 100%;
    border-radius: 5px;
    padding:5px;
    transition: ease all .5s;
    h4{
        color: #FFFFFF;
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;
        letter-spacing: 0.05em;
        margin-left: 10px;
    }
    &:hover{
        background-color: #1877F2;
        opacity: 0.8;

    }

`

const DropdownMenu = styled.div`
    position:absolute;
    width:100%;
    top: 41px;
    left: 0;
    display:none;
    flex-direction:column;
    svg{
        width: 20px;
        height: 20px;
        color: #FFFFFF;
        margin-left: 10px;
        transition: ease all .5s;
    }
    transition: ease all .5s;
    &.open{
        display:flex;
        padding: 10px;
        height: auto;
        background-color: #171717;
        border-radius: 0px 0px 0px 20px;
    }
`

const Dropdown = styled.section`
    width: 140px;
    position: relative;
    display:flex;
    align-items:center;
    padding-right: 0px;
    padding-left: 30px;

    & > svg{
        width: 25px;
        height: 25px;
        color: #FFFFFF;
        margin-right: 10px;
        transition: ease all .5s;
        transform: rotate(-180deg)
    } 
    & > svg.open{
        transform: rotate(0)
    }
    img{
        width: 50px;
        height: 50px;
        border-radius: 25px;
    }
`
const Box2 = styled.div`
background: rgb(93,50,227);
background: linear-gradient(173deg, rgba(93,50,227,1) 50%, rgba(237,251,139,1) 77%); 
width: 100%;
height: 50px;
border-radius: 10px;
h2{
    margin:5px;
    font-family: Lato;
    font-style: normal;
    font-weight: 700;
    font-size: 35px;
    line-height: 46px;
    color: #000000;
    padding-bottom: 8px;
    /* identical to box height */
}
`
const Box1 = styled.div`
    background: rgb(93,50,227);
    background: linear-gradient(173deg, rgba(93,50,227,1) 50%, rgba(237,251,139,1) 77%); 
    width: 100%;
    height: 50px;
    border-radius: 10px;
    h2{
        margin:5px;
        font-family: Lato;
        font-style: normal;
        font-weight: 700;
        font-size: 35px;
        line-height: 46px;
        color: #000000;
        padding-bottom: 8px;
        /* identical to box height */
    }
`

const HeaderContainer = styled.div`
    display:flex;
    justify-content: space-between;
    align-items: center;
    width:100%;
    height: 72px;
    background: #000000;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 3;
    h1{
        margin-left: 20px;
        font-family: 'Silkscreen', cursive;
        font-style: normal;
        font-weight: 400;
        font-size: 45px;
        line-height: 46px;
        color: #ffffff;
        padding-bottom: 8px;
        /* identical to box height */
    }
    
`
