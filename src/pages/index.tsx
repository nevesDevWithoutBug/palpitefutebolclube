import { motion } from "framer-motion";
import { NextPage } from "next";
import AsideBlog from "src/components/asideBlog";
import AsideEnquete from "src/components/asideEnquete";
import CardPalpite from "src/components/cardPalpite/index";
import Footer from "src/components/footer/index";
import HeaderPrincipal from "../components/header/index"
import style from "./style.module.css"

const Home: NextPage = () => {



    // async function handleGame() {

    //     const teste = await Api.post('/api/auth/game', { name: 'jogo 2', championshipId:1, firstTeam:{ id: 1, gol: 2 }, secondTeam:{ id: 2, gol: 1 } })

    //     console.log('games', teste)

    // }




    return (
        <div className={style.contentHome}>
            <HeaderPrincipal />
            <motion.div animate={{ x: 0, opacity: 1 }} initial={{ opacity: 0 }} transition={{ duration: 1 }} 
            className={style.contentSite}>
                <AsideEnquete />
                <CardPalpite />
                <AsideBlog />
            </motion.div>
            <Footer />
        </div>
    );
}

export default Home