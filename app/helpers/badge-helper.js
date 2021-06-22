export const getBadges = (sale) => {
  let badgesArray = [];

  if (sale.baby) {
    badgesArray.push('Baby');
  }

  if (sale.boyMen) {
    badgesArray.push('Boys / Men');
  }

  if (sale.electronics) {
    badgesArray.push('Electronics');
  }

  if (sale.girlWomen) {
    badgesArray.push('Girls / Women');
  }

  if (sale.homeDecoration) {
    badgesArray.push('Home Decoration');
  }

  if (sale.kitchen) {
    badgesArray.push('Kitchen')
  }

  return badgesArray;
};
