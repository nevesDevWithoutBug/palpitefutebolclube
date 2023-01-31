import { BsFacebook, BsTwitter, BsYoutube, BsGithub } from "react-icons/bs"
import { AiFillInstagram } from "react-icons/ai"
import { BiCopyright } from "react-icons/bi"
import style from "./style.module.css"

function Footer() {

    return (
        <footer className={style.footerSite}>
            <ul>
                <span className={style.spanFooter}>Nos siga nas redes</span>
                <div>
                    <li>
                        <AiFillInstagram size={50} />
                    </li>
                    <li>
                        <BsFacebook size={50} />
                    </li>
                    <li>
                        <BsTwitter size={50} />
                    </li>
                    <li>
                        <BsYoutube size={50} />
                    </li>
                </div>
            </ul>
            <div className={style.titlePalpite}>
                <BiCopyright size={20} /> <span className={style.spanFooter}> Palpite Futebol CLube </span>
            </div>
            <div className={style.gitHub}>
                <span className={style.spanFooter}> Desenvolvido por:</span> <BsGithub size={50} />
            </div>
        </footer>
    )
}

export default Footer