import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Home = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    useEffect(() => {
        if(token){
            navigate(`/dashboard`)
        }else{
            navigate('/signin')
        } 
    },[])
    return (
        <div>
            WELCOME
        </div>
    )
}
export default Home;