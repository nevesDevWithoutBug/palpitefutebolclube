import style from "./style.module.css"
import Logo from "../../../../public/assets/assets/logo_topo.png"
import Image from "next/image"

function HeaderComponent() {
    return (
        <header className={style.header}>
            <div className={style.Header1}>
                <span>Site</span>
                <Image src={Logo} height={50} width={500} alt="palpite.com" />
                <span>Sair</span>
            </div>
        </header>
    )
}

export default HeaderComponent