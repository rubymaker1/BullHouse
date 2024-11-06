"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, Trophy, Users, ListChecks, ArrowRight, Check, ChevronLeft, MoreVertical, Wallet, MapPin } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

type Task = {
  id: number
  title: string
  reward: number
  completed: boolean
  icon: string
  type: 'in-game' | 'partners'
}

type LeaderboardEntry = {
  username: string
  points: number
  rank?: number
  medal?: boolean
  avatar?: string
}

type Friend = {
  username: string
  joinedAt: string
  points: number
}

export default function ClawsTelegramApp() {
  const [activeTab, setActiveTab] = useState('home')
  const [taskType, setTaskType] = useState('in-game')
  const [walletConnected, setWalletConnected] = useState(false)
  const [clawsBalance, setClawsBalance] = useState(0)
  const [showMap, setShowMap] = useState(false)
  const [telegramAge, setTelegramAge] = useState(0)
  const [mapBonus, setMapBonus] = useState(0)

  const [tasks] = useState<Task[]>([
    { id: 1, title: "Complete daily mission", reward: 250, completed: true, icon: "🎯", type: 'in-game' },
    { id: 2, title: "Add CLAWS to bio", reward: 5000, completed: false, icon: "🐾", type: 'in-game' },
    { id: 3, title: "Share CLAWS bot", reward: 2000, completed: false, icon: "🤖", type: 'in-game' },
    { id: 4, title: "Join CLAWS channel", reward: 2500, completed: false, icon: "📢", type: 'partners' },
    { id: 5, title: "Follow CLAWS group", reward: 1000, completed: true, icon: "👥", type: 'partners' },
  ])

  const [leaderboard] = useState<LeaderboardEntry[]>([
    { username: "crypto_king", points: 61086519, medal: true },
    { username: "ton_master", points: 55670401, medal: true },
    { username: "claws_lover", points: 48070230, medal: true },
    { username: "telegram_pro", points: 47471226, rank: 4 },
    { username: "blockchain_fan", points: 20134, rank: 3100794 },
  ])

  const [friends] = useState<Friend[]>([
    { username: "alice_crypto", joinedAt: "November 06 at 22:16", points: 278 },
    { username: "bob_blockchain", joinedAt: "November 06 at 22:16", points: 152 },
  ])

  useEffect(() => {
    // Simulating fetching user's Telegram account age
    const fetchTelegramAge = () => {
      // In a real app, this would be an API call to get the user's actual Telegram join date
      const randomAge = Math.floor(Math.random() * 5) + 1; // Random age between 1 and 5 years
      setTelegramAge(randomAge);
    };

    fetchTelegramAge();
  }, []);

  const connectWallet = () => {
    // Simulating wallet connection
    setWalletConnected(true)
    setClawsBalance(20134) // Example balance
  }

  const checkClawsMap = () => {
    setShowMap(true);
    const bonus = telegramAge * 1000; // 1000 CLAWS per year of Telegram age
    setMapBonus(bonus);
    setClawsBalance(prevBalance => prevBalance + bonus);
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <ChevronLeft className="h-6 w-6" />
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">CLAWS</span>
            <Badge variant="secondary" className="bg-blue-500">✓</Badge>
          </div>
        </div>
        <MoreVertical className="h-6 w-6" />
      </div>

      {/* Blue Info Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-l-4 border-blue-500">
        <span className="text-sm">Check the CLAWS map</span>
        <Button variant="ghost" size="sm" className="text-blue-500" onClick={checkClawsMap}>
          <MapPin className="h-5 w-5" />
        </Button>
      </div>

      {activeTab === 'home' && (
        <div className="p-4 space-y-8">
          {!walletConnected ? (
            <Button 
              onClick={connectWallet} 
              className="w-full bg-blue-500 hover:bg-blue-600 text-white h-12 text-lg flex items-center justify-center gap-2"
            >
              <Wallet className="h-5 w-5" />
              Connect TON Wallet
            </Button>
          ) : (
            <div className="bg-gray-900 rounded-lg p-4 text-center">
              <Wallet className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{clawsBalance.toLocaleString()}</div>
              <div className="text-sm text-gray-400">CLAWS Balance</div>
            </div>
          )}

          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="text-6xl">🐾</div>
            <div className="text-4xl font-bold tracking-tight">
              {walletConnected ? `${clawsBalance.toLocaleString()} CLAWS` : 'Connect Wallet'}
            </div>
            {walletConnected && (
              <div className="flex items-center gap-2 text-gray-400">
                LEGEND ⭐ RANK <ArrowRight className="h-4 w-4" />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <Button className="w-full bg-gray-900 hover:bg-gray-800 justify-between h-14">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Join CLAWS community
              </div>
              <ArrowRight className="h-5 w-5" />
            </Button>

            <Button className="w-full bg-gray-900 hover:bg-gray-800 justify-between h-14">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Check your rewards
              </div>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <div className="p-4 space-y-6">
          <div className="flex flex-col items-center gap-2">
            <div className="text-4xl">🏆</div>
            <h2 className="text-2xl font-bold">Leaderboard</h2>
            <div className="text-sm text-gray-400">Total: 25,750,992 users</div>
          </div>

          <div className="space-y-2">
            {leaderboard.map((entry, index) => (
              <Card key={index} className={`bg-gray-900 border-0 ${index === 0 ? 'bg-white text-black' : ''}`}>
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 bg-black">
                      <AvatarFallback>🐾</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{entry.username}</div>
                      <div className="text-sm text-gray-400">{entry.points.toLocaleString()} CLAWS</div>
                    </div>
                  </div>
                  <div>
                    {entry.rank ? `#${entry.rank.toLocaleString()}` : entry.medal ? "🏅" : ""}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'tasks' && (
        <div className="p-4 space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">TASKS</h1>
            <p className="text-xl">
              <span className="text-white">GET REWARDS</span>{" "}
              <span className="text-gray-500">FOR COMPLETING QUESTS</span>
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant={taskType === 'in-game' ? 'default' : 'outline'}
              className={`flex-1 ${taskType === 'in-game' ? 'bg-white text-black' : 'bg-gray-900 text-white'}`}
              onClick={() => setTaskType('in-game')}
            >
              In-game
            </Button>
            <Button
              variant={taskType === 'partners' ? 'default' : 'outline'}
              className={`flex-1 ${taskType === 'partners' ? 'bg-white text-black' : 'bg-gray-900 text-white'}`}
              onClick={() => setTaskType('partners')}
            >
              Partners
            </Button>
          </div>

          <div className="space-y-4">
            {tasks
              .filter(task => task.type === taskType)
              .map(task => (
                <div key={task.id} className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-800 p-2 rounded-lg">{task.icon}</div>
                    <div>
                      <div className="font-medium">{task.title}</div>
                      <div className="text-sm text-gray-400">+ {task.reward.toLocaleString()} CLAWS</div>
                    </div>
                  </div>
                  {task.completed ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <Button size="sm" variant="outline" className="bg-white text-black hover:bg-gray-200">
                      Start
                    </Button>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      {activeTab === 'friends' && (
        <div className="p-4 space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">INVITE FRIENDS</h1>
            <p className="text-xl">
              <span className="text-white">SHARE</span>{" "}
              <span className="text-gray-500">YOUR INVITATION LINK &</span>{" "}
              <span className="text-white">GET 10%</span>{" "}
              <span className="text-gray-500">OF FRIEND'S POINTS</span>
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Total</span>
              <span>{friends.length} users</span>
            </div>

            {friends.map((friend, index) => (
              <Card key={index} className="bg-gray-900 border-0">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 bg-gray-800">
                      <AvatarFallback>
                        <Users className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{friend.username}</div>
                      <div className="text-sm text-gray-400">{friend.joinedAt}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div>+{friend.points} CLAWS</div>
                    <div className="text-sm text-green-500">Received</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white h-12 text-lg">
            Invite
          </Button>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-900">
        <div className="flex justify-around p-4">
          <Button
            variant="ghost"
            className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-blue-500' : 'text-gray-400'}`}
            onClick={() => setActiveTab('home')}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex flex-col items-center gap-1 ${activeTab === 'leaderboard' ? 'text-blue-500' : 'text-gray-400'}`}
            onClick={() => setActiveTab('leaderboard')}
          >
            <Trophy className="h-5 w-5" />
            <span className="text-xs">Leaderboard</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex flex-col items-center gap-1 ${activeTab === 'friends' ? 'text-blue-500' : 'text-gray-400'}`}
            onClick={() => setActiveTab('friends')}
          >
            <Users className="h-5 w-5" />
            <span className="text-xs">Friends</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex flex-col items-center gap-1 ${activeTab === 'tasks' ? 'text-blue-500' : 'text-gray-400'}`}
            onClick={() => setActiveTab('tasks')}
          >
            <ListChecks className="h-5 w-5" />
            <span className="text-xs">Earn</span>
          </Button>
        </div>
      </div>

      {/* CLAWS Map Dialog */}
      <Dialog open={showMap} onOpenChange={setShowMap}>
        <DialogContent className="bg-gray-900 text-white">
          <DialogHeader>
            <DialogTitle>CLAWS Map</DialogTitle>
            <DialogDescription>
              Your Telegram account age: {telegramAge} years
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-lg font-semibold">Congratulations!</p>
            <p>You've earned a bonus based on your Telegram age:</p>
            <p className="text-2xl font-bold text-green-500 mt-2">+{mapBonus.toLocaleString()} CLAWS</p>
          </div>
          <Button onClick={() => setShowMap(false)} className="w-full bg-blue-500 hover:bg-blue-600">
            Claim Bonus
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}