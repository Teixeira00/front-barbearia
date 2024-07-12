import LoginCard from "../src/components/loginCard/loginCard"
import styles from "../styles/Login.module.css"
import Input from "../src/components/input/input"
import Button from "../src/components/button/button"
import Link from "next/link"
import Image from "next/image"

export default function LoginPage(){
    return(
        <div className={styles.background}>
            <Link href="/register"><Button className={styles.novaConta}>Criar conta</Button></Link>
            <LoginCard nomeEmpresa="DOM CHICO BARBEARIA" title="Login">
                <form className={styles.form}>
                    <Input type="email" placeholder="Digite o e-mail cadastrado"/>
                    <Input type="password" placeholder="Digite sua senha"/>
                    <Button>Entrar</Button>
                    <Link href="#" className={styles.esquece}>Esqueceu sua senha?</Link>
                </form>
            </LoginCard>
        </div>
    )
}