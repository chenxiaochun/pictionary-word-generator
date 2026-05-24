#!/usr/bin/env node
/**
 * Generates data/words.json with 500 curated Pictionary words.
 * Run: node scripts/generate-words.mjs
 */

import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const WORDS = {
  easy: {
    animals: [
      "cat", "dog", "fish", "bird", "cow", "pig", "duck", "frog", "bee", "ant",
      "owl", "bat", "fox", "bear", "lion", "tiger", "horse", "sheep", "goat", "rabbit",
      "mouse", "snake", "whale", "shark", "crab", "lobster", "octopus", "penguin", "parrot", "monkey",
    ],
    food: [
      "pizza", "burger", "apple", "banana", "cake", "cookie", "bread", "egg", "milk", "cheese",
      "rice", "soup", "salad", "taco", "hot dog", "fries", "donut", "ice cream", "candy", "grape",
      "orange", "lemon", "carrot", "corn", "potato", "tomato", "pasta", "sandwich", "popcorn", "chocolate",
    ],
    actions: [
      "run", "jump", "swim", "dance", "sing", "sleep", "eat", "drink", "read", "write",
      "walk", "climb", "fly", "kick", "throw", "catch", "hug", "wave", "laugh", "cry",
    ],
    objects: [
      "book", "pen", "phone", "chair", "table", "lamp", "clock", "key", "door", "window",
      "ball", "bat", "guitar", "piano", "camera", "umbrella", "hat", "shoe", "glasses", "watch",
      "bicycle", "car", "bus", "train", "airplane", "boat", "house", "bed", "toothbrush", "toothpaste",
    ],
    places: [
      "beach", "park", "school", "hospital", "store", "restaurant", "library", "museum", "zoo", "farm",
      "mountain", "river", "lake", "forest", "desert", "island", "city", "village", "castle", "bridge",
    ],
    abstract: [
      "love", "happy", "sad", "angry", "hot", "cold", "big", "small", "fast", "slow",
      "day", "night", "sun", "moon", "star", "rain", "snow", "wind", "fire", "water",
    ],
  },
  medium: {
    animals: [
      "giraffe", "zebra", "kangaroo", "koala", "panda", "camel", "dolphin", "elephant", "rhino", "hippo",
      "flamingo", "peacock", "eagle", "hawk", "squirrel", "raccoon", "skunk", "porcupine", "hedgehog", "sloth",
      "chameleon", "iguana", "turtle", "jellyfish", "starfish", "seahorse", "walrus", "moose", "bison", "donkey",
    ],
    food: [
      "sushi", "ramen", "burrito", "nachos", "waffle", "pancake", "croissant", "muffin", "pretzel", "bagel",
      "avocado", "broccoli", "asparagus", "mushroom", "watermelon", "pineapple", "strawberry", "blueberry", "coconut", "mango",
      "steak", "bacon", "sausage", "meatball", "lasagna", "curry", "hummus", "falafel", "smoothie", "milkshake",
    ],
    actions: [
      "surfing", "skateboarding", "snowboarding", "juggling", "yoga", "meditation", "cooking", "baking", "gardening", "fishing",
      "camping", "hiking", "sailing", "kayaking", "boxing", "wrestling", "archery", "bowling", "shopping", "cleaning",
      "painting", "drawing", "photography", "knitting", "sewing", "typing", "texting", "selfie", "stretching", "sneezing",
      "whistling", "snoring", "daydreaming", "proposing", "celebrating",
    ],
    objects: [
      "telescope", "microscope", "binoculars", "compass", "backpack", "suitcase", "wallet", "purse", "necklace", "bracelet",
      "scissors", "hammer", "screwdriver", "ladder", "bucket", "broom", "vacuum", "toaster", "blender", "microwave",
      "refrigerator", "oven", "stove", "kettle", "mug", "plate", "fork", "spoon", "knife", "chopsticks",
      "skateboard", "roller skates", "surfboard", "snowboard", "helmet", "tent", "campfire", "flashlight", "battery", "magnet",
    ],
    places: [
      "airport", "subway", "highway", "stadium", "theater", "cinema", "aquarium", "planetarium", "observatory", "lighthouse",
      "skyscraper", "cabin", "igloo", "temple", "church", "mosque", "palace", "tower", "volcano", "waterfall",
      "canyon", "glacier", "meadow", "swamp", "jungle", "cave", "harbor", "marina", "vineyard", "bakery",
    ],
    abstract: [
      "freedom", "peace", "hope", "dream", "memory", "surprise", "confusion", "excitement", "boredom", "curiosity",
      "friendship", "teamwork", "victory", "defeat", "balance", "gravity", "electricity", "magnetism", "silence", "echo",
      "shadow", "reflection", "illusion", "magic", "luck", "fortune", "chaos", "order", "time travel", "deja vu",
      "brainstorm", "deadline", "meeting", "vacation", "weekend",
    ],
  },
  hard: {
    animals: [
      "platypus", "axolotl", "narwhal", "manatee", "quokka", "tapir", "capybara", "pangolin", "okapi", "wombat",
      "armadillo", "anteater", "albatross", "pelican", "vulture", "ostrich", "emu", "cassowary", "kiwi bird", "toucan",
      "salamander", "newt", "tarantula", "scorpion", "mantis", "cicada", "firefly", "dragonfly", "butterfly", "caterpillar",
    ],
    food: [
      "ratatouille", "charcuterie board", "beef Wellington", "Eggs Benedict", "creme brulee", "tiramisu", "macaron", "baba ganoush", "paella", "risotto",
      "ceviche", "gazpacho", "bouillabaisse", "escargot", "foie gras", "kimchi", "tempeh", "quinoa", "acai bowl", "matcha latte",
    ],
    actions: [
      "negotiating", "procrastinating", "overthinking", "multitasking", "brainstorming", "procrastination", "negotiation", "parallel parking", "crowd surfing", "bungee jumping",
      "rock climbing", "paragliding", "scuba diving", "snorkeling", "wood carving", "glass blowing", "origami folding", "breakdancing", "tap dancing", "sword swallowing",
      "tightrope walking", "fire breathing", "mind reading", "time management", "conflict resolution", "public speaking", "job interview", "speed dating", "ghost hunting", "treasure hunting",
    ],
    objects: [
      "chandelier", "hourglass", "sundial", "astrolabe", "sextant", "anvil", "trebuchet", "catapult", "guillotine", "typewriter",
      "phonograph", "gramophone", "sewing machine", "spinning wheel", "pottery wheel", "kaleidoscope", "periscope", "stethoscope", "thermometer", "barometer",
      "parachute", "hang glider", "hot air balloon", "submarine", "spaceship", "satellite", "windmill", "solar panel", "circuit board", "hard drive",
    ],
    places: [
      "Eiffel Tower", "Great Wall of China", "Statue of Liberty", "Big Ben", "Colosseum", "Taj Mahal", "Machu Picchu", "Stonehenge", "Pyramids of Giza", "Sydney Opera House",
      "Grand Canyon", "Mount Everest", "Niagara Falls", "Great Barrier Reef", "Amazon Rainforest", "Sahara Desert", "Antarctica", "Bermuda Triangle", "North Pole", "Hollywood",
      "Silicon Valley", "Wall Street", "Times Square", "Golden Gate Bridge", "Notre Dame", "Sistine Chapel", "Louvre Museum", "Forbidden City", "Neuschwanstein Castle", "Angkor Wat",
      "Petra", "Easter Island", "Galapagos Islands", "Venice canals", "Dubai skyline",
    ],
    abstract: [
      "nostalgia", "existentialism", "cognitive dissonance", "butterfly effect", "paradox", "irony", "sarcasm", "metaphor", "algorithm", "inflation",
      "democracy", "capitalism", "philosophy", "psychology", "photosynthesis", "evolution", "relativity", "quantum physics", "artificial intelligence", "blockchain",
      "identity crisis", "midlife crisis", "quarter life crisis", "imposter syndrome", "writer's block", "culture shock", "generation gap", "peer pressure", "moral dilemma", "ethical dilemma",
      "déjà vu", "schadenfreude", "serendipity", "epiphany", "renaissance", "revolution", "Renaissance art", "abstract art", "surrealism", "minimalism",
    ],
  },
};

const categories = ["animals", "food", "actions", "objects", "places", "abstract"];
const difficulties = ["easy", "medium", "hard"];

const drawableMap = {
  easy: 3,
  medium: 2,
  hard: 1,
};

const output = [];
let id = 1;

for (const difficulty of difficulties) {
  for (const category of categories) {
    const words = WORDS[difficulty][category] ?? [];
    for (const text of words) {
      const entry = {
        id: `w${String(id).padStart(3, "0")}`,
        text,
        category,
        difficulty,
        drawable: drawableMap[difficulty],
      };
      if (text.includes(" ")) {
        entry.tags = ["phrase"];
      }
      if (["funny", "holiday"].some((t) => text.toLowerCase().includes(t))) {
        entry.tags = [...(entry.tags ?? []), "funny"];
      }
      output.push(entry);
      id++;
    }
  }
}

const outPath = join(__dirname, "..", "data", "words.json");
writeFileSync(
  outPath,
  JSON.stringify(
    {
      version: 1,
      total: output.length,
      words: output,
    },
    null,
    2
  )
);

console.log(`Generated ${output.length} words → ${outPath}`);
