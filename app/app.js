var app = angular.module("app", ["ngRoute"]);

app.config(function ($routeProvider) {
	$routeProvider
			.when("/",
					{
						controller: "SearchController",
						templateUrl: "app/templates/search.html"
					})
		  .otherwise({ redirectTo: "/" });
});

var getParameterByName = function(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(window.location.href);
  return results == null || results[1] == "" ?
      null : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// TODO: remove these constants once site is hooked up to API
var CREATURES = [
  "Academy Rector",
  "Acidic Slime",
  "Angel of Serenity",
  "Angelic Arbiter",
  "Anger",
  "Archangel of Thune",
  "Artisan of Kozilek",
  "Ashen Rider",
  "Aurelia, the Warleader",
  "Avacyn, Angel of Hope",
  "Avatar of Woe",
  "Aven Mindcensor",
  "Avenger of Zendikar",
  "Azusa, Lost but Seeking",
  "Bane of Progress",
  "Birds of Paradise",
  "Blightsteel Colossus",
  "Bloodghast",
  "Bloodgift Demon",
  "Brawn",
  "Burnished Hart",
  "Consecrated Sphinx",
  "Copper Gnomes",
  "Craterhoof Behemoth",
  "Crypt Ghast",
  "Deadeye Navigator",
  "Deadwood Treefolk",
  "Deathrite Shaman",
  "Diluvian Primordial",
  "Disciple of Bolas",
  "Dragon Mage",
  "Duplicant",
  "Dwarven Miner",
  "Eight-and-a-Half-Tails",
  "Elesh Norn, Grand Cenobite",
  "Elvish Piper",
  "Erebos, God of the Dead",
  "Eternal Witness",
  "Fauna Shaman",
  "Fierce Empath",
  "Fleshbag Marauder",
  "Frost Titan",
  "Genesis",
  "Gilded Drake",
  "Gisela, Blade of Goldnight",
  "Glen Elendra Archmage",
  "Glory",
  "Grand Abolisher",
  "Grave Titan",
  "Graveborn Muse",
  "Harvester of Souls",
  "Helldozer",
  "Hellkite Charger",
  "Hellkite Tyrant",
  "Hermit Druid",
  "Hoard-Smelter Dragon",
  "Inferno Titan",
  "Ink-Eyes, Servant of Oni",
  "Iona, Shield of Emeria",
  "It That Betrays",
  "Jin-Gitaxias, Core Augur",
  "Karametra, God of Harvests",
  "Karmic Guide",
  "Keeper of Progenitus",
  "Keiga, the Tide Star",
  "Kiki-Jiki, Mirror Breaker",
  "Kira, Great Glass-Spinner",
  "Knight of the Reliquary"
];

var NON_CREATURES = [
  "Bant Charm",
  "Beast Within",
  "Blue Sun's Zenith",
  "Boomerang",
  "Capsize",
  "Chaos Warp",
  "Chord of Calling",
  "Comet Storm",
  "Condemn",
  "Counterspell",
  "Crosis's Charm",
  "Cryptic Command",
  "Cyclonic Rift",
  "Delay",
  "Disenchant",
  "Eladamri's Call",
  "Enlightened Tutor",
  "Entomb",
  "Esper Charm"
];

var LANDS = [
  "Academy Ruins",
  "Adarkar Wastes",
  "Alchemist's Refuge",
  "Ancient Tomb",
  "Arcane Sanctum",
  "Arid Mesa",
  "Azorius Chancery",
  "Badlands",
  "Battlefield Forge",
  "Bayou",
  "Blood Crypt",
  "Bloodstained Mire",
  "Bojuka Bog",
  "Boros Garrison",
  "Boseiju, Who Shelters All",
  "Breeding Pool",
  "Brushland",
  "Buried Ruin",
  "Cabal Coffers",
  "Cascade Bluffs",
  "Cavern of Souls",
  "Caves of Koilos",
  "City of Brass"
];

var CUTS = [
  "Tombfire",
  "Break Open",
  "Shelkin Brownie",
  "Fatal Mutation",
  "Rapid Fire",
  "Warping Wurm",
  "Nameless Race",
  "Shaman's Trace",
  "Chimney Imp",
  "Wood Elemental",
  "Power Leak",
  "Leeches",
  "Mudhole",
  "Hint of Insanity",
  "North Star",
  "Erosion",
  "Sorrow's Path",
  "Deep Water",
  "Masticore"
];

var getRandomCardName = function(cards) {
  var randomIndex = Math.floor(Math.random() * cards.length);
  return cards[randomIndex];
}
