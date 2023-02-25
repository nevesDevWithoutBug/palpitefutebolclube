import { NextPage } from "next";
import AdminHomeComponent from "src/components/adminHome";
import Api from "src/providers/http/api";

const index: NextPage = () => {


        async function handleGame() {

        const teste = await Api.get('/api/auth/game', {id: 3})

        console.log('games', teste)

    }

    return (
        <>
            <div onClick={handleGame}>
                <AdminHomeComponent /> 
            </div>
        </>
    );
}

export default index