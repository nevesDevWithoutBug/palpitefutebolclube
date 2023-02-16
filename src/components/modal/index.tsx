import { createPortal } from "react-dom"
import { motion } from "framer-motion";
import style from "./style.module.css"
import { useState } from "react";
import { userCreateType } from "src/types/UserCreateType";
import Image from "next/image";
import Close from "../../../public/assets/assets/rectangle-xmark-regular.svg"


const Modal = ({ display, toggle, open, setOpen }: any) => {

    const [user, setUser] = useState<userCreateType>({ nome: '', email: '', senha: '' })
    const [senhaOk, setSenhaOk] = useState<boolean>(false)

    function handleNomeChange(e: any) {
        setUser({ ...user, nome: e.target.value })
    }

    function handleEmailChange(e: any) {
        setUser({ ...user, email: e.target.value })
    }

    function handleSenhaChange(e: any) {
        setUser({ ...user, senha: e.target.value })
        setSenhaOk(false)
    }

    function handleVerifySenhaChange(e: any) {
        if (user.senha === e.target.value) return setSenhaOk(true)
        return setSenhaOk(false)
    }

    function submitUser(e: any) {
        e.preventDefault()
        if (user.nome === '') {
            console.log('login', user)
        } else {
            console.log('cadastro', user)
        }
    }

    return createPortal(
        <motion.div animate={{ x: 0, opacity: 1 }} initial={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <div style={{ display: display ? 'block' : 'none', position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.5)', padding: '50px' }}>
                <div style={{ background: '#fff', borderRadius: '10px', width: '28rem', margin: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px 1px #44637633'}}>
                    <div className={style.fecharModal}>
                        <span className={style.logoText}>Palpite Futebol Clube</span>
                        <button onClick={toggle}>
                            <Image src={Close} alt='fechar' width={25} />
                        </button>
                    </div>
                    {open === 'cadastro' &&
                        <><motion.form initial={{ x: 15 }} animate={{ x: 0 }} transition={{ duration: 0.3 }} className={style.formModal} onSubmit={submitUser}>
                            <span>Nome</span>
                            <input placeholder="Informe seu nome" type="text" name="nome" value={user.nome} onChange={handleNomeChange} />
                            <span>Email</span>
                            <input placeholder="palpitefc@mail.com" type="email" name="email" value={user.email} onChange={handleEmailChange} />
                            <span>Senha</span>
                            <input placeholder="********" type="password" name="senha" value={user.senha} onChange={handleSenhaChange} />
                            <span>Confirme sua senha {senhaOk && <span style={{ color: 'green', fontWeight: 'bolder' }}> &#10003; </span>}</span>
                            <input placeholder="********" type="password" name="senha" onChange={handleVerifySenhaChange} />
                            <button type="submit" disabled={user.nome && user.email && user.senha && senhaOk ? false : true} >Cadastrar</button>
                        </motion.form>
                            <button className={style.modalNav} onClick={() => setOpen('login')}>Entrar</button></>
                    }
                    {open === 'login' &&
                        <><motion.form initial={{ x: -15 }} animate={{ x: 0 }} transition={{ duration: 0.3 }} className={style.formModal} onSubmit={submitUser}>
                            <span>Email</span>
                            <input placeholder="palpitefc@mail.com" type="email" name="email" value={user.email} onChange={handleEmailChange} />
                            <span>Senha</span>
                            <input placeholder="********" type="password" name="senha" value={user.senha} onChange={handleSenhaChange} />
                            <button type="submit" disabled={user.email && user.senha ? false : true}>Entrar</button>
                        </motion.form >
                            <button className={style.modalNav} onClick={() => setOpen('cadastro')}>Cadastrar</button></>
                    }
                </div>
            </div>
        </motion.div>,
        document.body
    )
}

export default Modal