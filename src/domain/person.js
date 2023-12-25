import dayjs from "dayjs";

export class Person {
  #nickname;
  #name;
  #birthdate;
  #stack;

  constructor(event) {
    this.#nickname = event.apelido;
    this.#name = event.nome;
    this.#birthdate = dayjs(event.nascimento);
    this.#stack = typeof event.stack === 'string' ?
      event.stack.split(',').map(i=>i.trim()) :
      event.stack;

    Object.freeze(this);
  }

  get nickname() {
    return this.#nickname;
  }

  toEntity() {
    return {
      apelido: this.#nickname,
      nome: this.#name,
      nascimento: this.#birthdate.toISOString(),
      stack: this.#stack?.join(', ')
    }
  }

  toJSON() {
    return {
      nickname: this.#nickname,
      name: this.#name,
      birthdate: this.#birthdate.toISOString(),
      stack: this.#stack
    };
  }
}
