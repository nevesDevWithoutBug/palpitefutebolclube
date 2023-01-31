import Logo from "../../../public/assets/assets/logo_topo.png"
import PatchPremier from "../../../public/assets/assets/premier.png"
import PatchSerieA from "../../../public/assets/assets/Serie_A.png"
import PatchLigue1 from "../../../public/assets/assets/ligue1.svg"
import PatchBundesliga from "../../../public/assets/assets/bundesliga.svg"
import PatchBrasileirao from "../../../public/assets/assets/brasileiro.svg"
import PatchLaliga from "../../../public/assets/assets/laLiga.png"
import style from "./style.module.css"
import Image from "next/image"

function HeaderPrincipal() {
    const leagues = [
        { nome: 'Premier League', pais: 'Inglaterra', imagem: PatchPremier },
        { nome: 'Brasileirão', pais: 'Brasil', imagem: PatchBrasileirao },
        { nome: 'Copa do Brasil', pais: 'Brasil', imagem: PatchSerieA },
        { nome: 'Libertadores', pais: 'America do Sul', imagem: PatchLaliga },
        { nome: 'Sulamericana', pais: 'America do Sul', imagem: PatchLigue1 },
        { nome: 'Mundial de Clubes', pais: 'Mundo', imagem: PatchBundesliga },
    ]
    return (
        <header className={style.headerPai}>
            <div className={style.Header1}>
                <span>Palpitar</span>
                <span>Resultados</span>
                <Image src={Logo} height={50} width={500} alt="palpite.com" />
                <span>Cadastre-se</span>
                <span>Login</span>
            </div>
            <ul className={style.subHeader}>
                {leagues.map((league, key) =>
                    <li key={key}>
                        <Image className="imgHeader" src={league.imagem} alt="" />
                        <span> {league.nome}</span>
                    </li>)}
            </ul>
        </header>
    )
}

export default HeaderPrincipal