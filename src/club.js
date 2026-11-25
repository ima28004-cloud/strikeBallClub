const communityId = "204414667";
export const clubMessages = `https://vk.com/im?sel=-${communityId}`;

export const venueRates = [
  { name: "Центральная площадка", capacity: 20, price: 26000 },
  { name: "Малая площадка", capacity: 10, price: 13000 },
  { name: "Площадка № 3", capacity: 10, price: 13000 },
  { name: "Подвал", capacity: 10, price: 15000 },
];

export const classRate = 12000;
export const kitRate = 4500;
export const rentalRates = [
  ...venueRates,
  { name: "Класс 1 или класс 2", capacity: 10, price: classRate, unit: "класс" },
];

export function rubles(amount, decimals = 0) {
  return (
    amount.toLocaleString("ru-RU", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }) + " ₽"
  );
}
