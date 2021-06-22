export const getSaleIcons = (sale) => {
  let badgesArray = [];

  if (sale.baby) {
    badgesArray.push({icon: 'baby', text: 'Baby', type: 'font-awesome-5'});
  }

  if (sale.boyMen) {
    badgesArray.push({icon: 'male', text: 'Boy / Man', type: 'font-awesome'});
  }

  if (sale.electronics) {
    badgesArray.push({icon: 'computer', text: 'Electronics', type: 'material'});
  }

  if (sale.girlWomen) {
    badgesArray.push({icon: 'female', text: 'Girl / Women', type: 'font-awesome'});
  }

  if (sale.homeDecoration) {
    badgesArray.push({icon: 'deck', text: 'Home Decoration', type: 'material'});
  }

  if (sale.kitchen) {
    badgesArray.push({icon: 'kitchen', text: 'Kitchen', type: 'material'});
  }

  return badgesArray;
};
