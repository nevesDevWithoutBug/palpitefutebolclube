import { BsFacebook, BsTwitter, BsYoutube, BsGithub } from "react-icons/bs"
import { AiFillInstagram } from "react-icons/ai"
import { BiCopyright } from "react-icons/bi"
import "./style.css"

function Footer() {

    return (
        <footer>
            <ul>
                <span>Nos siga nas redes</span>
                <div>
                    <li>
                        <AiFillInstagram size={50} style={{ color: "radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)" }} />
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
            <div className="titlePalpite">
                <BiCopyright size={20} /> <span> Palpite Futebol CLube </span>
            </div>
            <div className="gitHub">
                <span> Desenvolvido por:</span> <BsGithub size={50} />
            </div>
        </footer>
    )
}

export default Footer