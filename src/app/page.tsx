import Image from "next/image";

export default function Home() {
  return (
    <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
      <div>
        <p className="mb-10 flex w-full justify-center border-gray-300 backdrop-blur-2xl dark:border-neutral-800 lg:w-auto rounded-xl border bg-gray-200 p-4 dark:bg-zinc-800/30">
          Welcome to&nbsp;
          <code className="font-mono font-bold">Real Fans</code>
        </p>

        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert animate-pulse"
          src="/waraka.png"
          alt="Next.js Logo"
          width={300}
          height={300}
          priority
        />
      </div>
    </div>
  );
}
