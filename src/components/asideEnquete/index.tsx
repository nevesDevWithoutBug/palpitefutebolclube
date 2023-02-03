import Image from "next/image"
import cruzeiro from "../../../public/assets/assets/cruzeiro.svg"
import atletico from "../../../public/assets/assets/atleticomg.svg"
import noticias from "../../../public/assets/assets/noticiasIcon.png"
import style from "./style.module.css"

function AsideEnquete() {

    return (
        <aside className={style.paiAsideEnquete}>
            <div className={style.cardInfo}>
                <div className={style.headerBlog}>
                    <Image src={noticias} width={25} height={10} style={{ marginRight: '0.5rem' }} alt="noticias" />
                    Enquetes
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
            </div>
            <div className={style.cardInfo}>
                <div className={style.headerBlog}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" style={{ width: '40px', height: '40px', marginRight: '7px' }}>
                        <path d="M353.8 54.1L330.2 6.3c-3.9-8.3-16.1-8.6-20.4 0L286.2 54.1l-52.3 7.5c-9.3 1.4-13.3 12.9-6.4 19.8l38 37-9 52.1c-1.4 9.3 8.2 16.5 16.8 12.2l46.9-24.8 46.6 24.4c8.6 4.3 18.3-2.9 16.8-12.2l-9-52.1 38-36.6c6.8-6.8 2.9-18.3-6.4-19.8l-52.3-7.5zM256 256c-17.7 0-32 14.3-32 32V480c0 17.7 14.3 32 32 32H384c17.7 0 32-14.3 32-32V288c0-17.7-14.3-32-32-32H256zM32 320c-17.7 0-32 14.3-32 32V480c0 17.7 14.3 32 32 32H160c17.7 0 32-14.3 32-32V352c0-17.7-14.3-32-32-32H32zm416 96v64c0 17.7 14.3 32 32 32H608c17.7 0 32-14.3 32-32V416c0-17.7-14.3-32-32-32H480c-17.7 0-32 14.3-32 32z" />
                    </svg>
                    Ranking
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

export default AsideEnquete