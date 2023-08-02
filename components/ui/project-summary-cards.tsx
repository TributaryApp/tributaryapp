"use client"

import {
    useConnectModal,
    useAccountModal,
    useChainModal,
} from '@rainbow-me/rainbowkit';
import { useBalance } from 'wagmi'
import { Framework } from "@superfluid-finance/sdk-core";
import { usePublicClient } from 'wagmi'
import { ethers } from "ethers";


import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"


async function getTotal(){
    const provider = new ethers.providers.InfuraProvider(
        "maticmum",
        "c74fd5a3e74b478b9d444f9572aa1129"
     );
    const sf = await Framework.create({
        chainId: 80001,
        provider
    });
    const daix = await sf.loadSuperToken("0x5d8b4c2554aeb7e86f387b4d6c00ac33499ed01f");
    let res = await daix.getNetFlow({
        account: '0xED26C400D2c4566b5Fe042BC9e807c297Ff3901C',
        providerOrSigner: provider
    });
    return Number(res) / (60 * 60 * 24 * 30 )   
}

export default function ProjectSummary(project:any) {   
//   const { data: walletClient, isError, isLoading } = useWalletClient()

  const total = getTotal()
  console.log(project)
  const { data, isError, isLoading } = useBalance({
    address: project.created_by,
    token: '0x5d8b4c2554aeb7e86f387b4d6c00ac33499ed01f',
    watch: true,
  })

  console.log(total)
  console.log(data)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8 px-10">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
                Total {data?.symbol} Balance
            </CardTitle>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {isLoading ? <div>Loading Balance</div>
                        :
                        <div>
                            {data?.formatted} {data?.symbol}
                        </div>
                        }
                    </div>
                </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
                Number of Streams
            </CardTitle>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
            >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">50</div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Stream Rate</CardTitle>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
            >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
            </svg>
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">5 {data?.symbol} per month</div>
            <p className="text-xs text-muted-foreground">
            </p>
            </CardContent>
        </Card>
    </div>
  )
}