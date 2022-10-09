import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import TokenContext from "./contexts/TokenContext.js";
import UserContext from "./contexts/UserContext.js";
import SignUp from "./pages/SignUp.js";
import SignIn from "./pages/SignIn.js";

import { Suspense, lazy } from "react";

const Loading = () => <div>Loading...</div>;

const LazyWrapper = (Component) => (props) =>
  (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  );

const Dashboard = LazyWrapper(lazy(() => import("./pages/Dashboard")));
const CreateProjectPage=LazyWrapper(lazy(() => import("./pages/CreateProject")));
const File =   LazyWrapper(lazy(() => import("./pages/Files")));
const Project= LazyWrapper(lazy(() => import("./pages/Project")));

export default function App() {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState({
        userId: "",
        username: "",
        profilePic: ""
    })
    //const [url, setUrl] = useState('https://linkr-back-api.herokuapp.com'); //Colocar link do deploy
    const [url, setUrl] = useState('http://localhost:5000');

    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    return (
    
            <TokenContext.Provider value={{setToken, token, authorization}}>
                <UserContext.Provider value={{ url, user, setUser }}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<SignIn />} />
                            <Route path="/sign-up" element={<SignUp />} />
                            <Route path="/dashboard" element={<Dashboard />}/>
                            <Route path="/insert-files" element={<File />} />
                            <Route path="/project/:id" element={<Project />} />
                            <Route path="/create-project" element={<CreateProjectPage/>}/>
                            <Route path="*" element={<div>Not found!</div>} />
                        </Routes>
                    </BrowserRouter>
                </UserContext.Provider>
            </TokenContext.Provider>
    )
};