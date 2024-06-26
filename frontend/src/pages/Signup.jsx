import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
export const Signup = () => {
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    return <div className="bg-sky-100 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox onChange={(e) => {
            setFirstName(e.target.value)
        }} placeholder="John" label={"First Name"} />
        <InputBox onChange={(e) => {
            setLastName(e.target.value);
        }} placeholder="Doe" label={"Last Name"} />
        <InputBox onChange={(e) => {
            setEmail(e.target.value);
        }} placeholder="harkirat@gmail.com" label={"Email"} />
        <InputBox onChange={(e) => {
            setPassword(e.target.value)
        }}  placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button label={"Sign up"}  onClick={async () => {
            try{

              const response = await axios.post("http://localhost:3000/api/v1/user/signUp",{
                username:email,
                password,
                lastName,
                firstName
            })
            // console.log(`Response`,response)
            navigate(`/dashboard`)
            localStorage.setItem('token',response.data.token)
            console.log(`Token `,response.data.token)
            }catch(err){

            }
          }}/>
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
    <div className="fixed bottom-0 right-0 m-4 text-black">
      Developed By:Colin C Thomas
    </div>
  </div>
}