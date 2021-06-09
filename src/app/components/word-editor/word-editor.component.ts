import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { LanguageModel } from 'src/app/model/language-model';

@Component({
  selector: 'app-word-editor',
  templateUrl: './word-editor.component.html',
  styleUrls: ['./word-editor.component.scss']
})
export class WordEditorComponent implements OnInit {

  @Input()
  languages?: LanguageModel[];

  @Input()
  show = false;

  @Output() onClose = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
    
  }

  onHide() {
    this.onClose.emit(false);
  }

}
