export class Item {
	constructor(name, sellIn, quality) {
		this.name = name;
		this.sellIn = sellIn;
		this.quality = quality;
	}
}
export class BasicItem extends Item {}

export class CheeseItem extends Item {
	updateBrie() {
		this.sellIn--;
		this.quality++;
	}
}

export class LegendaryItem extends Item {
	updateLegend() {
		this.quality++;
		this.sellIn++;
	}
}

export class TicketItem extends Item {
	updateQuality() {
		this.sellIn--;
    if (this.sellIn <= -1) {
			this.quality = 0;
    } else if (this.sellIn <= 10 && this.sellIn > 0) {
			this.quality += 2;
		} else if (this.sellIn <= 5) {
			this.quality += 3;
		} else {
			this.quality--;
		}
	}
}

export class ConjuredItem extends Item {
	updateQuality() {
		this.quality -= 1;
	}
}

export const itemLogic = (item) => {
	if (item.quality < 1) {
		item.quality = 0;
	} else if (item.quality > 50) {
		item.quality = 50;
	} else if (item) {
		item.sellIn--;
		item.quality--;
	}
	if (item.sellIn < 0) {
		item.quality--;
	}
};

export let itemsArr = [];

itemsArr.push(new BasicItem("+5 Dexterity Vest", 10, 20));
itemsArr.push(new CheeseItem("Aged Brie", 2, 0));
itemsArr.push(new BasicItem("Elixir of the Mongoose", 5, 7));
itemsArr.push(new LegendaryItem("Sulfuras, Hand of Ragnaros", 0, 80));
itemsArr.push(
	new TicketItem("Backstage passes to a TAFKAL80ETC concert", 15, 20)
);
itemsArr.push(new ConjuredItem("Conjured Mana Cake", 3, 6));