import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

title:string;
lang:string;
sendText:string;
langText:string;
answerText:string;
valA:number;
valB:number;
valC:number;

textA:string;
textB:string;
textC:string;

answer:string;
type:string;

danger:boolean = false;
success:boolean = false;
warning:boolean = false;

  constructor(private dataService:DataService) {

  }

  ngOnInit() {
    // Получаем значение языка браузера пользователя
    this.lang = navigator.language;
    if (!localStorage.getItem('lang')) {
      localStorage.setItem('lang', this.lang);
    } else {
      this.lang = localStorage.getItem('lang');
    }
    this.checkLang();
  }

  // Отправляем данные на сервер
  sendReq() {
    this.dataService.sendData(`/api.php?a=${this.valA}&b=${this.valB}&c=${this.valC}&lang=${this.lang}`)
      .subscribe( (res) => {
        this.checkData(res);
    }, err => {
      console.log("Error occured");
    })
  }

  // Меняем язык 
  changeLang() {
    if (this.lang === 'en-EN') {
      this.lang = 'ru-RU';
    } else {
      this.lang = 'en-EN';
    }
    localStorage.setItem('lang', this.lang);
    this.checkLang();
    this.sendReq();
  }

  // Меняем данные в соответствии с языком 
  checkLang() {
    if (localStorage.getItem('lang') === 'ru-RU') {
      this.title = 'Заполните поля ниже числами';
      this.sendText = 'Отправить';
      this.langText = 'Сменить язык';
      this.answerText = 'Ответ:';
      this.textA = 'Сторона А';
      this.textB = 'Сторона B';
      this.textC = 'Сторона С';
    } else {
      this.title = 'Fill in the fields below with numbers';
      this.sendText = 'Send';
      this.langText = 'Change language';
      this.answerText = 'Answer:';
      this.textA = 'Side А';
      this.textB = 'Side B';
      this.textC = 'Side С';
    }
  }

  // Проверяем полученные данные от сервера
  checkData(res) {
    if (res.error) {
      this.danger = true;
      this.warning = false;
      this.success = false;
      this.answer = res.error;
    } else if (res.type && res.res) {
      this.danger = false;
      this.warning = false;
      this.success = true;
      this.answer = res.res + ' ' + res.type;
    } else if (res.res) {
      this.danger = false;
      this.warning = true;
      this.success = false;
      this.answer = res.res;
    }

  }

}
