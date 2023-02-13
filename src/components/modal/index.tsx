import { createPortal } from "react-dom"
import { motion } from "framer-motion";

const Modal = ({ display, toggle, open }: any) => {

    return createPortal(
        <motion.div
            animate={{ x: 0, opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        ><div
            style={{
                display: display ? 'block' : 'none',
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                background: 'rgba(0,0,0,0.5)',
                padding: '50px'
            }}
        >
                <div
                    style={{
                        background: '#fff',
                        borderRadius: '10px',
                        width: '50%',
                        height: '50%',
                        margin: 'auto',
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <button onClick={toggle}>X</button>
                    {open === 'cadastro' && <form>
                        <span>Nome</span>
                        <input type="text" />
                        <span>Email</span>
                        <input type="email" />
                        <span>Telefone</span>
                        <input type="text" />
                        <span>Apelido</span>
                        <input type="text" />
                        <button>Cadastrar</button>
                    </form>}
                    {open === 'login' && <form>
                        <span>Email</span>
                        <input type="email" />
                        <span>Senha</span>
                        <input type="password" />
                        <button>Entrar</button>
                    </form>}
                </div>
            </div>
        </motion.div>,
        document.body
    )
}

export default Modal