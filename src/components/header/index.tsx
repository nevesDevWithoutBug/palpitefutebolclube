import Logo from "../../../public/assets/assets/logo_topo.png"
import style from "./style.module.css"
import Image from "next/image"
import { useEffect, useState } from "react"
import Modal from '../modal'
import Api from "src/providers/http/api"
import { userExhibitionType } from "src/types/userExhibitionType"
import ModalUpdateUser from "../modalUpdateUser"

function HeaderPrincipal() {

    const [closeBan, setCloseBan] = useState<boolean>(false)
    const [displayModal, setDisplayModal] = useState(false)
    const [displayModalUpdate, setDisplayModalUpdate] = useState(false)
    const [open, setOpen] = useState('')
    const [userExibition, setUserExibition] = useState<userExhibitionType>({ name: '' })

    const toggle = () => {
        setDisplayModal(!displayModal)
    }

    const toggleUpdate = () => {
        setDisplayModalUpdate(!displayModalUpdate)
    }

    useEffect(() => {
        const nameUser = localStorage.getItem('UserPalpite')
        setUserExibition({ name: !nameUser ? '' : nameUser }
        )
    }, [])

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
                <Image src={Logo} height={50} width={500} alt="palpite.com" className={style.imagemLogomarcaHeaderMobile} />
                <div className={style.containerHeader}>
                    {!userExibition.name.length ? <span onClick={() => { toggle(); setOpen('cadastro') }}>Cadastre-se</span>
                        :
                        <span onClick={() => toggleUpdate()}>Olá {`${userExibition.name.replace(/^\w/, c => c.toUpperCase()).split(' ')[0]}`}</span>}
                    <Image src={Logo} height={50} width={500} alt="palpite.com" className={style.imagemLogomarcaHeader} />
                    {!userExibition.name.length ? <span onClick={() => { toggle(); setOpen('login') }}>Login</span>
                        :
                        <span onClick={() => Sair()}>Sair</span>}
                </div>
            </div>
            {displayModal && <Modal toggle={toggle} display={displayModal} open={open} setOpen={setOpen} setUserExibition={setUserExibition} />}
            {displayModalUpdate && <ModalUpdateUser toggleUpdate={toggleUpdate} displayModalUpdate={displayModalUpdate} />}
        </header>
    )
}

export default HeaderPrincipal