import { useState } from "react";
import TeamOptions from "../../components/teams/TeamOptions";
import CreateTeamForm from "../../components/teams/CreateTeamForm";
import JoinTeamForm from "../../components/teams/JoinTeamForm";
import { useRouter } from "next/router";
import { useUserAuth } from "@/components/userAuth";
import { useApi } from "@/hooks/useApi";
import CustomSpinner from "@/components/dashboard/customSpinner";

type Team = { 
  name: string; 
  teamId: number; 
  memberCount: number;
};

export default function OnboardingPage() {
  const [step, setStep] = useState<"" | "create" | "join">("");
  const [teamName, setTeamName] = useState("");
  const router = useRouter();
  const { userData, loading, error } = useUserAuth();

    const existingTeams: Team[] = [
    { teamId: 1, name: "GrønneHelter", memberCount: 5 },
    { teamId: 2, name: "SykkelSprekinger", memberCount: 3 },
    { teamId: 3, name: "MiljøMafiaen", memberCount: 4 },
  ];

  const handleSuccess = () => {
    router.replace("/team/dashboard");
  };

  return (
    <main className="flex flex-col items-center px-4">
      <div className='w-full text-center'>
        <div className="font-bold text-3xl text-violet-950">Velg Lag</div>
      </div>

      <div className="w-full max-w-xs sm:max-w-md flex flex-col gap-4 mt-6 text-center">
        <p className="text-lg sm:text-xl font-medium text-black">
          Du er ikke medlem av et lag:
        </p>

        {step === "" && (
        <>
          {existingTeams?.length === 0 ? (
            <p>Det finnes ingen lag ennå. Du kan være den første til å lage ett!</p>
          ) : (
            <p>Bli med i et lag, eller opprett ditt eget.</p>
          )}
          <TeamOptions onCreate={() => setStep("create")} />
        </>
      )}


        {step === "create" && (
          <CreateTeamForm
            teamName={teamName}
            setTeamName={setTeamName}
            onCreateTeam={handleSuccess}
            onBack={() => setStep("")}
          />
        )}
            
        <JoinTeamForm
          existingTeams={existingTeams || []}
          onJoinTeam={handleSuccess}
          onBack={() => setStep("")}
        />
      </div>
    </main>
  );
}
