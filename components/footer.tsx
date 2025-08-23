import { MoveRight } from "lucide-react";
// import Link from "next/link";
// import { Button } from "./ui/button";

export const Footer = () => {
  return (
    <footer className="mx-auto p-5">
      <div className="flex items-center gap-2 text-lg">
        <MoveRight />
        Made with ❤️ by {"ur bff"}
        {/* <Button asChild variant={"link"} className="h-auto p-0 text-xl">
          <Link href="https://brianmillonte.vercel.app/" target="_blank">
            @_briuwu
          </Link>
        </Button> */}
      </div>
    </footer>
  );
};
