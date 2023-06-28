import { useAddress, useContract, useNFT, useNFTBalance, Web3Button } from '@thirdweb-dev/react-native';
import React from 'react';
import { Image, StyleSheet, View, Text, ScrollView } from 'react-native';

const NFT = () => {
    const address = useAddress();
    const contractAddress = '0x31014b9C47802c9F3c11491c60A36F87b3b12FC4';
    const { contract } = useContract(contractAddress);

    const { data: nft } = useNFT(contract, 0);
    const { data: nftBalance, isLoading } = useNFTBalance(contract, address, 0)
    const nftImage = nft?.metadata.image;

    const styles = StyleSheet.create({
        nftImage: {
            width: 300,
            height: 450,
            marginBottom: 10,
            borderRadius: 6,
        },
        title: {
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 20,
            padding: 10,
        },
        text: {
            fontSize: 20,
            marginBottom: 30,
        },
        nftCard: {
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            alignContent: "center",
            marginTop: 20,
        }
    })
    return (
        <ScrollView>
            <View style={styles.nftCard}>
                <Text style={styles.title}>{nft?.metadata.name}</Text>
                <Image
                    style={styles.nftImage}
                    source={{
                        uri: nftImage?.toString(),
                    }}
                />
                <Text style={styles.text}>
                    <Text>You own: </Text>
                    <Text>{isLoading ? (
                        '0'
                    ) : (
                        nftBalance?.toString()
                    )}</Text>
                </Text>
                <Web3Button
                    contractAddress={contractAddress}
                    action={(contract) => contract.erc1155.claim(0, 1)}
                >Claim
                </Web3Button>
            </View>
            <View>
                <Text style={styles.text}>Your UserId:</Text>
                {/* <Text style={styles.text}>{nft?.metadata.attributes}</Text> */}
            </View>
        </ScrollView>


    );
}

export default NFT