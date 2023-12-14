import { FaAddressBook } from "react-icons/fa";
import '../styles/components/Header.css'

export default function Header(){
    return (
        <header className="header">
            <h1 className="app-title"><FaAddressBook /> Phone Book App</h1>
        </header>
    )
}