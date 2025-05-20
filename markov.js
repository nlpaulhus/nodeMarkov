/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map();
    for (let i = 0; i < this.words.length; i++) {
      let currentWord = this.words[i];
      let nextWord = this.words[i + 1] || null;
      if (chains.has(currentWord) && nextWord) {
        chains.get(currentWord).push(nextWord);
      } else {
        chains.set(currentWord, [nextWord]);
      }
    }
    this.chains = chains;
  }

  /** return random text from chains */

  static choice(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  makeText(numWords = 100) {
    let keys = Array.from(this.chains.keys());
    let key = MarkovMachine.choice(keys);
    let newText = [];
    while (newText.length < numWords && key !== null) {
      newText.push(key);
      key = MarkovMachine.choice(this.chains.get(key));
    }

    return newText.join(" ");
  }
}

module.exports = {
  MarkovMachine,
};
