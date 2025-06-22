import React, { useState } from "react";
import router from "next/router";

interface Team {
  name: string;
  teamId: number;
  memberCount: number; 
}

interface JoinTeamFormProps {
  existingTeams: Team[];
  onJoinTeam: () => void;
  onBack: () => void;
}

export default function JoinTeamForm({
  existingTeams,
  onJoinTeam,
  onBack,
}: JoinTeamFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const joinableTeams = existingTeams.filter(team => team.memberCount < 5);
  const fullTeams = existingTeams.filter(team => team.memberCount >= 5);

  const handleJoin = async (teamId: number) => {
    setIsLoading(true);

    try {
      
      router.push("/team/dashboard");
      onJoinTeam();
    } catch (error: any) {
        return (
          <div className="flex justify-center items-center h-screen">
            <p>Her skjedde det noe galt, prøv å laste inn på nytt</p>
          </div>
        );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 mt-4">
      {joinableTeams.length > 0 && (
        <>
          <h2 className="text-xl font-bold text-customViolet">Ledige lag</h2>
          {joinableTeams.map((team) => (
            <div
              key={team.teamId}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-bold mb-2">{team.name}</h2>
                <p className="text-gray-600">Medlemmer: {team.memberCount} / 5</p>
              </div>
              <button
                onClick={() => handleJoin(team.teamId)}
                disabled={isLoading}
                className="w-full py-2 mt-4 rounded-md text-white font-medium bg-customGreen hover:bg-green-600"
              >
                {isLoading ? "Bli med..." : "Bli med i laget"}
              </button>
            </div>
          ))}
        </>
      )}

      {fullTeams.length > 0 && (
        <>
          <div className="bg-gray-100 rounded-xl shadow-inner p-4 mt-6">
          <h2 className="text-lg font-bold text-gray-700 mb-4">Fulltallige lag</h2>
          {fullTeams.map((team) => (
            <div
              key={team.teamId}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-bold mb-2">{team.name}</h2>
                <p className="text-gray">Medlemmer: {team.memberCount} / 5</p>
              </div>
              <button
                disabled
                className="w-full py-2 mt-4 rounded-md text-white font-medium bg-gray-400 cursor-not-allowed"
              >
                Lag fullt
              </button>
            </div>
          ))}
          </div>
        </>
      )}
    </div>
  );
}
