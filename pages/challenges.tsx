import React, { useState } from "react";
import { useRouter } from "next/router";
import ReturnButton from "@/components/buttons/returnButton";
import Challenge from "@/components/dashboard/challenge";
import ConfirmationModal from "@/components/modalConfirm";
import toast from "react-hot-toast";

const ChallengePage: React.FC = () => {
  const router = useRouter();

  const [challenges, setChallenges] = useState([
    {
      challengeId: 1,
      description: "Sykle totalt minst 15 km denne uken",
      requiredDistanceKm: 15,
      method: "cycling",
      type: "Distance" as const,
      points: 40,
      userProgress: 9.3,
    },
    {
      challengeId: 2,
      description: "Ta bussen minst 3 ganger denne uken",
      requiredCount: 3,
      method: "bus",
      type: "Standard" as const,
      points: 30,
      userProgress: 2,
    },
    {
      challengeId: 3,
      description: "Gå en tur med en kollega",
      requiredCount: 1,
      method: "custom",
      type: "Custom" as const,
      points: 50,
      userProgress: 0,
    },
  ]);

  const [loadingChallengeId, setLoadingChallengeId] = useState<number | null>(null);
  const [showChallengeInfo, setShowChallengeInfo] = useState(false);
  const [confirmChallengeId, setConfirmChallengeId] = useState<number | null>(null);

  const handleCustomChallengeCompletion = async (challengeId: number) => {
    setLoadingChallengeId(challengeId);
    await new Promise((resolve) => setTimeout(resolve, 100));

    setChallenges((prev) =>
      prev.map((ch) =>
        ch.challengeId === challengeId ? { ...ch, userProgress: 1 } : ch
      )
    );

    toast.success("Egendefinert utfordring fullført! 🎉");
    setLoadingChallengeId(null);
    setConfirmChallengeId(null);
  };

  return (
    <div className="flex flex-col items-center p-4 gap-4">
      <header className="self-start">
        <ReturnButton onClick={() => router.back()} />
      </header>
      <div className="flex justify-center w-full font-bold text-3xl text-violet-950 pb-6">
        Ukens utfordringer
      </div>

      {challenges.map((challenge) => (
        <div key={challenge.challengeId} className="w-full">
          <Challenge
            title={challenge.description}
            type={challenge.method as "cycling" | "walking" | "bus" | "car" | "custom"}
            current={Math.min(
              challenge.userProgress,
              challenge.type === "Distance"
                ? challenge.requiredDistanceKm!
                : challenge.requiredCount!
            )}
            total={
              challenge.type === "Distance"
                ? challenge.requiredDistanceKm!
                : challenge.requiredCount!
            }
            challengeType={challenge.type}
            challengePoints={challenge.points}
            isCustom={challenge.method === "custom"}
            isCompleted={
              challenge.type === "Distance"
                ? challenge.userProgress >= challenge.requiredDistanceKm!
                : challenge.userProgress >= challenge.requiredCount!
            }
            isLoading={loadingChallengeId === challenge.challengeId}
            onComplete={() => setConfirmChallengeId(challenge.challengeId)}
          />
        </div>
      ))}

      <button
        className="w-32 h-10 bg-customViolet text-white font-semibold rounded shadow-lg transition-colors flex items-center justify-center"
        onClick={() => setShowChallengeInfo((prev) => !prev)}
      >
        <span>Se detaljer</span>
        <span className="ml-2">{showChallengeInfo ? "▲" : "▼"}</span>
      </button>

      {showChallengeInfo && (
        <div className="bg-customYellow2 opacity-90 text-customViolet text-base md:text-lg p-3 rounded-lg border border-customViolet w-full text-left">
          <p className="mb-1 font-semibold">Hva betyr fargene?</p>
          <ul className="text-sm list-disc list-outside pl-6 space-y-1">
            <li>
              <span className="text-orange-500 font-medium">Oransje ramme</span>: Spesialutfordring - må fullføres manuelt.
            </li>
            <li>
              <span className="text-blue-700 font-medium">Blå ramme</span>: Standardutfordring - spores automatisk.
            </li>
            <li>
              <span className="text-green-500 font-medium">Grønn ramme</span>: Avstandsutfordring - spores automatisk basert på kilometer.
            </li>
          </ul>
        </div>
      )}

      {confirmChallengeId !== null && (
        <ConfirmationModal
          message="Er du sikker på at du vil fullføre denne aktiviteten?"
          onConfirm={() => handleCustomChallengeCompletion(confirmChallengeId)}
          onCancel={() => setConfirmChallengeId(null)}
          confirmColor="green"
        />
      )}
    </div>
  );
};

export default ChallengePage;
