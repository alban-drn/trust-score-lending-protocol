
import React from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Check, ShieldCheck, FileCheck, Activity, AlertCircle, Clock } from "lucide-react";

const CreditScoring = () => {
  // Sample user data
  const userScore = 742; // Out of 850
  const trustScore = 88; // Out of 100
  const maxScore = 850;
  const scorePercentage = (userScore / maxScore) * 100;
  
  const getScoreColor = (score: number) => {
    if (score >= 720) return "from-green-500 to-blue-500";
    if (score >= 640) return "from-yellow-500 to-green-500";
    if (score >= 580) return "from-orange-500 to-yellow-500";
    return "from-red-500 to-orange-500";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 720) return "Excellent";
    if (score >= 640) return "Good";
    if (score >= 580) return "Fair";
    return "Poor";
  };

  const scoreFactors = [
    {
      name: "On-Chain History",
      description: "Wallet age and transaction patterns",
      rating: 5, // 1-5 scale
      icon: Activity
    },
    {
      name: "Prior Repayments",
      description: "Loan history and repayment rate",
      rating: 4,
      icon: Clock
    },
    {
      name: "Wallet Reputation",
      description: "Address association score",
      rating: 5,
      icon: ShieldCheck
    },
    {
      name: "KYC Verification",
      description: "Identity documents verification",
      rating: 4,
      icon: FileCheck
    },
    {
      name: "Risk Indicators",
      description: "Potential risk markers",
      rating: 3,
      icon: AlertCircle
    }
  ];

  return (
    <SidebarLayout>
      <div className="flex flex-col h-screen">
        <Header />
        <main className="flex-1 p-6 space-y-6 overflow-auto">
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold">AI Credit Scoring</h2>
                <p className="text-gray-400">Your hybrid on-chain and off-chain credit profile</p>
              </div>
              <div className="space-x-3">
                <Button 
                  className="aave-button-gradient"
                >
                  Verify Additional Data
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="bg-aave-blue-gray border-aave-light-blue">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex justify-between">
                      <span>Your Credit Score</span>
                      <span className="text-sm bg-aave-darker px-3 py-1 rounded-full">
                        Updated 2 hours ago
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center mb-6">
                      <div className="relative w-56 h-56 mb-4">
                        <div className="w-full h-full rounded-full bg-aave-darker flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-5xl font-bold">{userScore}</div>
                            <div className="text-sm text-gray-400">out of {maxScore}</div>
                            <div className={`mt-2 font-medium text-lg aave-gradient`}>
                              {getScoreLabel(userScore)}
                            </div>
                          </div>
                        </div>
                        <div 
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: `conic-gradient(var(--aave-gradient) ${scorePercentage}%, transparent 0)`,
                            mask: 'radial-gradient(transparent 55%, white 56%)',
                            WebkitMask: 'radial-gradient(transparent 55%, white 56%)'
                          }}
                        ></div>
                      </div>

                      <div className="w-full max-w-md mb-6">
                        <div className="flex justify-between text-sm text-gray-400 mb-1">
                          <span>Poor</span>
                          <span>Fair</span>
                          <span>Good</span>
                          <span>Excellent</span>
                        </div>
                        <div className="h-2 w-full bg-aave-darker rounded-full overflow-hidden relative">
                          <div className="h-full rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"></div>
                          <div 
                            className="absolute top-0 h-4 w-2 bg-white border-2 border-aave-accent rounded-full transform -translate-y-1/4" 
                            style={{ left: `${scorePercentage}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                        <div className="bg-aave-darker rounded-lg border border-aave-light-blue p-4">
                          <div className="flex justify-between mb-2">
                            <div className="text-sm text-gray-400">Borrowing Power</div>
                            <div className="text-aave-secondary">€35,000</div>
                          </div>
                          <div className="text-xs text-gray-500">
                            Maximum amount you can borrow based on your credit score
                          </div>
                        </div>
                        
                        <div className="bg-aave-darker rounded-lg border border-aave-light-blue p-4">
                          <div className="flex justify-between mb-2">
                            <div className="text-sm text-gray-400">Interest Bonus</div>
                            <div className="text-aave-secondary">-0.75%</div>
                          </div>
                          <div className="text-xs text-gray-500">
                            Interest rate reduction based on your excellent score
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 mt-8">
                      <h3 className="font-medium">Credit Score Factors</h3>
                      
                      {scoreFactors.map((factor, idx) => (
                        <div key={idx} className="bg-aave-darker rounded-lg border border-aave-light-blue p-4">
                          <div className="flex items-start">
                            <div className="bg-aave-light-blue/20 p-2 rounded-lg mr-3">
                              <factor.icon className="h-5 w-5 text-aave-accent" />
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex justify-between mb-1">
                                <div className="font-medium">{factor.name}</div>
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <div 
                                      key={i} 
                                      className={`w-2 h-2 rounded-full mx-0.5 ${i < factor.rating ? 'bg-aave-accent' : 'bg-aave-light-blue/30'}`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <div className="text-sm text-gray-400">{factor.description}</div>
                              
                              {factor.rating >= 4 && (
                                <div className="flex items-center text-xs text-green-400 mt-2">
                                  <Check className="h-3 w-3 mr-1" />
                                  <span>Strong positive factor</span>
                                </div>
                              )}
                              
                              {factor.rating === 3 && (
                                <div className="flex items-center text-xs text-yellow-400 mt-2">
                                  <Check className="h-3 w-3 mr-1" />
                                  <span>Neutral factor</span>
                                </div>
                              )}
                              
                              {factor.rating < 3 && (
                                <div className="flex items-center text-xs text-red-400 mt-2">
                                  <AlertCircle className="h-3 w-3 mr-1" />
                                  <span>Needs improvement</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="bg-aave-blue-gray border-aave-light-blue">
                  <CardHeader className="pb-2">
                    <CardTitle>On-Chain Trust Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center mb-6">
                      <div className="relative mb-4 w-full">
                        <div className="text-4xl font-bold text-center">{trustScore}/100</div>
                        <div className="text-sm text-gray-400 text-center">Wallet Reputation</div>
                        <div className="mt-4 mb-2">
                          <Progress
                            value={trustScore}
                            className="h-2 bg-aave-darker"
                            indicatorClassName="bg-gradient-to-r from-aave-primary to-aave-secondary"
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <div>0</div>
                          <div>50</div>
                          <div>100</div>
                        </div>
                      </div>
                      
                      <div className="w-full space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Wallet Age</span>
                          <span className="text-green-400">2.3 years</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Transaction Count</span>
                          <span className="text-green-400">512</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Suspicious Activity</span>
                          <span className="text-green-400">None</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Protocol Interactions</span>
                          <span className="text-green-400">17</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-aave-blue-gray border-aave-light-blue">
                  <CardHeader className="pb-2">
                    <CardTitle>Borrow History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span>Total Loans</span>
                        <span>7</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Repayment Rate</span>
                        <span className="text-green-400">100%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Default Count</span>
                        <span className="text-green-400">0</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Average Loan Size</span>
                        <span>€12,500</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Current Outstanding</span>
                        <span>€5,000</span>
                      </div>
                      
                      <div className="pt-3 mt-3 border-t border-aave-light-blue">
                        <Button 
                          variant="outline" 
                          className="w-full border-aave-accent text-aave-accent hover:bg-aave-accent/10"
                        >
                          View Complete History <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-aave-blue-gray border-aave-light-blue">
                  <CardHeader className="pb-2">
                    <CardTitle>KYC Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center mb-4">
                      <div className="bg-green-400/10 p-3 rounded-full">
                        <ShieldCheck className="h-8 w-8 text-green-400" />
                      </div>
                    </div>
                    <div className="text-center mb-4">
                      <div className="text-green-400 font-medium mb-1">Fully Verified</div>
                      <div className="text-sm text-gray-400">All documents validated</div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center p-2 bg-aave-darker rounded-md">
                        <Check className="h-4 w-4 text-green-400 mr-2" />
                        <span className="text-sm">Identity Verification</span>
                      </div>
                      <div className="flex items-center p-2 bg-aave-darker rounded-md">
                        <Check className="h-4 w-4 text-green-400 mr-2" />
                        <span className="text-sm">Income Documentation</span>
                      </div>
                      <div className="flex items-center p-2 bg-aave-darker rounded-md">
                        <Check className="h-4 w-4 text-green-400 mr-2" />
                        <span className="text-sm">Address Verification</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </main>
      </div>
    </SidebarLayout>
  );
};

export default CreditScoring;
