export default class Card {
  // _cardNumber = 0
  // _openState = false

  constructor(container, cardNumber, flip) {
    this.createElement(this.cardNumber, container, flip)
    this.container = container;
    this.cardNumber = cardNumber;
    this.openState = false;
    this.success = false;
  }

  createElement(cardNumber, container, flip) {
    this.card = document.createElement('li')
    this.card.classList.add("list-group-item", "card");
    this.card.textContent = cardNumber
    this.card.addEventListener('click', (event) => {
      if (
        event.target == this.card &&
        !event.target.classList.contains("card-open")
      ) {
        flip(this);
        console.log(this);
      }
    });
    container.append(this.card);
    return this.card;
  }

  set cardNumber(value) {
    this._cardNumber = value;
    this.card.textContent = value;
  }
  get cardNumber() {
    return this._cardNumber;
  }


  set openState(value) {
    this._openState = value
    if (value) {
      this.card.classList.add('card-open');
    } else {
      this.card.classList.remove('card-open');
    }
  }
  get openState() {
    return this._openState
  }

  set success(value) {
    this._success = value
    if (value) {
      this.card.classList.add('card-success');
    } else {
      this.card.classList.remove('card-success');
    }
  }
  get success() {
    return this._success
  }
}

