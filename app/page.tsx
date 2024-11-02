"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Bell, Check, ExternalLink, Share2, Trophy, Twitter, Users } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast, useToast } from "@/components/ui/use-toast"

type Task = {
  id: number;
  description: string;
  reward: number;
  completed: boolean;
  link: string;
  type: 'twitter' | 'telegram';
}

type LeaderboardEntry = {
  username: string;
  points: number;
}

type Friend = {
  username: string;
  joinedAt: string;
}

export default function BullHouse() {
  // Simulating automatic login with Telegram username
  const [username, setUsername] = useState("telegram_user123")
  const [points, setPoints] = useState(0)
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, description: "Follow @cryptobull on Twitter", reward: 50, completed: false, link: "https://twitter.com/cryptobull", type: 'twitter' },
    { id: 2, description: "Join Telegram channel @bullhouse", reward: 30, completed: false, link: "https://t.me/bullhouse", type: 'telegram' },
    { id: 3, description: "Like and retweet pinned post on @cryptobull", reward: 20, completed: false, link: "https://twitter.com/cryptobull", type: 'twitter' },
  ])
  const [newTaskAvailable, setNewTaskAvailable] = useState(false)
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([
    { username: "crypto_king", points: 500 },
    { username: "bull_master", points: 450 },
    { username: "token_trader", points: 400 },
  ])
  const [friends, setFriends] = useState<Friend[]>([
    { username: "alice_crypto", joinedAt: "2023-05-15" },
    { username: "bob_blockchain", joinedAt: "2023-05-16" },
  ])
  const { toast } = useToast()

  useEffect(() => {
    // Simulate fetching user data and initializing the bot
    const initializeBot = async () => {
      // In a real implementation, you would fetch user data from your backend
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulating API call
      toast({
        title: "Welcome to Bull House!",
        description: `Hello, ${username}! Your account is ready. Start completing tasks to earn rewards!`,
      })
    }

    initializeBot()

    // Simulate new task notification after 5 seconds
    const timer = setTimeout(() => {
      setNewTaskAvailable(true)
      toast({
        title: "New Task Available!",
        description: "A new high-reward task has just been added. Check it out!",
      })
    }, 5000)

    return () => clearTimeout(timer)
  }, [username])

  const completeTask = (taskId: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: true } : task
      )
    )
    const completedTask = tasks.find(task => task.id === taskId)
    if (completedTask) {
      setPoints(prevPoints => prevPoints + completedTask.reward)
      toast({
        title: "Task Completed!",
        description: `You've earned ${completedTask.reward} points for completing the task.`,
      })
    }
  }

  const verifyTask = (taskId: number) => {
    // In a real implementation, this would involve checking with the respective API
    // For now, we'll simulate a successful verification
    setTimeout(() => {
      completeTask(taskId)
    }, 1500)
  }

  const shareReferralLink = () => {
    // In a real implementation, this would generate a unique referral link
    const referralLink = `https://bullhouse.com/refer/${username}`
    navigator.clipboard.writeText(referralLink)
    toast({
      title: "Referral Link Copied!",
      description: "Share this link with your friends to earn bonus points when they join!",
    })
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Bull House</CardTitle>
          <Avatar>
            <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${username}`} />
            <AvatarFallback>{username[0]}</AvatarFallback>
          </Avatar>
        </div>
        <CardDescription>Welcome, {username}! Complete tasks to earn points.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="tasks">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="friends">Friends</TabsTrigger>
          </TabsList>
          <TabsContent value="tasks">
            <div className="space-y-4">
              {tasks.map(task => (
                <Card key={task.id}>
                  <CardHeader>
                    <CardTitle className="text-sm">{task.description}</CardTitle>
                    <CardDescription>Reward: {task.reward} points</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between">
                    <Button 
                      onClick={() => window.open(task.link, '_blank')}
                      variant="outline"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {task.type === 'twitter' ? 'Go to Twitter' : 'Open Telegram'}
                    </Button>
                    <Button 
                      onClick={() => verifyTask(task.id)} 
                      disabled={task.completed}
                    >
                      {task.completed ? (
                        <>
                          <Check className="mr-2 h-4 w-4" /> Completed
                        </>
                      ) : (
                        "Verify Completion"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
                <CardDescription>Your points and task progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Total Points:</span>
                  <Badge variant="secondary" className="text-lg">{points}</Badge>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Task Progress:</span>
                    <span>{tasks.filter(t => t.completed).length} / {tasks.length}</span>
                  </div>
                  <Progress value={(tasks.filter(t => t.completed).length / tasks.length) * 100} />
                </div>
                <Button onClick={shareReferralLink} className="w-full">
                  <Share2 className="mr-2 h-4 w-4" /> Share Referral Link
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="leaderboard">
            <Card>
              <CardHeader>
                <CardTitle>Leaderboard</CardTitle>
                <CardDescription>Top performers in Bull House</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {leaderboard.map((entry, index) => (
                    <li key={entry.username} className="flex justify-between items-center">
                      <span className="flex items-center">
                        {index === 0 && <Trophy className="mr-2 h-4 w-4 text-yellow-500" />}
                        {index === 1 && <Trophy className="mr-2 h-4 w-4 text-gray-400" />}
                        {index === 2 && <Trophy className="mr-2 h-4 w-4 text-amber-600" />}
                        {entry.username}
                      </span>
                      <Badge variant="secondary">{entry.points} pts</Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="friends">
            <Card>
              <CardHeader>
                <CardTitle>Friends</CardTitle>
                <CardDescription>Your referrals and their join dates</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {friends.map((friend) => (
                    <li key={friend.username} className="flex justify-between items-center">
                      <span className="flex items-center">
                        <Users className="mr-2 h-4 w-4" />
                        {friend.username}
                      </span>
                      <span className="text-sm text-muted-foreground">{friend.joinedAt}</span>
                    </li>
                  ))}
                </ul>
                <Button onClick={shareReferralLink} className="w-full mt-4">
                  <Share2 className="mr-2 h-4 w-4" /> Invite More Friends
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
      {newTaskAvailable && (
        <CardFooter>
          <Alert>
            <Bell className="h-4 w-4" />
            <AlertTitle>New task available!</AlertTitle>
            <AlertDescription>
              A new high-reward task has just been added. Check it out!
            </AlertDescription>
          </Alert>
        </CardFooter>
      )}
    </Card>
  )
}