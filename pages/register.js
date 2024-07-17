import {useState} from 'react'
import styles from "../styles/Register.module.css"
import LoginCard from "../src/components/loginCard/loginCard"
import Input from "../src/components/input/input"
import Button from "../src/components/button/button"
import Link from "next/link"
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/router'

export default function RegisterPage(){
    const[formData, setFormData] = useState({
       name: '',
       email: '',
       tel: '',
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
            const response = await fetch('api/user/register', {
                method: 'POST',
                body: JSON.stringify(formData)
            })
            const json = await response.json()
            if (response.status !== 201) throw new Error(json)
            
            setCookie('authorization', json)
            router.push('/')
        } catch(err){
            setError(err.message)
        }
    }

    return(
        <div className={styles.background}>
            <LoginCard nomeEmpresa="DOM CHICO BARBEARIA" title="Cadastro">
                <form  onSubmit={handleForm} className={styles.form}>
                    <Input type="text" placeholder="Nome completo" required value={formData.name} onChange={(e) => {handleFormEdit(e, 'name')}}/>
                    <Input type="email" placeholder="E-mail" required value={formData.email} onChange={(e) => {handleFormEdit(e, 'email')}}/>
                    <Input type="tel" placeholder="Celular" required value={formData.tel} onChange={(e) => {handleFormEdit(e, 'tel')}}/>
                    <Input type="password" placeholder="Senha" required value={formData.password} onChange={(e) => {handleFormEdit(e, 'password')}}/>
                    <Button>Cadastrar</Button>
                    {error && <p className={styles.error}>{error}</p>}
                    <Link href="/login" className={styles.return}>Já possui uma conta?</Link>
                </form>
            </LoginCard>
        </div>
    )
}