import Logo from "../../../public/assets/assets/logo_topo.png"
import PatchPremier from "../../../public/assets/assets/premier.png"
import PatchSerieA from "../../../public/assets/assets/Serie_A.png"
import PatchLigue1 from "../../../public/assets/assets/ligue1.svg"
import PatchBundesliga from "../../../public/assets/assets/bundesliga.svg"
import PatchBrasileirao from "../../../public/assets/assets/brasileiro.svg"
import PatchLaliga from "../../../public/assets/assets/laLiga.png"
import style from "./style.module.css"
import Image from "next/image"
import { useState } from "react"
import Modal from '../modal'

function HeaderPrincipal() {

    const [closeBan, setCloseBan] = useState<boolean>(false)

    const leagues = [
        { nome: 'Premier League', pais: 'Inglaterra', imagem: PatchPremier },
        { nome: 'Brasileirão', pais: 'Brasil', imagem: PatchBrasileirao },
        { nome: 'Copa do Brasil', pais: 'Brasil', imagem: PatchSerieA },
        { nome: 'Libertadores', pais: 'America do Sul', imagem: PatchLaliga },
        { nome: 'Sulamericana', pais: 'America do Sul', imagem: PatchLigue1 },
        { nome: 'Mundial de Clubes', pais: 'Mundo', imagem: PatchBundesliga },
    ]

    const [displayModal, setDisplayModal] = useState(false)
    const [open, setOpen] = useState('')

    const toggle = () => {
        setDisplayModal(!displayModal)
    }

    return (
        <header className={style.headerPai}>
            <div className={!closeBan ? style.banner : style.close}>
                <div className={style.textHeaderPai}>
                    <h1 className={style.textHeaderFilho1}>
                        Faça parte do nosso clube!
                    </h1>
                    <h2 className={style.textHeaderFilho2}>
                        Cadastre-se agora e concorra a premios!
                    </h2>
                </div>
                <div>
                    <span className={style.closeBanner} onClick={() => setCloseBan(true)}>X</span>
                </div>
            </div>
            <div className={style.Header1}>
                <span>Palpitar</span>
                <span>Resultados</span>
                <Image src={Logo} height={50} width={500} alt="palpite.com" />
                <span onClick={() => { toggle(); setOpen('cadastro') }}>Cadastre-se</span>
                <span onClick={() => { toggle(); setOpen('login') }}>Login</span>
            </div>
            {displayModal && <Modal toggle={toggle} display={displayModal} open={open} setOpen={setOpen} />}
            {/* <ul className={style.subHeader}>
                {leagues.map((league, key) =>
                    <li key={key}>
                        <Image className="imgHeader" src={league.imagem} alt="" />
                        <span> {league.nome}</span>
                    </li>)}
            </ul> */}
        </header>
    )
}

export default HeaderPrincipal