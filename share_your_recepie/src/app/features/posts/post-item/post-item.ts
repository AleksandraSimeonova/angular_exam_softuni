import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Recipe, User } from '../../../models';

@Component({
  selector: 'app-post-item',
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './post-item.html',
  styleUrl: './post-item.css'
})
export class PostItem {

  @Input() recipe!: Recipe;
  @Input() users: User[] = [];

  getUsernameById(id: string): string {
    const user = this.users.find(u => u._id === id);
    return user ? user.name : 'no name';
  }
}
