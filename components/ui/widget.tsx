"use client"

import SuperfluidWidget from '@superfluid-finance/widget';
import superTokenList from "@superfluid-finance/tokenlist";
import { useMemo } from 'react';
import {
    useConnectModal,
    useAccountModal,
    useChainModal,
} from '@rainbow-me/rainbowkit';


const widgetData = {
    "productDetails": {
      "name": "Test Tributary",
      "description": "This is to support the \"Test Tributary Project\"",
      "imageURI": "",
    },
    
    "paymentDetails": {
      "paymentOptions": [
        {
          "receiverAddress": "0xED26C400D2c4566b5Fe042BC9e807c297Ff3901C",
          "superToken": {
            "address": "0x5d8b4c2554aeb7e86f387b4d6c00ac33499ed01f"
          },
          "chainId": 80001,
          "flowRate": {
            "amountEther": "1",
            "period": "month"
          }
        }
      ]
    },
    "type": "page",
    "theme": {
      "typography": {
        "fontFamily": "'Noto Emoji', 'sans-serif'"
      },
      "palette": {
        "mode": "light",
        "primary": {
          "main": "#1d97b2"
        },
        "secondary": {
          "main": "#fff"
        }
      },
      "shape": {
        "borderRadius": 27
      },
      "components": {
        "MuiStepIcon": {
          "styleOverrides": {
            "text": {
              "fill": "#fff"
            }
          }
        },
        "MuiOutlinedInput": {
          "styleOverrides": {
            "root": {
              "borderRadius": 10
            }
          }
        },
        "MuiButton": {
          "styleOverrides": {
            "root": {
              "borderRadius": 10
            }
          }
        }
      }
    }
  }

export default function StreamSetup() {   

const { openConnectModal: open, connectModalOpen: isOpen } = useConnectModal();

const walletManager = useMemo(() => (
    {
        open,
        isOpen,
    }
    ),
    [open, isOpen]
);

 return (
        <SuperfluidWidget
          {...widgetData}
          tokenList={superTokenList}
          type="dialog"
          // @ts-ignore
          walletManager={walletManager}
        >
        {({ openModal }) => (
          <button onClick={() => openModal()}>Stream Into Project</button>
        )}
        </SuperfluidWidget>
  )
}