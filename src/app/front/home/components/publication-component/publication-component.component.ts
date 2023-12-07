import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-publication-component',
  templateUrl: './publication-component.component.html',
  styleUrls: ['./publication-component.component.scss']
})
export class PublicationComponentComponent{
  @Input() title!: string | null | undefined;
  @Input() description!: string | null | undefined;
  @Input() date!: string | null | undefined;
  @Input() name!: string | null | undefined;
  @Input() words!: string | null | undefined;

}  
