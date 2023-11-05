import { useChainId } from "wagmi";
import { contractsChainId } from "./config";

function useContracts() {
  const chainId = useChainId();

  return contractsChainId[chainId as keyof typeof contractsChainId];
}

export default useContracts;
