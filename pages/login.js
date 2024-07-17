import LoginCard from "../src/components/loginCard/loginCard"
import styles from "../styles/Login.module.css"
import Input from "../src/components/input/input"
import Button from "../src/components/button/button"
import Link from "next/link"
import Image from "next/image"
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import {useState} from 'react'


export default function LoginPage(){
    const[formData, setFormData] = useState({
        email: '',
        password: '',    
     })

    const [error, setError] = useState('')
    const router = useRouter()
    
    const handleFormEdit = (event, name) => {
        setFormData({
            ...formData,
            [name]: event.target.value
        })
    }

    const handleForm = async (event) => {
        try {
            event.preventDefault()
            const response = await fetch('api/user/login', {
                method: 'POST',
                body: JSON.stringify(formData)
            })
            const json = await response.json()
            if (response.status !== 200) throw new Error(json)
            
            setCookie('authorization', json)
            router.push('/')
        } catch(err){
            setError(err.message)
        }
    }

     return(
        <div className={styles.background}>
            <Link href="/register"><Button className={styles.novaConta}>Criar conta</Button></Link>
            <LoginCard nomeEmpresa="DOM CHICO BARBEARIA" title="Login">
                <form className={styles.form} onSubmit={handleForm}>
                    <Input type="email" placeholder="Digite o e-mail cadastrado" required value={formData.email} onChange={(e) => {handleFormEdit(e, 'email')}}/>
                    <Input type="password" placeholder="Digite sua senha" required value={formData.password} onChange={(e) => {handleFormEdit(e, 'password')}}/>
                    <Button>Entrar</Button>
                    <Link href="#" className={styles.esquece}>Esqueceu sua senha?</Link>
                    {error && <p className={styles.error}>{error}</p>}
                </form>
            </LoginCard>
        </div>
    )
}