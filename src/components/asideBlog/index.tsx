import Image from "next/image"
import cruzeiro from "../../../public/assets/assets/cruzeiro.svg"
import atletico from "../../../public/assets/assets/atleticomg.svg"
import noticias from "../../../public/assets/assets/noticiasIcon.png"
import style from "./style.module.css"

function AsideBlog() {

    return (
        <aside className={style.paiAsideBlog}>
            <div className={style.cardInfo}>
                <div className={style.headerBlog}>
                    <Image src={noticias} width={25} height={10} style={{ marginRight: '0.5rem' }} alt="noticias" />
                    Notícias
                </div>
                <section>
                    <div className={style.contentNoticias}>
                        <h1>Cristiano Ronaldo</h1>
                        <article>
                            Lorem, ipsum dolor sit amet consectetur
                            adipisicing elit. Minus nisi, voluptatibus
                            quos atque porro blanditiis totam.
                        </article>
                    </div>
                    <Image src={cruzeiro} width={100} height={100} alt="Cruzeiro" />
                </section>
                <section>
                    <div className={style.contentNoticias}>
                        <h1>Lionel Messi</h1>
                        <article>
                            Lorem, ipsum dolor sit amet consectetur
                            adipisicing elit. Minus nisi, voluptatibus
                            quos atque porro blanditiis totam.
                        </article>
                    </div>
                    <Image src={atletico} width={100} height={100} alt="Atletico" />
                </section>
            </div>
            <div className={style.cardInfo}>
                <div className={style.headerBlog}>
                    <Image src={noticias} width={25} height={10} style={{ marginRight: '0.5rem' }} alt="noticias" />
                    Notícias
                </div>
                <section>
                    <div className={style.contentNoticias}>
                        <h1>Cristiano Ronaldo</h1>
                        <article>
                            Lorem, ipsum dolor sit amet consectetur
                            adipisicing elit. Minus nisi, voluptatibus
                            quos atque porro blanditiis totam.
                        </article>
                    </div>
                    <Image src={cruzeiro} width={100} height={100} alt="Cruzeiro" />
                </section>
                <section>
                    <div className={style.contentNoticias}>
                        <h1>Lionel Messi</h1>
                        <article>
                            Lorem, ipsum dolor sit amet consectetur
                            adipisicing elit. Minus nisi, voluptatibus
                            quos atque porro blanditiis totam.
                        </article>
                    </div>
                    <Image src={atletico} width={100} height={100} alt="Atletico" />
                </section>
            </div>
        </aside>
    )
}

export default AsideBlog