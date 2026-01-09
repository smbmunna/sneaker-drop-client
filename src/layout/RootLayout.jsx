import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";


const RootLayout = () => {
    return (
        <div>
            <Navbar />
            <div className="max-w-5xl mx-auto flex flex-col items-center justify-center">
                <Outlet />
            </div>
        </div>
    )
}

export default RootLayout; 