import styles from "../styles/Register.module.css"
import LoginCard from "../src/components/loginCard/loginCard"
import Input from "../src/components/input/input"
import Button from "../src/components/button/button"
import Link from "next/link"

export default function RegisterPage(){
    return(
        <div className={styles.background}>
            <LoginCard nomeEmpresa="DOM CHICO BARBEARIA" title="Cadastro">
                <form className={styles.form}>
                    <Input type="text" placeholder="Nome completo"/>
                    <Input type="email" placeholder="E-mail"/>
                    <Input type="password" placeholder="Celular"/>
                    <Input type="password" placeholder="Senha"/>
                    <Button>Cadastrar</Button>
                    <Link href="/login" className={styles.return}>Já possui uma conta?</Link>
                </form>
            </LoginCard>
        </div>
    )
}