import ViewContainer from "@/components/clientView/ViewContainer";

export default function BarberId({ params }) {
  const { barberId } = params;

  return <ViewContainer barberId={barberId} />;
}
