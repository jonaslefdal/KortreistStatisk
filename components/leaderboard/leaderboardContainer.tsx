import { useEffect, useState } from 'react';
import Podium from './podium';
import LeaderboardItem from './leaderboardItem';
import LeaderboardUserCard from './LeaderboardUserCard';

interface User {
  userId: number;
  nickName: string;
  totalScore: number;
  profilePicture: string;
  type?: 'user' | 'team';
}

interface LeaderboardContainerProps {
  users: User[];
  currentUserId?: number;
}

export default function LeaderboardContainer({ users, currentUserId }: LeaderboardContainerProps) {
  const [topThree, setTopThree] = useState<(User & { rank: number })[]>([]);
  const [restOfBoard, setRestOfBoard] = useState<(User & { rank: number })[]>([]);
  const [rankedData, setRankedData] = useState<(User & { rank: number })[]>([]);

  useEffect(() => {
    const sorted = [...users].sort((a, b) => b.totalScore - a.totalScore);
    const ranked: (User & { rank: number })[] = [];

    let currentRank = 1;
    for (let i = 0; i < sorted.length; i++) {
      if (i > 0 && sorted[i].totalScore === sorted[i - 1].totalScore) {
        ranked.push({ ...sorted[i], rank: ranked[i - 1].rank });
      } else {
        ranked.push({ ...sorted[i], rank: currentRank });
      }
      currentRank++;
    }

    setRankedData(ranked);
    setTopThree(ranked.slice(0, 3));
    setRestOfBoard(ranked.slice(3));
  }, [users]);

  const currentUserItem = rankedData.find((u) => u.userId === currentUserId);

  const visualOrder = [2, 1, 3];

  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-end gap-6 mt-10">
        {visualOrder.map((visualPos) => {
          const user = topThree[visualPos - 1];
          if (!user) return null;
          return (
            <Podium
              key={user.userId}
              rank={user.rank}
              nickName={user.nickName}
              score={user.totalScore}
              profilePicture={user.profilePicture}
              visualPosition={visualPos}
              type={user.type ?? 'user'}
            />
          );
        })}
      </div>

      {currentUserItem && (
        <div className="mt-4 px-8">
          <LeaderboardUserCard
            userId={currentUserItem.userId}
            nickName={currentUserItem.nickName}
            score={currentUserItem.totalScore}
            rank={currentUserItem.rank}
            profilePicture={currentUserItem.profilePicture}
            type={currentUserItem.type ?? 'user'}
          />
        </div>
      )}

      {restOfBoard.length > 0 && (
        <>
          <div className="flex mt-4 px-8 justify-between items-center">
            <h2 className="font-bold text-customViolet mb-2">Deltakere</h2>
            <h2 className="font-bold text-customViolet mb-2">Poeng</h2>
          </div>
          <div className="w-full rounded-t-lg bg-customYellow2/50 backdrop-blur-md">
            {restOfBoard.map((user) => (
              <LeaderboardItem
                key={user.userId}
                userId={user.userId}
                rank={user.rank}
                nickName={user.nickName}
                score={user.totalScore}
                profilePicture={user.profilePicture}
                type={user.type ?? 'user'}
                isCurrentUser={user.userId === currentUserId}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
