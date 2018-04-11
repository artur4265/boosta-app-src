import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

title:string = '';
lang:string = '';
valA:number;
valB:number;
valC:number;

textA:string;
textB:string;
textC:string;

answer:string;
type:string;

  constructor(private dataService:DataService) {

  }

  ngOnInit() {
    this.lang = navigator.language;
    if (!localStorage.getItem('lang')) {
      localStorage.setItem('lang', this.lang);
    }
    this.checkLang();
  }

  onClickMe() {
    if (this.lang === 'en-EN') {
      this.lang = 'ru-RU';
    } else {
      this.lang = 'en-EN';
    }
    localStorage.setItem('lang', this.lang);
    this.checkLang();

    this.dataService.sendData(`http://boosta/api.php?a=${this.valA}&b=${this.valB}&c=${this.valC}&lang=${this.lang}`, ``)
      .subscribe( (res) => {
        this.checkError(res);
    }, err => {
      console.log("Error occured");
    })
  }

  checkLang() {
    if (localStorage.getItem('lang') === 'ru-RU') {
      this.title = 'Привет';
      this.textA = 'Сторона А';
      this.textB = 'Сторона B';
      this.textC = 'Сторона С';
    } else {
      this.title = 'Hi';
      this.textA = 'Side А';
      this.textB = 'Side B';
      this.textC = 'Side С';
    }
  }

  checkError(res) {
    if (res.error) {
      this.answer = res.error;
    } else if (res.type && res.res) {
      this.answer = res.type + ' ' + res.res;
    } else if (res.res) {
      this.answer = res.res;
    }

  }

}
