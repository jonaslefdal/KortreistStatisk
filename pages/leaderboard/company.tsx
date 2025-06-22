import LeaderboardMenu from '@/components/leaderboard/leaderboardMenu';
import { Crown } from "lucide-react";
import { motion } from "framer-motion";

const staticCompanies = [
  { companyId: 1, name: "Hennig-Olsen Is", totalPoints: 18420 },
  { companyId: 2, name: "Glencore Nikkelverk AS", totalPoints: 14290 },
];

const CompanyBarChart = () => {
  const maxScore = Math.max(...staticCompanies.map(c => c.totalPoints));
  const maxBarHeight = 300;

  const barColors = [
    'bg-gradient-to-t from-yellow-300 to-yellow-500',
    'bg-gradient-to-t from-purple-400 to-purple-700'
  ];

  const companyLogos: Record<string, string> = {
    "Hennig-Olsen Is": "companyA.png",
    "Glencore Nikkelverk AS": "companyB.png",
  };

  const logoTweaks: Record<string, string> = {
    "Hennig-Olsen Is": "scale-[1.5] translate-y-[-0.4rem]",
    "Glencore Nikkelverk AS": "scale-[3]",
  };

  const crownTweaks: Record<string, string> = {
    "Hennig-Olsen Is": "-top-11",
    "Glencore Nikkelverk AS": "-top-6",
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="font-bold text-3xl text-violet-950 pb-6">Toppliste</div>
      <LeaderboardMenu />

      <div className="relative mt-14 w-full max-w-sm h-[400px] mx-auto">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-20 items-end">
          {staticCompanies.map((company, index) => {
            const heightPx = (company.totalPoints / maxScore) * maxBarHeight;
            const logoSrc = `${process.env.NEXT_PUBLIC_BASE_PATH}/images/company-pictures/${
              companyLogos[company.name] || "default.png"
            }`;

            return (
              <div key={company.companyId} className="flex flex-col items-center">
                <div className="relative mb-2 flex items-center justify-center">
                  {index === 0 && (
                    <Crown
                      size={25}
                      className={`absolute z-50 left-1/2 -translate-x-1/2 text-yellow-500 drop-shadow ${
                        crownTweaks[company.name] ?? ""
                      }`}
                    />
                  )}
                  <img
                    src={logoSrc}
                    alt={`${company.name} logo`}
                    className={`w-10 h-10 object-contain ${logoTweaks[company.name] ?? ""}`}
                  />
                </div>

                <motion.div
                  className={`rounded-t-xl w-24 shadow-md ${barColors[index]}`}
                  initial={{ height: 0 }}
                  animate={{ height: heightPx }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  style={{ minHeight: "3rem" }}
                />

                <div className="text-center mt-2">
                  <p className="font-semibold text-sm text-violet-900">
                    {company.name}
                  </p>
                  <p className="text-xs text-gray-600">
                    {company.totalPoints.toLocaleString("no-NO")} poeng
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CompanyBarChart;
