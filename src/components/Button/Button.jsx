import React, { Component } from "react";


export default class Button extends Component {
  static classes = {
    hidden: "hidden",
  }

  constructor({ selector, name, nameDisable, isHidden = false }) {
    this.button = this.getButton(selector)
    this.name = name;
    this.nameDisable = nameDisable;

    isHidden && this.hide();
    // isHidden = true && this.hide() -> true && true -> this.hide()
    // isHidden = true && this.hide() -> false && true -> false
  }

  state = {
    selector: null,
    name: "",
    nameDisable: "",
    isHidden: false,
  } 
  
  
  
  getButton(selector) {
    return document.querySelector(selector)
  }

  hide() {
    this.button.classList.add(Button.classes.hidden);

  }

  show() {
    this.button.classList.remove(Button.classes.hidden);
  }

  disable() {
    this.button.disabled = true;
    this.button.textContent = this.nameDisable;
  }

  enable() {
    this.button.disabled = false;
    this.button.textContent = this.name;
  }

  render() { 
    const { name } = this.state;

    return (
      <button type="button">{ name }</button>
    )
  }

}