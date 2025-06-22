import LeaderboardContainer from '@/components/leaderboard/leaderboardContainer';
import LeaderboardMenu from '@/components/leaderboard/leaderboardMenu';

const staticUsers = [
  { userId: 101, nickName: 'MiljøKnut', totalScore: 7243, profilePicture: 'Avatar4.png', type: "user" as const },
  { userId: 102, nickName: 'Jonas', totalScore: 8391, profilePicture: 'Avatar2.png', type: "user" as const },
  { userId: 103, nickName: 'Ingrid', totalScore: 5120, profilePicture: 'Avatar3.png', type: "user" as const },
  { userId: 104, nickName: 'Oskar', totalScore: 9502, profilePicture: 'Avatar6.png', type: "user" as const },
  { userId: 105, nickName: 'Sofie', totalScore: 6133, profilePicture: 'Avatar5.png', type: "user" as const },
  { userId: 106, nickName: 'Marius', totalScore: 7730, profilePicture: 'Avatar6.png', type: "user" as const },
  { userId: 107, nickName: 'Ida', totalScore: 8850, profilePicture: 'Avatar7.png', type: "user" as const },
  { userId: 108, nickName: 'Henrik', totalScore: 5217, profilePicture: 'Avatar8.png', type: "user" as const },
  { userId: 109, nickName: 'Nora', totalScore: 9034, profilePicture: 'Avatar9.png', type: "user" as const },
  { userId: 110, nickName: 'Emil', totalScore: 9943, profilePicture: 'Avatar10.png', type: "user" as const },
  { userId: 111, nickName: 'Linnea', totalScore: 6001, profilePicture: 'Avatar11.png', type: "user" as const },
  { userId: 112, nickName: 'Lars', totalScore: 7305, profilePicture: 'Avatar12.png', type: "user" as const },
  { userId: 113, nickName: 'Thea', totalScore: 8052, profilePicture: 'Avatar13.png', type: "user" as const },
  { userId: 114, nickName: 'Sander', totalScore: 9609, profilePicture: 'Avatar14.png', type: "user" as const },
  { userId: 115, nickName: 'Mia', totalScore: 5487, profilePicture: 'Avatar15.png', type: "user" as const },
  { userId: 116, nickName: 'Elias', totalScore: 7492, profilePicture: 'Avatar16.png', type: "user" as const },
  { userId: 117, nickName: 'Aurora', totalScore: 8674, profilePicture: 'Avatar1.png', type: "user" as const },
  { userId: 118, nickName: 'Noah', totalScore: 9940, profilePicture: 'Avatar2.png', type: "user" as const },
  { userId: 119, nickName: 'Julie', totalScore: 6890, profilePicture: 'Avatar3.png', type: "user" as const },
  { userId: 120, nickName: 'Oliver', totalScore: 9155, profilePicture: 'Avatar5.png', type: "user" as const },
];

export default function UserLeaderboardPage() {
  return (
    <div className="flex flex-col w-full">
      <div className="w-full text-center">
        <div className="font-bold text-3xl text-violet-950 pb-6">Toppliste</div>
      </div>
      <LeaderboardMenu />
      <LeaderboardContainer users={staticUsers} currentUserId={101} />
    </div>
  );
}
