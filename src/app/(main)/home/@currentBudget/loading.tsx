import Spinner from "@/components/Spinner";

export default function Loading() {
  return (
    <div className="card h-full p-3 rounded">
      <div className="w-fit mx-auto py-4">
        <Spinner />
      </div>
    </div>
  );
}
