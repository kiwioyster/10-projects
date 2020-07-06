const Util = {
  scrapeNumbeoHtml: html => {
    // console.log(html);
    const famOfFour = html.indexOf('Four-person family monthly costs: ');
    const famOfOne = html.indexOf('A single person monthly costs: ');
    const cheapRestrnt = html.indexOf('Meal, Inexpensive Restaurant </td>');
    const midRestrnt = html.indexOf('Mid-range Restaurant, Three-course');
    const mcMeal = html.indexOf('McMeal at McDonalds');
    const beer = html.indexOf('Beer');
    const coffee = html.indexOf('Cappuccino ');
    const coke = html.indexOf('Coke/Pepsi ');
    const water = html.indexOf('Water (1.5 liter bottle)');
    const milk = html.indexOf('Milk ');
    const lettuce = html.indexOf('Lettuce ');
    const wine = html.indexOf('Bottle of Wine');
    const cig = html.indexOf('Cigarettes ');
    const orange = html.indexOf('Oranges ');
    const tomato = html.indexOf('Tomato ');
    const potato = html.indexOf('Potato ');
    const onion = html.indexOf('Onion ');
    const beef = html.indexOf('Beef Round');
    const apples = html.indexOf('Apples ');
    const banana = html.indexOf('Banana ');
    const rice = html.indexOf('Rice ');
    const eggs = html.indexOf('Eggs ');
    const cheese = html.indexOf('Cheese ');
    const chicken = html.indexOf('Chicken ');
    const bread = html.indexOf('White Bread ');
    const volkswagen = html.indexOf('Volkswagen Golf');
    const toyota = html.indexOf('Toyota Corolla Sedan');
    const taxiWait = html.indexOf('Taxi 1hour Waiting');
    const fuel = html.indexOf('Gasoline ');
    const taxiStart = html.indexOf('Taxi Start');
    const taxiMile = html.indexOf('Taxi 1');
    const monthlyTicket = html.indexOf('Monthly Pass ');
    const oneWayTicket = html.indexOf('One-way Ticket ');
    const utilities = html.indexOf(
      'Electricity, Heating, Cooling, Water, Garbage'
    );
    const mobile = html.indexOf('Prepaid Mobile Tariff Local');
    const internet = html.indexOf('Internet (60 Mbps or More,');
    const gym = html.indexOf('Fitness Club,');
    const tennis = html.indexOf('Tennis Court Rent (');
    const cinema = html.indexOf('Cinema, International Release,');
    const preschool = html.indexOf('Preschool (or Kindergarten');
    const primarySchool = html.indexOf('International Primary School,');
    const jeans = html.indexOf('Pair of Jeans ');
    const dress = html.indexOf('Summer Dress ');
    const nike = html.indexOf('Pair of Nike ');
    const shoes = html.indexOf('Leather Business Shoes');
    const oneBedCity = html.indexOf('1 bedroom) in City Centre');
    const oneBedSuburb = html.indexOf('1 bedroom) Outside of Centre');
    const threeBedCity = html.indexOf('3 bedrooms) in City Centre');
    const threeBedSuburb = html.indexOf('3 bedrooms) Outside of Centre');
    const sqFtPropertyCity = html.indexOf('Buy Apartment in City Centre');
    const sqFtPropertySuburb = html.indexOf('Buy Apartment Outside of Centre');
    const monthNetSalary = html.indexOf('Monthly Net Salary');
    const mortgageRate = html.indexOf('Mortgage Interest Rate');

    Costs = {
      city: '',
      famOfFourNoRent: Util._getFamCost(html.slice(famOfFour)),
      famOfOneNoRent: Util._getFamCost(html.slice(famOfOne)),
      cheapRestrnt: Util._getCost(html.slice(cheapRestrnt)),
      midRestrnt: Util._getCost(html.slice(midRestrnt)),
      mcMeal: Util._getCost(html.slice(mcMeal)),
      beer: Util._getCost(html.slice(beer)),
      coffee: Util._getCost(html.slice(coffee)),
      coke: Util._getCost(html.slice(coke)),
      water: Util._getCost(html.slice(water)),
      milk: Util._getCost(html.slice(milk)),
      lettuce: Util._getCost(html.slice(lettuce)),
      wine: Util._getCost(html.slice(wine)),
      cig: Util._getCost(html.slice(cig)),
      orange: Util._getCost(html.slice(orange)),
      tomato: Util._getCost(html.slice(tomato)),
      potato: Util._getCost(html.slice(potato)),
      onion: Util._getCost(html.slice(onion)),
      beef: Util._getCost(html.slice(beef)),
      apples: Util._getCost(html.slice(apples)),
      banana: Util._getCost(html.slice(banana)),
      rice: Util._getCost(html.slice(rice)),
      eggs: Util._getCost(html.slice(eggs)),
      cheese: Util._getCost(html.slice(cheese)),
      chicken: Util._getCost(html.slice(chicken)),
      bread: Util._getCost(html.slice(bread)),
      volkswagen: Util._getCost(html.slice(volkswagen)),
      toyota: Util._getCost(html.slice(toyota)),
      taxiWait: Util._getCost(html.slice(taxiWait)),
      fuel: Util._getCost(html.slice(fuel)),
      taxiStart: Util._getCost(html.slice(taxiStart)),
      taxiMile: Util._getCost(html.slice(taxiMile)),
      monthlyTicket: Util._getCost(html.slice(monthlyTicket)),
      oneWayTicket: Util._getCost(html.slice(oneWayTicket)),
      utilities: Util._getCost(html.slice(utilities)),
      mobile: Util._getCost(html.slice(mobile)),
      internet: Util._getCost(html.slice(internet)),
      gym: Util._getCost(html.slice(gym)),
      tennis: Util._getCost(html.slice(tennis)),
      cinema: Util._getCost(html.slice(cinema)),
      preschool: Util._getCost(html.slice(preschool)),
      primarySchool: Util._getCost(html.slice(primarySchool)),
      jeans: Util._getCost(html.slice(jeans)),
      dress: Util._getCost(html.slice(dress)),
      nike: Util._getCost(html.slice(nike)),
      shoes: Util._getCost(html.slice(shoes)),
      oneBedCity: Util._getCost(html.slice(oneBedCity)),
      oneBedSuburb: Util._getCost(html.slice(oneBedSuburb)),
      threeBedCity: Util._getCost(html.slice(threeBedCity)),
      threeBedSuburb: Util._getCost(html.slice(threeBedSuburb)),
      sqFtPropertyCity: Util._getCost(html.slice(sqFtPropertyCity)),
      sqFtPropertySuburb: Util._getCost(html.slice(sqFtPropertySuburb)),
      monthNetSalary: Util._getCost(html.slice(monthNetSalary)),
      mortgageRate: Util._getMortgage(html.slice(mortgageRate))
    };

    return Costs;
  },
  calcProsperityLv: (income, costs) => {
    const leftover = (income - costs.totalCost).toFixed(2);
    if (leftover > 0.5 * costs.totalCost) {
      return { leftover, costs, comment: 'Your income is very high.' };
    } else if (leftover > 0.2 * costs.totalCost) {
      return { leftover, costs, comment: 'Your income is decent.' };
    } else if (leftover >= 0) {
      return {
        leftover,
        costs,
        comment: 'Your income is survivable. Not many sacrifices needed.'
      };
    } else if (leftover > -0.25 * costs.totalCost) {
      return {
        leftover,
        costs,
        comment: 'Your income is barely survivable. Many sacrifices needed.'
      };
    } else if (leftover > -0.5 * costs.totalCost) {
      return {
        leftover,
        costs,
        comment: 'Your income is hard but survivable. Many sacrifices needed.'
      };
    }
    return {
      leftover,
      costs,
      comment: 'Your income is extremely hard to live off.'
    };
  },
  _getFamCost: html => {
    if (html.includes('class="in_other_currency"')) {
      const famOfFourCostIndex =
        html.indexOf('<span class="in_other_currency">(') + 33;
      const slicedHtml = html.slice(famOfFourCostIndex);
      let cost = slicedHtml.slice(0, slicedHtml.indexOf(')</span>'));
      if (cost.indexOf('&') >= 0) {
        cost = cost.slice(0, cost.indexOf('&'));
      }
      const regex = /[\d,.]/g;
      return Util._covertToNumber(cost.match(regex).join(''));
    } else {
      const startIndex = html.indexOf('<span class="emp_number">') + 25;
      const endIndex = html.indexOf('&#36;');
      const slicedHtml = html.slice(startIndex, endIndex);
      return Util._covertToNumber(slicedHtml);
    }
  },
  _getCost: html => {
    const startIndex = html.indexOf('"> ') + 3;
    const endIndex = html.indexOf('&nbsp;');
    const slicedHtml = html.slice(startIndex, endIndex);
    return Util._covertToNumber(slicedHtml);
  },
  _getMortgage: html => {
    const startIndex = html.indexOf('"> ') + 3;
    const endIndex = html.indexOf('<td class="priceBarTd') - 6;
    const slicedHtml = html.slice(startIndex, endIndex);
    return Util._covertToNumber(slicedHtml);
  },
  _covertToNumber: str => {
    return Number(str.replace(/,/g, ''));
  }
};

let Costs = {};

export default Util;
