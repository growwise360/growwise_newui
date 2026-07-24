import type { CartItem } from '@/components/gw/CartContext';
import type { Level, Program, Slot } from '@/lib/summer-camp-data';

export function toAcademicSummerCartItem(program: Program, level: Level, slot: Slot): CartItem {
  return {
    id: slot.id,
    name: `${program.title} — ${level.name} — ${slot.label}`,
    price: slot.price,
    quantity: 1,
    image: program.image,
    category: program.category,
    type: 'summer-camp',
    level: level.name,
  };
}
