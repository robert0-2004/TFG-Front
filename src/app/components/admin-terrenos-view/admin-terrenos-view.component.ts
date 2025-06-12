import { Component, OnInit } from '@angular/core';
import { Terreno } from '../../models/terreno';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TerrenosService } from '../../services/terrenos.service';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from '../paginator/paginator.component';

@Component({
  selector: 'app-admin-terrenos-view',
  imports: [FormsModule, PaginatorComponent,RouterLink],
  templateUrl: './admin-terrenos-view..component.html',
  styleUrl: './admin-terrenos-view.component.css'
})
export class AdminTerrenosView implements OnInit {
  username!: string;
  userId!: number;
  terrenos: Terreno[] = [];
  paginator: any = {};
  searchTerm: string = '';
  pageUrl: string = '/user/terrenos/' + this.userId + '/page';
  page: number = 0;

  
  size: number = 5;

  constructor(
    private route: ActivatedRoute,
    private terrenosService: TerrenosService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = +(params.get('id') || '0');
      const page = +(params.get('page') || '0');
      this.page = page;
      this.pageUrl = `/user/terrenos/${this.userId}/page`;
      this.loadTerrenos(page);
    });
  }
  onSearchChange(): void {
    this.loadTerrenos(0); // Siempre busca desde la primera página
  }

  loadTerrenos(page: number = 0): void {
    this.page = page;
    this.terrenosService.getTerrenosByUserIdPageable(
      this.userId,
      this.page,
      this.size,
      this.searchTerm.trim() // <-- ¡IMPORTANTE!
    ).subscribe(pageable => {
      this.terrenos = pageable.content as Terreno[];
      this.paginator = pageable;
    });
  }
}
