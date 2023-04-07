import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CategorySummary} from "@livesession-food-workshop-angular/core/model";

@Component({
  selector: 'app-category-summary-card',
  templateUrl: 'category-summary.component.html',
  styleUrls: ['category-summary.component.scss'],
})
export class CategorySummaryCardComponent {

  selected = 0;

  @Input()
  categorySummaries: CategorySummary[] = [];

  @Output()
  categorySelected: EventEmitter<CategorySummary | undefined> = new EventEmitter<CategorySummary | undefined>();

  updateCategorySelected(
    categorySummary: CategorySummary | undefined,
    selectedIndex: number
  ) {
    this.selected = selectedIndex;
    this.categorySelected.emit(categorySummary);
  }
}
