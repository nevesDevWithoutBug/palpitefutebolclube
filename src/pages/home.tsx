import { motion } from "framer-motion";
import { NextPage } from "next";
import AsideBlog from "src/components/asideBlog";
import AsideEnquete from "src/components/asideEnquete";
import CardPalpite from "src/components/cardPalpite/index";
import Footer from "src/components/footer/index";
import HeaderPrincipal from "../components/header/index"

const Home: NextPage = () => {
    return (
        <div style={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <HeaderPrincipal />
            <motion.div
                animate={{ x: 0, opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 1 }}
                style={{ display: "flex", flexDirection: "row", width: '100%', gap: '1rem', padding: '2rem' }}>
                <AsideEnquete />
                <CardPalpite />
                <AsideBlog />
            </motion.div>
            <Footer />
        </div>
    );
}

export default Home