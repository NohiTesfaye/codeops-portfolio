import { fetchSpecials } from "../../src/api";
import Specials from "../../src/screens/Specials";

export const dynamic = "force-dynamic";

export default async function SpecialsPage() {
  try {
    const dishes = await fetchSpecials();
    return <Specials initialDishes={dishes} />;
  } catch {
    return <Specials initialDishes={[]} loadError={true} />;
  }
}