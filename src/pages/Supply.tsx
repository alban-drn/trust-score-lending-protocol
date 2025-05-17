
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
import { Info, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CustomProgress } from "@/components/ui/custom-progress";

const Supply = () => {
  const { toast } = useToast();
  const [asset, setAsset] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  
  const handleSupply = () => {
    toast({
      title: "Demo Mode",
      description: "In a real application, this would initiate a supply transaction.",
      variant: "default",
    });
  };

  const availableAssets = [
    { name: "Ethereum", symbol: "ETH", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png", apy: "1.26%" },
    { name: "USD Coin", symbol: "USDC", logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png", apy: "3.75%" },
    { name: "Wrapped Bitcoin", symbol: "WBTC", logo: "https://cryptologos.cc/logos/wrapped-bitcoin-wbtc-logo.png", apy: "0.87%" },
    { name: "Dai", symbol: "DAI", logo: "https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png", apy: "3.41%" },
  ];

  return (
    <SidebarLayout>
      <div className="flex flex-col h-screen">
        <Header />
        <main className="flex-1 p-6 space-y-6 overflow-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Supply</h2>
          </div>

          <Tabs defaultValue="supply" className="w-full">
            <TabsList className="bg-aave-light-blue/20 border border-aave-light-blue/50 mb-6">
              <TabsTrigger value="supply">Supply</TabsTrigger>
              <TabsTrigger value="deposits">Your Deposits</TabsTrigger>
            </TabsList>

            <TabsContent value="supply" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="bg-aave-blue-gray border-aave-light-blue col-span-2">
                  <CardHeader>
                    <CardTitle>Supply Asset</CardTitle>
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
                            onClick={() => setAmount("0.5")} // Demo max amount
                          >
                            MAX
                          </Button>
                        </div>
                        <div className="text-sm text-gray-400 flex justify-between">
                          <span>Wallet balance: 0.5 {asset}</span>
                          <span>~$900.00</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <Switch id="use-collateral" defaultChecked />
                          <Label htmlFor="use-collateral">Use as collateral</Label>
                        </div>
                        <div className="text-sm text-gray-400 flex items-center">
                          <Info className="h-4 w-4 mr-1" />
                          <span>Required to borrow against</span>
                        </div>
                      </div>

                      <Button 
                        className="w-full mt-4 aave-button-gradient"
                        onClick={handleSupply}
                        disabled={!asset || !amount}
                      >
                        Supply {asset}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-aave-blue-gray border-aave-light-blue">
                  <CardHeader>
                    <CardTitle>Supply Summary</CardTitle>
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
                            <span className="text-gray-400">APY</span>
                            <span className="text-green-400">
                              {asset && availableAssets.find(a => a.symbol === asset)?.apy}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Collateral Usage</span>
                            <span className="text-aave-accent">Enabled</span>
                          </div>
                        </div>

                        <div className="rounded-lg border border-aave-light-blue p-4 space-y-4">
                          <div>
                            <h4 className="text-sm text-gray-400 mb-2">Protocol Health</h4>
                            <CustomProgress 
                              value={65} 
                              className="h-2 bg-aave-light-blue/30" 
                              indicatorClassName="bg-gradient-to-r from-aave-primary to-aave-secondary" 
                            />
                            <div className="flex justify-between mt-1 text-xs text-gray-400">
                              <span>0%</span>
                              <span>100%</span>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm text-gray-400 mb-2">Pool Utilization</h4>
                            <CustomProgress 
                              value={45} 
                              className="h-2 bg-aave-light-blue/30" 
                              indicatorClassName="bg-gradient-to-r from-aave-primary to-green-400" 
                            />
                            <div className="flex justify-between mt-1 text-xs text-gray-400">
                              <span>0%</span>
                              <span>100%</span>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="h-64 flex items-center justify-center text-center">
                        <div className="text-gray-400">
                          <p>Select an asset to see supply details</p>
                          <ArrowRight className="mx-auto mt-2 h-6 w-6 opacity-50" />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="deposits" className="space-y-6">
              <Card className="bg-aave-blue-gray border-aave-light-blue">
                <CardHeader>
                  <CardTitle>Your Supply Positions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <p className="text-gray-400 mb-2">You have no active supply positions</p>
                    <Button 
                      onClick={() => document.querySelector('[data-value="supply"]')?.click()}
                      className="aave-button-gradient mt-4"
                    >
                      Supply Now
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

export default Supply;
