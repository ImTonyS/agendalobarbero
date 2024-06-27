import ServicesContainer from "@/components/clientView/ServicesContainer";

export default function Test({ params }) {
  const { slug } = params;
  return <ServicesContainer slug={slug} />;
}
