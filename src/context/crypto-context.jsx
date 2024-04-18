import { useContext } from "react";
import { createContext, useState, useEffect } from "react";
import { fakeFetchCrypto, fetchAssets } from "../api";
import { percentDifference } from "../utils";

const CryptoContext = createContext({
    assets: [],
    crypto: [],
    loading: false,
})

export function CryptoContextProvider({children}) {
    const [loading, setLoading] = useState(false);
    const [crypto, setCrypto] = useState([]);
    const [assets, setAssets] = useState([]);

    function mapAssets(assets, result) {
      return assets.map(asset => {
        const coin = result.find((c) => c.id === asset.id);
      return {
        grow: asset.price < coin.price,
        growPercent: percentDifference(asset.price, coin.price),
        totalAmout: asset.amount * coin.price,
        totalPrifit: asset.amount * coin.price - asset.amount * asset.price,
        ...asset,
      };
      })
    }
  
    useEffect(() => {
      async function preload() {
        setLoading(true);
        const { result } = await fakeFetchCrypto();
        const assets = await fetchAssets();
        setAssets(mapAssets(assets, result));
        setCrypto(result);
        setLoading(false);
      }
      preload();
    }, []);

    function addAsset(newAsset) {
      setAssets((prev) => mapAssets([...prev, newAsset], crypto))
    }

    return <CryptoContext.Provider value={{loading, crypto, assets, addAsset}}>
        {children}
    </CryptoContext.Provider>
}

export default CryptoContext;

export function useCrypto() {
   return useContext(CryptoContext)
}