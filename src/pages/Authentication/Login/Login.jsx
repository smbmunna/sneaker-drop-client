import useAuth from "../../../hooks/useAuth";


const Login = () => {
    const { googleLogin } = useAuth();
    const handleGoogleLogin = () => {
        //console.log(googleLogin); 
        //return ; 
        googleLogin()
            .then(result => {
                console.log(result.user);
            })
            .catch(error => {
                console.log(error.message);
            })
    }
    return (
        <div>
            <h1 className="font-semibold text-2xl">Login Page </h1>
            <button onClick={handleGoogleLogin} className="btn btn-soft btn-secondary">Google Login</button>
        </div>
    )
}

export default Login; 