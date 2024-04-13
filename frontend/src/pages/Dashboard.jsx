import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import {Appbar} from "../components/Appbar"
export const Dashboard = () => {
    return (
        <div>
            <Appbar/>
        <div className="m-8">
            <Balance/>
            <Users />
        </div>
        </div>
    )
}