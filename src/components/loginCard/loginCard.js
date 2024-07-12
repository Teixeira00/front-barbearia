import styles from "./loginCard.module.css";

export default function LoginCard({title, nomeEmpresa, children}){
    return(
        <div className={styles.card}>
            <h1 className={styles.nomeEmpresa}>{nomeEmpresa}</h1>
            <h2 className={styles.title}>{title}</h2>
            {children}
        </div>
    )
}