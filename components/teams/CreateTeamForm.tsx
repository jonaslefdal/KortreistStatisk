import { validateName } from "@/services/validateName";
import router from "next/router";
import React, { useState } from "react";

interface CreateTeamFormProps {
  teamName: string;
  setTeamName: (value: string) => void;
  onCreateTeam: () => void;
  onBack: () => void;
}

export default function CreateTeamForm({
  teamName,
  setTeamName,
  onCreateTeam,
  onBack,
}: CreateTeamFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTeamName(value);
    setNameError(validateName(value, { maxLength: 12, label: "Lagnavn" }));
  };

  const handleCreate = async () => {
    setIsLoading(true);

    try {
      router.push("/team/dashboard");

      } catch (error) {
      console.error("Error creating team:", error);
      onCreateTeam();
    };
  }

  return (
    <div className="flex flex-col gap-4 mt-4">
      <input
        type="text"
        value={teamName}
        onChange={handleInputChange}
        placeholder="Skriv inn lagnavn..."
        className="p-2 border border-gray-400 rounded-md"
      />
      {nameError && <p className="text-customRed text-sm">{nameError}</p>}

      <button
        onClick={handleCreate}
        disabled={!teamName.trim() || isLoading || Boolean(nameError)}
        className={`py-3 rounded-md text-white font-medium ${
          teamName.trim() && !isLoading && !nameError
            ? "bg-customViolet"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {isLoading ? "Oppretter..." : "Opprett lag"}
      </button>

      <button onClick={onBack} className="text-gray-600 hover:text-black">
        Tilbake
      </button>
    </div>
  );
}
