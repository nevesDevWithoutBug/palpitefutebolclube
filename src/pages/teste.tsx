import { NextPage } from "next";
import Aside from "src/components/aside";
import CardPalpite from "src/components/cardPalpite/index";
import Footer from "src/components/footer/index";
import HeaderPrincipal from "../components/header/index"

const Home: NextPage = () => {
    return (
        <>
            <HeaderPrincipal />
            <div style={{ display: "flex", flexDirection: "row", width: '100vw' }}>
                <Aside />
                <CardPalpite />
                <Aside />
            </div>
            <Footer />
        </>
    );
}

export default Home