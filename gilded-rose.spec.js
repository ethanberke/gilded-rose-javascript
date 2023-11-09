import { expect, describe, it } from "vitest";
/* import * as itemFile from "./gilded-rose.js"; */
import {itemsArr, itemLogic, BasicItem, TicketItem} from "./gilded-rose.js";

describe("updateQuality", () => {
	it("reduces quality and sellIn of basic items by 1", () => {
		const testItem = itemsArr[0];
		itemLogic(testItem);
		expect(testItem.sellIn).toBe(9);
		expect(testItem.quality).toBe(19);
	});

	it("decreases quality by two for items with sell in less than zero", () => {
		const testItem = new BasicItem("No one wants this", -1, 10);
		itemLogic(testItem);
		expect(testItem.quality).toBe(8);
	});

	it("does not decrease the quality of an item with 0 quality", () => {
		const testItem = new BasicItem("Not Great", 5, 0);
		itemLogic(testItem);
		expect(testItem.quality).toBe(0);
	});

	it("The quality of an item is never negative.", () => {
		const testItem = new BasicItem("Not the best", 3, -2);
		itemLogic(testItem);
		expect(testItem.quality).toBe(0);
	});

	it("Aged Brie actually increases in quality the older it gets.", () => {
		const testItem = itemsArr[1];
		testItem.updateBrie();
		expect(testItem.sellIn).toBe(testItem.sellIn--);
		expect(testItem.quality).toBe(testItem.quality++);
	});

	it("The quality of an item is never more than 50", () => {
		const testItem = new BasicItem("Pretty Good", 4, 60);
		itemLogic(testItem);
		expect(testItem.quality).toBe(50);
	});

	it("Sulfuras, Hand of Ragnaros, being a legendary item, never has to be sold nor does it decrease in quality.", () => {
		const testItem = itemsArr[3];
		itemLogic(testItem);
		testItem.updateLegend();
		expect(testItem.sellIn).toBe(testItem.sellIn);
		expect(testItem.quality).toBe(testItem.quality);
	});

  it("Backstage passes to a TAFKAL80ETC concert, increase in quality as it's sellIn value decreases.", () => {
    const testItem = itemsArr[4];
    testItem.updateQuality();
    expect(testItem.sellIn).toBe(testItem.sellIn--);
    expect(testItem.quality).toBe(testItem.quality++);
  })

  it("Quality drops to 0 after the TAFKAL80ETC concert", () => {
    const testItem = new TicketItem("Backstage Pass Next day", -1, 20);
		testItem.updateQuality();
    expect(testItem.quality).toBe(0);
  })

  it("Conjured items degrade in quality twice as fast as normal items.", () => {
    const testItem = itemsArr[5];
		itemLogic(testItem);
    testItem.updateQuality();
    expect(testItem.quality).toBe(4);
  })
});
