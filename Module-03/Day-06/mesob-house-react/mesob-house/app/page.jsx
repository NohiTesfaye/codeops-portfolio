import { fetchMenu } from "../src/api";
import Menu from "../src/screens/Menu";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  try {
    const dishes = await fetchMenu();
    return <Menu initialDishes={dishes} />;
  } catch {
    return <Menu initialDishes={[]} loadError={true} />;
  }
}