import ViewContainer from "@/components/clientView/ViewContainer";

export default function Test({ params }) {
  const { barberId } = params;

  return <ViewContainer barberId={barberId} />;
}
