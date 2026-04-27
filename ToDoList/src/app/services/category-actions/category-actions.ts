import { Injectable, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AlertService } from '../alert/alert.service';
import { DatabaseServiceCategory } from '../dbCategory/database.service';
import { DatabaseServiceTask } from '../dbTask/database.service';
import { ICategoryDTO } from 'src/app/model/dto/IcategoryDTO';
import { timer } from 'rxjs';
import { actionDb } from 'src/app/enum/actionsDb';

@Injectable({
  providedIn: 'root',
})
export class CategoryActions {
  
  public isUpdate:boolean = false;
   public isLoading = signal(true);

  constructor(private readonly alert: AlertService,
    private database: DatabaseServiceCategory,
    private readonly databaseTask: DatabaseServiceTask,
  ) { }

  public async loadStorage() : Promise<ICategoryDTO[]>{
    const [dataTask, dataCategory] = await Promise.all([
      this.databaseTask.getTasks(),
      this.database.getCategory()
    ]);

    const infoCategoryFilter = dataCategory?.map((item) => {

      const valueTask = dataTask?.filter(s => s.id_category == item.id)?.length ?? 0;
      return {
        ...item,
        value: valueTask
      }
    })

    return infoCategoryFilter ?? [];

  }

    public timeSkeleton(): void {
      timer(2200).subscribe({
        next: () => {
          this.isLoading.set(false);
        }
      })
    }

    private rebootFormGroup(){
      return {
          id: null,
          name: "",
          value: 0,
          is_delete: false,
          created_at: null
        }
    }

   public async saveAsync(formCategory:FormGroup) : Promise<void> {

    if (formCategory.valid) {
      try {
       
         if(this.isUpdate){
            this.updateCategoryForIdAsync(formCategory);
            return;
         }

         this.newCategoryAsync(formCategory);
        formCategory.patchValue(this.rebootFormGroup())
      } catch (err) {
        this.alert.error("", `${err}`)
        this.isLoading.set(false);
      }
    } else {
      this.alert.error("error", "Tiene campos incorrectos..");
    }
  }

  public async newCategoryAsync(formCategory: FormGroup) {
    try {
      const { name, value, is_delete } = formCategory.value;
      debugger;
      await this.database.insertCategory({
        id: crypto.randomUUID().toString(),
        name: name,
        is_delete: is_delete ?? false,
        value: value,
        created_at: new Date().toISOString()
      })
      await this.alert.success("Excelente", "Se creo correctamente la categoria.", 1500);
    } catch (err) {
      this.alert.error(`Error`, `${err}`);
      this.isLoading.set(false);
    }
  }

  public async updateCategoryForIdAsync(formCategory:FormGroup) {

    try {
      const { id, name } = formCategory.value;

      if(id === null || id === "") throw new Error("no se encontro el id correspondiente.");

      await this.database.updteCategoryForId(id, name);
      await this.databaseTask.triggerTask(actionDb.update, { id: id, name: name });
      await this.alert.success("Excelente", "Se actualizo la categoria.", 1500);
       formCategory.reset(this.rebootFormGroup());
       this.isUpdate = false;
    } catch (err) {
      this.alert.error("", "Error al actualizar la categoria.");
       this.isLoading.set(false);
    }
  }

   public async fillFieldForId(id: string,formCategory:FormGroup) {

    try {
     
       if(id === null || id === "") throw new Error("no se encontro el id correspondiente.");
      const resp = (await this.database.getCategory()).find(s => s.id === id);
      if (resp === null) throw new Error("no se encontro la información adecuamente.");
      formCategory.get("name")?.setValue(resp?.name ?? "");
      formCategory.get("id")?.setValue(resp?.id ?? "");
      this.isUpdate = true;

    } catch (err) {
      this.alert.error("Error", "Tiene campos incorrectos..");
       this.isLoading.set(false);
    }
  }
    public async disableCategory(id:string){
    try{
       if(id === null || id === "") throw new Error("no se encontro el id correspondiente.");
      await this.database.deleteCategory(id);
      await this.databaseTask.triggerTask(actionDb.delete, { id: id });
      
      await this.alert.success("Excelente", "Se elimino la categoria.", 1500);
    }catch(err){
       this.alert.error("Error", "No se pudo eliminar correctamente la categoria.");
        this.isLoading.set(false);
    }
  }

  public loadingUpdate(value:boolean){
     this.isLoading.set(value);
  }
}
