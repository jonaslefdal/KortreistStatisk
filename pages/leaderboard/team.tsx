import LeaderboardContainer from '@/components/leaderboard/leaderboardContainer';
import LeaderboardMenu from '@/components/leaderboard/leaderboardMenu';

const staticTeams = [
  { userId: 1, nickName: 'Team Fjellgeit', totalScore: 15400, profilePicture: 'teamAvatar1.png', type: 'team' as const },
  { userId: 2, nickName: 'Miljøheltene', totalScore: 14320, profilePicture: 'teamAvatar2.png', type: 'team' as const },
  { userId: 4, nickName: 'Gå-gjengen', totalScore: 12780, profilePicture: 'teamAvatar4.png', type: 'team' as const },
  { userId: 7, nickName: 'Transport123', totalScore: 10990, profilePicture: 'teamAvatar2.png', type: 'team' as const },
  { userId: 8, nickName: 'Rastegjengen', totalScore: 10630, profilePicture: 'teamAvatar3.png', type: 'team' as const },
  { userId: 9, nickName: 'Spasergutta', totalScore: 10080, profilePicture: 'teamAvatar4.png', type: 'team' as const },
];

export default function TeamLeaderboardPage() {
  return (
    <div className="flex flex-col w-full">
      <div className="w-full text-center">
        <div className="font-bold text-3xl text-violet-950 pb-6">Toppliste</div>
      </div>
      <LeaderboardMenu />
      <LeaderboardContainer users={staticTeams} />
    </div>
  );
}
