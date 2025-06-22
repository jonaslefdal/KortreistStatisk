import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUserAuth } from "@/components/userAuth";

export default function TeamIndex() {
  const router = useRouter();
  const { userData } = useUserAuth();
  const [checkingTeam, setCheckingTeam] = useState(true);

  useEffect(() => {
    if (!userData?.accessToken) return;

    const checkIfInTeam = async () => {
      try {

          router.replace("/team/dashboard");

      } catch (error) {
        router.replace("/team/onboarding");
      } finally {
        setCheckingTeam(false);
      }
    };

    checkIfInTeam();
  }, [userData?.accessToken, router]);

  return null; // Or a loading spinner if needed
}
