import { Navbar } from "@/components/Navbar";
import { ScrollToTop } from "@/components/ScrollToTop";
import { CommandPalette } from "@/components/CommandPalette";
import { SectionNavigator } from "@/components/SectionNavigator";
import Link from "next/link";
import type {
  PortfolioExperience,
  PortfolioDevOpsMilestone,
  PortfolioKnowledge,
  PortfolioProfile,
  PortfolioProject,
  PortfolioSkill,
} from "@/lib/portfolio-data";

type CommandPaletteData = {
  projects?: PortfolioProject[];
  skills?: PortfolioSkill[];
  knowledge?: PortfolioKnowledge[];
  devOpsJourney?: PortfolioDevOpsMilestone[];
  experience?: PortfolioExperience[];
};

export function PageFrame({
  children,
  profile,
  commandData,
}: {
  children: React.ReactNode;
  profile?: PortfolioProfile;
  commandData?: CommandPaletteData;
}) {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <a
        href="#content"
        className="focus-ring fixed left-4 top-4 z-[100] -translate-y-20 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-lg transition focus:translate-y-0"
      >
        Skip to content
      </a>
      <Navbar profile={profile} />
      <ScrollToTop />
      <CommandPalette profile={profile} data={commandData} />
      <SectionNavigator />
      <div id="content" className="relative z-10 pb-20 md:pb-0">
        {children}
      </div>
      <footer className="relative z-10 border-t bg-background/90 py-10 pb-28 text-sm text-muted-foreground backdrop-blur md:pb-10">
        <div className="container mx-auto grid gap-6 px-4 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="font-bold text-foreground">
              {profile?.fullName || "Ravi Agrahari"}
            </p>
            <p className="mt-2 max-w-2xl leading-6">
              &copy; {new Date().getFullYear()} Ravi Agrahari. Built with
              Next.js, MongoDB, Cloudinary, and a cloud-minded delivery
              workflow.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 md:justify-end">
            {[
              { href: "/projects", label: "Projects" },
              { href: "/stack", label: "Stack" },
              { href: "/knowledge", label: "Knowledge" },
              { href: "/contact", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="focus-ring rounded-full border px-3 py-2 font-semibold transition hover:border-primary/40 hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
