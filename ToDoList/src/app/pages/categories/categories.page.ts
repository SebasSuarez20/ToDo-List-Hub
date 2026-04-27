import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonList, IonItem, IonIcon, IonItemSliding, IonItemOptions, IonItemOption, IonInput
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { folderOutline, bookmarkOutline, pricetagOutline, gridOutline, addOutline, trashOutline, createOutline, arrowBackOutline, addCircleOutline, pricetagsOutline } from 'ionicons/icons';
import { DatabaseServiceCategory } from '../../services/dbCategory/database.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { debounceTime, Subject, takeUntil, tap } from 'rxjs';
import { ICategoryDTO } from 'src/app/model/dto/IcategoryDTO';
import { AlertService } from 'src/app/services/alert/alert.service';
import { CategoryActions } from 'src/app/services/category-actions/category-actions';
import { LoadingSkeletonComponent } from 'src/app/component/loading/loading-skeleton/loading-skeleton.component';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonButtons, IonBackButton, IonList, IonItem, IonIcon,
    IonItemSliding, IonItemOptions, IonItemOption, IonInput,
    ReactiveFormsModule,LoadingSkeletonComponent
  ]
})
export class CategoriesPage {


  public formCategory: FormGroup;
  private destroy$ = new Subject<void>();
  public categoryInformation = signal<ICategoryDTO[]>([]);
  public isUpdate:boolean = false;
  public isLoading = this.actionCategory.isLoading;

  constructor(
    private readonly fb: FormBuilder,
    private readonly database: DatabaseServiceCategory,
    private readonly logger: LoggerService,
    private readonly alert: AlertService,
    private readonly actionCategory:CategoryActions
  ) {
    addIcons({
      folderOutline, bookmarkOutline, pricetagOutline, gridOutline, addOutline, trashOutline, createOutline, arrowBackOutline, addCircleOutline, pricetagsOutline
    });

    this.formCategory = this.fb.group({
      id: [null],
      name: ["", Validators.required],
      value: [0],
      is_delete: [false],
      created_at: [null]
    });

  }

  ionViewWillEnter(): void {
    this.listeningCategory();
    this.loadingInit();
  }

  ionViewWillLeave() {
    this.destroy$.next();
  }

  private listeningCategory(): void {
    this.database.storageListening().
      pipe(
        takeUntil(this.destroy$),
        tap(()=> 
          this.actionCategory.loadingUpdate(true)
      ),
      debounceTime(1700)
      ).
      subscribe({
        next: (res) => {
          this.categoryInformation.set(res);
          this.actionCategory.loadingUpdate(false);
        },
        error: (err) => this.logger.error("Data de información incorrectamente ", err)
      })
  };

  public async loadingInit() {
    const data = await this.actionCategory.loadStorage();
    this.categoryInformation.set(data);
    this.actionCategory.timeSkeleton();
  };


  public save(){
     this.actionCategory.saveAsync(this.formCategory);
  }

  public async getCategoryForId(id: string) {
    this.actionCategory.fillFieldForId(id,this.formCategory);
  }

  public async deleteCategory(id:string){
     this.actionCategory.disableCategory(id);
  }

}
