import { Navigate, Route, Routes } from "react-router-dom"
import Landing from "@/pages"
import AuthLayout from "./layouts/auth-layout"
import LoginPage from "./pages/login"
import SignUpPage from "./pages/signup"
import OnboardPage from "./pages/onboard"
import AppLayout from "./layouts/app-layout"
import DashboardPage from "./pages/dashboard"
import { EmptyComponent } from "./components/custom/utils/empty-component"
import SettingsPage from "./pages/settings"
import ProfilePage from "./pages/profile"
import BillingPage from "./pages/billing"
import ActivityFeedPage from "./pages/activity-feed"
import LeaderboardsPage from "./pages/leaderboards"
import AnalyticsPage from "./pages/analytics"
import ProgressTrackerPage from "./pages/progress-track"
import { TeamsPage } from "./pages/teams-page"
import { TeamDetailsPage } from "./pages/teams-details-page"
import { ContestCalendarPage } from "./pages/contest-calender"
import { NotificationsPage } from "./pages/notifications-page"
import { InviteReferralPage } from "./pages/invite-referral"
import { AchievementsPage } from "./pages/achievements"
import { FriendsPage } from "./pages/friends"
import { ContestDetailsPage } from "./pages/contest-details"
import OTPVerificationPage from "./pages/otp-verification-page"


// const sidebarData = [
//     {
//         title: "Main",
//         items: [
//         {title: "Dashboard Overview", url: "/app/dashboard", icon: LayoutDashboard },
//         {title: "Activity Feed", url: "/app/activity", icon: Activity },
//         {title: "Leaderboard", url: "/app/leaderboard", icon: Trophy },
//         ],
//     },
//         {
//           title: "Progress & Analytics",
//         items: [
//         {title: "Analytics & Insights", url: "/app/analytics", icon: BarChart3 },
//         {title: "Progress Tracker", url: "/app/progress", icon: TrendingUp },
//         ],
//     },
//         {
//           title: "Social & Collaboration",
//         items: [
//         {title: "Teams & Groups", url: "/app/teams", icon: Users },
//         {title: "Contest Calendar", url: "/app/calendar", icon: Calendar },
//         {title: "Team Chat", url: "/app/chat", icon: MessageCircle },
//         ],
//     },
//         {
//           title: "Profile & Settings",
//         items: [
//         {title: "Settings", url: "/app/settings", icon: Settings },
//         {title: "Help & Support", url: "/app/help", icon: HelpCircle },
//         ],
//     },
//         ];

const App = () => {
  return (
    <Routes>

      <Route path="/" element={< Landing />} />
      <Route path="*" element={< Landing />} />
      <Route path="/auth" element={<AuthLayout />} >
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="otp-verification" element={<OTPVerificationPage/>} />
      </Route>
      <Route path="/app" element={<AppLayout />} >
      <Route path="onboarding" element={<OnboardPage />} />
        <Route path="" element={<Navigate to="/app/dashboard" />} />
        <Route path={"dashboard"} element={<DashboardPage />} />
        <Route path="activity" element={<ActivityFeedPage />} />
        <Route path="leaderboard" element={<LeaderboardsPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="progress" element={<ProgressTrackerPage />} />
        <Route path="teams" element={<TeamsPage />} />
        <Route path="teams/:teamId" element={<TeamDetailsPage />} />
        <Route path="calendar" element={<ContestCalendarPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="help" element={<EmptyComponent />} />  
        <Route path="profile" element={<ProfilePage />} />
        <Route path="billing" element={<BillingPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="referrals" element={<InviteReferralPage />} />
        {/*  */}
        <Route path="profile/achievements" element={<AchievementsPage />} />
        <Route path="friends" element={<FriendsPage />} />
        <Route path="contest/:contestId" element={<ContestDetailsPage />} />
        {/*  */}
        <Route path="chat" element={<EmptyComponent />} />
      </Route>
    </Routes>
  )
}


export default App
