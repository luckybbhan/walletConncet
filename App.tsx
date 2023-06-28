import {
  ConnectWallet,
  localWallet,
  metamaskWallet,
  useAddress,
  rainbowWallet,
  ThirdwebProvider,
  useConnect,
} from '@thirdweb-dev/react-native';
import { WalletConnect } from "@thirdweb-dev/wallets";
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  Image,
  View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import NFT from './NFT';

import { Mumbai } from "@thirdweb-dev/chains"
const App = () => {
  return (
    <ThirdwebProvider
      activeChain={Mumbai}
      supportedWallets={[metamaskWallet(), rainbowWallet(), localWallet()]}>
      <AppInner />
    </ThirdwebProvider>
  );
};

const AppInner = () => {

  const wallet = new WalletConnect(
    {
      chains: [Mumbai],
    },
  );
  const address = wallet.connect();

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const textStyles = {
    color: isDarkMode ? Colors.white : Colors.black,
    ...styles.heading,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={styles.view}>
        <Image
          source={require('./logo.jpg')}
          style={{ width: 100, height: 100, marginTop: -200, marginBottom: 30 }}

        />
        <Text style={textStyles}>Start Web3 From here</Text>
        <ConnectWallet />

        {!address ? (
          <Text style={styles.text}> Welcome!</Text>
        ) : (
          <NFT />
        )

        }
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default App;
