import { useState } from "react";
import { Button, Input, Image } from "antd";
import styles from "../../styles/ImgNFT/ImgNFT.module.css";
import Header from "@/components/header/header.component";
import { NFTStorage, File } from "nft.storage";
import axios from "axios";
import { Comfortaa } from 'next/font/google'

const comfort = Comfortaa({ subsets: ['latin'], weight: ['700'] })

const ImgNFT = () => {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState(null)
    const [url, setURL] = useState(null)

    const viewMetadata = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const onCLickHandler = async (e) => {

        e.preventDefault();

        if (name === "" || description === "") {
            window.alert("Please Provide Name and Description");
            return
        }

        //creating image using stable diffusin API and storing the data
        const imageData = await createImage();

        //store image to IPFS (NFT.Storage)
        const url = await storeImage(imageData)
    }

    const createImage = async () => {

        const URL = `https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2`;

        try {
            const response = await axios({
                url: URL,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGING_FACE_ACCESS_TOKEN}`,
                    Accept: 'application/json',
                    "Content-Type": 'application/json',
                },
                data: JSON.stringify({
                    inputs: description, options: { wait_for_model: true },
                }),
                responseType: 'arraybuffer',
            })
            const type = response.headers['content-type']
            const data = response.data

            const base64data = Buffer.from(data).toString('base64')
            const img = `data:${type};base64,` + base64data  //to make it render on the page
            setImage(img)

            return data
        } catch (err) {
            console.log("ERROR WHILE CALLING API: ", err);
        }
    }

    const storeImage = async (imageData) => {

        //instance of NFT.Storage
        const nftstorage = new NFTStorage({ token: process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY })

        //request to store image
        const { ipnft } = await nftstorage.store({
            image: new File([imageData], "image.jpeg", { type: "image/jpeg" }),
            name: name,
            description: description,
        })

        //saving the URL for the image
        const url = `https://ipfs.io/ipfs/${ipnft}/metadata.json`
        setURL(url)

        return url
    }

    return (
        <div className={styles.main}>
            <Header />
            <div className={styles.generator}>
                <form className={styles.metaForm}>
                    <Input type="text" placeholder="Provide a name" style={{
                        height: "50px",
                        width: "75%",
                    }} onChange={(e) => { setName(e.target.value) }} />
                    <Input type="text" placeholder="Provide a description" style={{
                        height: "50px",
                        width: "75%",
                    }} onChange={(e) => { setDescription(e.target.value) }} />
                    <div className={styles.btnsection}>
                        <Button type="primary" size="large" onClick={onCLickHandler} style={{
                            height: "50px",
                            width: "45%",
                        }}>Create and Mint</Button>
                        <Button type="primary" size="large" onClick={() => viewMetadata(url)} style={{
                            height: "50px",
                            background: "green",
                            width: "45%",
                        }}>View Metadata</Button>
                    </div>
                </form>
                <div className={styles.imageLoad}>
                    <Image src={image} width={500} height={350} />
                </div>
            </div>
        </div>
    )
}

export default ImgNFT;