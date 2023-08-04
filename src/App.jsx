import SignIn from "./ui/components/SignIn";
import SignUp from "./ui/components/SignUp";
import { Navbar } from "./ui/components/Navbar";
import Card from "./ui/components/Card";
import Cards from "./ui/components/Cards";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};

function App() {
 
// I did not finish it sorry 
  return (
    <>
      <Navbar>
        {/* <Cards/> */}
        {/* <SignIn /> */}
        <SignUp />
      </Navbar>
    </>
  );
}

export default App;
