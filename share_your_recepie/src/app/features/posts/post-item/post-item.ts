import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Recipe } from '../../../models';

@Component({
  selector: 'app-post-item',
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './post-item.html',
  styleUrl: './post-item.css'
})
export class PostItem {

   @Input() recipe!: Recipe;
}
