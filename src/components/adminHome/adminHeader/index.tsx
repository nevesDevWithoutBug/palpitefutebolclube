import style from "./style.module.css"
import Logo from "../../../../public/assets/assets/logo_topo.png"

function HeaderComponent() {
    return (
        <header className={style.header}>
            <div className={style.Header1}>
                <span>Palpitar</span>
                <span>Resultados</span>
                <img src={Logo as any} alt="palpite.com" />
                <span>Cadastre-se</span>
                <span>Login</span>
            </div>
        </header>
    )
}

export default HeaderComponent