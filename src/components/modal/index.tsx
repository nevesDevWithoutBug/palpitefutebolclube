import { createPortal } from "react-dom"
import { motion } from "framer-motion";
import style from "./style.module.css"
import { useState } from "react";
import { userCreateType } from "src/types/UserCreateType";
import { UserType } from "src/types/UserType";
import Image from "next/image";
import Close from "../../../public/assets/assets/rectangle-xmark-regular.svg"
import Api from "src/providers/http/api";
import { toast } from "react-toastify";


const Modal = ({ display, toggle, open, setOpen, setUserExibition }: any) => {

    const [user, setUser] = useState<UserType>({ name: '', email: '', password: '', role : 300 })
    const [senhaOk, setSenhaOk] = useState<boolean>(false)

    function handleNomeChange(e: any) {
        setUser({ ...user, name: e.target.value })
    }

    function handleEmailChange(e: any) {
        setUser({ ...user, email: e.target.value })
    }

    function handleSenhaChange(e: any) {
        setUser({ ...user, password: e.target.value })
        setSenhaOk(false)
    }

    function handleVerifySenhaChange(e: any) {
        if (user.password === e.target.value) return setSenhaOk(true)
        return setSenhaOk(false)
    }

    async function signup() {
        if((user.email.includes('@')) && (user.password.length >= 6)){
            const {message, ...response} = await Api.auth('api/signup', user)
            if(message){return toast.error(message)}
            setOpen('login')
            return toast.success(`Olá ${response.user.name}, agora faça login!`)
        }
        return toast.error('Confira email e/ou senha.')
    }

    async function signin() {
        if(user.email.includes('@')){
        const {message, ...response} = await Api.auth('api/signin', user)
        if(message){return toast.error(message)}
        toggle()
        setUserExibition({name: response.user.name})
        localStorage.setItem('UserPalpite', response.user.name)
        return toast.success(`Seja bem vindo ${response.user.name}`)
        }
        return toast.error('Confira os dados digitados.')
    }

    return createPortal(
        <motion.div animate={{ x: 0, opacity: 1 }} initial={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <div style={{ display: display ? 'block' : 'none', position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.5)', padding: '50px' }}>
                <div className={style.contentModal}>
                    <div className={style.fecharModal}>
                        <span className={style.logoText}>Palpite Futebol Clube</span>
                        <button onClick={toggle}>
                            <Image src={Close} alt='fechar' width={25} />
                        </button>
                    </div>
                    {open === 'cadastro' &&
                        <><motion.form initial={{ x: 15 }} animate={{ x: 0 }} transition={{ duration: 0.3 }} className={style.formModal}>
                            <span>Nome</span>
                            <input placeholder="Informe seu nome" type="text" name="nome" value={user.name} onChange={handleNomeChange} />
                            <span>Email</span>
                            <input placeholder="palpitefc@mail.com" type="email" name="email" value={user.email} onChange={handleEmailChange} />
                            <span>Senha <span style={{fontSize:'12px'}}>(minimo 6 digitos)</span>{user.password.length >= 6 && <span style={{ color: 'green', fontWeight: 'bolder' }}> &#10003; </span>}</span>
                            <input placeholder="********" type="password" name="senha" value={user.password} onChange={handleSenhaChange} />
                            <span>Confirme sua senha {senhaOk && <span style={{ color: 'green', fontWeight: 'bolder' }}> &#10003; </span>}</span>
                            <input placeholder="********" type="password" name="senha" onChange={handleVerifySenhaChange} />
                            <button type="button" disabled={user.name && user.email && user.password && senhaOk ? false : true} 
                            onClick={() => signup()} >Cadastrar</button>
                        </motion.form>
                            <button className={style.modalNav} onClick={() => setOpen('login')}>Entrar</button></>
                    }
                    {open === 'login' &&
                        <><motion.form initial={{ x: -15 }} animate={{ x: 0 }} transition={{ duration: 0.3 }} className={style.formModal}>
                            <span>Email</span>
                            <input placeholder="palpitefc@mail.com" type="email" name="email" value={user.email} onChange={handleEmailChange} />
                            <span>Senha</span>
                            <input placeholder="********" type="password" name="senha" value={user.password} onChange={handleSenhaChange} />
                            <button type="button" disabled={user.email && user.password ? false : true}
                            onClick={() => signin()} >Entrar</button>
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