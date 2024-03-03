import { useNavigate } from "react-router-dom"

export function Start(){
    const navigate=useNavigate();

    return (
        <div class="outer-container">
            <div class="container">
                <h3>Proceed With</h3>
                <button type="submit" onClick={()=>{
                    navigate('/signin');
                }}>SignIn</button>
                <button type="submit" onClick={()=>{
                    navigate('/signup');
                }}>SignUp</button>
            </div>
        </div>
    )
}