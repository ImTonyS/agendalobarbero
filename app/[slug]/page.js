import ServicesContainer from "@/components/clientView/ServicesContainer";

export default function Slug({ params }) {
  const { slug } = params;
  return <ServicesContainer slug={slug} />;
}
