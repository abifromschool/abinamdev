import GrassField from "./components/grass";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div>
        <h1 className="text-9xl">hi, im abi</h1>
        <p className="text-xl">cse @ osu</p>
        <p className="text-base opacity-70">
          into fun projects, looking for summer 2027 internships |{" "}
          <a href="mailto:abinam.giri41@gmail.com" className="contact">
            {" "}
            contact
          </a>
        </p>
      </div>
      <GrassField />
    </main>
  );
}
