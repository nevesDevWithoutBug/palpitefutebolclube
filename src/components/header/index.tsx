import Logo from "../../../public/assets/assets/logo_topo.png"
import PatchPremier from "../../../public/assets/assets/premier.png"
import PatchSerieA from "../../../public/assets/assets/Serie_A.png"
import PatchLigue1 from "../../../public/assets/assets/ligue1.svg"
import PatchBundesliga from "../../../public/assets/assets/bundesliga.svg"
import PatchBrasileirao from "../../../public/assets/assets/brasileiro.svg"
import PatchLaliga from "../../../public/assets/assets/laLiga.png"
import style from "./style.module.css"
import Image from "next/image"
import { useEffect, useState } from "react"
import Modal from '../modal'
import Api from "src/providers/http/api"
import { userExhibitionType } from "src/types/userExhibitionType"

function HeaderPrincipal() {

    const [closeBan, setCloseBan] = useState<boolean>(false)
    const [displayModal, setDisplayModal] = useState(false)
    const [open, setOpen] = useState('')
    const [userExibition, setUserExibition] = useState<userExhibitionType>({name: ''})

    const toggle = () => {
        setDisplayModal(!displayModal)
    }

    useEffect(() => {
        const nameUser = localStorage.getItem('UserPalpite')
        setUserExibition({name: !nameUser ? '' : nameUser})
    },[])

    async function Sair() {
        localStorage.clear()
        return Api.signOut()        
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
                { !userExibition.name.length ? <span onClick={() => { toggle(); setOpen('cadastro') }}>Cadastre-se</span> 
                : 
                <span>Olá {userExibition.name}</span>}
                <Image src={Logo} height={50} width={500} alt="palpite.com" className={style.imagemLogomarcaHeader} />
                { !userExibition.name.length ? <span onClick={() => { toggle(); setOpen('login') }}>Login</span>
                : 
                <span onClick={() => Sair()}>Sair</span>}
            </div>
            {displayModal && <Modal toggle={toggle} display={displayModal} open={open} setOpen={setOpen} setUserExibition={setUserExibition}/>}
        </header>
    )
}

export default HeaderPrincipal