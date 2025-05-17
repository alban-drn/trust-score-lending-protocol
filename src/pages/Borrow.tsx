
import React, { useState } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Info, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Borrow = () => {
  const { toast } = useToast();
  const [asset, setAsset] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [ltv, setLtv] = useState<number[]>([50]);
  
  const handleBorrow = () => {
    toast({
      title: "Demo Mode",
      description: "In a real application, this would initiate a borrow transaction.",
      variant: "default",
    });
  };

  const availableAssets = [
    { name: "Ethereum", symbol: "ETH", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png", apy: "2.52%" },
    { name: "USD Coin", symbol: "USDC", logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png", apy: "4.92%" },
    { name: "Wrapped Bitcoin", symbol: "WBTC", logo: "https://cryptologos.cc/logos/wrapped-bitcoin-wbtc-logo.png", apy: "1.94%" },
    { name: "Dai", symbol: "DAI", logo: "https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png", apy: "4.63%" },
  ];

  return (
    <SidebarLayout>
      <div className="flex flex-col h-screen">
        <Header />
        <main className="flex-1 p-6 space-y-6 overflow-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Borrow</h2>
          </div>

          <Tabs defaultValue="borrow" className="w-full">
            <TabsList className="bg-aave-light-blue/20 border border-aave-light-blue/50 mb-6">
              <TabsTrigger value="borrow">Borrow</TabsTrigger>
              <TabsTrigger value="debt">Your Debt</TabsTrigger>
            </TabsList>

            <TabsContent value="borrow" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="bg-aave-blue-gray border-aave-light-blue col-span-2">
                  <CardHeader>
                    <CardTitle>Borrow Asset</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Select asset</Label>
                        <Select value={asset} onValueChange={setAsset}>
                          <SelectTrigger className="bg-aave-darker border-aave-light-blue">
                            <SelectValue placeholder="Choose an asset" />
                          </SelectTrigger>
                          <SelectContent className="bg-aave-darker border-aave-light-blue">
                            {availableAssets.map((asset) => (
                              <SelectItem key={asset.symbol} value={asset.symbol}>
                                <div className="flex items-center">
                                  <div className="h-6 w-6 rounded-full overflow-hidden bg-white mr-2">
                                    <img src={asset.logo} alt={asset.name} className="h-full w-full object-contain" />
                                  </div>
                                  <span>{asset.name} ({asset.symbol})</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Amount</Label>
                        <div className="relative">
                          <Input
                            type="text"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="bg-aave-darker border-aave-light-blue pr-16"
                          />
                          <Button 
                            variant="ghost" 
                            className="absolute right-0 top-0 h-full px-3 text-aave-accent"
                            onClick={() => setAmount("1000")} // Demo max amount
                          >
                            MAX
                          </Button>
                        </div>
                        <div className="text-sm text-gray-400 flex justify-between">
                          <span>Available to borrow: $12,500</span>
                          <span>Wallet balance: $0.00</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>Loan to Value (LTV)</Label>
                          <span className="text-sm text-aave-accent">{ltv}%</span>
                        </div>
                        <Slider
                          value={ltv}
                          onValueChange={setLtv}
                          max={80}
                          step={1}
                          className="my-4"
                        />
                        <div className="flex justify-between text-xs text-gray-400">
                          <span>Safe</span>
                          <span>Moderate</span>
                          <span>Risky</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <Switch id="stable-rate" />
                          <Label htmlFor="stable-rate">Stable interest rate</Label>
                        </div>
                        <div className="text-sm text-gray-400 flex items-center">
                          <Info className="h-4 w-4 mr-1" />
                          <span>More predictable but higher rate</span>
                        </div>
                      </div>

                      <Button 
                        className="w-full mt-4 aave-button-gradient"
                        onClick={handleBorrow}
                        disabled={!asset || !amount}
                      >
                        Borrow {asset}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-aave-blue-gray border-aave-light-blue">
                  <CardHeader>
                    <CardTitle>Borrow Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {asset ? (
                      <>
                        <div className="rounded-lg border border-aave-light-blue p-4 space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Asset</span>
                            <div className="flex items-center">
                              {asset && (
                                <div className="h-5 w-5 rounded-full overflow-hidden bg-white mr-1">
                                  <img 
                                    src={availableAssets.find(a => a.symbol === asset)?.logo} 
                                    alt={asset} 
                                    className="h-full w-full object-contain" 
                                  />
                                </div>
                              )}
                              <span>{asset}</span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Amount</span>
                            <span>{amount || '0.00'} {asset}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Interest Rate</span>
                            <span className="text-aave-primary">
                              {asset && availableAssets.find(a => a.symbol === asset)?.apy}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Health Factor</span>
                            <span className="text-green-400">2.17</span>
                          </div>
                        </div>

                        <div className="rounded-lg border border-aave-light-blue p-4 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Loan to Value</span>
                            <span>{ltv}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Liquidation Threshold</span>
                            <span>{Math.min(ltv[0] + 20, 90)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Maximum LTV</span>
                            <span>80%</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="h-64 flex items-center justify-center text-center">
                        <div className="text-gray-400">
                          <p>Select an asset to see borrowing details</p>
                          <ArrowRight className="mx-auto mt-2 h-6 w-6 opacity-50" />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="debt" className="space-y-6">
              <Card className="bg-aave-blue-gray border-aave-light-blue">
                <CardHeader>
                  <CardTitle>Your Borrowing Positions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <p className="text-gray-400 mb-2">You have no active borrowing positions</p>
                    <Button 
                      onClick={() => document.querySelector('[data-value="borrow"]')?.click()}
                      className="aave-button-gradient mt-4"
                    >
                      Borrow Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </SidebarLayout>
  );
};

export default Borrow;
