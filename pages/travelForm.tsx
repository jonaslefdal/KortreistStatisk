import { useEffect, useState } from "react";
import AddressAutocomplete from "@/components/addressAutocomplete";
import TransportModeButton from "@/components/dashboard/travelButtons";
import PrimaryButton from "@/components/buttons/primaryButton";
import ReturnButton from "@/components/buttons/returnButton";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const travelOptions = [
  { label: "Gange", value: "walking", iconSrc: `${basePath}/images/travelForm/Gange.svg` },
  { label: "Sykkel", value: "cycling", iconSrc: `${basePath}/images/travelForm/Sykkel.svg` },
  { label: "Kollektivtransport", value: "bus", iconSrc: `${basePath}/images/travelForm/Kollektiv.svg` },
  { label: "Samkjøring", value: "car", iconSrc: `${basePath}/images/travelForm/Carpool.svg` },
];

export default function TravelForm() {
  const router = useRouter();

  const [address, setAddress] = useState("Osloveien 1, Oslo");
  const [selected, setSelected] = useState<{ label: string; value: string } | null>(null);
  const [addressError, setAddressError] = useState("");
  const [transportError, setTransportError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    if (!selected) {
      setTransportError("Husk å velge reisemåte.");
      hasError = true;
    } else {
      setTransportError("");
    }

    if (!address.trim()) {
      setAddressError("Addressefeltet kan ikke stå tomt.");
      hasError = true;
    } else {
      setAddressError("");
    }

    if (hasError) return;

    setIsSaving(true);

    try {
      sessionStorage.setItem("pointsEarned", "243"); // Dummy poeng
      router.push("/");
    } catch (error: any) {
      toast.error("Noe gikk galt. Prøv igjen.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col items-center px-4">
      <header className="self-start">
        <ReturnButton onClick={() => router.back()} />
      </header>
      <div className="font-bold text-3xl text-violet-950 pb-6">Registrer reise</div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-y-6 w-full">
        <p className="font-semibold text-lg -mb-4">Hvor reiser du fra?</p>
        <div className="w-full">
          <AddressAutocomplete selectedAddress={address} setSelectedAddress={setAddress} />
          {addressError && <p className="text-customRed text-sm py-2">{addressError}</p>}
        </div>

        <div className="w-full">
          <label className="block font-semibold text-lg pb-2">Reisemåte</label>
          <div className="grid grid-cols-2 gap-4">
            {travelOptions.map(({ label, value, iconSrc }) => (
              <TransportModeButton
                key={label}
                label={label}
                value={value}
                icon={iconSrc}
                selected={selected?.value === value}
                onClick={() => setSelected({ label, value })}
              />
            ))}
          </div>
          {transportError && <p className="text-customRed text-sm py-2">{transportError}</p>}
        </div>

        <div id="submit" className="w-full mt-8">
          <PrimaryButton title="Registrer" type="submit" disabled={isSaving || !address.trim()} />
        </div>
      </form>
    </div>
  );
}
