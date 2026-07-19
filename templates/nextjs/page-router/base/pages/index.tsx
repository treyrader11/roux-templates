export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Welcome to Roux UI</h1>
      <p className="mt-4 text-lg text-gray-600">
        Start building with{" "}
        <code className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
          npx rouxui add &lt;component&gt;
        </code>
      </p>
    </main>
  );
}
