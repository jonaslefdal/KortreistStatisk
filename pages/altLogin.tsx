import { useEffect } from "react";
import { useRouter } from "next/router";

export default function AltLogin() {
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("mockUser", JSON.stringify({
      email: "demo@kortreist.no",
      name: "Test Bruker",
    }));

    router.replace("/");
  }, []);

  return "";
}
