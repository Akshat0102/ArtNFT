import { Button } from "antd";
import { DynaPuff } from 'next/font/google'
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const puff = DynaPuff({ subsets: ['latin'], weight: ['400'] })

const Header = () => {

    const { connectWallet, accountAddress } = useContext(AuthContext);

    return (
        <div className="header">
            <p className={puff.className} style={{ fontSize: "60px", color: "white" }}>
                Art<span style={{ color: "#0B2447" }}>NFT</span>
            </p>
            <Button type="primary" onClick={connectWallet} style={{
                width: "auto",
                minWidth: "12%",
                fontSize: "16px",
                height: "60%",
            }}>
                {!!accountAddress ? accountAddress : "Connect Wallet"}
            </Button>
            <style jsx>{`       
                .header{
                    display: flex;
                    min-width: 100vw;
                    height: 15vh;
                    align-items: center;
                    justify-content: space-between;
                    padding: 20px 40px 0px 40px;
                } 
            `}</style>
        </div>
    )
}

export default Header;